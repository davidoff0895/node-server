module.exports = {
  pool: true,
  host: 'yourSMTPHost',
  port: 587,
  auth: {
    user: 'usr',
    pass: 'pwd'
  },
  tls: {
    rejectUnauthorized: false
  }
};
