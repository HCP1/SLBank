<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/common/Header'
export default {
  components:{
    Header
  },
  data(){
    return{
    }
  },
  methods: {
  },
};
</script>
<style lang="stylus" scoped>

</style>
