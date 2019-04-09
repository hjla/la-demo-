<template>
  <div class="goodsinfo">
     
     <transition @before-enter='beforeEnter' @enter='Enter' @after-enter='afterEnter'>
        <div class="ball" v-show="ballflag" ref='ball'></div>
     </transition>

    <!-- 轮播区域 -->
    <div class="panel">
      <swipe :lunbolist="lunbotuList" class="my-swiper"></swipe>
    </div>
    <!-- 购买区域 -->
    <div class="panel">
      <h2 class="title">{{goodlist.title}}</h2>
      <hr>
      <div class="panel-body">
        <div class="price-group">
          市场价格:
          <span class="old">{{goodlist.market_price}}</span>
          销售价格:
          <span class="new">{{goodlist.sell_price}}</span>
        </div>
        <div class="stepper">
          <div class="number">购买数量: </div>
          <!-- 
            :min="1" 默认就是1 不添加也可以 
            plus 点击添加的时候触发 
            minus 点击减少的时候触发  
          -->
          <van-stepper integer class="number" v-model="value"   />
        </div>
        <div class="btn-group">
          <van-button type="primary" size="small">立即购买</van-button>
          <van-button type="danger" size="small" @click='addGood' :disabled="carFlag">加入购物车</van-button>
        </div>
      </div>
    </div>

    <!-- 描述区域 -->
    <div class="panel">
      <h2 class="title">商品参数</h2>
      <hr>
      <div class="panel-body">
        <p>商品货号：{{goodlist.goods_no}}</p>
        <p>库存情况：{{goodlist.stock_quantity}}件</p>
        <p>上架时间：{{goodlist.add_time|timefmt}}</p>
      </div>
    </div>

    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
    <p>7</p>
    <p>8</p>
  </div>
</template>

<script>
import swipe from "../subcomponents/swipe";
import { Toast } from "vant";
export default {
  data: () => ({
   lunbotuList:[],
   id:'',
   goodlist:{},
   ballflag:false,
   x:0,
   y:0,
   carFlag:false,
   value:1
  }),
  created(){
    this.id=this.$route.query.id
    this.getthumimages()
    this.getinfo()
  },
  components:{
    swipe
  },
  methods:{
    //请求 缩略图
    async getthumimages(){
      let id=Number(this.id)+100
      const {data:{status,message}}=await this.$http("/api/getthumimages/"+id)
      if(status!==0) return Toast('加载失败')
      this.lunbotuList=message
      
      
    },
    // 请求商品数据
    async getinfo(){
      const {data:{status,message}}=await this.$http("/api/goods/getinfo/"+this.id)
      if(status!==0) return Toast('加载失败')
     this.goodlist=message
    
      
    },

   
    // 购物车添加功能
    addGood(){
          // 使用vuex中的add方法
       let details={id:this.id,count:this.value,price:this.goodlist.sell_price,isSelect:true,title:this.goodlist.title,src:this.lunbotuList[0].src}
          
      // this.$store.commit('add',details)
      this.$store.dispatch('actAdd',details)
      
      this.carFlag=true
      this.ballflag=!this.ballflag
      setTimeout(()=>{
        this.carFlag=false
      },700)
    },
    getDistance(){
      let ball=this.$refs.ball.getBoundingClientRect()
      let car=document.querySelector('#car .van-info').getBoundingClientRect()
        this.y=car.top-ball.top
        this.x=car.left-ball.left
    },
    beforeEnter(el){
      el.style.transform='translate(0,0)'
    },
 
    Enter(el,done){
      this.getDistance()  
      el.offsetTop
      el.style.transform=`translate(${this.x}px,${this.y}px)`
      el.style.transition='all .5s ease'
      done()
    },
    afterEnter(){
      this.ballflag=!this.ballflag
    }
  }
 
};
</script>

<style lang="less">
.goodsinfo {
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    top: 327px;
    left: 132px;
    z-index: 20;
    opacity: 1;
  }
  .panel {
    width: 96%;
    border: 2px dashed #38f;
    border-radius: 6px;
    box-shadow: 0 0 3px #38f;
    margin: 0 auto;
    margin-top: 10px;
    .my-swiper {
      text-align: center;
      height: 166px;
      line-height: 166px;
      img {
        vertical-align: middle;
      }
    }
    .title {
      font-size: 16px;
      margin: 10px 0 10px 10px;
    }
    .panel-body {
      margin-left: 16px;
      margin-bottom: 10px;
      color: #8f8f94;
      font-size: 14px;
      .price-group {
        margin-bottom: 12px;
        .old {
          text-decoration: line-through;
          margin-right: 6px;
        }
      }
      .stepper {
        color: #8f8f94;
        font-size: 0;
        .number {
          display: inline-block;
          font-size: 14px;
          margin-right: 6px;
        }
      }
      .btn-group {
        margin-top: 10px;
      }
      p {
        margin-top: 10px;
      }
    }
  }
}
</style>