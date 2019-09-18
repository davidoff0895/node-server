module.exports = {
  PORT: process.env.PORT || 9000,
  mailReqParams: ['to', 'from', {
    name: 'body',
    params: [{
      name: 'guest',
      params: ['firstName', 'lastName']
    }]
  }],
  pdfReqParams: [{
    name: 'body',
    params: [{
      name: 'guest',
      params: ['firstName', 'lastName']
    }]
  }]
};
