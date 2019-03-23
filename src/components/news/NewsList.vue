<template>
  <div class="newslist">
    <router-link
      v-for='item in newlists'
      :key='item.id'
      :to="'/home/newsInfo?id='+item.id"
    >
      <van-card
        :title="item.title"
        :thumb="item.img_url"
      >
        <div
          slot="desc"
          class="content"
        >
          <span>{{item.zhaiyao}}</span>
        </div>
        <div slot="price">
          <span>发表时间：{{item.add_time|timefmt}}</span>
        </div>
        <div slot="num">
          <span>点击{{item.click}}次</span>
        </div>
      </van-card>
    </router-link>

  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  data: () => ({
    newlists: []
  }),
  created() {
    this.getnewslist();
  },
  methods: {
    async getnewslist() {
      const {
        data: { status, message }
      } = await this.$http("/api/getnewslist");
      if (status !== 0) return Toast("加载失败，请稍后重试");
      this.newlists = message;
     
    }
  }
};
</script>

<style lang="less" scoped>
.newslist {
  .van-card {
    height: 80px;
    overflow: hidden;

    .content {
      span {
        font-size: 8px;
      }
    }
    .van-card__thumb img {
      width: 90px;
      height: 60px;
    }
    .van-card__title {
      margin: 4px 0;
    }
  }
}
</style>