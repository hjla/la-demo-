<template>
  <div class="app">
    <!-- 头部 -->
    <van-nav-bar
      title="黑马程序员"
      left-text="返回"
      left-arrow
      fixed
      :z-index="999"
      @click-left="go"
     
    />
    <transition >
      <router-view />
    </transition>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o"  to='/vip'>会员</van-tabbar-item>
      <!-- <van-tabbar-item icon="shopping-cart-o"  :info="$store.getters.sum" to='/cart' id="car">购物车</van-tabbar-item> -->
      <van-tabbar-item icon="shopping-cart-o"  :info="$store.getters.sum"  id="car" @click="toggle" >购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to=search>搜索</van-tabbar-item>
      <cart ref='carshow'></cart>
    </van-tabbar>
  </div>
</template>

<script>
import cart from './components/tabbar/cartlx'
export default {
  name: "App",
  data:()=>({
    active:0,
  }),
  methods:{
    go(){
       this.$router.go(-1)
    },
    toggle(){
        this.$refs.carshow.show()
    }
  },
  components:{
    cart
  }
};
</script>

<style  lang="less" scoped>
  .v-enter{
    opacity: 0;
    transform: translateX(100%)
 
  }
  
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    left: -400%;
    position: absolute;
  
  }
  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease;
  
  }
  .app {
    padding:46px 0  50px;
   overflow-x: hidden;

    .van-nav-bar {
      
        background-color:skyblue;
        
        .van-nav-bar__text {
          color: #000;
        }
    }
    
  }
</style>
