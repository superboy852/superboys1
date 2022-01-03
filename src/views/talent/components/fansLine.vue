<template>
  <div class="w-100">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="fansIds" style="width: 100%; height: 350px;"></div>
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
    props: ['authorId', 'startDate', 'endDate'],
    data() {
      return {
        fansClubAdd: [],
        fansClubTotal: [],
        show: {
          dataShow: false
        },
      }
    },
    mounted() {
      this.getFans()
    },
    methods: {
      //粉丝团分析
      async getFans() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/fans/club/data/chart', param)
        if (data != undefined) {
          this.fansClubAdd = data.add
          this.fansClubTotal = data.total
          let dates = [];
          let fansAdd = [];
          let fansTotal = [];
          this.fansClubAdd.forEach((item) => {
            //item.follower_count = tools.numberVerify(item.follower_count)
            fansAdd.push(item.follower_count)
          })
          this.fansClubTotal.forEach((item) => {
            item.date = tools.time_cycle(5, item.date)
            item.date = item.date.replace('-', '/')
            //item.follower_count = tools.numberVerify(item.follower_count)
            dates.push(item.date)
            fansTotal.push(item.follower_count)
          })


          var chartDom = document.getElementById('fansIds')
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
              bottom:0,
              itemGap:30,
              icon: 'roundRect',
              itemWidth: 20,
              itemHeight: 4,
            },
            grid: {
              top:40,
              right: 20,
              left: 0,
              bottom:40,
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
                data: fansAdd,
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
                data: fansTotal,
                name: '总量',
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
