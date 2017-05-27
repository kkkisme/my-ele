<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/util.js'
const ERR_OK = 0
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(res => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus">
  .tab
    display flex
    border-bottom 1px solid rgba(7, 17, 17, 0.1)
    height 40px
    line-height 40px
    font-size 14px
    text-align center
    .tab-item
      flex 1
      a
        display block
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
