<template>
  <div class="w-100 position-re">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 260px;"
      v-if="show.dataShow"></no-data>
    <div id="ageTwo" style="width: 100%; height: 260px;"></div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['roomId'],
    data() {
      return {
        fansAnaly: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.getAge()
      }, 200)
    },
    methods: {
      //获取数据
      async getAge() {
        var param = {
          "roomId": this.roomId
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansAnalysis', param)
        if (data != undefined) {
          this.fansAnaly = data.age
          let Xdata = [];
          let Ydata = []
          this.fansAnaly.forEach((item) => {
            // lists.push({
            //   name: item.title + '岁',
            //   value: item.rate
            // })
            Xdata.push(item.title + '岁')
            Ydata.push(item.rate)
          })
          var chartDom = document.getElementById('ageTwo')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              formatter: '{a} <br/>{b} : {c}%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 25,
              bottom: 3,
              left: 0,
              right: 0,
              containLabel: true,
            },
            xAxis: [{
              type: 'category',
              data: Xdata,
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '年龄占比',
              type: 'bar',
              itemStyle: {
                color: "#FF7612",
              },
              barWidth: '60%',
              data: Ydata
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
