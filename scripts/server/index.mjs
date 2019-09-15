import app from './server';
import commonConfig from './config/common.conf';
const PORT = commonConfig.PORT;

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`server listening on :${PORT} port`);
});
