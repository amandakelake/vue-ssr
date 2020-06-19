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

backendRouter.get('/', async (ctx, next) => {
    try {
        ctx.type = 'html';
        ctx.status = 200;
        ctx.body = 'SSR';
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = '服务器内部错误';
    }
});

backendApp.listen(3300, () => {
    console.log('服务器端渲染地址： http://localhost:3300');
});
