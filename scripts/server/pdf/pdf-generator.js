const puppeteer = require('puppeteer');
const path = require('path');

module.exports = async (html) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--incognito',
        '--no-sandbox'
      ]
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const file = await page.pdf({
      path: path.resolve(__dirname, `/file.pdf`),
      format: 'A4',
      printBackground: true
    });

    console.log('file printed');
    await page.close();

    await browser.close();

    return file
  } catch (e) {
    return Promise.reject(e);
  }
};
