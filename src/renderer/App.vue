<template>
  <div id="app" @click="setTimer">
    <Header :clickScreen="isClick"/>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/common/Header'
export default {
  components:{
    Header
  },
   watch: {
  },
  data(){
    return{
      isClick:false
    }
  },
  methods: {
    setTimer(){
      this.isClick = !this.isClick
    }
  },
};
</script>
<style lang="stylus" scoped>

</style>
