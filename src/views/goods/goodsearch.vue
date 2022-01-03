<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' :keywordInit="params.keyword" searchPlaceholder="请输入商品名称" searchType="7"></search-item>
      <goods-class @onProduct="handleProductCate" classShow='1' class="rdx-p-t-5" style="margin-top: -15px;">
      </goods-class>
    </div>
    <div class="select-box align-center">
      <span class="name">筛选：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <span class="select_title">商品来源：</span>
        <el-select @change="clickPlatfoms" v-model="platfomsDef" placeholder="请选择" size="mini"
          style="margin-right: 20px">
          <el-option v-for="item in platfomsBL" :key="item.key" :label="item.value" :value="item.key"> </el-option>
        </el-select>

        <span class="select_title">佣金比例：</span>
        <el-select @change="clickCommissionRate" v-model="tbMaxCommissionRateDef" size="mini" placeholder="请选择"
          style=" margin-right: 20px">
          <el-option v-for="item in searchConditions.tbMaxCommissionRate" :key="item.key" :label="item.value"
            :value="item.key"> </el-option>
        </el-select>

        <span class="select_title">抖音销量：</span>
        <el-select @change="clickDyVolumn" v-model="durationVolumeDef" size="mini" placeholder="请选择"
          style=" margin-right: 20px">
          <el-option v-for="item in searchConditions.durationVolume" :key="item.key" :label="item.value"
            :value="item.key"> </el-option>
        </el-select>

        <span class="select_title">昨日抖音浏览量：</span>
        <el-select @change="clickdayDyCount" v-model="dayPvCountDef" size="mini" placeholder="请选择"
          style="margin-right: 20px">
          <el-option v-for="item in searchConditions.dayPvCount" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
        <span>
          <span class="select_title">价格：</span>
          <input v-model="minprice" @blur="pricesearch" class="priceinput" type="number" placeholder="￥" />
          <span> - </span>
          <input v-model="maxprice" @blur="pricesearch" class="priceinput" type="number" placeholder="￥" />
          <el-button v-if="minprice != '' || maxprice != ''" @click="pricesearch" class="button-all" type="primary"
            size="mini">确定
          </el-button>
        </span>
      </div>
    </div>

    <div class="select-box">
      <span class="name">高级：</span>
      <el-checkbox-group v-model="checkedPreferential" @change="choosePreferential">
        <el-checkbox label="有优惠卷"></el-checkbox>
        <el-checkbox label="引流产品"></el-checkbox>
        <el-checkbox label="有直播带货"></el-checkbox>
        <el-checkbox label="有视频带货"></el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="select-box">
      <span class="name">带货：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
        <div class="rdx-m-b-10 rdx-m-r-10" :class="['select-item', sellGoods == '-1' ? 'active' : '']"
          @click="handleSellCate('-1')">全部</div>
        <div class="rdx-m-b-10 rdx-m-r-10" :key="index" v-for="(dhpro,index) in DHProduct"
          :class="['select-item', sellGoods === index ? 'active' : '']" @click="handleSellCate(index)">
          {{ dhpro }}
        </div>
      </div>
    </div>


    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" ref="tableMain" class="talent-one" @row-click="jumpurl">
        <template slot="empty" v-if="tableData == undefined">
          <no-data marginTop="0" class="rdx-p-t-30"></no-data>
        </template>
        <el-table-column label="商品" min-width="260">
          <template slot-scope="{ row }">
            <div class="info rdx-flex">
              <img :src="row.image" onerror="javascript:this.src='http://douyin.guanxingshu.com/img/no_img.png'" style="min-width: 60px;" class="squareHead"/>
              <div class="rdx-flex-col rdx-m-l-10">
                <div class="rdx-flex rdx-flex-wrap">
                  <span class="name size16 rdx-m-r-4">{{ row.title }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格(元)">
          <template slot-scope="scope">
            <p class="pricenow">￥{{ tableData[scope.$index].final_price }}</p>
            <p class="pricebefore">￥{{ scope.row.market_price == '0' ? scope.row.final_price: scope.row.market_price}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="tb_max_commission_rate" align="center" label="佣金比例">
          <template slot-scope="scope">
            <span>{{ scope.row.tb_max_commission_rate }}%</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" align="center" prop="pv_count" label="浏览量"></el-table-column>
        <el-table-column sortable="custom" align="center" prop="sales_volume" label="总销量">
        </el-table-column>
        <el-table-column sortable="custom" align="center" prop="duration_live_volume" label="直播销量"></el-table-column>
        <el-table-column sortable="custom" align="center" prop="duration_aweme_volume" label="视频销量">
        </el-table-column>
        <el-table-column sortable="custom" prop="conversion_rate" align="center" label="转化率">
          <template slot-scope="scope">
            <span>{{ scope.row.conversion_rate }}%</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="duration_author_count" label="关联达人"></el-table-column>
        <el-table-column align="center" prop="duration_live_count" label="关联直播"></el-table-column>
        <el-table-column align="center" prop="duration_video_count" label="关联视频"></el-table-column>
        <el-table-column align="center" prop="amount2" label="操作">
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
    productsearchUrl,
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
      goodsClass
    },
    data() {
      return {
        radio: '',
        checkedPreferential: [],
        loading: false,
        search: '',
        isChoose: true,
        laiyuan_value: '',
        yongjin_value: '',
        xiaoliang_value: '',
        zuori_value: '',
        jiage_value: '',
        searchConditions: {},
        productAllShow: false,
        starAllShow: false,
        minprice: '',
        maxprice: '',
        params: {
          page: 1,
          size: 10,
          productCategory: '',
          platfom: '',
          taMaxCommissionRate: '',
          price: '',
          filterCoupon: 0,
          drainageProducts: 0,
          dayPvCount:'',
          hasLive: 0,
          hasVideo: 0,
          mostVolume: '-1',
        },
        tableData: [],
        DHProduct: ['视频带货为主', '直播带货为主'],
        platfomsBL: [],
        total: 0,
        date: [],
        sellGoods: -1,
        platfomsDef: '全部',
        tbMaxCommissionRateDef: '不限',
        dayPvCountDef: '不限',
        durationVolumeDef: '不限',
        show: {
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop: false,
        },
      }
    },
    computed: {
      ...mapGetters(['tokenOk', 'token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      this.loadSearchConditions()
      if (tools.getQueryString('keyword')) {
        this.params.keyword = tools.getQueryString('keyword')
        this.loadData()
      } else {
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
      choosePreferential() {
        this.params.filterCoupon = 0
        this.params.drainageProducts = 0
        this.params.hasLive = 0
        this.params.hasVideo = 0
        for (let i = 0; i < this.checkedPreferential.length; i++) {
          if (this.checkedPreferential[i] == '有优惠卷') {
            this.params.filterCoupon = 1
          }
          if (this.checkedPreferential[i] == '引流产品') {
            this.params.drainageProducts = 1
          }
          if (this.checkedPreferential[i] == '有直播带货') {
            this.params.hasLive = 1
          }
          if (this.checkedPreferential[i] == '有视频带货') {
            this.params.hasVideo = 1
          }
        }
        this.loadData()
      },
      async loadSearchConditions() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
        this.platfomsBL = data.platfom
      },
      //点击价格确认
      pricesearch() {
        if (this.minprice == "" && this.maxprice == "") {
          this.params.price = ''
        } else if (this.minprice == "") {
          this.params.price = '-' + this.maxprice
        } else if (this.maxprice == "") {
          this.params.price = this.minprice + '-'
        } else {
          this.params.price = this.minprice + '-' + this.maxprice
        }

        this.loadData()
      },
      //跳转页面
      jumpurl(e) {
        var url = this.$router.resolve({path: '/goods/goods_detail',query: {id: e.promotion_id}})
        window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",
        })
      },
      async loadData() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get(productsearchUrl, this.params)
        this.tableData = []
        if (data != undefined) {
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item)=>{
            item.conversion_rate = item.conversion_rate.toFixed(2)
          })

          this.params.size = data.page_info.pageSize
          this.total = data.page_info && data.page_info.total
          if (this.tokenOk == '51000') {
            this.show.tableFoot = '1' //需要登录
            return;
          } else if (this.tokenOk == '52000') {
            this.show.tableFoot = '2' //权限不足
            return;
          }
        }
      },

      //商品来源
      clickPlatfoms(val) {
        this.params.platfom = val
        this.loadData()
      },
      clickDyVolumn(e) {
        this.params.durationVolume = e
        this.loadData()
      },
      clickCommissionRate(e) {
        this.params.tbMaxCommissionRate = e
        this.loadData()
      },
      clickdayDyCount(e) {
        this.params.dayPvCount = e
        this.loadData()
      },
      //筛选（带货）
      handleSellCate(index) {
        this.sellGoods = index
        if (index == 0) {
          this.params.mostVolume = 1
        } else if (index == 1) {
          this.params.mostVolume = 2
        } else {
          this.params.mostVolume = -1
        }
        this.loadData()
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
        this.loadData()
      },
      handleProductCate(id) {
        this.params.productCategory = id
        this.loadData()
      },
      dateChange(date) {
        const [liveBeginTime, liveEndTime] = date
        Object.assign(this.params, {
          liveBeginTime,
          liveEndTime
        })
        this.loadData()
      },
      //分页
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
        } = await this.$get(productsearchUrl, this.params)
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
            item.conversion_rate = item.conversion_rate.toFixed(2)
        })
        this.show.tableFoot = '-1' //加载中
        this.params.page++; //每触底一次
        // this.tableData =this.tableData.concat(data.list)
        document.documentElement.scrollTop = document.documentElement.scrollTop - 100
        this.tableData = [...this.tableData, ...data.list]
        this.show.scrollStop = false
        //console.log("this.tableData", this.tableData,this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),

    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
</style>
