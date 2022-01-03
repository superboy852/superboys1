<template>
  <div class="navigation_bar">
    <div v-for="(name, url) in tabs" :key="url" @click="handleClick(url)" :class="{ fontchoose: activeTab === url }">
      <span>{{name.substr(0,1)}}</span>
      <span :class="{ borderchoose: activeTab === url }">{{name.slice(1, name.length-1)}}</span>
      <span>{{name.substr(name.length -1, 1)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '',
      tabs: {
        '/living/living_hour': '直播小时榜',
        '/living/living_delivery': '带货达人榜',
        '/living/living_today': '今日直播带货量',
        '/living/living_goods': '直播商品榜',
        '/living/living_share': '直播分享榜'
      }
    }
  },
  methods: {
    handleClick(url) {
      this.activeTab = url
      this.$router.push({ path: url })
    }
  },
  mounted() {
    const path = this.$route.path
    if (Object.keys(this.tabs).includes(path)) {
      this.activeTab = path
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation_bar {
  display: flex;
  flex-direction: row;
  //  justify-content: space-around;
  margin-bottom: 20px;
}
.navigation_bar > div {
  display: inline-block;
  //width: 180px;
  height: 40px;
  color: $rdx-content-color;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-right: 70px;
}
.navigation_bar > div:hover {
  color: $rdx-primary;
}
.navigation_bar > div > span {
  display: inline-block;
  height: 34px;
}
.fontchoose {
  color: $rdx-primary !important;
  font-weight: 800 !important;
}
.borderchoose {
  border-bottom: 4px solid $rdx-primary;
  border-radius: 2px;
}
</style>
