<template>

  <div>
    <van-tabs @click='onClick'>
      <van-tab v-for="item in titles" :key=item.id  :title="item.title" >
        <router-link :to='"/home/photoinfo?id="+img.id'  v-for="(img,index) in imageList" :key=index >
          <img  v-lazy="img.img_url" >
        </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data: () => ({
    titles:[],
    imageList:[]
  }),
  created(){
    this.getimgcategory()
    this.onClick()
  },
  methods:{
    // 分类标签的数据
   async  getimgcategory(){
      const {data:{status,message}}=await this.$http('/api/getimgcategory')
      if(status!==0) return Toast('加载失败，重新刷新')
      message.unshift({id:0,title:"全部"})
      this.titles=message 
           
    },
    //  点击分类标签  显示对应的图片
    async onClick(index=0){
      this.imageList=[]
      const {data:{status,message}}=await this.$http('/api/getimages/'+index)
      if(status!==0) return Toast('加载失败，重新刷新')
      this.imageList = message
      
    }

  }
};
</script>

<style  scoped>

</style>