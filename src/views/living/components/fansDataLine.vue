<template>
  <div class="w-100">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="fansDataIds" style="width: 100%; height: 350px;"></div>
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
        fansClubData: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      this.getFans()
    },
    methods: {
      //粉丝团分析
      async getFans() {
        var param = {
          "roomId": this.roomId,
          "testData": 'T'
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansClubAnalysis', param)
        if (data.fans_club_analysis != '') {
          this.fansTrend = data
          this.fansTrend.user_peak_time = tools.time_cycle(4, this.fansTrend.user_peak_time)
          this.fansClubData = this.fansTrend.fans_club_analysis
          var listDate = [];
          var listNum = [];
          this.fansClubData.forEach((item) => {
            item.crawl_time = tools.time_cycle(4, item.crawl_time)
            listDate.push(item.crawl_time)
            listNum.push(item.today_new_fans_count)
          })

          var chartDom = document.getElementById('fansDataIds')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color: ['rgba(210,196,136,0.8)', 'rgba(0,231,221,0.8)'],
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
              data: listNum,
              symbol: "none",
              itemStyle: {
                color: "#FF7612",
              },
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
