<template>
  <div class="newsInfo">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsInfo.add_time|timefmt}}</span>
      <span>点击{{newsInfo.click}}次</span>
    </p>
    <hr>
    <div class="content">
      {{newsInfo.content}}
    </div>

    <comment :artid='id'></comment>
  </div>
</template>

<script>
import {Toast} from 'vant'
import comment from '../subcomponents/Comment'

export default {
  data: () => ({
    id:'',
    newsInfo:{}
  }),
  created(){
    this.id=this.$route.query.id
    this.getnew()
  },
  methods:{
   async getnew(){
      const {data:{status,message}}=await this.$http('/api/getnew/'+this.id)
      if(status!==0) return Toast("加载失败，请重新刷新")
      this.newsInfo=message
    }
  },
  components:{
    comment
  }
};
</script>

<style lang="less" >
  .newsInfo {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>