<template>
  <div class="goodslist">
    <div
      class="goods-item"
      v-for="item in goodlists"
      :key='item.id'
      @click="toListinfo(item.id)"
    >
      <img
        :src="item.img_url"
        alt
      >
      <h1 class="title">{{item.img_title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <van-button
      type="danger"
      size="large"
      @click="getMore"
    >{{more}}</van-button>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  data: () => ({
    pageindex: 1,
    goodlists: []
  }),
  created() {
    this.getgoods();
  },
  methods: {
    async getgoods() {
      const {
        data: { status, message }
      } = await this.$http(`/api/getgoods?pageindex=${this.pageindex}`);

      if(status!==0) return Toast('数据加载失败')
      this.goodlists = this.goodlists.concat(message);
    },
    getMore() {
       if(this.pageindex<4){
          this.pageindex++;
          this.getgoods();
       }
    },
    toListinfo(id){
      this.$router.push('/home/GoodInfo?id='+id)
    }
  },
  computed:{
    more(){
      return  this.pageindex<4?'加载更多':'无更多数据'
    }
  }
};
</script>

<style lang="less">
.goodslist {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  // 两边对齐中间留空格
  justify-content: space-between;

  .goods-item {
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    // 默认x 轴
    // 设置为column 改为 y轴
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>