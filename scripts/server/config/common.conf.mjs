export default {
  PORT: process.env.PORT || 9000,
  mailReqParams: ['to', 'from', 'templateName'],
  pdfReqParams: ['templateName', {
    name: 'data',
    params: ['service', {
      name: 'cost',
      params: ['amount', 'currency']
    }]
  }]
};
