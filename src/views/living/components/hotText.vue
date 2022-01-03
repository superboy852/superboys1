<template>
  <div class="w-100 position-re flex justify-between">
    <div class="flex rdx-flex-1 flex-direction">
      <span class="rdx-font-14">弹幕热词</span>
      <div class="flex rdx-m-t-46 justify-end">
        <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">弹幕总数</span>
        <span class="rdx-font-22">{{getData.hotTexts.barrage_count}}</span>
        <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 40px;">弹幕人数</span>
        <span class="rdx-font-22">{{getData.hotTexts.barrage_author_count}}</span>
        <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 40px;">观众互动率</span>
        <span class="rdx-font-22">{{getData.hotTexts.interaction_percent}}</span>
      </div>
      <!--    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
            style=" height: 300px;" v-if="show.dataShowE"></no-data> -->
      <div ref="hotText" style="width: 100%; height: 300px;"></div>
    </div>
    <div class="flex flex-direction rdx-flex-1 rdx-p-l-40">
      <span class="rdx-font-14">全部弹幕</span>
      <el-table :data="getData.dmData" :show-header="hiddenTableHeader" class="rdx-m-t-20">
        <template slot="empty">
          <no-data></no-data>
        </template>
        <el-table-column prop="content" label="弹幕内容"></el-table-column>
        <el-table-column align="center" prop="polling_create_time" label="时间" width="120"></el-table-column>
      </el-table>
      <div class="flex justify-around rdx-p-t-18" v-if="getData.dmData!='' && dmTotal > 8">
        <el-pagination background :total="dmTotal" :page-size="dmParams.size" layout="total, prev, pager, next"
          @size-change="handleDmSizeChange" @current-change="handleDmCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    props: ['roomId'],
    data() {
      return {
        room_id: '',
        option: '',
        show: {
          dataShowE: false
        },
        getData: {
          hotTexts: '',
          dmData: [], //全部弹幕
        },
        dmParams: { //全部弹幕参数值
          page: 1,
          size: 8,
        },
        dmTotal: 0, //全部弹幕总条数
        hiddenTableHeader: false, //全部弹幕表头隐藏
      }
    },
    mounted() {
      this.room_id = this.roomId
      var echarts = require('echarts');
      this.myChart = echarts.init(this.$refs.hotText)
      this.option;
      this.getListComment()
      this.getInit()
    },
    methods: {
      //全部弹幕分页
      handleDmSizeChange(val) {
        this.dmParams.page = 1
        this.dmParams.size = val
        this.getListComment()
      },
      handleDmCurrentChange(val) {
        this.dmParams.page = val
        this.getListComment()
      },
      //全部弹幕
      async getListComment() {
        var param = {
          "roomId": this.roomId,
          "page": this.dmParams.page,
          "size": this.dmParams.size,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get('/api/live/detail/listComment', param)
        if (data != undefined && data != '') {
          this.getData.dmData = data.list
          this.getData.dmData.forEach((item) => {
            item.polling_create_time = tools.time_cycle(2, item.polling_create_time)
          })
          this.dmTotal = data.page_info && data.page_info.total //分页
        }
      },
      async getInit() {
        var param = {
          "roomId": this.roomId,
          "testData": 'T',
        }
        const
          datas = await this.$get('/api/live/detail/queryDm', param)
        if (datas != undefined) {
          this.getData.hotTexts = datas.data
          if (this.getData.hotTexts.barrage_author_count == null) {
            this.getData.hotTexts.barrage_author_count = '--'
          } else {
            this.getData.hotTexts.barrage_author_count = tools.numberVerify(this.getData.hotTexts
              .barrage_author_count)
          }
          if (this.getData.hotTexts.barrage_count == null) {
            this.getData.hotTexts.barrage_count = '--'
          } else {
            this.getData.hotTexts.barrage_count = tools.numberVerify(this.getData.hotTexts.barrage_count)
          }
          if (this.getData.hotTexts.interaction_percent == null) {
            this.getData.hotTexts.interaction_percent = '--'
          } else {
            this.getData.hotTexts.interaction_percent = this.getData.hotTexts.interaction_percent.toFixed(2) + '%'
          }
          if (datas.data.words_count != '') {
            this.barrage = datas.data.words_count
            let lists = []
            for (let i in this.barrage) { //将对象存到数组中
              lists.push({
                name: i,
                value: this.barrage[i]
              })
            }

            var data = {
              value: lists,
            }
            console.log("data", data)
            this.option = ({
              tooltip: {
                show: true,
                backgroundColor: 'rgba(0,0,0,0.7)',
                textStyle: {
                  color: '#ffffff'
                },
                borderColor: 'rgba(0,0,0,0.7)'
              },
              series: [{
                name: '热点分析', //数据提示窗标题
                type: 'wordCloud',
                sizeRange: [40, 66], //字大小
                rotationRange: [-45, 90], //数据翻转范围
                // shape: 'circle',
                textPadding: 0,
                autoSize: {
                  enable: true,
                  minSize: 6
                },
                textStyle: {
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  color: function() {
                    return ['#FF7115']
                  }
                },
                emphasis: {
                  focus: 'self',
                  textStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                data: data.value
              }]
            })
            this.$nextTick(() => {
              this.myChart.clear()
              this.myChart.setOption(this.option)
            })
          } else {
            this.show.dataShowE = true
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-table::before {
      height: 0px;
   }
</style>
