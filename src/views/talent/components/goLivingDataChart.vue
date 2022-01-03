<template>
  <div class="w-100 position-re">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div v-if="!show.dataShow" id="goLivingId" style="width: 100%; height: 300px;"></div>
    <slot></slot>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['authorId', 'startDate', 'endDate'],
    data() {
      return {
        liveHour: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      this.getVideoTime()
    },
    methods: {
      async getVideoTime() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/analysis', param)
        if (data != undefined) {
          this.show.dataShowLivesc = false
          this.liveHour = data.day_hours
          let dates = [];
          let hourList = [];
          this.liveHour.forEach((item) => {
            dates.push(item.hour)
            hourList.push(item.count)
          })

          var chartDom = document.getElementById('goLivingId')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color: ['#FFBD76'],
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top:40,
              right: 20,
              left: 0,
              bottom:0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: dates
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: hourList,
              type: 'bar',
              barWidth: 20
            }]
          })
        } else {
          this.show.dataShow = true
        }
      }
    }
  }
</script>

<style>
</style>
