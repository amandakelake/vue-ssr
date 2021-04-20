import Vue from 'vue';
import Router from 'vue-router';
import Bar from '../components/bar';
import Foo from '../components/foo';

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
            // component: () => import('../components/foo.vue')
            component: Foo,
        },
    ];

    return new Router({
        mode: 'history',
        routes,
    });
}

export default createRouter;
