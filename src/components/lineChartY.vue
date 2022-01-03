<template>
  <div class="w-100">
    <div ref="chartId" :style="'width: ' + chartWidth.width + '; height:' + chartWidth.height"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      chartId: {
        type: String,
        default: '0'
      },
      chartData: {},
      chartWidth: {
        type: Object,
        default () {
          return {
            width: "100%",
            height: "350px"
          }
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
      setTimeout((res)=>{
        this.getInit()
      },2000)
    },
    methods: {
      getInit() {
        var my = this
        var myChart = this.$echarts.init(this.$refs.chartId)
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
			backgroundColor:'rgba(0,0,0,0.7)',
			textStyle:{
			  color:'#ffffff'
			},
			borderColor:'rgba(0,0,0,0.7)'
          },
          legend: {
            top:'0',
            right:'50'
          },
          grid: {
            top: 50,
            bottom: 30,
            left: 70,
            right: 70
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.chartData.date,
          },
          yAxis: [{
            type: 'value'
          }, {
            type: 'value'
          }],
          series: this.chartData.data,
        })
      }
    }
  }
</script>

<style>
</style>
