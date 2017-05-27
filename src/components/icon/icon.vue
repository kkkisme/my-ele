<template>
  <span class="icon" :class="reverse?classMap[iconType]+'_reverse':classMap[iconType]">
  </span>
</template>

<script>
export default {
  props: {
    iconType: {
      type: Number
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus">
@import  "../../common/stylus/mixin.styl"

  .icon
    display inline-block
    width 16px
    height 16px
    margin-right 6px
    background-size cover
    background-repeat no-repeat
    vertical-align top
    &.decrease
      bg-image('decrease_1')
    &.decrease_reverse
      bg-image('decrease_3')
    &.discount
      bg-image('discount_1')
    &.discount_reverse
      bg-image('discount_3')
    &.special
      bg-image('special_1')
    &.special_reverse
      bg-image('special_3')
    &.invoice
      bg-image('invoice_1')
    &.invoice_reverse
      bg-image('invoice_3')
    &.guarantee
      bg-image('guarantee_1')
    &.guarantee_reverse
      bg-image('guarantee_3')

</style>
