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
      chartData: {
        type: Object
      },
      legendShow: { //图示显示
        type: Boolean,
        default: false
      },
      // chartColor:{
      //   type:Array,
      //   default:['rgba(210,196,136,0.8)' ,'rgba(0,231,221,0.8)']
      // },
      chartPadding:{
        type:Object,
        default(){
          return{
            top: 30,
            bottom: 50,
            left: 50,
            right: 20
          }
        }
      },
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
      setTimeout(() => {
        this.getInit()
      }, 200)
    },
    methods: {
      getInit() {
        var my = this
        let myChart = this.$echarts.init(this.$refs.chartId)
        myChart.setOption({
          color: ['rgba(210,196,136,0.8)' ,'rgba(0,231,221,0.8)'],
          tooltip: {
            trigger: 'axis',
			backgroundColor:'rgba(0,0,0,0.7)',
			textStyle:{
			  color:'#ffffff'
			},
			borderColor:'rgba(0,0,0,0.7)'
          },
          legend: {
            show: my.legendShow,
            formatter: '{name}',
            right: 10,
          },
          grid: {
            top: my.chartPadding.top,
            bottom: my.chartPadding.bottom,
            left: my.chartPadding.left,
            right: my.chartPadding.right
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: my.chartData.date
          },
          yAxis: {
            type: 'value',
          },
          series: my.chartData.data
        })
      }
    }
  }
</script>

<style>
</style>
