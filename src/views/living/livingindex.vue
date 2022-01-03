<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="直播小时榜" name="hour" :key="'hour'">
        <livingho v-if="liv1"></livingho>
      </el-tab-pane>
      <el-tab-pane label="带货达人榜" name="delivery" :key="'delivery'">
        <livingdel v-if="liv2"></livingdel>
      </el-tab-pane>
      <el-tab-pane label="今日直播带货量" name="today" :key="'today'">
        <livingto v-if="liv3"></livingto>
      </el-tab-pane>
      <el-tab-pane label="直播商品榜" name="goods" :key="'goods'">
        <livingo v-if="liv4"></livingo>
      </el-tab-pane>
      <el-tab-pane label="直播分享榜" name="second" :key="'second'">
        <livingsh v-if="liv5"></livingsh>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import livinghour from '@/views/living/livinghour'
import livingdelivery from '@/views/living/livingdelivery'
import livingtoday from '@/views/living/livingtoday'
import livingoods from '@/views/living/livingoods'
import livingshare from '@/views/living/livingshare'
export default {
  name: 'livingindex',
  components: {
    livingho: livinghour,
    livingdel: livingdelivery,
    livingto: livingtoday,
    livingo: livingoods,
    livingsh: livingshare
  },
  data() {
    return {
      activeName: 'hour',
      liv1: true,
      liv2: false,
      liv3: false,
      liv4: false,
      liv5: false
    }
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      if (tab.name === 'hour') {
        this.liv1 = true
        this.liv2 = false
        this.liv3 = false
        this.liv4 = false
        this.liv5 = false
      } else if (tab.name === 'delivery') {
        this.liv1 = false
        this.liv2 = true
        this.liv3 = false
        this.liv4 = false
        this.liv5 = false
      } else if (tab.name === 'today') {
        this.liv1 = false
        this.liv2 = false
        this.liv3 = true
        this.liv4 = false
        this.liv5 = false
      } else if (tab.name === 'goods') {
        this.liv1 = false
        this.liv2 = false
        this.liv3 = false
        this.liv4 = true
        this.liv5 = false
      } else if (tab.name === 'second') {
        this.liv1 = false
        this.liv2 = false
        this.liv3 = false
        this.liv4 = false
        this.liv5 = true
      }
    }
  }
}
</script>
