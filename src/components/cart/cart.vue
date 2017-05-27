<template>
  <div>
    <div class="cart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="cart-icon-wrapper">
            <div class="cart-icon" :class="{highlight: totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
            </div>
            <div v-if="totalCount>0" class="count">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="totalPrice >= seller.minPrice ? 'enough' : 'not-enough'" @click.stop="pay">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div v-show="showList" class="cart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods" class="food">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price*food.count}}</span>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" @addFood="drop"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="showList" @click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
export default {
  props: {
    seller: {
      type: Object
    },
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropingBalls: [],
      fold: true
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hideList() {
      this.fold = true
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropingBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    droping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let ball = this.dropingBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay() {
      if (this.totalPrice < this.seller.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}元`)
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0
      this.selectFoods.forEach((food) => {
        totalPrice += food.price * food.count
      })
      return totalPrice
    },
    totalCount() {
      let totalCount = 0
      this.selectFoods.forEach((food) => {
        totalCount += food.count
      })
      return totalCount
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.seller.minPrice}元起送`
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    showList() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    'v-cartcontrol': cartcontrol
  }
}
</script>
<style lang="stylus">
  .cart
    position fixed
    left 0
    right 0
    bottom 0
    height 48px
    z-index 99
    .content
      display flex
      .content-left
        flex 1
        font-size 0
        background #141d27
        .cart-icon-wrapper
          position relative
          top -12px
          display inline-block
          width 56px
          height 56px
          margin-left 12px
          border-radius 50%
          background #141d27
          .cart-icon
            display inline-block
            width 44px
            height 44px
            margin 6px
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            i.icon-shopping_cart
              font-size 24px
              line-height 44px
              color rgba(255, 255, 255, 0.4)
              &.highlight
                color #fff
          .count
            position absolute
            top 0 
            right 0
            width 24px
            height 16px
            border-radius 16px
            font-size 9px
            line-height 16px
            font-weight 700
            background #f01414
            color #fff
            text-align center
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4) 
        .price
          display inline-block
          margin-left 18px
          margin-top 12px
          padding-right 12px
          vertical-align top
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          line-height 24px
          color rgba(255, 255, 255, 0.4)
          &.highlight
            color #fff
        .desc
          display inline-block
          font-size 12px
          line-height 24px
          margin 12px
          vertical-align top
          color rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          font-size 12px
          font-weight 700
          line-height 48px
          color rgba(255, 255, 255, 0.4)
          background #2b353e
          text-align center
          &.not-enough
            background #2b353e
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background #00a0dc
          transition all .4s linear
    .cart-list
      position absolute
      z-index -1
      width 100%
      left 0
      top 0
      transform translate3d(0, -100%, 0)
      transition all .4s ease
      &.fold-enter-active
      &.fold-leave
        transform translate3d(0, -100%, 0)
      &.fold-enter
      &.fold-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 2px solid rgba(7, 17, 27, .1)
        .title
          float left
          font-size 14px
          font-weight 200
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        background #fff
        padding 0 18px
        max-height 217px
        overflow hidden
        .food
          position relative
          padding 12px 0
          height 48px
          &::after
            content ""
            position absolute
            display block
            width 100%
            height 1px
            bottom 0
            background rgba(7, 17, 27, 0.1)
          .name
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            line-height 24px
          .cartcontrol-wrapper
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
  .list-mask
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    z-index 10
    background rgba(7, 17, 27, 0.6)
    backdrop-filter blur(10px)
    transition all .4s linear
    &.fade-enter
    &.fade-leave-active
      background rgba(7, 17, 27, 0)
      opacity 0
    &.fade-enter-active
    &.fade-leave
      background rgba(7, 17, 27, 0.6)
      opacity 1
</style>
