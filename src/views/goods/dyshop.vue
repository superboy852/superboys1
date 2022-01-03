<template>
  <div class="box">
    <div class="flex justify-between align-center">
      <search-item @clickKey='clickKey' :keywordInit="params.keyword" searchType="6"></search-item>
<!--      <div class="dataUpdateTime">
        <div class="btn button-a">导出</div>
      </div> -->
      <div class="">

      </div>
    </div>

    <date-day @dateVal="dateVal"  style="margin-top: -5px;"></date-day>  <!-- 日周月 -->
    <goods-class @onProduct="handleProductCate" classShow='1' class="rdx-p-t-5" ></goods-class>

    <div class="select-box align-center">
          <span class="name">高级筛选：</span>
          <span class="select_title">商品来源：</span>
          <el-select @change="clickPlatfoms" v-model="platfom" placeholder="请选择" size="mini"
            style=" margin-right: 20px">
            <el-option v-for="item in platfomsBL" :key="item.key" :label="item.value" :value="item.key"> </el-option>
          </el-select>


          <span class="select_title">佣金比例：</span>
          <el-select @change="clickTbMaxCommissionRates" v-model="tbMaxCommissionRate" size="mini" placeholder="请选择"
            style=" margin-right: 20px">
            <el-option v-for="item in tbMaxCommissionData" :key="item.key" :label="item.value"
              :value="item.key"> </el-option>
          </el-select>
          </span>
        </div>

    <el-table v-loading="loading" :data="tableData" class="sticky-head" @sort-change="handlesortChange" @row-click="jumpurl">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column label="排行" type="index" width="90">
        <template slot-scope="scope">
          <img v-if="scope.$index == 0" class="order" src="../../assets/imgs/first.png" alt="" />
          <img v-if="scope.$index == 1" class="order" src="../../assets/imgs/second.png" alt="" />
          <img v-if="scope.$index == 2" class="order" src="../../assets/imgs/third.png" alt="" />
          <i class="rank-text" v-if="scope.$index > 2 && scope.$index < 9">0{{ scope.$index + 1 }}</i>
          <i class="rank-text" v-if="scope.$index > 2 && scope.$index >= 9">{{ scope.$index + 1 }}</i>
        </template>
      </el-table-column>
      <el-table-column label="小店" width="400">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-two">
            <img class="circularHead" :src="row.shop_icon" alt=""  />
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4">{{ row.shop_title }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="product_count" label="推广商品数">
        <template>
          <span>--</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="video_count" sortable="custom" label="关联视频数" width="150"></el-table-column>
      <el-table-column align="center" prop="live_count" sortable="custom" label="关联直播数" width="130"></el-table-column>
      <el-table-column align="center" prop="page_view" sortable="custom" label="浏览量" width="130">
        <template>
          <span>--</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="dy_num" sortable="custom" label="抖音数量" width="130">
        <template>
          <span>--</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="total_amount" sortable="custom" label="销售额" width="130"></el-table-column>
      <el-table-column align="center" prop="average_conversion_rate" sortable="custom" label="销售转化率">
        <template slot-scope="scope">
          <span>{{scope.row.average_conversion_rate}}%</span>
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
import { brandRankUrl, searchConditionsUrl } from '@/api'
import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  import dateDay from '@/components/dateDay.vue'
export default {
  components:{
    searchItem,noData,dateDay,goodsClass
  },
  data() {
    return {
      search: '',
      isChoose: true,
      optionvalue: '',
      productAllShow: false,
      dataUpdateTime: '2021-08-26 12:12',
      searchConditions:{},
      isCategoryAll: false,
      isTagAll: false,
      params: {
       page: 1,
       size: 10,
       productCategory:'',
      },
      tbMaxCommissionRate:'不限',
      platfom:'全部',
      tableData: [],
      total:0,
      platfomsBL: [],
      tbMaxCommissionData: [],
      loading:false,
      show:{
        tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
        scrollStop:false,
      }
    }
  },
  computed: {
    ...mapGetters(['tokenOk', 'token'])
  },
  created() {
    window.addEventListener('scroll', this.getScroll, false)
    this.shoprankData()
    if(tools.getQueryString('keyword')){
      this.params.keyword = tools.getQueryString('keyword')
      this.loadData()
    }else{
      this.loadData()
    }
  },
  destroyed(){
    window.removeEventListener('scroll', this.getScroll)
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
        this.shoprankData()
      },
    async loadData() {
      const { data } = await this.$get(searchConditionsUrl)
      this.searchConditions = data
      this.platfomsBL=data.platfom
      this.tbMaxCommissionData=data.tbMaxCommissionRate
    },
    //跳转页面
    jumpurl(e) {
      var url = this.$router.resolve({path: '/shop/shop_detail',query: {id: e.shop_id}})
      window.open(url.href, '_blank')
    },
    //跳转会员付费页面
    jumpurlVip(){
      this.$router.push({
        path: "/renew/index",
      })
    },
    async shoprankData() {
      this.params.page = 1
      this.loading = true
      this.tableData = []
      const { data } = await this.$get('/api/rank/shop', this.params)
      this.loading = false
      if(data != undefined){
        this.params.page = 2
        this.tableData =data.list
        this.total = data.page_info && data.page_info.totalCount
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
    //分类
    handleProductCate(id) {
      this.params.productCategory = id
      this.shoprankData()
    },
    //获取分页
    handleSizeChange(val) {
      this.params.page = 1
      this.params.size = val
      this.shoprankData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.shoprankData()
    },
    //获取关键字
    clickKey(val) {
      this.params.keyword = val
      this.shoprankData()
    },
    //商品来源
    clickPlatfoms(val) {
      this.params.platfom = val
      this.shoprankData()
    },
    //佣金比例
    clickTbMaxCommissionRates(val) {
      this.params.tbMaxCommissionRate = val
      this.shoprankData()
    },
    //商品升序和降序
    handlesortChange(column){
      if(column.order === "descending"){
        this.params.order= 'desc'
        this.params.sort= column.prop
      }else{
        this.params.order= 'asc'
        this.params.sort= column.prop
      }
      this.shoprankData()
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
      } = await this.$get('/api/rank/shop', this.params)
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
