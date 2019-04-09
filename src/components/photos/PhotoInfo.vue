<template>
  <div class="photoinfo">
    <!-- 图片描述区域 -->
    <h3>{{imglist.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{imglist.add_time|timefmt}}</span>
      <span>点击：{{imglist.click}}</span>
    </p>
    <hr>

    <!-- 缩略图预览区域 -->
    <div class="thumbs" >
        <img :src="item" 
         v-for='(item,index) in imgsrc'
         :key=index 
         @click='thumbnail(index)'
         alt="">
    </div>
    <!-- 图片内容区域 -->
    <div class="content">
     {{imglist.content}}
    </div>

    <comment :artid="id"></comment>
  </div>
</template>

<script>
import {Toast} from 'vant'
import { ImagePreview } from 'vant'
import comment from '../subcomponents/Comment'

export default {
  data: () => ({
   id:'',
   imglist:[],
   imgsrc:[]
  }),
  created(){
    this.id=this.$route.query.id
    this.getimageInfo()
    this.getthumimages()

  },

  components:{
    comment
  },
  methods:{
    // 文字内容
    async getimageInfo(){
      const {data:{status,message}}=await this.$http('/api/getimageInfo/'+this.id)
      if(status!==0) return Toast('加载失败，重新刷新')
      this.imglist=message 
    },
    // 缩略图 的消息
    async getthumimages(){
      this.imgsrc=[]
      const {data:{status,message}}=await this.$http('/api/getthumimages/'+this.id)
      if(status!==0) return Toast('加载失败，重新刷新')
      console.log(message);
      message.forEach(item=>{
           if(item.src){
             this.imgsrc.push(item.src)
           }
      })
      
     },
    //  图片预览
     thumbnail(startPosition){
       ImagePreview({
          images:this.imgsrc ,
          startPosition
          
        })
     }

       
    
  },
 
};
</script>

<style lang="less">
.photoinfo {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    display: flex;
    justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>