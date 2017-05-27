<template>
  <transition name="custom-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
  
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="current-price">￥{{food.price}}</span>
            <span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol :food="food" @addFood="addFood"></v-cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count===0" @click="addFirst($event)">加入购物车</div>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <div class="ratingselect-wrapper">
            <v-ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @on-selectType-change="changeSelectType" @on-onlyContent-change="changeOnlyContent"></v-ratingselect>
          </div>
          <div class="rating-content-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="showRatingItem(item.rateType, item.text)" v-for="item in food.ratings" class="rating-item">
                <div class="user">
                  <span class="user-name">{{item.username}}</span>
                  <img :src="item.avatar" width="12" height="12" class="user-avatar">
                </div>
                <div class="time">{{item.rateTime | formateDate}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up': item.rateType === 0,'icon-thumb_down': item.rateType === 1, }"></i>
                  <span>{{item.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings||food.ratings.length===0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'
import ratingselect from '../ratingSelect/ratingSelect.vue'
import {formatDate} from '../../common/js/date.js'
const All = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: All,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }

    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$set(this.food, 'count', 1)
      this.$parent.$refs.cart.drop(event.target)
    },
    addFood(target) {
      this.$parent.$refs.cart.drop(target)
    },
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
    showRatingItem(type, text) {
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
    formateDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    'v-cartcontrol': cartcontrol,
    'v-split': split,
    'v-ratingselect': ratingselect
  }
}
</script>

<style lang="stylus">
  gray = rgb(147, 153, 159)
  .food
    position fixed
    left 0
    right 0
    top 0
    bottom 48px
    z-index 9
    background #fff
    animation-duration: .4s !important
    .food-content
      .image-header
        width 100%
        height 100vw
        img
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 0px
          i
            display block
            padding 10px
            font-size 20px
            color #fff
      .content
        position relative
        margin-top 18px
        padding 0 18px 18px
        .title
          font-size 14px
          line-height 14px
          font-weight 700
          color rgb(7 ,17 ,27)
        .detail
          margin-top 8px
          font-size 0
          color rgb(147, 156, 159)
          line-height 10px
          .sell-count
            font-size 10px
            margin-right 12px
          .rating
            font-size 10px
        .price
          margin-top 18px
          .current-price
            font-size 14px
            line-height 24px
            font-weight 700
            color rgb(240, 20, 20)
          .old-price
            font-size 10px
            font-weight 700
            color rgb(147, 153, 159)
            line-height 24px
            text-decoration line-through
        .cartcontrol-wrapper
          position absolute
          right 12px
          bottom 12px
        .buy
          position absolute
          right 18px
          bottom 18px
          width 74px
          height 24px
          border-radius 12px
          font-size 10px
          line-height 24px
          color #fff
          background rgb(0, 160, 220)
          text-align center
      .info
        padding 18px
        .title
          font-size 14px
          line-height 14px
          color rgb(7, 17, 27)
        .text
          padding 6px 8px
          font-size 12px
          line-height 24px
          color rgb(77, 85, 93)
      .rating
        .title
          font-size 14px
          padding 18px 18px 0
          line-height 14px
          color rgb(7, 17, 27)
        .rating-content-wrapper
          padding 0 18px
          .no-ratings
            padding 16px
            color gray
            font-size 12px
          .rating-item
            padding 16px 0
            border-bottom 1px solid rgba(7, 17, 27, 0.1)
            .user
              float right
              color gray
              font-size 0
              .user-name
                display inline-block
                font-size 10px
                line-height 12px
                vertical-align top
              .user-avatar
                border-radius 50%
                margin-left 6px
                vertical-align top
            .time
              float left
              font-size 10px
              color gray
            .text
              clear both
              padding-top 6px
              font-size 0px
              i
                font-size 12px
                line-height 24px
                &.icon-thumb_up
                  color rgb(0, 160, 220)
                &.icon-thumb_down
                  color gray
              span
                font-size 12px
                color rgb(7, 17, 27)
                margin-left 4px
                line-height 16px
</style>
