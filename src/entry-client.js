import { createApp } from './app.js';

const { app, router } = createApp();

// 需要在挂载 app 之前调用 router.onReady，因为路由器必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子
router.onReady(() => {
    app.$mount('#app');
});
