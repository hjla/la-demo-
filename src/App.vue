<template>
  <div class="app">
    <!-- 头部 -->
    <van-nav-bar
      title="黑马程序员"
      left-text="返回"
      
      left-arrow
     
    />
    <transition >
      <router-view />
    </transition>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o"  to='/vip'>会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info="5" to='/cart'>购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to=search>搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data:()=>({
    active:0,
  })
};
</script>

<style  lang="less" scoped>
  .v-enter{
    opacity: 0;
    transform: translateX(100%)
 
  }
  
  .v-leave-to {
    opacity: 0;
    transform: translateX(-00%);
    left: -200%;
    position: absolute;
  
  }
  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease;
  
  }
  .app {
    padding-bottom:  50px;
   overflow-x: hidden;
    .van-nav-bar {
        background-color:skyblue;
        
        .van-nav-bar__text {
          color: #000;
        }
    }
    
  }
</style>
