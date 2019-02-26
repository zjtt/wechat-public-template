<template>
    <div>
        <!-- 判断是否登录 -->
    </div>
</template>

<script>
    import login from '../../mixins/login';
    export default {
        data() {
            return {
            };
        },
        mixins: [login],
        components: {
        },
        created() {
        },
        mounted() {
            this.loginInit();
        },
        methods: {
        }
    };
</script>

<style>
</style>