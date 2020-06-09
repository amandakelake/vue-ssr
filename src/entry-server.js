/**
 * 通过导出的App拿到了所有它下面的components，然后遍历，找出哪些component有asyncData方法，
 * 有的话调用并传入store，该方法会返回一个Promise，我们使用Promise.all等所有的异步方法都成功返回，才resolve(app)。
 * context.state = store.state作用是，当使用createBundleRenderer时，如果设置了template选项，那么会把context.state的值作为window.__INITIAL_STATE__自动插入到模板html中。
 */

import { createApp } from './app.js';

export default (context) => {
    return new Promise((resolve, reject) => {
        const { app, store, App } = createApp();

        let components = App.components;
        let asyncDataPromiseFns = [];

        Object.values(components).forEach((component) => {
            if (component.asyncData) {
                asyncDataPromiseFns.push(component.asyncData({ store }));
            }
        });

        Promise.all(asyncDataPromiseFns).then((result) => {
            // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
            context.state = store.state;

            console.log(222);
            console.log(store.state);
            console.log(context.state);
            console.log(context);

            resolve(app);
        }, reject);
    });
};
