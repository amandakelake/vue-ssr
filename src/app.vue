<template>
    <div class="app-container" id="app">
        <h1>Vue SSR + PM2 + Travis -> CI & CD</h1>
        <hello-ssr />
        <img :src="FdLogo" alt="" />
        <img :src="RedLogo" alt="" />
        <router-link to="/bar">go to bar</router-link>
        <router-link to="/foo">go to foo</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import HelloSsr from '@/components/hello-ssr.vue';
import FdLogo from '@/assets/images/f-200.png';
import RedLogo from '@/assets/images/logo-round.png';
export default {
    name: 'app',
    data() {
        return {
            FdLogo,
            RedLogo,
        };
    },
    components: {
        HelloSsr,
    },
    beforeCreate() {
        // console.log('App.vue beforeCreate');
    },
    created() {
        // console.log('App.vue created');
    },
    beforeMount() {
        // console.log('App.vue beforeMount');
    },
    mounted() {
        // console.log('App.vue mounted');
    },
};
</script>

<style scoped>
.app-container {
    font-size: 20px;
    color: #333;
    padding: 20px;
}
</style>
