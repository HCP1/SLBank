<template>
  <div id="app" @click="ReSetTimer">
    <!-- <Header>
      <div v-if="showtimer">timer的东西</div>
    </Header> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
      showtimer:true
    }
  },
  methods: {
    ReSetTimer(){}
  },
  watch:{
    $router(o,n){
      if(o=="home"){
       showtimer=false 
      }
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
