const Koa = require('koa');
const static = require('koa-static');

const app = new Koa();

app.use(static('./dist', { extensions: ['html'] })); // 使用 dist 目录下的 index.html

// 这个属于锦上添花，打开默认浏览器
const openDefaultBrowser = function (url) {
    const { exec } = require('child_process');
    let type = '';
    switch (process.platform) {
        case 'darwin':
            type = `open ${url}`;
            break;
        case 'win32':
            type = `start ${url}`;
            break;
        default:
            type = `xdg-open ${[url]}`;
    }
    exec(type);
}

// 监听 3030 端口，1秒后打开默认浏览器
app.listen(3030, (err) => {
    if (!err) {
        console.log(`server listen 3030`);
        setTimeout(() => {
            openDefaultBrowser('http://localhost:3030');
        }, 1000);
    } else {
        console.error(err);
    }
});
