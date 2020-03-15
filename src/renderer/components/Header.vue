<template>
  <div id="wrapper">
  
    <div class="header">
      <div class="time"><span class="clock"></span>{{$store.state.Counter.time}}秒后退出系统<span class="clock_font">&nbsp;</span></div>
        <header>
          <img class="logo" src="static/img/logo_04.png" alt="">
          <div class="logo_1">广西农村信用社
            <span class="logo_1_t">(农村商业银行、农村合作银行)</span>
          </div>
          <div class="logo_1_t2">广西人的银行 | 植根八桂大地的银行 | 服务"三农"和县域经济的银行</div>
        </header>
        <div class="header_content">
          自助回单管理系统
        </div>
      </div>
  </div>
</template>

 <script>
    export default{
      data(){
        return{
          t:30,
        }
      },
      mounted(){
        this.timer();
      },
      methods:{
        timer(){
          console.log(this.$store.state.Counter.time)
        }
      },
    }
</script>
<style>
body{
  margin:0;
  padding:0;
}
 .header{
    width: 100%;line-height: 60px;overflow: hidden;border: 2px solid #ccc;
}
header{
    width: 510px;
    margin-left: 5%;
}
.logo_1{
    float:left;color:black;font-size:24px;height:30px!important;margin-left:8px;font-weight:bold;font-family:微软雅黑;
}
.logo_1_t{
    font-size:17px;color:black;font-weight:bold;font-family:微软雅黑
}
.logo_1_t2{
    float:left;margin-top:13px;font-size:13px;color: grey;margin-left:9px;letter-spacing: 1px;font-family:微软雅黑;line-height: 40px;
}
.logo{
    float: left;
    margin-top: 17px;
    margin-bottom: 20px;
    
}
.time{
    position: absolute;
    top:10px;
    right:30px;
    font-size: 22px;
    z-index: 9999;
}
.clock{
    color: red !important;
    font-weight: 500;
    font-size: 26px;
    position: fixed;
    top: 10px;
    right: 20px;
}
.header_content{
   text-align: center;
   font-size: 38px;
   color: brown;
   margin-top: 16px;
   margin-right: 31%;
}
</style>
