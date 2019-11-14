const puppeteer = require('puppeteer');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

let browser;
let page;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
const slugs = dirs('./content/writings').filter(s => s !== 'demo');

console.log(slugs);

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 1080,
  });
});

afterAll(async () => {
  if (browser) await browser.close();
});

describe('Writings', () => {
  for (const slug of slugs) {
    test(`visually looks correct: ${slug}`, async () => {
      await page.goto(`http://localhost:5000/writings/${slug}`);
      await sleep(2000);
      const image = await page.screenshot({ fullPage: true });
      expect(image).toMatchImageSnapshot();
    }, 30000);
  }
});
