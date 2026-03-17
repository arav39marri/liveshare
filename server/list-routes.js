// Diagnostic: list all registered routes
import 'dotenv/config';
import app from './src/app.js';

const routes = [];

function getRoutes(router, basePath = '') {
  if (!router || !router.stack) return;
  for (const layer of router.stack) {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
      routes.push(`${methods} ${basePath}${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle?.stack) {
      const routerPath = layer.regexp?.source
        ?.replace(/\\\//g, '/')
        ?.replace(/\^\\\//, '')
        ?.replace(/\\\/\?.*/, '') || '';
      getRoutes(layer.handle, `/${routerPath}`);
    }
  }
}

getRoutes(app._router);
console.log('=== Registered Routes ===');
routes.forEach(r => console.log(r));
