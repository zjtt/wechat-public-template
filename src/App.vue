<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
    width: 100%;
    background-color: #fff;
}
.vux-toast,
.vux-alert {
    font-size: 16px;
}
.weui-cell {
    padding: 0;
    .vux-cell-primary {
        width: 100%;
        .vux-cell-value {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
        }
    }
}
</style>
