import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)

let car=JSON.parse(localStorage.getItem('car')||'[]')    
export default new Store({
  state:{
    car:car,
    number:1
  },
  mutations:{
    add(state,details){
      // 设置 默认购物车没有此商品的信息，添加
  
      let flag=false
      state.car.some(item=>{
        if(item.id===details.id){
          // 购物车有此商品   添加数量
          item.count+=parseInt(details.count)
          flag=true
          return true
        }
      })

      if(!flag){
        state.car.push(details)
      }
     
      localStorage.setItem('car',JSON.stringify(state.car))

    }
  },
  getters:{
    sum(state){
      let c=0
      if(state.car.length){
        state.car.forEach(item=>{
          c+=item.count
        })
      }
      return c
    },
    getAllprice(state){
      let price=0
      

        state.car.forEach(item=>{
          if(item.isSelect){
            price+=item.count*item.price*100
          }
        })
      
      return price

    },
    getStatus(state){
      let  statusflag=true
      state.car.forEach(item=>{
        if(!item.isSelect){
          statusflag=false
        }
    })
      return statusflag

  }
},
  actions:{
    actAdd({commit},details){
      commit('add',details)
    }
  }

})