import fs from 'node:fs/promises';
import express from 'express';
import compression from 'compression';
import sirv from 'sirv';
import * as url from 'node:url';
import { createServer as createViteServer } from 'vite';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

async function createServer() {
  const app = express();
  app.use(compression());

  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(sirv('dist/client', { gzip: true }));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProduction) {
        template = await fs.readFile('index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = await fs.readFile('dist/client/index.html', 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const { html: appHtml, helmet } = render();

      const head = `${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}`;

      const finalHtml = template
        .replace('<!--head-outlet-->', head)
        .replace('<!--app-outlet-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();