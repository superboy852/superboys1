<template>
  <div class="box">
    <div class="select-box align-center flex">
      <span class="name rdx-m-b-10">选择时间：</span>
      <el-date-picker v-model="params.date" type="date" placeholder="选择日期" value-format="yyyyMMdd" size="mini" class="rdx-m-b-10"
        style=" margin-right: 16px;" @change="changeTime"></el-date-picker>
      <span class="rdx-font-13 rdx-p-r-10 rdx-m-b-10">小时榜</span>
      <div class="flex flex-wrap rdx-flex-1 align-center">
        <div class="rdx-text-center rdx-font-12 button-a rdx-m-b-10"
          :class="show.hourIndex == index2 ? 'time-hour-over rdx-light-color' : 'time-hour rdx-tips-color'"
          v-for="(hourS,index2) in getData.dateHour" :key="index2" @click="onHour(index2,hourS)">{{hourS}}</div>
      </div>
    </div>
    <div class="select-box2">
      <goods-class @onTalent="handleStar" classShow='2' style="margin-top: -10px;"></goods-class>
    </div>
    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" ref="tableMain">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30"></no-data>
        </template>
        <el-table-column align="center" label="排行" type="index" width="80">
          <template slot-scope="{$index}">
            <img v-if="$index === 0" class="rank-img" src="@/assets/imgs/first.png" alt />
            <img v-if="$index === 1" class="rank-img" src="@/assets/imgs/second.png" alt />
            <img v-if="$index === 2" class="rank-img" src="@/assets/imgs/third.png" alt />
            <i class="rank-text" v-if="$index > 2 && $index < 9">0{{ $index + 1 }}</i>
            <i class="rank-text" v-if="$index > 2 && $index >= 9">{{ $index + 1 }}</i>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="{ row }">
            <div class="info rdx-flex info-three" @click="jumpurl(row.author_id)">
              <img :src="row.avatar" alt class="circularHead" />
              <div class="rdx-flex-col rdx-m-l-10 rdx-p-r-10" style="font-weight: normal;">
                <div class="flex align-center "  >
                  <div class="name rdx-m-r-4 rdx-line-2" style="width: 100px;">{{ row.nickname }}</div>
                  <!-- <img src="@/assets/imgs/code.png" class="code rdx-m-r-4" /> -->
                </div>
                <div class="rdx-flex rdx-flex-wrap">
                  <span class="rdx-m-r-4">抖音号: {{ row.unique_id }}</span>
                </div>
                <div class="rdx-flex rdx-flex-wrap rdx-p-t-4">
                  <div class="zc-text" :class="['base-type', `base-type-${index}`]"
                    v-for="(item, index) in row.product_category" :key="item">{{item}}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="star_first_category" label="播主类型" width="120">
        </el-table-column>
        <el-table-column align="center" prop="user_count" sortable="custom" label="在线人数" width="120"></el-table-column>
        <el-table-column align="center" prop="follower_count" sortable="custom" label="粉丝数" width="120">
        </el-table-column>
        <el-table-column align="center" prop="sale_volume" sortable="custom" label="销量" width="120">
        </el-table-column>
        <el-table-column align="center" prop="vs" label="操作" width="150">
          <template slot-scope="{ row }">
            <div class="flex w-100 justify-center">
              <el-tooltip effect="dark" content="数据大屏" placement="bottom">
                 <span class="tiktok-buttonA flex align-center justify-center" @click="linkLarge(row.live_id)">
                   <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
                 </span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10"
        v-if="show.tableFoot=='-1' && tableData !='' ">
        <img src="../../assets/imgs/loading.gif" style="width: 20px; height: 20px;">
        <span class="rdx-p-l-20">加载更多</span>
      </div>
      <p class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10 rdx-tips-color" v-if="show.tableFoot == '0'">
        --我是有底线的---</p>
      <div class="flex flex-direction justify-center align-center rdx-p-t-20" v-if="show.tableFoot == '1'">
        <span class="rdx-tips-color">您当前是 游客 权限不足，请先登录</span>
        <div class="button-all rdx-line-height-40 rdx-radius-20 rdx-m-t-10" style="width: 160px; text-align: center;"
          @click="onLongin">立即登录</div>
      </div>
      <div class="footer flex justify-center align-center" v-if="show.tableFoot == '2'">
        <div class="search-vip">当前可查看{{tableData.length}}个示例，<span style="color: #FFC11E;">请购买或升级会员，</span>可查看更多数据
        </div>
        <div class="search-vip-but flex justify-center align-center font-strong rdx-primary rdx-m-l-40 button-a"
          @click="jumpurlVip()">立即开通</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    rankLiveOfficialUrl,
    searchConditionsUrl
  } from '@/api'
  import LivingTabs from './components/LivingTabs'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  export default {
    components: {
      LivingTabs,
      searchItem,
      noData,
      goodsClass
    },
    data() {
      return {
        getData: {
          dateHour: []
        },
        show: {
          hourIndex: '0',
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop: false,
        },
        loading: false,
        searchConditions: {
          starCategory: []
        },
        starAllShow: false,
        params: {
          page: 1,
          size: 20,
          starCategory: '',
          date:'',
          sort:'',
          order:'',
        },
        hourParams: {
          date: '',
        },
        tableData: [],
        total: 0,
        val: {
          dayTime: '', //天
          hourTime: "", //小时
        }
      }
    },
    computed: {
      ...mapGetters(['tokenOk', 'token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      //获取当前日期 20210915
      var day = new Date().getTime() / 1000
      this.val.dayTime = tools.time_cycle('3', day)
      this.val.dayTime = this.val.dayTime.replace(/-/g, "")
      this.params.date = this.val.dayTime
      this.hourParams.date = this.val.dayTime.replace(/-/g, "")
      this.getHour()
      // this.params.date = this.val.dayTime + '00'
      // console.log('6666', this.show.hourIndex)
      // console.log("1", this.params.date, this.hourParams.date)
      this.loadSearchConditions()
      //this.loadData()


    },
    destroyed() {
      window.removeEventListener('scroll', this.getScroll)
    },
    mounted() {
      setTimeout(() => {
        //console.log("tokenOkSearch", this.tokenOk)
      }, 1000)
    },
    methods: {
      changeTime(e) {
        this.val.dayTime = e
        this.hourParams.date = e
        this.params.date = this.val.dayTime + this.val.hourTime.split(':')[0]
        this.getHour()
      },
      //点击小时
      onHour(index, e) {
        this.val.hourTime = e
        this.show.hourIndex = index
        this.params.date = this.val.dayTime + this.val.hourTime.split(':')[0]
        this.loadData()
      },
      async getHour() {
        var param = {
          "date": this.hourParams.date,
        }
        const {
          data
        } = await this.$get('/api/rank/live/soundbyte/hour', param)
        var hour = data
        var arr = [];
        hour.forEach((item) => {
          arr.push(item + ":00")
        })
        this.getData.dateHour = arr
        this.show.hourIndex = this.getData.dateHour.length - 1
        this.params.date = this.val.dayTime+this.getData.dateHour[this.getData.dateHour.length - 1].split(':')[0]
        this.loadData()
      },

      async loadSearchConditions() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      async loadData() {
        this.params.page = 1
        this.tableData = []
        this.loading = true
        var param={
          "date":this.params.date,
          "page":this.params.page,
          "size":this.params.size,
          "order":this.params.order,
          "sort":this.params.sort,
          "starCategory":this.params.starCategory,
        }
        const {
          data
        } = await this.$get(rankLiveOfficialUrl, param)
        this.loading = false
        if (data != undefined) {
          this.params.page = 2
          this.tableData = data.list
          this.params.size = data.page_info.pageSize
          this.total = data.page_info && data.page_info.totalCount
          if (this.tokenOk == '51000') {
            this.show.tableFoot = '1' //需要登录
            return;
          } else if (this.tokenOk == '52000') {
            this.show.tableFoot = '2' //权限不足
            return;
          }
        }

      },
      handleStar(name) {
        this.params.starCategory = name
        this.loadData()
      },
      //升序和降序
      handlesortChange(column) {
        if (column.order === "descending") {
          this.params.order = 'desc'
          this.params.sort = column.prop
        } else {
          this.params.order = 'asc'
          this.params.sort = column.prop
        }
        this.loadData()
      },
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.loadData()
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",
        })
      },
      //跳转页面
      jumpurl(id) {
        var url = this.$router.resolve({path: "/talent/talent_detail",query: {id: id}})
        window.open(url.href, '_blank')
      },
      //跳转到数据大屏
      linkLarge(id) {
        var url = this.$router.resolve({path: "/data_large",query: {id: id}})
        window.open(url.href, '_blank')
      },

      //点击登录
      onLongin() {
        this.saveTokenOk("51000")
      },

      //获取滚动条
      getScroll() {
        if (!this.show.scrollStop) {
          var scrollHeight = document.documentElement.scrollHeight;
          var scrollTop = document.documentElement.scrollTop;
          var objHeight = document.documentElement.offsetHeight;
          if (scrollHeight <= (scrollTop + objHeight + 200) && !this.show.scrollStop) {
            this.show.scrollStop = true
            setTimeout(() => {
              this.getMore()
            }, 100)
          }
        }
      },
      async getMore() {
        const {
          data
        } = await this.$get(rankLiveOfficialUrl, this.params)
        if (this.tokenOk == '51000') {
          this.show.tableFoot = '1' //需要登录
          return;
        } else if (this.tokenOk == '52000') {
          this.show.tableFoot = '2' //权限不足
          return;
        }
        if (data == undefined) {
          this.show.tableFoot = '0' //到底
          return;
        }
        this.show.tableFoot = '-1' //加载中
        this.params.page++; //每触底一次
        // this.tableData =this.tableData.concat(data.list)
        document.documentElement.scrollTop = document.documentElement.scrollTop - 100
        this.tableData = [...this.tableData, ...data.list]
        this.show.scrollStop = false
        //console.log("this.tableData", this.tableData, this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
  .sjImg{
    width: 26px; height: 26px;background: #dd0000;border-radius: 2px;
  }

  /deep/.select-box .el-input--mini .el-input__inner {
    width: 140px !important;
  }
  /deep/.el-date-editor.el-input{
    width: 140px;
  }
</style>
