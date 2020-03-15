<template>
  <div>
    <h3>我是HOME页面</h3>
    <div @click="toLogin">
      我要去登录页面
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin(){
      this.$router.push('login')
    }
  }
};
</script>
<style lang="stylus" scoped>

</style>