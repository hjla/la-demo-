<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model='msg' ></textarea>
    <van-button type="danger" size="large" @click='submited'>发表评论</van-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for='(item,index) in comments' :key=item.id>
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|timefmt}}</div>
        <div class="cmt-body">
          {{item.content?item.content:'此用户很懒，什么都没有留下'}}
        </div>
      </div>
    </div>
    <van-button type="danger" size="large" plain @click='getmore'>{{more}}</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data: () => ({
    comments: [],
    // 默认显示第一页的内容
    pageindex: 1,
    houtainum: 7,
    msg:''
    
  }),
  props:['artid'],
  created(){
    this.getcomments()
  },
  methods:{
   async getcomments(){
    const {data:{status,message}} =await this.$http(`/api/getcomments/${this.artid}?pageindex=${this.pageindex}`)
  
    this.comments=this.comments.concat(message)
    },
    getmore(){
      if(this.pageindex<4){
        this.pageindex++
        this.getcomments()
      }
    },
   async  submited(){
     if(this.msg.trim()==='') return Toast('请输入评论')
      const {data}=await this.$http.post('/api/postcomment/'+this.artid,{content:this.msg})
     if(data.status===0){
        Toast(data.message)
        this.comments.unshift({user_name:'匿名用户',content:this.msg,add_time:new Date()})
        this.msg=''
     } 
      
    }
  },
  computed:{
    more(){
      return  this.pageindex<4?'加载更多':'无更多评论数据'
    }
  }


};
</script>

<style lang="less">
.comment {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    width: 100%;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>