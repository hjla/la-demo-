<template >
  <div class="grid clearfix">
      <router-link tag="div" class="van-col van-col--6" v-for='item in girds' :key=item.id :to="item.to">
        <i class="van-icon ">
          <img :src="item.src" alt="">
        </i>
        <span>{{item.title}}</span>
      </router-link>
      
    </div>
</template>

<script>
export default {
  data: () => ({
     girds: [
      {
        id: 1,
        to: "/home/newslist",
        title: "新闻资讯",
        src: "static/images/menu1.png"
      },
      {
        id: 2,
        to: "/home/photolist",
        title: "图片分享",
        src: "static/images/menu2.png"
      },
      {
        id: 3,
        to: "/home/goodslist",
        title: "商品购买",
        src: "static/images/menu3.png"
      },
      {
        id: 4,
        to: "/home/newslist",
        title: "留言反馈",
        src: "static/images/menu4.png"
      },
      {
        id: 5,
        to: "/home/newslist",
        title: "视频区域",
        src: "static/images/menu5.png"
      },
      {
        id: 6,
        to: "/home/newslist",
        title: "联系我们",
        src: "static/images/menu6.png"
      }
    ]
  })
};
</script>

<style lang='less' scoped>
  .grid {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  
  .van-col {
    float: left;
    text-align: center;
    height: 100px;
     width: 33.333%;
    vertical-align: middle;
    box-sizing: border-box;
    .van-icon {
      font-size: 32px;
      margin: 15px 0;
      color: #323233;
      img {
        width: 60px;
        height: 60px;
      }
    }
    span {
      display: block;
      padding: 0 5px;
      font-size: 12px;
      line-height: 14px;
    }
  }
  
}
.clearfix::before,.clearfix::after {
  content: '';
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom:1;
}
</style>