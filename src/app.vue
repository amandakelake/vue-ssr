<template>
    <div class="app-container">
        <h1>Demo</h1>
        <hello-ssr />
        <img :src="FdLogo" alt="" />
        <img :src="RedLogo" alt="" />
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
};
</script>

<style lang="less" scoped>
.app-container {
    font-size: 20px;
    color: #333;
}
</style>
