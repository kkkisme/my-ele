<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="min-price">
            <h2>起送价</h2>
            <p class="content">
              <span class="big">{{seller.minPrice}}</span>元</p>
          </li>
          <li class="delivery-price">
            <h2>商家配送</h2>
            <p class="content">
              <span class="big">{{seller.deliveryPrice}}</span>元</p>
          </li>
          <li class="delivery-time">
            <h2>平均配送时间</h2>
            <p class="content">
              <span class="big">{{seller.deliveryTime}}</span>分钟</p>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <i class="icon-favorite" :class="{'active': favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul class="supports">
        <li v-for="item in seller.supports" class="supports-item">
          <v-icon :iconType="item.type"></v-icon>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <v-split></v-split>
      <div class="seller-pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="pic-wrapper">
          <ul class="pic-list" ref="pic-list">
            <li v-for="item in seller.pics" class="pic-item">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-infos">
        <h1 class="title">商家信息</h1>
        <ul class="infos-content">
          <li v-for="item in seller.infos" class="info-item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from 'components/star/star.vue'
import split from 'components/split/split.vue'
import icon from 'components/icon/icon.vue'
import {saveToLocal, loadFromLocal} from '../../common/js/store.js'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  created() {
    this._initScroll()
  },
  watch: {
    seller() {
      this._initScroll()
    }
  },
  mounted() {
    if (this.seller.pics) {
      let picWidth = 120
      let margin = 6
      let width = (picWidth + margin) * this.seller.pics.length
      this.$refs['pic-list'].style.width = width + 'px'
      this.$nextTick(() => {
        this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      })
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  components: {
    'v-star': star,
    'v-split': split,
    'v-icon': icon
  }
}
</script>

<style lang="stylus">
  .seller
    position absolute
    top 176px
    bottom 0
    width 100%
    overflow hidden 
    .seller-content
      .overview
        position relative
        padding 18px
        .title
          margin-bottom 8px
          font-size 14px
          line-height 14px
          color rgb(7, 17, 27)
        .desc
          font-size 0
          padding-bottom 18px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .star
            vertical-align top
            height 18px
            line-height 18px
          .text
            display inline-block
            font-size 10px
            line-height 18px
            color rgb(77, 85, 93)
            &:first-of-type
              margin 0 12px 0 8px
        .remark
          display flex
          margin-top 18px
          li
            flex 1
            text-align center
            h2
              margin-bottom 4px
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .content
              font-size 10px
              line-height 24px
              color rgb(7, 17, 27)
              font-weight 200
              .big
                font-size 24px
          .delivery-price
            border-left 1px solid rgba(7, 17, 27, 0.1)
            border-right 1px solid rgba(7, 17, 27, 0.1)
        .favorite
          position absolute
          top 18px
          right 18px
          width 50px
          text-align center
          i
            display block
            margin-bottom 4px
            font-size 24px
            line-height 24px
            color #d4d6d6
            &.active
              color rgb(240, 20, 20)
          .text
            font-size 10px
            line-height 10px
            color rgb(77, 85, 93)
      .bulletin
        padding 0 18px
        .title
          padding 18px 0 8px
        .content
          padding 0 12px 16px
          font-size 12px
          line-height 24px
          color rgb(240 ,20, 20)
          text-align justify
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .supports
        padding 0 18px
        .supports-item
          padding 16px 12px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          font-size 0
          &:last-child
            border-bottom none
          .icon
            vertical-align top
          .text
            display inline-block
            font-size 10px
            line-height 16px
            font-weight 200
            color rgb(147, 153, 159)
      .seller-pics
        padding 0 18px
        .title
          padding 18px 0 8px
        .pic-wrapper
          width 100%
          overflow hidden
          white-space nowrap
          .pic-list
            .pic-item
              display inline-block
              margin-right 6px
              margin-bottom 18px
              .img
                vertical-align top
              &:last-child
                margin-right 0

      .seller-infos
         padding 0 18px
         .title
          padding 18px 0 8px
        .infos-content
          .info-item
            padding 16px 12px
            font-size 12px
            line-height 16px
            font-weight 200
            color rgb(7, 17, 27)
            border-top 1px solid rgba(7, 17, 27, 0.1)
</style>
