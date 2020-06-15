# Vue SSR

[Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)

配合文章食用更佳 [带你五步学会 Vue SSR](https://mp.weixin.qq.com/s/m0yW-rELfCrjbEkfMZ7UAw)
文章里有几个地方没处理，新同学容易踩坑，下面列出来了，但这依然是一篇很不错的 vue ssr 入门教程

-   坑 1（第三步）
    服务器端需要`await`异步等待 `entry-server.js`里的 `promise.all` 执行完所有组件`asyncData`方法异步获取数据后，再返回结果
    不然就会出现：html 已经返回给浏览器，但是没数据

```js
// 后端Server
backendRouter.get('/index', async (ctx, next) => {
    try {
        // 坑1、这里await异步等待 entry-server 里的 promise.all 执行完所有组件asyncData异步获取数据并返回结果
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
```

```js
// src/components/bar.vue
const fetchInitialData = ({ store }) => {
    // 注意组件里的fetchInitialData方法要return返回promise 不然上面entry-server里的 promise.all将毫无意义
    return store.dispatch('fetchBar');
};
```

-   坑 2（第三步）
    [客户端激活 (client-side hydration) | Vue SSR 指南](https://ssr.vuejs.org/zh/guide/hydration.html)
    如果你检查服务器渲染的输出结果，你会注意到应用程序的根元素上添加了一个特殊的属性：

```html
<div id="“app”" data-server-rendered="“true”"></div>
```

`data-server-rendered` 特殊属性，让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载。注意，这里并没有添加 `id=“app”`，而是添加 data-server-rendered 属性：你需要自行添加 ID 或其他能够选取到应用程序根元素的选择器，否则应用程序将无法正常激活。

这里我们添加`id="app"`到 `App.vue`的根元素上（文章中没加）

```js
<template>
	<div class="app-container" id="app">
		<!-- 其他dom元素或组件 -->
	</div>
</template>
```

-   坑 3（第四步）
    加上`vue-ssr-client-manifest.json`后，需要将`template/index.ssr.html`里面占位给`html-webpack-plugin`注入`bundle`的`script`去删掉，不然页面就会加载两份 `client`的代码

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>服务端渲染</title>
    </head>
    <body>
        <!--vue-ssr-outlet-->

        <!-- 删掉这一行 -->
        <script type="text/javascript" src="<%= htmlWebpackPlugin.options.files.js %>"></script>
    </body>
</html>
```

-   坑 4（第 5 步）
    在接入 `vue-router` 后，`server/server.js` 也要做些改造，文中没有讲到的

    ```js
    // server/server.js的路由改造
    const handleBackendRoute = (ctx, next) => {
        console.log('ctx', ctx);
        console.log('url', ctx.url);

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

    // 前端路由也是同理
    ```

    `koa-router` 9+版本,为了兼容`express--4X`, 不能使用通配符`*` , 具体原因看 issue [Using \* wildcard no longer works](https://github.com/koajs/router/issues/76)
