import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/tabbar/Home'
import Vip from '../components/tabbar/Vip'
import Cart from '../components/tabbar/Cart'
import Search from '../components/tabbar/Search'
import NewsList from '../components/news/NewsList'
import PhotoList from '../components/photos/PhotoList'
import GoodsList from '../components/news/GoodsList'
import newsInfo from '../components/news/newsInfo'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/vip',
      component: Vip
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/newslist',
      component: NewsList
    },
    {
      path: '/home/photolist',
      component: PhotoList
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    },
    {
      path: '/home/newsInfo',
      component: newsInfo
    },
  
  ]
})
