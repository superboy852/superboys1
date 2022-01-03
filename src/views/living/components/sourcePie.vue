<template>
  <div class="w-100 position-re">
    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
      v-if="show.dataShow"></no-data>
    <div id="sourceId" style="width: 100%; height: 350px;"></div>
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
        audienceSource: [],
        show: {
          dataShow: false
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.getSource()
      }, 200)
    },
    methods: {
      //获取数据
      async getSource() {
        var param = {
          "roomId": this.roomId
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansAnalysis', param)
        if (data != undefined) {
          console.log('dsasssdws', data)
          this.audienceSource = data.user_count_composition
          var a = Object.keys(this.audienceSource);
          var b = Object.values(this.audienceSource);
          var list = [];
          var obj = {};

          for (var i = 0; i < a.length; i++) {
            var item = a[i];
            if (item == "city") {
              a[i] = "同城";
            }
            if (item == "myFollow") {
              a[i] = "粉丝";
            }
            if (item == "other") {
              a[i] = "其他";
            }
            if (item == "videoDetail") {
              a[i] = "视频推荐";
            }
            var obj = {};
            for (var j = 0; j < b.length; j++) {
              if (i == j) {
                obj.name = a[i];
                obj.value = b[j];
                list.push(obj)
              }
            }
          }
          console.log('sdsdsddaa11', list)
          var chartDom = document.getElementById('sourceId')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color: ['#FF0000', '#FF7612', '#FFB093', '#EBD039'],
            tooltip: { //鼠标移动到图标的显示
              trigger: 'item',
              formatter: "{b} ({c}%)", //饼图内部百分比
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            legend: {
              show: true,
              bottom: 0,
              icon: 'roundRect',
              itemWidth: 20,
              itemHeight: 4,
              itemGap:54,
              textStyle: {
                fontSize: 12,
                color: '#999999',
              }
            },
            series: [{
              name: '观众来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: "{b} ({c}%)" //显示外层百分比
                },
                show: true,
                position: 'center',
                emphasis: {
                  show: true,
                  //fontWeight: 'bold'
                },
              },
              labelLine: { //指示线
                show: true
              },
              data: list, //数据源
            }],
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
