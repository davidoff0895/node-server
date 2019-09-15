import puppeteer from 'puppeteer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async (html) => {
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
      path: path.resolve(__dirname, `file.pdf`),
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
