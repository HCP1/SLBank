<template>
  <div>
    <!-- <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in adsList" :key="index">
        <h3 class="medium">{{ item }}</h3>
        <img :src="item.adUR" alt="">
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>
<script>
import Header from "./Header";
export default {
  data() {
    return {
      adsList: [
        {
          adName: "美团支付活动门户广告",
          adURL: "../static/img/banner2.jpg",
          sort: 1
        },
        {
          adName: "桂盛白金信用卡机场贵宾权益",
          adURL: "../static/img/banner3.jpg",
          sort: 2
        },
        {
          adName: "京东支付活动门户广告",
          adURL: "../static/img/banner4.jpg",
          sort: 3
        },
        { adName: "农信易扫", adURL: "../static/img/bannner.jpg", sort: 4 }
      ]
    };
  },
  components: {
    Header
  },
  methods: {}
};
</script>
<style scoped>
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