<template>
  <div>
    <van-popup  v-model="showBase "  position="bottom"  :overlay="true">
      <div class="cart">
        <div
          class="cart_group"
          v-for="item in car"
          :key=item.id
        >
          <div class="cart_s">
            <van-switch
              v-model="item.isSelect"
              size="20px"
              active-color="#07c160"
              inactive-color="#f44"
              class="switch"
              @change='change'
            />
          </div>
          <div class="cart_p">
            <van-card
              :num=item.count
              :price=item.price
              :title=item.title
              :thumb=item.src
            />
            <div slot="desc">
              <van-stepper
                v-model=item.count
                integer
              />
            </div>
            <a
              href=""
              @click.prevent="del(item.id)"
              class="del"
            >删除</a>
          </div>
        </div>

        <van-submit-bar
          :price='$store.getters.getAllprice'
          button-text="提交订单"
        >
          <van-checkbox
            v-model="checked"
            checked-color="#07c160"
            @click='toggle'
          >全选</van-checkbox>

        </van-submit-bar>

      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    checked: true,
    showBase: false,
   
  }),
  created() {
    this.checked = this.$store.getters.getStatus;
  },
  methods: {
    del(id) {
      this.car.some((item, i) => {
        if (item.id == id) {
          this.car.splice(i, 1);
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(this.car));
    },
    change() {
      this.checked = true;
      this.car.forEach(item => {
        if (!item.isSelect) {
          this.checked = false;
        }
      });
    },
    toggle() {
      if (this.checked) {
        this.car.forEach(item => {
          item.isSelect = true;
        });
      } else {
        this.car.forEach(item => {
          item.isSelect = false;
        });
      }
    },
    show() {
      this.showBase = true;
    }
  },
  computed: {
    ...mapState(["car"])
  }
};
</script>

<style lang="less" scoped>
.cart {
  margin-bottom: 50px;
  .cart_group {
    display: flex;
    justify-content: space-around;
    padding-left: 5px;
    margin-bottom: 5px;
    .cart_s {
      flex: 1;
      margin-top: 40px;
    }
    .cart_p {
      flex: 7;
      display: flex;
      padding-right: 10px;

      background-color: #fafafa;
      .van-stepper__minus,
      .van-stepper__plus {
        width: 15px;
      }
      .van-card__thumb {
        margin-right: 0;
      }
      .van-card__price {
        margin-top: 15px;
        font-size: 14px;
      }
      .van-card__title {
        margin-top: 5px;
      }
      .van-card__num {
        margin-top: 40px;

        font-size: 12px;
      }
      .van-stepper,
      .del {
        margin-top: 30px;
      }
      .del {
        margin-left: 10px;
        color: blue;
      }
    }
  }
  // .van-submit-bar {
  //   position: relative;
  //   bottom: 55px;
  //   left: 0;
  // }
}
</style>