<template>
  <div class="w-100">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="fansUpDataIds" style="width: 100%; height: 350px;"></div>
    <slot></slot>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  import * as tools from '@/common/tools.js';
  export default {
    components: {
      noData,
    },
    props: ['roomId'],
    data() {
      return {
        fansTrend: [],
        FansIncr: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      this.getFansUp()
    },
    methods: {
      //粉丝团分析
      async getFansUp() {
        var param = {
          "roomId": this.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansClubAnalysis', param)
        if (data != '') {
          this.fansTrend = data
          this.FansIncr = data.fans_incr_analysis
          this.fansTrend.user_peak_time = tools.time_cycle(4, this.fansTrend.user_peak_time)
          var listDate = [];
          var listNum = [];
          this.FansIncr.forEach((item) => {
            item.crawl_time = tools.time_cycle(4, item.crawl_time)
            listDate.push(item.crawl_time)
            listNum.push(item.now_fans_count)
          })

          var chartDom = document.getElementById('fansUpDataIds')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 50,
              bottom: 3,
              left: 0,
              right: 20,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: listDate
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              itemStyle: {
                color: "#FF7612",
              },
              data: listNum,
              symbol: "none",
              type: 'line',
              smooth: true
            }]
          })
        } else {
          this.show.dataShow = true
        }
      },
    }
  }
</script>

<style>
</style>
