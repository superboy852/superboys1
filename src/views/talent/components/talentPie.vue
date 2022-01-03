<template>
  <div class="w-100 position-re">
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
      formatter: {
        type: String,
        default: ''
      },
      labelShow: { //显示标注
        type: Boolean,
        default: true
      },
      legendShow: { //图示显示
        type: Boolean,
        default: false
      },
      chartData: {
        type: Object
      },
      chartColor:{
        type:String,
        default:"#333333"
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
    mounted() {

      setTimeout(()=>{
        this.getInit()
      },2000)
    },
    methods: {
      getInit() {
        this.$nextTick(() => {
          var my = this
          var myChart = this.$echarts.init(this.$refs.chartId)
          myChart.setOption({
            color: my.chartData.color,
            title: {
              text: my.chartData.title,
              left: 'center',
              top: 'center',
              textStyle:{
                color:my.chartColor,
                fontSize:'16'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}:{d}%',


              backgroundColor:'rgba(0,0,0,0.7)',
              textStyle:{
                color:'#ffffff'
              },
              borderColor:'rgba(0,0,0,0.7)'
            },
            legend: {
              show: my.legendShow,
              top: 'bottom',
            },
            series: [{
              name: my.chartData.name,
              type: 'pie',
              radius: ['50%', '76%'],
              avoidLabelOverlap: false,
              label: {
                show: my.labelShow,
                // padding: [20,0,10,0]
              },
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: '#fff',
              //   borderWidth: 2
              // },
              data: my.chartData.data
            }]
          })
        })

      }
    }
  }
</script>

<style>
</style>
