<template>
  <div class="main">
    <div class="rdx-bg-color w-100 top-i">
      <Top />
    </div>
    <div class="content">
      <div class="content-left">
        <div>
          <MenuLeft />
        </div>
      </div>
      <div class="content-right">
        <keep-alive>
           <router-view v-if="$route.meta.keepAlive" />
         </keep-alive>
         <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
    <top-up></top-up>
  </div>
</template>

<script>
  import topUp from '@/components/toUp.vue'
  import {
    menuShrinkWidth,
    menuEunfoldWidth
  } from '@/config'
  import Top from './components/Top'
  import MenuLeft from './components/MenuLeft'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    components: {
      Top,topUp,
      MenuLeft
    },
    computed: {
      containWidth() {
        return `calc(100vw - ${this.collapsed ? menuShrinkWidth : menuEunfoldWidth}px)`
      },
      ...mapGetters(['collapsed'])
    },
    created() {
      // if(document.body.clientWidth < 1650){
      //   this.saveCollapsed(true)
      // }
    },
    methods: {
      ...mapActions(['saveCollapsed', 'saveToken', 'saveUser', 'deleteToken', 'deleteUser', 'saveTokenOk']),
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    margin: 0px auto;
    width: 100%;
    height: auto;
    background-color: $rdx-bg-grey;
    .top-i{margin: 0px auto;}
    .content {
      max-width: 1620px; margin: 20px auto 0px auto;
      display: flex;
      .content-left{width: 158px; margin-right: 22px;}
      .content-right{
        width: calc(100% - 180px);
        min-width: 1240px;
        overflow: hidden;
      }
    }
  }
</style>
