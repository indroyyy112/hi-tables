import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function mokaApiPlugin() {
  return {
    name: 'moka-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url || '';
        if (url.startsWith('/api/moka/')) {
          const pathname = url.split('?')[0];
          const queryStr = url.includes('?') ? url.split('?')[1] : '';
          const searchParams = new URLSearchParams(queryStr);
          const query: Record<string, string> = {};
          searchParams.forEach((v, k) => { query[k] = v; });

          let body = {};
          if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            try {
              const buffers: any[] = [];
              for await (const chunk of req) buffers.push(chunk);
              const raw = Buffer.concat(buffers).toString();
              if (raw) body = JSON.parse(raw);
            } catch(e) {}
          }

          req.query = query;
          req.body = body;

          if (!res.status) {
            res.status = (code: number) => {
              res.statusCode = code;
              return res;
            };
          }
          if (!res.json) {
            res.json = (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
          }
          if (!res.redirect) {
            res.redirect = (codeOrUrl: any, maybeUrl: any) => {
              const code = typeof codeOrUrl === 'number' ? codeOrUrl : 302;
              const location = typeof codeOrUrl === 'number' ? maybeUrl : codeOrUrl;
              res.statusCode = code;
              res.setHeader('Location', location);
              res.end();
            };
          }

          try {
            if (pathname === '/api/moka/auth-url') {
              const mod = await import('./api/moka/auth-url.js');
              return await mod.default(req, res);
            }
            if (pathname === '/api/moka/token') {
              const mod = await import('./api/moka/token.js');
              return await mod.default(req, res);
            }
            if (pathname === '/api/moka/outlets') {
              const mod = await import('./api/moka/outlets.js');
              return await mod.default(req, res);
            }
            if (pathname === '/api/moka/items') {
              const mod = await import('./api/moka/items.js');
              return await mod.default(req, res);
            }
            if (pathname === '/api/moka/sync') {
              const mod = await import('./api/moka/sync.js');
              return await mod.default(req, res);
            }
          } catch(err: any) {
            console.error('API route error:', err);
            return res.status(500).json({ error: 'internal_error', message: err?.message || String(err) });
          }
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mokaApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
