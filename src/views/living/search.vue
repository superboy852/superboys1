<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' :keywordInit="params.keyword" searchType="1"></search-item>
      <goods-class @onTalent="handleStar" @onProduct="handleProductCate" classShow='3' style="margin-top: -5px;"></goods-class>
    </div>
    <div class="select-box rdx-font-14">
      <span class="name" style="margin-top: 3px;">达人筛选：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <div class="rdx-m-r-20">
          <span class="rdx-tips-color">日期</span>
          <el-date-picker v-model="date" type="daterange" class="rdx-m-l-18 datd-begin-end" style="width: 300px;"
            range-separator="至 " size="mini" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd"
            @change="dateChange">
          </el-date-picker>
        </div>
        <div class="rdx-m-r-20">
          <span class="rdx-tips-color rdx-m-r-8">地区</span>
          <el-cascader clearable v-model="reg" :options="searchConditions.regions" :props="optionProps" clearable
            size="mini" style="width: 100px; line-height: inherit;" @change="handleChange" class="width-all city-select">
          </el-cascader>
        </div>
        <div class="rdx-m-r-20">
          <span class="rdx-tips-color rdx-m-r-8">粉丝数</span>
          <el-select v-model="follow" @change="clickFllower" size="mini" clearable placeholder="请选择"
            style="width: 100px;" class="width-left-18 width-all">
            <el-option v-for="follower in searchConditions.followers" :key="follower.key" :label="follower.value"
              :value="follower.key" style="width: 150px;"></el-option>
          </el-select>
        </div>
        <div class="rdx-m-r-20 ">
          <span class="rdx-tips-color rdx-m-r-8">礼物收入</span>
          <el-select v-model="giftCount" @change="clickGift" clearable class="width-left-18 width-all" size="mini"
            style="width: 100px;">
            <el-option v-for="gifts in searchConditions.gift_count" :key="gifts.key" :label="gifts.value"
              :value="gifts.key">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="select-box flex justify-between rdx-p-b-10">
      <div class="flex align-center rdx-font-14">
        <span class="name" style="margin-top: -3px;">商品筛选：</span>
        <div>
          <span class="rdx-tips-color rdx-m-r-20">销量</span>
          <el-select v-model="volumes" @change="clickSales" size="mini" clearable placeholder="选择销量"
            class="width-left-18 width-all" style="width: 100px;">
            <el-option label="不限" value="" class="rdx-p-r-20"></el-option>
            <el-option v-for="sale in searchConditions.sales" :key="sale.key" :label="sale.value" :value="sale.key">
            </el-option>
          </el-select>
        </div>
        <div class="rdx-flex rdx-m-l-20">
          <el-checkbox v-model="params.isTakeProduct" :true-label="1" :false-label="-1" class="checkbox"
            @change="clickisTakeProduct">
            带货直播</el-checkbox>
          <el-checkbox v-model="params.hasWarmAweme" :true-label="1" :false-label="-1" class="checkbox"
            @change="clickhasWarmAweme">
            有预热视频</el-checkbox>
          <el-checkbox v-model="params.liveState" :true-label="1" :false-label="-1" class="checkbox"
            @change="clickstatus">正在直播
          </el-checkbox>
        </div>
      </div>
      <!-- <div class="button-a rdx-p-t-10 rdx-p-b-10 rdx-p-l-28 rdx-p-r-28 font-strong rdx-primary rdx-font-16 rdx-radius-20" style="border: 1px solid #DD001B;">
        导出
      </div> -->
    </div>

