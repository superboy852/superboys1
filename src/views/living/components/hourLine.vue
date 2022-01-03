<template>
  <div class="w-100">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 400px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="hourIds" style="width: 100%; height: 400px;"></div>
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
        dhHour: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      this.getHour()
    },
    methods: {
      //带货小时榜
      async getHour() {
        var param = {
          "roomId": this.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/detail/chart', param)
        if (data != '') {
          this.dhHour = data
          var dhDate = [];
          var dhData = [];
          this.dhHour.forEach((item) => {
            item.crawl_time = tools.time_cycle(4, item.crawl_time)
            dhDate.push(item.crawl_time)
            dhData.push(item.efficiency_gmv)
          })

          var chartDom = document.getElementById('hourIds')
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
              bottom: 0,
              left: 0,
              right: 20,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: dhDate
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: dhData,
              name:'带货排名',
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
