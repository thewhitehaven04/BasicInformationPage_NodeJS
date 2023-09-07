const http = require('http');
const fs = require('fs/promises');
const url = require('url');

const PAGES = ['/about.html', '/contact-me.html', '/index.html', '/'];
const ASSET_PREFIX = './public/static';

/**
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * @param {String} path
 */
const render = async (res, path) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  try {
    if (path === '/') res.end(await fs.readFile(ASSET_PREFIX + '/index.html'));
    else res.end(await fs.readFile(ASSET_PREFIX + path));
  } catch (err) {
    console.error(err);
    res.end('Something exploded');
  }
};

http
  .createServer((req, res) => {
    const path = url.parse(req.url).path ?? '';
    if (PAGES.includes(path)) render(res, path);
    else render(res, '/404.html');
  })
  .listen(8080, 'localhost');
