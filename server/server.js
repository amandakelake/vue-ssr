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
    clientManifest: clientManifest
});

// 后端Server
backendRouter.get('/index', async (ctx, next) => {
    try {
        // 这里await异步等待 entry-server 里的 promise.all 执行完所有组件asyncData异步获取数据并返回结果
        const html = await new Promise((resolve, reject) => {
            renderer.renderToString((err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
        ctx.type = 'html';
        ctx.status = 200;
        ctx.body = html;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = '服务器内部错误';
    }
});

backendApp.use(serve(path.resolve(__dirname, '../dist')));

backendApp.use(backendRouter.routes()).use(backendRouter.allowedMethods());

backendApp.listen(3000, () => {
    console.log('服务器端渲染地址： http://localhost:3000/index');
});

// 前端Server
frontendRouter.get('/index', (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
});

frontendApp.use(serve(path.resolve(__dirname, '../dist')));

frontendApp.use(frontendRouter.routes()).use(frontendRouter.allowedMethods());

frontendApp.listen(3001, () => {
    console.log('浏览器端渲染地址： http://localhost:3001/index');
});
