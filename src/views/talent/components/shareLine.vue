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
    props: ['authorId', 'startDate', 'endDate'],
    data() {
      return {
        awemeAdd: [],
        awemeTotal: [],
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
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/aweme/multi/data/chart', param)
        if (data != undefined) {
          this.awemeAdd = data.add
          this.awemeTotal = data.total
          var dates = [];
          var shareAdd = [];
          var shareTotal = [];
          this.awemeAdd.forEach((item) => {
            shareAdd.push(item.total_share)
          })
          this.awemeTotal.forEach((item) => {
            item.time_node = tools.time_cycle(5, item.time_node)
            item.time_node = item.time_node.replace('-', '/')
            dates.push(item.time_node)
            shareTotal.push(item.total_share)
          })


          var chartDom = document.getElementById('shareIds')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color:['#FF7612','#5AE9C2'],
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
              itemHeight: 6,
              itemGap: 26,
            },
            grid: {
              top: 40,
              right: 20,
              left: 0,
              bottom: 0,
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
                    color: 'rgba(255,118,18,0.5)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,0.5)'
                  }])
                },
                data: shareAdd,
                name: '增量',
                type: 'line',
                smooth: true,
                symbol: "none",
              },
              {
                areaStyle: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(90,233,194,0.5)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,0.5)'
                  }])
                },
                data: shareTotal,
                name: '总量',
                type: 'line',
                smooth: true,
                symbol: "none",
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
