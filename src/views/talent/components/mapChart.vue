<template>
  <div class="w-100 position-re">
    <div ref="mapChart" style="width: 100%; height: 310px;"></div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    // props: ['roomId'],
    data() {
      return {
        room_id:'',
        option:''
      }
    },
    mounted() {
      // this.room_id = this.roomId
      var echarts = require('echarts');
      this.myChart = echarts.init(this.$refs.mapChart)
      this.option;
      this.getInit()
    },
    methods: {
      getInit(){
        let dataList = [{
            name: '北京',
            value: 1000
          },
          {
            name: '四川',
            value: 800
          },
          {
            name: '黑龙江',
            value: 2000
          },
          {
            name: '辽宁',
            value: 2000
          },
          {
            name: '吉林',
            value: 2000
          },
          {
            name: '福建',
            value: 800
          },
          {
            name: '内蒙古',
            value: 800
          },
          {
            name: '新疆',
            value: 800
          },
          {
            name: '西藏',
            value: 2000
          },
          {
            name: '青海',
            value: 2000
          },
          {
            name: '宁夏',
            value: 2000
          },
          {
            name: '甘肃',
            value: 800
          },
          {
            name: '云南',
            value: 800
          },
          {
            name: '贵州',
            value: 0
          },
          {
            name: '广西',
            value: 800
          },
          {
            name: '广东',
            value: 2000
          },
          {
            name: '海南',
            value: 0
          },
          {
            name: '香港',
            value: 2000
          },
          {
            name: '湖南',
            value: 800
          },
          {
            name: '湖北',
            value: 800
          },
          {
            name: '河南',
            value: 2000
          },
          {
            name: '河北',
            value: 800
          },
          {
            name: '江西',
            value: 0
          },
          {
            name: '浙江',
            value: 2000
          },
          {
            name: '上海',
            value: 800
          },
          {
            name: '安徽',
            value: 2000
          },
          {
            name: '重庆',
            value: 800
          },
          {
            name: '江苏',
            value: 0
          },
          {
            name: '山西',
            value: 800
          },
          {
            name: '陕西',
            value: 2000
          },
          {
            name: '山东',
            value: 500
          },
          {
            name: '台湾',
            value: 300
          },
          {
            name: '南海诸岛',
            value: 0
          },

        ]
        this.option = {
          tooltip: {
            trigger: 'item',
            // formatter: function(params) {
            //   return params.name + params.value; //自行定义formatter格式
            // },
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          visualMap: {
            min: 0,
            max: 3000,
            // left: 'left',
            // top: 'bottom',
            text: ['高', '低'], //取值范围的文字
            inRange: {
              color: ['#ffffff', '#ffffff', ] //取值范围的颜色
            },
            show: false //图注
          },
          geo: {
            map: 'china',
            roam: false, //不开启缩放和平移
            zoom: 1.23, //视角缩放比例
            label: {
              normal: {
                show: false,
                fontSize: '10',
                color: 'rgba(0,0,0,0.7)'
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.5)',
              },
              emphasis: {
                areaColor: '#F3B329', //鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            name: '地域占比',
            type: 'map',
            geoIndex: 0,
            data: dataList
          }]

        }
        // let mychart = this.$echarts.init(document.getElementById('regionCharts'))
        // mychart.setOption(option)
        this.$nextTick(() => {
          this.myChart.clear()
          this.myChart.setOption(this.option)
        })
      }
    }
  }
</script>

<style>
</style>
