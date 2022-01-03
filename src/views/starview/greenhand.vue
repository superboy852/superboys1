<template>
  <div class="starview flex flex-direction">
    <div class="flex rdx-p-t-20 line-bottom">
      <div class="flex position-re flex-direction align-center" style="margin-right: 80px;"
        @click="onTab('1')">
        <span class="rdx-font-18 button-a" :class="show.tabIndex == '1' ? 'color-old font-strong' : ''">我是达人</span>
        <span class="line rdx-m-t-10" v-if="show.tabIndex == '1'"></span>
      </div>
      <div class="flex position-re flex-direction align-center" @click="onTab('2')">
        <span class="rdx-font-18 button-a" :class="show.tabIndex == '2' ? 'color-old font-strong' : ''">我是商家</span>
        <span class="line rdx-m-t-10" v-if="show.tabIndex == '2'"></span>
      </div>
    </div>
    <div class="flex w-100 flex-direction">
      <div class="flex align-center rdx-m-t-40" v-if="show.tabIndex == '1'">
        <div class="tips"></div>
        <strong class="rdx-p-l-10">新手指南</strong>
      </div>
      <div class="flex align-center rdx-m-t-40" v-if="show.tabIndex == '2'">
        <div class="tips"></div>
        <strong class="rdx-p-l-10">我是商家</strong>
      </div>
      <div class="flex rdx-m-t-26 flex-wrap">
        <div class="rdx-m-r-60 rdx-m-b-60 flex flex-direction" v-if="!show.dataShow" v-for="(talent,index) in tableData" :key="index">
          <div class="starview-item rdx-p-16 flex flex-direction position-re button-a" @click="showClick(talent.id)"
            style="overflow: hidden;">
            <div style="text-align: center;">
              <img :src="talent.cover_url" style="margin: -20px;object-fit: cover;height: 150px;" />
            </div>

            <div class="flex w-100 rdx-p-r-30 rdx-font-14 justify-between align-center rdx-light-color position-ab"
              style="bottom: 10px;">
              <div class="flex align-center">
                <i class="iconfont icon-e70d rdx-font-22 rdx-m-r-4 button-a" style="margin-top: 3px;"></i>
                <span>{{talent.view_count}}</span>
              </div>
              <div>{{talent.video_time_length}}</div>
            </div>
          </div>
          <div class="videoTitle rdx-tips-color rdx-line-height-32 button-a" @click="showClick(talent.id)">
            {{talent.video_title}}</div>
        </div>
        <no-data marginTop="0" v-else class="flex justify-center w-100"></no-data>
      </div>
      <div class="flex w-100 justify-center rdx-p-t-20 rdx-p-b-20" v-if="tableData.length > params.size ">
        <el-pagination background :total="total" :page-size="params.size" :page-sizes="[10, 20, 30, 40, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
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
        show: {
          tabIndex: "1",
          dataShow:false
        },
        params: {
          type: '1',
          page: 1,
          size: 10
        },
        tableData: [],
        total: 0,

      }
    },
    mounted() {
      this.tableList()
    },
    methods: {
      showClick(id) { //跳转详情页
        this.$router.push({
          path: '/starview/guide_detail',
          query: {
            id: id,
            type: '2'
          }
        });
      },
      //点击切换
      onTab(index) {
        this.show.tabIndex = index
        this.params.type = this.show.tabIndex
        this.params.page = 1
        this.params.size = 10
        this.tableList()
      },
      async tableList() {
        const {
          data
        } = await this.$get('/api/xgSchool/newPlayerGuide/getList', this.params)
        if(data != undefined){
          if(data.list != ''){
            this.tableData = data.list
            this.total = data.page_info.total
            this.params.size = data.page_info.pageSize
          }else{
            this.show.dataShow = true
          }
        }
      },
      //分页
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.tableList()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.tableList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import './starview.scss';

  .block {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 20px;
    overflow: visible !important;
  }

  .videoTitle:hover {
    color: $rdx-primary;
  }
</style>
