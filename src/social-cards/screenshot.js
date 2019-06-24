const fs = require('fs');
const { resolve } = require('path');
const { createHash } = require('crypto');

const getHtml = title => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      href="https://fonts.googleapis.com/css?family=Inconsolata|Montserrat:400,700"
      rel="stylesheet"
    />
    <title>Document</title>
    <style>
      body {
        background: transparent;
        margin: 0;
        padding: 0;
      }
      .card {
        height: 100vh;
        width: 100vw;
        background: #151515;
        color: #ffffff;
      }
      .card .wrapper {
        height: -webkit-fill-available;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5%;
      }
      .card .wrapper h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 5vw;
      }
      .card .wrapper footer {
        text-align: right;
        font-family: 'Inconsolata', monospace;
        font-size: 1.8vw;
      }
      .card .wrapper .rects {
        width: 100%;
      }
      .card .wrapper .rects .rect1 {
        height: 32px;
        width: 20%;
        background: #656565;
        margin-bottom: 4%;
      }
      .card .wrapper .rects .rect2 {
        height: 32px;
        width: 100%;
        background: #a2a2a2;
        margin-bottom: 4%;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="wrapper">
        <h1>${title}</h1>
        <div class="rects">
          <div class="rect1"></div>
          <div class="rect2"></div>
        </div>
        <footer>aravindballa.com</footer>
      </div>
    </div>
  </body>
</html>
`;

const writeCachedFile = async (CACHE_DIR, key, contents, extension) => {
  // I'm using the title as the key for the hash, because it's the only
  // thing which impacts the final image. If you were to have something
  // more elaborate, you should just use the HTML as the hash instead.
  const fileName =
    createHash('md5')
      .update(key)
      .digest('hex') +
    '.' +
    extension;
  const absolutePath = resolve(CACHE_DIR, fileName);
  fs.writeFileSync(absolutePath, contents);
  return absolutePath;
};

const imageFromHtml = async (CACHE_DIR, browser, title) => {
  const page = await browser.newPage();
  page._emulationManager._client.send('Emulation.setDefaultBackgroundColorOverride', {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });
  await page.setViewport({ width: 2400, height: 1254 });
  await page.setContent(getHtml(title));
  await page.evaluateHandle('document.fonts.ready');

  const file = await page.screenshot({ type: 'png' });

  return writeCachedFile(CACHE_DIR, title, file, 'png');
};

const postToImage = async (CACHE_DIR, browser, post) => {
  const title = post.frontmatter.title;
  return imageFromHtml(CACHE_DIR, browser, title);
};

module.exports = postToImage;
