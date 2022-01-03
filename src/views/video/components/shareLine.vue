<template>
  <div class="w-100">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="shareIds" style="width: 100%; height: 350px;"></div>
    <slot></slot>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['awemeId', 'startDate', 'endDate'],
    data() {
      return {
        thumbAddCur: [],
        thumbTotalCur: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      this.getShare()
    },
    methods: {
      //转发
      async getShare() {
        var param = {
          "awemeId": this.awemeId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/video/detail/data/chart', param)
        if (data != undefined) {
          this.thumbAddCur = data.add
          this.thumbTotalCur = data.total
          var dates = [];
          var addShareCount = [];
          var totalShareCount = [];
          this.thumbAddCur.forEach((item) => {
            addShareCount.push(item.share_count)
          })
          this.thumbTotalCur.forEach((item) => {
            item.update_time = tools.time_cycle(5, item.update_time)
            item.update_time = item.update_time.replace('-', '.')
            dates.push(item.update_time)
            totalShareCount.push(item.share_count)
          })


          var chartDom = document.getElementById('shareIds')
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
            legend: {
              show: true,
              right: 0,
              icon: 'roundRect',
              itemWidth: 20,
              itemHeight: 4,
              itemGap:20,
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
              data: dates
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                areaStyle: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255,189,118,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                data: addShareCount,
                name: '增量',
                symbol: "none",
                type: 'line',
                smooth: true
              },
              {
                areaStyle: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255,189,118,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                data: totalShareCount,
                name: '总量',
                symbol: "none",
                type: 'line',
                smooth: true
              }
            ]
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
