<template>
  <div class="box flex flex-direction">
    <div class="flex rdx-p-t-20 line-bottom">
      <div class="flex position-re flex-direction align-center" @click="onTab('1')">
        <span class="rdx-font-20 titleCut" :class="show.tabIndex == '1' ? 'color-old font-strong' : ''">大咖分享</span>
        <span class="line rdx-m-t-10" v-if="show.tabIndex == '1'"></span>
      </div>
      <div class="flex position-re flex-direction align-center" style="margin-left: 80px;" @click="onTab('2')">
        <span class="rdx-font-20 titleCut" :class="show.tabIndex == '2' ? 'color-old font-strong' : ''">线上精品课</span>
        <span class="line rdx-m-t-10" v-if="show.tabIndex == '2'"></span>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="courses-item flex-direction flex position-re rdx-m-t-20 rdx-m-r-20" v-for="(item,index) in tableData">
        <img :src="item.cover_img" class="img_wh button-a" @click="showClick(item.id)"/>
        <div class="flex justify-between rdx-m-t-12">
          <div class="courses-time rdx-font-15 rdx-p-l-20 rdx-light-color">精品课</div>
          <div class="rdx-tips-color rdx-font-12 rdx-p-r-20">{{item.create_time}}</div>
        </div>
        <div class="flex flex-wrap rdx-m-l-18 rdx-m-t-18 font-strong titleCut move" @click="showClick(item.id)">{{item.title}}</div>
        <div class="flex justify-between position-ab w-100" style="bottom: 20px;">
          <div class="rdx-m-l-18 ">
            <img src="../../assets/imgs/read.png" />
            <span class="rdx-tips-color rdx-m-l-8 rdx-font-14 button-a">{{item.view_count}}</span>
          </div>

          <div class="flex align-center rdx-m-t-2">
            <div class="flex align-center move rdx-tips-color rdx-p-r-20 button-a" :style="give==index?'color: red;' : ''" @click="giveClick(index)">
              <i class="iconfont icon-ec7f" style="font-size: 20px;margin-top: -4px;"></i>
              <span class=" rdx-m-l-8 rdx-font-14">{{item.like_count}}</span>
            </div>
<!--            <div class="flex align-center rdx-p-l-40 rdx-p-r-24 move">
              <img src="../../assets/imgs/common.png" />
             <span class="rdx-tips-color rdx-m-l-8 rdx-font-14 button-a">--</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center rdx-p-g-20" v-if="tableData.length > params.size">
      <el-pagination background :total="total" :page-size="params.size" :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  export default {
    data() {
      return {
        show: {
          tabIndex: "1"
        },
        give:'-1',
        params: {
          type: '1',
          page:1,
          size:1000
        },
        tableData: [],
        total: 0,
        info:{}
      }
    },
    mounted() {
      this.tableList()
      this.table()
    },
    methods: {
      async table(){
        const {
          data
        } = await this.$get('/api/user/getUserInfoDetail')
        this.info = data
      },
      async showClick(id){  //跳转详情页
        this.$router.push({path:'/starview/online_detail',query:{id:id,type:'3'}});
        //增加观看人数
        var param = {
          id:id,
          userId:this.info.user_id
        }
        const {
          data
        } = await this.$get('/api/xgSchool/online/updateViewCount', param)
          this.tableData.view_count = data.data
      },
      //点击切换
      onTab(index) {
        this.show.tabIndex = index
        this.params.type = this.show.tabIndex
        this.params.page = 1
        this.params.size = 10
        this.tableList()
      },
      giveClick(e){ // 点赞
        if(this.give == e){
          this.give = '-1';
          this.tableData[e].like_count -= 1
        }else{
          this.give = e
          this.tableData[e].like_count += 1
        }
      },
      async tableList() {
        const {
          data
        } = await this.$get('/api/xgSchool/online/courseList',this.params)
        this.tableData = data.list
        this.tableData.forEach((item)=>{
          item.create_time = (tools.time_cycle(3,(item.create_time/1000))).replace(/-/g,'.')
        })
        this.total = data.page_info && data.page_info.total
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
  @import "../../assets/styles/listNews.scss";
  .img_wh{
    width: 100%;
    height: 197px;
    border-radius: 8px 8px 0px 0px;
  }
</style>
