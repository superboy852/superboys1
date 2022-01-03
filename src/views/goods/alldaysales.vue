<template>
  <div class="box">
    <div class="select-box2">
      <date-day @dateVal="dateVal" style="margin-top: -15px;"></date-day>  <!-- 日周月 -->
      <goods-class @onProduct="handleProductCate" classShow='1' class="rdx-p-t-5"></goods-class>
    </div>
      <div class="select-box align-center rdx-font-14">
        <span class="name">高级筛选：</span>
        <span class="rdx-font-14 rdx-tips-color">佣金比例：</span>
        <el-select @change="clickCommissionRate" v-model="comRate" placeholder="请选择"
          style="width: 100px; margin-right: 30px">
          <el-option v-for="item in searchConditions.tbMaxCommissionRate" :key="item.key" :label="item.value"
            :value="item.key"> </el-option>
        </el-select>
      </div>
      <el-table v-loading="loading" :data="tableData" class="sticky-head" @sort-change="handlesortChange" @row-click="jumpurlShow">
        <template slot="empty">
          <no-data marginTop="0" class="rdx-p-t-30"></no-data>
        </template>
        <el-table-column align="center" label="排行" type="index" width="80">
          <template slot-scope="scope">
            <img v-if="scope.$index == 0" class="order" src="../../assets/imgs/first.png" alt="" />
            <img v-if="scope.$index == 1" class="order" src="../../assets/imgs/second.png" alt="" />
            <img v-if="scope.$index == 2" class="order" src="../../assets/imgs/third.png" alt="" />
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index < 9">0{{ scope.$index + 1 }}</i>
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index >= 9">{{ scope.$index + 1 }}</i>
          </template>
        </el-table-column>
        <el-table-column label="商品">
          <template slot-scope="{ row }">
            <div class="info info-three rdx-flex">
              <img :src="row.image" alt class="squareHead" />
              <div class="rdx-flex-col rdx-m-l-10">
                <div class="rdx-flex rdx-flex-wrap">
                  <span class="name rdx-m-r-4 rdx-line-2" style="width: 490px;">{{ row.title }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格(元)" width="120" align="center">
          <template slot-scope="scope">
            <span class="pricenow" >{{ tableData[scope.$index].coupon_price }}</span>
            <span class="pricebefore rdx-tips-color rdx-p-l-10">{{ tableData[scope.$index].market_price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="佣金比例" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="sale_incr" label="今天累计销量(件)" width="170" align="center" sortable="custom"></el-table-column>
        <el-table-column prop="sales" label="月销量(件)" width="130" align="center" sortable="custom"></el-table-column>
        <el-table-column prop="amount2" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <div class="flex w-100 justify-center">
              <el-tooltip effect="dark" content="商品详情" placement="bottom">
                 <span class="tiktok-buttonA flex align-center justify-center">
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
</template>
<script>
  import {
    searchConditionsUrl
  } from '@/api'
  import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  import dateDay from '@/components/dateDay.vue'
export default {
  components:{
    noData,dateDay,goodsClass
  },
  data() {
    return {
      search: '',
      isChoose: true,
      isCategoryAll: false,
      isTagAll: false,
      searchConditions: {},
      params: {
        page: 1,
        size: 20,
        bigCategory: '',
        commissionRate:'',
        sort:'',
        order:'',
      },
      total: 0,
      comRate: '',
      tableData: [],
      productAllShow: false,
      loading: false,
      show: {
        tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
        scrollStop:false,
      },
    }
  },
  omputed: {...mapGetters(['tokenOk', 'token'])},
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      //this.loadRealSalesData()
      this.getCate()
    },
  destroyed(){
    window.removeEventListener('scroll', this.getScroll)
  },
    mounted() {
      setTimeout(()=>{
        console.log("tokenOkSearch",this.tokenOk)
      },1000)
    },
  mounted() {
    setTimeout(()=>{
      console.log("tokenOkSearch",this.tokenOk)
    },1000)

  },
  methods: {
    //时间值获取
      dateVal(val){
        this.params.day = val.day
        this.params.dayType = val.dayType
        this.loadRealSalesData()
      },
      //筛选条件
      async getCate() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      jumpurl(jumpurl) {
        this.$router.push(jumpurl)
      },
      //跳转详情页
      jumpurlShow(e) {
        var url = this.$router.resolve({path: '/goods/goods_detail',query: {id: e.promotion_id}})
        window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip(){
        this.$router.push({
          path: "/renew/index",
        })
      },
      handleProductCate(id) {
        this.params.bigCategory = id
        this.loadRealSalesData()
      },
      //获取数据
      async loadRealSalesData() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get('/api/rank/home/allDayRank', this.params)
        this.tableData = []
        if(data!=undefined){
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          //this.total = data.page_info && data.page_info.total
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
      clickCommissionRate(e) {
        this.params.commissionRate = e
        this.loadRealSalesData()
      },
      //商品升序和降序
      handlesortChange(column) {
        if (column.order === "descending") {
          this.params.order = 'desc'
          this.params.sort = column.prop
        } else {
          this.params.order = 'asc'
          this.params.sort = column.prop
        }
        this.loadRealSalesData()
      },
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.loadRealSalesData()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.loadRealSalesData()
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
        } = await this.$get('/api/rank/home/allDayRank', this.params)
        if (this.tokenOk == '51000') {
          this.show.tableFoot = '1' //需要登录
          return;
        } else if (this.tokenOk == '52000') {
          this.show.tableFoot = '2' //权限不足
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

  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/listNew.scss";
</style>
