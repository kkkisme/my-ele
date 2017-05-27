<template>
  <div class="ratingselect">
    <div class="rating-type">
      <div class="block all" :class="{'active': mySelectType===2}" @click="select(2,$event)">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="block positive" :class="{'active': mySelectType===0}" @click="select(0,$event)">{{desc.positive}}
        <span class="count">
          {{positives.length}}
        </span>
      </div>
      <div class="block negative" :class="{'active': mySelectType===1}" @click="select(1,$event)">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </div>
    </div>
    <div class="switch" :class="{'on':myOnlyContent}" @click="toggle($event)">
      <i class="icon-check_circle"></i>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent
    }
  },
  watch: {
    selectType(val) {
      this.mySelectType = val
    },
    mySelectType(val) {
      this.$emit('on-selectType-change', val)
    },
    onlyContent(val) {
      this.myOnlyContent = val
    },
    myOnlyContent(val) {
      this.$emit('on-onlyContent-change', val)
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.mySelectType = type
    },
    toggle() {
      if (!event._constructed) {
        return
      }
      this.myOnlyContent = !this.myOnlyContent
    }
  }
}
</script>

<style lang="stylus">
.ratingselect
  .rating-type
    font-size 0
    padding 18px 0
    margin 0 18px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .block
      display inline-block
      font-size 12px
      line-height 16px
      padding 8px 12px
      border-radius 2px
      margin-right 8px
      color rgb(77, 85 ,93)
      &.all
        background #ccecf8
      &.positive
        background #ccecf8
      &.negative
        background #e9ebec
        &.active
          background #4d555d
      &.active
        color #fff
        background rgb(0, 160, 220)
      .count
        display inline-block
        font-size 8px
        line-height 16px
        margin-left 2px
  .switch
    padding 12px 18px
    font-size 0
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    &.on 
      .icon-check_circle
        color #00c850
    .icon-check_circle
      font-size 24px
      margin-right 4px
    .text
      font-size 12px
    .text
    .icon-check_circle
      color rgb(147, 153, 159)
      display inline-block
      line-height 24px
      vertical-align top
</style>

