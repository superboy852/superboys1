<template>
  <div class="w-100 position-re">
    <div v-if="show.dataShow">暂无数据</div>
    <div v-if="!show.dataShow" ref="pkIds" style="width: 100%; height: 80px;"></div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    //props: ['roomId'],

    data() {
      return {
        fansAnaly: [],
        roomId: '7024190180026239778',
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
          let lists = [];
          this.fansAnaly.forEach((item) => {
            lists.push({
              name: item.title + '岁',
              value: item.rate
            })
          })
          var myChart = this.$echarts.init(this.$refs.pkIds)
          // var chartDom = document.getElementById('pkIds')
          // var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color: ['#E60012','#FF3E34','#FFBD76','#FF6334'],
            tooltip: {
              trigger: 'item',
              // formatter: function(params,ticket,callback){
              //   return params['name']+" : "+params['value']+" ("+(params['value']/total*100).toFixed(2)+"%)";
              // },
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            series: [{
              //name:'年龄分布',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: true,
              label: {
                normal:{
                  show:false,
                  //formatter:"{b} ({d}%)"
                },
                show: true,
                position: 'center',
                emphasis: {
                    show: true,
                    //fontWeight: 'bold'
                },
              },
              //data:lists,
              data:[
                { value: 1048, name: '帽子' },
                { value: 735, name: '内衣' },
                { value: 580, name: '秋裤' },
                { value: 484, name: '袜子' },
              ],
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
