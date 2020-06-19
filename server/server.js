const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();
const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: template,
    clientManifest: clientManifest,
});

const handleBackendRoute = (ctx, next) => {
    // console.log('ctx', ctx);
    // console.log('url', ctx.url);

    let context = {
        url: ctx.url,
    };

    const ssrStream = renderer.renderToStream(context);
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = ssrStream;
};

// koa-router 9.0 不能使用通配符 * , 主要为了 `path-to-regexp` 为了兼容 Express <= 4.x
// https://github.com/koajs/router/issues/76
// https://github.com/pillarjs/path-to-regexp#compatibility-with-express--4x
backendRouter.get('/', handleBackendRoute);
backendRouter.get('/bar', handleBackendRoute);
backendRouter.get('/foo', handleBackendRoute);

backendApp.use(serve(path.resolve(__dirname, '../dist')));
backendApp.use(backendRouter.routes()).use(backendRouter.allowedMethods());

backendApp.listen(3300, () => {
    // console.log('服务器端渲染地址： http://localhost:3000');
});

const handleFrontendRoute = (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
};
// 前端Server
frontendRouter.get('/', handleFrontendRoute);
frontendRouter.get('/bar', handleFrontendRoute);
frontendRouter.get('/foo', handleFrontendRoute);

frontendApp.use(serve(path.resolve(__dirname, '../dist')));

frontendApp.use(frontendRouter.routes()).use(frontendRouter.allowedMethods());

frontendApp.listen(3301, () => {
    // console.log('浏览器端渲染地址： http://localhost:3001');
});
