<template>
  <header>
    <div class="content-wrap">
      <div class="avatar">
        <img height="64" width="64" :src="seller.avatar" :alt="seller.name">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <v-icon :iconType="seller.supports[0].type"></v-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetails">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDetails">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <div v-show="detailsShow" class="details">
        <div class="detail-content">
          <h1>{{seller.name}}</h1>
          <div class="star-wrap">
            <v-star :size="48" :score="seller.score"></v-star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item, index) in seller.supports" class="support-item">
              <v-icon :iconType="seller.supports[index].type"></v-icon>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetails"></i>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import star from '../star/star.vue'
import icon from '../icon/icon.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailsShow: false
    }
  },
  created() {

  },
  methods: {
    showDetails() {
      this.detailsShow = true
    },
    hideDetails() {
      this.detailsShow = false
    }
  },
  components: {
    'v-star': star,
    'v-icon': icon
  }
}
</script>

<style lang="stylus">
@import  "../../common/stylus/mixin.styl"

  header 
    position relative
    color #fff
    background-color rgba(7, 17, 27, 0.5)
    blur 10px
    overflow hidden
    .content-wrap
      padding 24px 12px 18px 24px
      position relative
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          overflow hidden
          border-radius 2px
      .content
        display inline-block
        vertical-align top
        margin-left 16px
        .title
          margin-top 2px
          font-size 16px
          font-weight 800
          line-height 18px
          .brand 
            display inline-block
            width 30px
            height 18px
            bg-image('brand')
            background-size cover
            background-repeat no-repeat
            vertical-align bottom

        .description
          font-size 12px
          font-weight 200
          line-height 12px
          margin-top 8px
          margin-bottom 10px
        .supports
          font-size 10px
          font-weight 200
          line-height 16px
      .supports-count
        position absolute
        display inline-block
        right 12px
        bottom 18px
        border-radius 12px
        padding 7px 8px
        background-color rgba(0, 0, 0, 0.2) 
        .count
          margin-right 2px
          font-size 10px
          line-height 12px
        i.icon-keyboard_arrow_right
          font-size 10px
          line-height 12px
    .bulletin-wrap
      position relative
      height 28px
      padding 0 22px 0 12px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        vertical-align top
        background-size cover
        background-repeat no-repeat
        margin-top 7px
      .bulletin-text
        font-size 10px
        line-height 28px
      i.icon-keyboard_arrow_right 
        font-size 10px
        position absolute
        right 12px
        top 9px
  .background
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index -100
    filter blur(10px)
  .details
    position fixed
    top 0
    left 0
    bottom 0
    z-index 999
    width 100%
    overflow auto
    animation-duration .4s !important
    background-color rgba(7, 17, 27, 0.8)
    backdrop-filter blur(10px)
    .detail-content
      padding-top 64px
      min-height 100%
      margin-bottom -64px
      &::after
        display block
        content ""
        height 64px
      h1
        text-align center
        font-size 16px
        font-weight 700
        line-height 16px
      .star-wrap
        margin-top 16px
        text-align center
      .title
        display flex
        width 80%
        margin 28px auto 24px
        justify-content center
        .line
          flex 1
          position relative
          top -6px
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
          padding 0 12px
          font-size 14px
          font-weight 700
      .supports
        width 80%
        margin 0 auto
        padding 0 12px
        .support-item
          margin-bottom 12px
          &.last-child
            margin-bottom 0
          .text
            font-size 12px
            line-height 16px
            vertical-align top
            color rgb(255, 255, 255)
            font-weight 200
    .bulletin
      width 80%
      margin auto
      .content
        padding 0 12px
        font-size 12px
        font-weight 200
        color rgb(255,255, 255)
        line-height 24px
        text-align justify
    .detail-close
      height 32px
      text-align center
      font-size 32px
</style>
