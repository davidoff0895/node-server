const server = require('./server');
const commonConfig = require('./config/common.conf');
const PORT = commonConfig.PORT;

server.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`server listening on :${PORT} port`);
});
