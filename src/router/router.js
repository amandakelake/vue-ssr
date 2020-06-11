import Vue from 'vue';
import Router from 'vue-router';
import Bar from '../components/bar';

Vue.use(Router);

function createRouter() {
    const routes = [
        {
            path: '/bar',
            component: Bar,
        },
        {
            path: '/foo',
            // 异步组件 按需加载
            component: () => import('../components/foo.vue')
        }
    ];

    const router = new Router({
        mode: 'history',
        routes
    })

    return router
}


export default createRouter;
