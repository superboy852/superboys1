<template>
  <div class="box flex " style="border-radius: 5px;">
    <div class="w-70 box-shadow " style="border-radius: 5px;">
      <div class="flex flex-direction align-center">
        <h1 style="border-bottom: 1px double #DDDDDD;" class="rdx-p-t-10 rdx-p-b-10 w-100 rdx-text-center">{{tableData.title}}</h1>
        <span class="rdx-tips-color flex justify-end w-100 rdx-p-t-10 rdx-p-b-10">{{tableData.create_time}}</span>
      </div>
      <div class="flex flex-direction rdx-m-t-40 rdx-m-b-20 w-100">
        <div v-for="(item,index) in tableData.show_img_array" :key="index" class="w-100 rdx-text-center">
          <img :src="item" style="width: 80%;" />
        </div>
        <div class="rdx-m-t-30 w-100 rdx-line-height-30" style="text-indent: 32px;">{{tableData.sketch}}</div>
      </div>
    </div>
    <div class="w-30 box-shadow rdx-m-l-20" style="border-radius: 5px;">
      <div>
        <span class="tips">&nbsp;</span>
        <span class="gjtipTitle">研究报告</span>
      </div>
      <div class="rdx-m-t-20">
        <div class="borderb rdx-m-t-14 rdx-p-b-14 flex button-a rdx-m-l-14" v-for="(item,index) in tableDatas"
          @click="showClick(item.id)" v-if="index < 5">
          <img style="width: 60px;height: 80px;" :src="item.cover_img" />
          <div class="rdx-m-l-10 flex flex-direction align-stretch rdx-font-12" style="width: 200px;">
            <span class=" rdx-line-2">{{item.title}}</span>
            <div class="flex justify-between rdx-tips-color rdx-p-t-34">
              <span class="link-primary"> {{item.create_time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components: {
      noData
    },
    data() {
      return {
        params: {
          id: ''
        },
        tableData: [],
        tableDatas: [],
        total: 0,
        showImg: [],
      }
    },
    created() {
      this.getParams()
    },
    mounted() {
      this.tableList()
      this.tableLists()
    },
    methods: {
      showClick(id) { //跳转详情页
        this.$router.push({
          path: '/starview/starview_detail',
          query: {
            id: id
          }
        });
        this.$router.go(0)
      },
      getParams() {
        // 取到路由带过来的参数
        this.params.id = this.$route.query.id
      },
      //获取数据
      async tableList() {
        const {
          data
        } = await this.$get('/api/xgSchool/data/byIdReport', this.params)
        this.tableData = data
        this.tableData.create_time = (tools.time_cycle(3, (this.tableData.create_time / 1000))).replace(/-/g, '.')
        console.log("this.tableData", this.tableData)
        //this.show_img=this.tableData.show_img_array

      },
      //获取数据
      async tableLists() {
        const {
          data
        } = await this.$get('/api/xgSchool/data/reportList')
        this.tableDatas = data.list
        this.tableDatas.forEach((item) => {
          this.showImg.push(item.show_img_array)
        })
        this.tableDatas.forEach((item) => {
          item.create_time = (tools.time_cycle(3, (item.create_time / 1000))).replace(/-/g, '.')
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
</style>