<!-- :default-sort = "{prop: 'sales_amount', order: 'descending'}" -->
    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" @cell-click="cellClick">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30"></no-data>
        </template>
        <el-table-column label="直播" width="260">
          <template slot-scope="{ row }">
            <div class="rdx-flex-col rdx-m-l-10 align-center info" style="display: flex;flex-flow: row nowrap;">
              <img :src="row.live_cover" class="img" style="width: 60px;height: 60px;min-width: 60px; border-radius: 10px;" />
              <div class="rdx-m-r-8 rdx-font-16 rdx-p-l-16 font-strong link-primary rdx-line-3 name">
                {{ row.room_title }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="达人">
          <template slot-scope="{ row }">
            <div class="info info-two rdx-flex info-three">
              <img :src="row.author.avatar" class="round" style="width: 30px;height: 30px;min-width: 30px;" />
              <div class="rdx-flex-col rdx-m-l-10" style="font-weight: normal;">
                <div class="rdx-flex rdx-flex-wrap align-center">
                  <span class="name">{{ row.author.nickname }}</span>
                </div>
                <div class="rdx-flex rdx-flex-wrap fants-text">
                  <span>粉丝数: {{ row.author.follower_count }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="begin_time" sortable="custom" label="开播时间" width="150">
        </el-table-column>
        <el-table-column align="center" prop="user_peak" label="人气峰值" width="120"></el-table-column>
        <el-table-column align="center" prop="user_count" sortable="custom" label="观看人次" width="120"></el-table-column>
        <el-table-column align="center" prop="product_size" label="商品数" width="120"></el-table-column>
        <el-table-column align="center" prop="sales_amount" sortable="custom" label="销售额" width="120"></el-table-column>
        <el-table-column align="center" prop="sales_volume" sortable="custom" label="销量(件)" width="120">
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
    liveSearchUrl,
    searchConditionsUrl
  } from '@/api'
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
      searchItem,
      noData,
      goodsClass,top
    },
    data() {
      return {
        loading: false,
        search: '',
        searchConditions: {
          keyword: '',
          productCategory: [],
          starCategory: [],
          followers: [],
          sales: [],
          regions: []
        },
        optionProps: {
          label: 'key',
          value: 'key',
          children: 'value'
        },
        reg: [],
        productAllShow: false,
        starAllShow: false,
        params: {
          page: 1,
          size: 20,
          starCategory: '',
          category: '',
        },
        show: {
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop: false,
        },
        tableData: [],
        date: [],
        follow: '不限',
        giftCount: '不限',
        volumes: '不限',
      }
    },
    computed: {
      tableHeader() {
        return `抖音号(共搜索到${this.total || 0}条结果)`

      },
      ...mapGetters(['tokenOk', 'token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      this.loadSearchConditions()
      if(tools.getQueryString('keyword')){
        this.params.keyword = tools.getQueryString('keyword')
        this.loadData()
      }else{
        this.loadData()
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.getScroll)
    },
    mounted() {
      setTimeout(() => {
        console.log("tokenOkSearch", this.tokenOk)
      }, 1000)
    },
    methods: {
      //地区点击事件
      handleChange(e) {
        this.params.province = e[0]
        this.params.region = e[1]
        this.loadData()
      },
      //分类
      async loadSearchConditions() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
        // 地区遍历
        var arrList = []
        data.regions.forEach((item) => {
          var p = {
            key: item.key,
            value: []
          }
          item.value.forEach((itemS) => {
            if (itemS == '') {
              p.value.push({
                'key': '全部'
              })
            } else {
              p.value.push({
                'key': itemS
              })
            }
          })
          arrList.push(p)
        })
        this.searchConditions.regions = arrList
        //console.log('123',arrList)
      },

      //榜单数据
      async loadData() {
        this.params.page = 1
        this.loading = true
        this.tableData = []
        const {
          data
        } = await this.$get(liveSearchUrl, this.params)
        this.loading = false
        if (data != undefined) {
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item) => {
            if (item.begin_time != 0) {
              item.begin_time = tools.time_cycle(1,item.begin_time)
            }else{
              item.begin_time = "--"
            }
          })
          this.params.size = data.page_info.pageSize
          if (this.tokenOk == '51000') {
            this.show.tableFoot = '1' //需要登录
            return;
          } else if (this.tokenOk == '52000') {
            this.show.tableFoot = '2' //权限不足
            return;
          }
        }
      },
      reload() {
        this.params.page = 1
        this.loadData()
      },
      handleProductCate(id) {
        this.params.category = id
        this.loadData()
      },
      handleStar(id) {
        this.params.starCategory = id
        this.loadData()
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",

        })
      },
      //单元格跳转
      cellClick(row, column, cell, event){
        console.log("cell",column)
        if(column.label == "达人"){
          var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: row.author_id}})
          window.open(url.href, '_blank')
        }else{
          var url = this.$router.resolve({path: '/living/living_detail',query: {id: row.live_id}})
          window.open(url.href, '_blank')
        }
      },
      dateChange(date) {
        if (date == null) {
          this.params.liveBeginTime = ''
          this.params.liveEndTime = ''
        } else {
          this.params.liveBeginTime = date[0]
          this.params.liveEndTime = date[1]
        }
        this.reload()
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
      //粉丝人数
      clickFllower(e) {
        this.params.followerCount = e
        this.loadData()
      },
      //礼物收入
      clickGift(e) {
        this.params.giftCount = e
        this.loadData()
      },
      //销量
      clickSales(e) {
        this.params.volume = e
        this.loadData()
      },
      //是否预热视频
      clickhasWarmAweme(e) {
        if (e == true) {
          this.params.hasWarmAweme = 1
        } else {
          this.params.hasWarmAweme = 0
        }
        this.loadData()
      },
      //是否带货
      clickisTakeProduct(e) {
        if (e == true) {
          this.params.isTakeProduct = 1
        } else {
          this.params.isTakeProduct = 0
        }
        this.loadData()
      },
      //是否直播
      clickstatus(e) {
        if (e == true) {
          this.params.status = 2
        } else {
          this.params.status = -1
        }
        this.loadData()
      },
      //点击登录
      onLongin() {
        this.saveTokenOk("51000")
      },
      //点击搜索
      clickKey(val) {
        this.params.keyword = val
        this.loadData()
      },
      //获取滚动条
      getScroll() {
        if (!this.show.scrollStop) {
          var scrollHeight = document.documentElement.scrollHeight;
          var scrollTop = document.documentElement.scrollTop;
          var objHeight = document.documentElement.offsetHeight;
          if (scrollHeight <= (scrollTop + objHeight + 100) && !this.show.scrollStop) {
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
        } = await this.$get(liveSearchUrl, this.params)
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
        data.list.forEach((item) => {
          if (item.begin_time != null) {
            item.begin_time = tools.time_cycle(1,item.begin_time)
          }
        })
        this.show.tableFoot = '-1' //加载中
        this.params.page++; //每触底一次
        // this.tableData =this.tableData.concat(data.list)
        document.documentElement.scrollTop = document.documentElement.scrollTop - 100
        this.tableData = [...this.tableData, ...data.list]
        this.show.scrollStop = false
      },
      ...mapActions(['saveTokenOk']),

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

  /deep/.el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
  }

  /deep/.el-table .el-table__body-wrapper tr:hover {
    cursor: pointer;
  }

  /deep/.el-table__header .has-gutter tr th:first-child .cell {
    padding-left: 20px;
  }
  // /deep/.el-table tr th:nth-child(7), /deep/.el-table tr td:nth-child(7){color: #F96615;}
  // /deep/.el-table tr th:nth-child(7) .sort-caret.ascending{border-bottom-color: #F96615;}
  // /deep/.el-table tr td:nth-child(8){color: #069B48;}
</style>
