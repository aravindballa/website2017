const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  page._emulationManager._client.send('Emulation.setDefaultBackgroundColorOverride', {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });
  await page.setViewport({ width: 2400, height: 1254 });
  await page.goto(`file://${__dirname}/template.html`);
  await page.evaluateHandle('document.fonts.ready');

  debugger;

  const file = await page.screenshot({ type: 'png' });
  fs.writeFileSync('./src/social-cards/shot.png', file);
  await browser.close();
})();
