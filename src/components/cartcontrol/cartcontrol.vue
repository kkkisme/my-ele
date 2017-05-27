<template>
  <div class="cartcontrol">
    <transition name="move">
      <div v-show="food.count>0" class="cart-remove" @click.stop="removeCount($event)">
        <i class="icon-remove_circle_outline rotate-inner"></i>
      </div>
    </transition>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCount($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
// import Vue from 'Vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    addCount(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('addFood', event.target)
    },
    removeCount(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus">
  .cartcontrol
    font-size 0
    .cart-add
      display inline-block
      padding 6px
      color rgb(0, 160, 220)
      i
        font-size 24px
        line-height 24px
        height 24px
    .cart-remove
      display inline-block
      padding 6px
      color rgb(0, 160, 220)
      transition all .4s ease
      i
        font-size 24px
        line-height 24px
        height 24px
      .rotate-inner
        display inline-block
        transition all .4s ease
      &.move-enter-active
        opacity 1
        .rotate-inner
          transform rotate(0)
      &.move-enter
        opacity 0
        transform translate3D(24px, 0, 0)
        .rotate-inner
          transform rotate(180deg)
      &.move-leave-active
        opacity 0
        transition all .4s ease
        transform translate3D(24px, 0, 0)
        .rotate-inner
          transform rotate(180deg)
      &.move-leave
        .rotate-inner
          transform rotate(0)
    .cart-count
      display inline-block
      text-align center
      width 12px
      vertical-align top
      padding-top 6px
      line-height 24px
      font-size 10px
      color #93999f;
</style>
