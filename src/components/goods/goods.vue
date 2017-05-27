<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{current: index===currentIndex}" @click="selectMenu(index,$event)">
          <span class="text">
            <v-icon v-if="item.type>0" :style="{marginRight:'2px',width:'12px',height:'12px'}" :iconType="item.type" :reverse="true"></v-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="current-price">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" @addFood="_drop"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-cart ref="cart" :seller="seller" :selectFoods="selectFoods"></v-cart>
    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import icon from 'components/icon/icon.vue'
import cart from 'components/cart/cart.vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import food from 'components/food/food.vue'
const ERR_NO = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
    this.$http.get('api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_NO) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((goods) => {
        goods.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }

      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    },
    _drop(el) {
      this.$nextTick(() => {
        this.$refs.cart.drop(el)
      })
    }
  },
  components: {
    'v-icon': icon,
    'v-cart': cart,
    'v-cartcontrol': cartcontrol,
    'v-food': food
  }
}
</script>

<style lang="stylus">
  .goods
    display flex
    position absolute
    top 176px
    bottom 48px
    left 0
    right 0
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      background #f3f5f7
      .menu-item
        display flex
        align-items center
        position relative
        height 54px
        font-size 12px
        line-height 14px
        padding 12px
        &.current
          position relative
          margin-top -1px
          background #fff
          font-weight 700
          &::after
            display none
        &::after
          display block
          position absolute
          bottom 0
          left 50%
          margin-left -28px
          content ''
          width 56px
          height 1px
          background rgba(7 ,17, 27, 0.1)
    .foods-wrapper
      flex 1
      .food-list
        .title
          height 26px
          line-height 26px
          font-size 12px
          padding-left 14px
          background #f3f5f7
          color rgb(147, 153, 159)
          border-left 3px solid #d9dde1
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
          border-bottom 1px solid rgba(7, 17, 27 ,0.1)
          &:last-child
            border-bottom none
          .icon
            flex 0 0 57px
            width 57px
            height 57px
            margin-right 10px
          .content
            flex 1
            position relative
            .name
              margin-top 2px
              font-size 14px
              color rgb(7, 17, 27)
              line-height 14px
            .desc
            .extra
              margin-top 8px
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
              .sell-count
                margin-right 12px
            .price
              line-height 24px
              font-weight 700
              .current-price
                font-size 14px
                color rgb(240, 20, 20)
              .old-price
                font-size 10px
                color rgb(147, 153, 159)
                text-decoration line-through
            .cartcontrol-wrapper
              position absolute
              right 0
              bottom -10px   
</style>
