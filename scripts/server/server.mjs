import express from 'express';
import mailSender from './mails/email-server';
import bundleRenderer from './bundleRenderer';
import pdfGenerator from './pdf/pdf-generator';
import missingServiceParam from './common/validation/missParam';
import conf from './config/common.conf';
import configDevServer from './config/configDevServer';

const app = express();
app.use(express.json());

let renderer = null;
configDevServer(app, ({bundle}) => {
  renderer = bundleRenderer(bundle);
});

app.post('/mails/*', (req, res) => {
  const query = req.body;
  validation(query, 'mail').then(async () => {
    const context = {
      from: query.from,
      to: query.to,
      subject: query.subject,
      path: query.templateName ? `mails/${query.templateName}` : null,
      body: query.body,
      locale: query.locale,
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

app.post('/pdf/*', async (req, res) => {
  const query = req.body;
  validation(query, 'pdf').then(async () => {

    try {
      const context = {
        path: 'pdf/brochure',
        body: data
      };
      renderer.renderToString(context, (err, html) => {
        if (err) {
          res.status(500).end(`Server error: ${JSON.stringify(err)}`);
          console.log(err);
          return Promise.reject(err);
        }
        pdfGenerator(html).then((pdf) => {
          res.end(JSON.stringify({
            status: 'Printed'
          }));
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

export default app;
