const express = require('express');
const mailSender = require('./mails/email-server');
const bundleRenderer = require('./bundleRenderer');
const pdfGenerator = require('./pdf/pdf-generator');
const missingServiceParam = require('./common/validation/missParam');
const conf = require('./config/common.conf');
const configDevServer = require('./config/configDevServer');

const server = express();
server.use(express.json());

let renderer = null;
configDevServer(server, ({bundle}) => {
  renderer = bundleRenderer(bundle);
});

server.get('*', (req, res) => {
  const context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Server error')
        }
      } else {
        res.end(html)
      }
    })
})

server.post('/mail', (req, res) => {
  const query = req.body;
  validation(query, 'mail').then(async () => {
    const context = {
      from: query.from,
      to: query.to,
      subject: query.subject,
      url: req.url,
      body: query.body,
      locale: query.locale && query.locale.toLowerCase() || 'en',
      attachments: query.attachments
    };
    renderer.renderToString(context, (err, html) => {
      if (err) {
        res.status(500).end(`Server error: ${JSON.stringify(err)}`);
        console.log(err);
        return
      }
      context.html = html;
      mailSender(context).then((data) => {
        res.end(JSON.stringify({
          status: 'Received'
        }));
      }).catch((error) => {
        res.status(400).end(JSON.stringify({
          status: 'Bad request',
          description: error
        }))
      });
    })
  }).catch((missingParam) => {
    return res.status(400).end(`Missing required param:, '${missingParam}'`)
  });
});

server.post('/pdf', async (req, res) => {
  const query = req.body;
  validation(query, 'pdf').then(async () => {

    try {
      const context = {
        url: req.url,
        body: query.body,
        locale: query.locale && query.locale.toLowerCase() || 'en',
      };
      renderer.renderToString(context, (err, html) => {
        if (err) {
          res.status(500).end(`Server error: ${JSON.stringify(err)}`);
          console.log(err);
          return Promise.reject(err);
        }
        pdfGenerator(html).then((pdf) => {
          res.end(pdf);
        })
      })
    } catch (err) {
      res.status(500).end(`Server error: ${JSON.stringify(err)}`);
      console.log('An error has occurred %err', err)
    }
  }).catch((missingParam) => {
    return res.status(400).end(`Missing required param: '${missingParam}'`)
  });
})

const validation = (query, serviceName) => {
  return new Promise((resolve, reject) => {
    const missingParam = missingServiceParam(query, conf[`${serviceName}ReqParams`]);
    if (missingParam) {
      console.log(`Missing required param: '${missingParam}'`);
      reject(missingParam)
    }
    resolve()
  })
}

module.exports = server;
