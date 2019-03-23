<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      class="my_swipe"
    >
      <van-swipe-item
        class="item"
        v-for="item in lunbolist"
        :key="item.img"
      >
        <img
          :src="item.img"
          alt=""
        >
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <!-- <div class="grid">
      <div class="van-col van-col--6">
        <i class="van-icon ">
          <img src="../../images/menu1.png" alt="">
        </i>
        <span>新闻资讯</span>
      </div>
      <div class="van-col van-col--6">
        <i class="van-icon ">
           <img src="../../images/menu2.png" alt="">
        </i>
        <span>图片分享</span>
      </div>
      <div class="van-col van-col--6">
        <i class="van-icon ">
           <img src="../../images/menu3.png" alt="">
        </i>
        <span>商品购买</span>
      </div>
      <div class="van-col van-col--6">
        <i class="van-icon ">
           <img src="../../images/menu4.png" alt="">
        </i>
        <span>留言反馈</span>
      </div>
      <div class="van-col van-col--6">
        <i class="van-icon ">
           <img src="../../images/menu5.png" alt="">
        </i>
        <span>视频专区</span>
      </div>
      <div class="van-col van-col--6">
        <i class="van-icon ">
           <img src="../../images/menu6.png" alt="">
        </i>
        <span>联系我们</span>
      </div>
    </div> -->
    <grid></grid>
  </div>
</template>

<script>
import grid from "../subcomponents/Grid.vue";
export default {
  data: () => ({
    lunbolist: []
  }),
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http("api/getlunbo").then(result => {
        const {
          data: { status, message }
        } = result;
        if (status !== 0) return Toast("数据加载失败，请重新刷新");
        this.lunbolist = message;
      });
    }
  },
  components: {
    grid
  }
};
</script>

<style lang='less' scoped>
.my_swipe {
   
  .item.van-swipe-item {
   
    height: 200px !important;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>