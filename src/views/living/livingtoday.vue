<template>
  <div class="box">
    <div class="select-box2 rdx-m-t-20">
      <goods-class @onTalent="handleStar" @onProduct="handleProductCate" classShow='3'  style="margin-top: -20px;"></goods-class>
    </div>
    <div class="select-box">
      <span class="name">筛选：</span>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="黑马" @change="clickDarkHorse"></el-checkbox>
        <el-checkbox label="首次上榜" @change="clickFirstRank"></el-checkbox>
        <el-checkbox label="低粉" @change="clickisBomb"></el-checkbox>
        <el-checkbox label="品牌自播" @change="clickBrand"></el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange"@row-click="jumpurl" ref="tableMain">
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
        <el-table-column label="播主">
          <template slot-scope="{ row }">
            <div class="info rdx-flex info-three">
              <img :src="row.avatar" alt class="circularHead" />
              <div class="rdx-flex-col rdx-m-l-10 rdx-p-r-10 "  style="font-weight: normal;">
                <div class="rdx-flex rdx-flex-wrap align-center">
                  <span class="name rdx-m-r-4 rdx-p-t-4 rdx-line-1" style="width: 300px;">{{ row.nickname }}</span>
                  <!-- <img :src="row.share" style="margin-top: 6px;" class="code rdx-m-r-4" /> -->
                </div>
                <div class="rdx-flex rdx-flex-wrap rdx-p-t-4">
                  <span class="rdx-m-r-4">抖音号: {{ row.unique_id }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sales_amount" sortable="custom" label="直播销售额(元)" width="150"></el-table-column>
        <el-table-column align="center" prop="sales_volume" sortable="custom" label="直播销量(件)" width="150"></el-table-column>
        <el-table-column align="center" prop="average_price" label="销售客单价" width="120"></el-table-column>
        <el-table-column align="center" prop="follower_count" label="粉丝数" width="120"></el-table-column>
<!--        <el-table-column align="center" prop="product_size" label="直播商品数"></el-table-column> -->
        <el-table-column align="center" prop="product_category" label="带货类目" width="120"></el-table-column>
        <!-- <el-table-column align="center" prop="live_count" label="直播场次"></el-table-column> -->
        <el-table-column label="直播间" align="center" width="120">
          <el-button type="primary" size="mini" class="button-all">查看详情</el-button>
        </el-table-column>
      </el-table>
      <div class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10"
        v-if="show.tableFoot=='-1' && tableData !='' ">
        <img src="../../assets/imgs/loading.gif" style="width: 20px; height: 20px;">
        <span class="rdx-p-l-20">加载更多</span>
      </div>
      <p class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10 rdx-tips-color" v-if="show.tableFoot == '0'">
        --我是有底线的---</p>
      <div class="flex flex-direction justify-center align-center rdx-p-t-20"
        v-if="show.tableFoot == '1'">
        <span class="rdx-tips-color">您当前是 游客 权限不足，请先登录</span>
        <div class="button-all rdx-line-height-40 rdx-radius-20 rdx-m-t-10" style="width: 160px; text-align: center;"
          @click="onLongin">立即登录</div>
      </div>
      <div class="footer flex justify-center align-center"
        v-if="show.tableFoot == '2'">
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
    rankLiveDialyUrl
  } from '@/api'
  import {
    formatDate
  } from '@/utils'
  import LivingTabs from './components/LivingTabs'
  import {
    searchConditionsUrl
  } from '@/api'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '@/components/noData.vue'
  import goodsClass from '@/components/goodsClass.vue'
  import QRCode from 'qrcodejs2'
  export default {
    components: {
      LivingTabs,
      searchItem,
      noData,
      goodsClass
    },
    data() {
      return {
        loading: false,
        params: {
          page: 1,
          size: 10,
          starCategory: '',
          productCategory: '',
        },
        tableData: [],
        total: 0,
        checkList: [],
        productAllShow: false,
        starAllShow: false,
        searchConditions: {},
        show: {
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop:false,
        },
      }
    },
    computed: {
      ...mapGetters(['tokenOk', 'token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      this.loadData()
      this.loadSearchConditions()
    },
	destroyed(){
	  window.removeEventListener('scroll', this.getScroll)
	},
    mounted() {
      setTimeout(()=>{
        //console.log("tokenOkSearch",this.tokenOk)
      },1000)

    },
    methods: {
      async loadData() {
        this.params.page = 1
        this.tableData = []
        this.loading = true
        const {
          data
        } = await this.$get(rankLiveDialyUrl, this.params)
        this.loading = false
        if (data != undefined) {
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item)=>{
            item.average_price=item.average_price.toFixed(2)
          })
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
      async loadSearchConditions() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      reload() {
        this.params.page = 1
        this.loadData()
      },
      //黑马
      clickDarkHorse(e) {
        if (e === true) {
          this.params.darkHouse = 1
        } else {
          this.params.darkHouse = 0
        }
        this.loadData()
      },
      //首次上榜
      clickFirstRank(e) {
        if (e === true) {
          this.params.firstOnList = 1
        } else {
          this.params.firstOnList = 0
        }
        this.loadData()
      },
      //低粉达人
      clickisBomb(e) {
        if (e === true) {
          this.params.lowFans = 1
        } else {
          this.params.lowFans = 0
        }
        this.loadData()
      },
      //品牌自播
      clickBrand(e) {
        if (e === true) {
          this.params.verificationType = 1
        } else {
          this.params.verificationType = 0
        }
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
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",

        })
      },
      //跳转页面
      jumpurl(e) {
        var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: e.author_id}})
        window.open(url.href, '_blank')
      },
      //点击商品分类
      handleProductCate(name) {
        this.params.productCategory = name
        this.loadData()
      },
      //点击达人分类
      handleStar(name) {
        this.params.starCategory = name
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
      //点击登录
      onLongin() {
        this.saveTokenOk("51000")
      },

      //获取滚动条
      getScroll() {
        if(!this.show.scrollStop){
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
        } = await this.$get(rankLiveDialyUrl, this.params)
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
        console.log("this.tableData", this.tableData,this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
</style>
