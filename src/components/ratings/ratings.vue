<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content-wrapper">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="service-score">
            <div class="title">服务态度</div>
            <v-star :size="36" :score="seller.serviceScore" :style="{}"></v-star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="food-score">
            <div class="title">商品评分</div>
            <v-star :size="36" :score="seller.foodScore" :style="{}"></v-star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-time">
            <div class="title">商品评分</div>
            <div class="time">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingSelect :ratings="ratings" @on-selectType-change="changeSelectType" @on-onlyContent-change="changeOnlyContent"></v-ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="showItem(item.rateType, item.text)" v-for="item in ratings" class="rating-item">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="user-name">{{item.username}}</div>
              <div class="rate-time">{{item.rateTime | formatDate}}</div>
              <v-star :size="24" :score="item.score"></v-star>
              <span class="delivery-time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              <p class="text">{{item.text}}</p>
              <div class="recommend" v-show="item.recommend.length">
                 <i :class="{'icon-thumb_up': item.rateType === 0,'icon-thumb_down': item.rateType === 1, }"></i>
                   <span v-for="good in item.recommend" class="recommend-food">{{good}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  
  </div>
</template>

<script>
import star from '../star/star.vue'
import split from 'components/split/split.vue'
import ratingSelect from 'components/ratingSelect/ratingSelect'
import BScroll from 'better-scroll'
import { formatDate } from '../../common/js/date.js'
const ERR_NO = 0
const All = 2
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      onlyContent: false,
      selectType: All
    }
  },
  created() {
    this.$http.get('api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_NO) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  computed: {
  },
  methods: {
    changeSelectType(val) {
      this.selectType = val
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    changeOnlyContent(val) {
      this.onlyContent = val
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    showItem(type, text) {
      if (this.onlyContent && !text) {
        return false
      }

      if (this.selectType === All) {
        return true
      } else {
        return this.selectType === type
      }
    }
  },
  filters: {
    formatDate(time) {
      return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    'v-star': star,
    'v-split': split,
    'v-ratingSelect': ratingSelect
  }
}
</script>

<style lang="stylus">
  .ratings
    position absolute
    top 176px
    bottom 0
    width 100%
    overflow hidden
    .ratings-content-wrapper
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 percentage(11/30)
          width percentage(11/30)
          text-align center
          border-right 1px solid rgba(7 ,17, 27, 0.1)
          .score
            font-size 24px
            line-height 28px
            color rgb(255, 153, 0)
          .title
            margin-top 6px
            font-size 12px
            line-height 12px
            color rgb(7, 17, 27)
          .rank-rate
            margin 8px 0 6px
            font-size 10px
            line-height 10px
            color rgb(147, 153 ,159)
        .overview-right
          flex 1
          .service-score
          .food-score
            display flex
            margin-bottom 8px
            justify-content center
            .title
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .star
              margin 0 12px
            .score
              font-size 12px
              line-height 18px
              color rgb(255, 153, 0)
          .delivery-time
            display flex
            justify-content center
            .title
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .time
              flex 0 0 128px
              width 128px
              margin-left 12px
              font-size 12px
              line-height 18px
              color rgb(147, 153, 159)
      .rating-wrapper
        padding 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .avatar
            flex 0 0 28px
            margin-right 12px
            img
              vertical-align middle
              border-radius 50%
          .content
            position relative
            flex 1
            font-size 0
            .user-name
              margin-bottom 4px
              font-size 10px
              line-height 12px
              color rgb(7, 17, 27)
            .rate-time
              position absolute
              top 0 
              right 0
              font-size 10px
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)
            .delivery-time
              margin-left 6px
              font-size 10px
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)
            .text
              margin-top 6px
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .recommend
              margin-top 8px
              i
                font-size 12px
                line-height 16px
                margin-right 8px
                &.icon-thumb_up
                  color rgb(0, 160, 220)
                &.icon-thumb_down
                  color gray
              .recommend-food
                display inline-block
                padding 0 6px
                margin-right 8px
                margin-bottom 4px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 1px
                font-size 9px
                line-height 16px
                color rgb(147, 153, 159)
</style>
