<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './components/header/header'
  import {urlParse} from './common/js/util'

  const ERR_OR = 0

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    components: {
      VHeader: Header
    },
    created () {
      // this.$router.push('goods') // 默认跳转页面
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        if (res.body.errno === ERR_OR) {
          // this.seller = res.body.data
          this.seller = Object.assign({}, this.seller, res.body.data)
        }
      }, (err) => {
        console.log('no data error !', err)
      })
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/styles/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        line-height: 40px
        flex: 2
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
