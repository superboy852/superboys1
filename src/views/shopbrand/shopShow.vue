<template>
  <div style="margin: 0px auto;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction shop-show">
      <div class="flex rdx-font-14 rdx-p-t-12 rdx-p-b-12 aligin-center rdx-line-height-30">
        <i class="iconfont icon-e614 rdx-m-r-4"></i>
        <span><a href="/shop/brands_search">小店&品牌</a></span>
        <i class="iconfont icon-e616"></i>
        <span class="color-content">小店详情</span>
      </div>
      <div class="flex new-top-box justify-between">
        <img :src="getData.shopDatas.shop_icon" style="width: 240px; height: 300px; border: 1px solid #F8F8F8;">
        <div class="flex rdx-flex-1 rdx-p-l-40 flex-direction">
          <div class="flex justify-between">
            <div class="flex flex-direction">
              <div class="flex align-center rdx-font-20">{{getData.shopDatas.shop_name}}</div>
              <div class="rdx-p-t-16">
                <span class="new-top-tips rdx-font-14 rdx-p-tb-2 rdx-p-lr-10" style="color: #FF9C4C;">口碑 <span
                    class="rdx-warning-disabled">--</span> 高</span>
                <span class="rdx-font-14 rdx-p-tb-2 rdx-p-lr-10 rdx-m-l-20" style="background-color: #F0F9FF;">月榜
                  <span style="color: color: #35AEFF;">--</span></span>
              </div>
              <div class="rdx-font-14 rdx-content-color rdx-m-t-8">
                <span class="rdx-p-r-40">商家体验分： {{getData.shopDatas.expr_score}}</span>
                <span class="rdx-p-r-40">商品体验： {{getData.shopDatas.product_desc}}</span>
                <span class="rdx-p-r-40">商家服务： {{getData.shopDatas.product_serv}}</span>
                <span class="rdx-p-r-40">物流体验： {{getData.shopDatas.product_post}}</span>
              </div>
            </div>
            <div class="flex">
<!--              <div class="rdx-font-14 rdx-tips-color rdx-p-r-10 rdx-p-t-2">数据更新于 {{getData.shopDatas.update_time}}</div> -->
              <el-tooltip class="item" effect="dark" content="复制品牌名称" placement="top">
                <div class="tag flex align-center justify-center" @click="copy(getData.shopDatas.shop_name)">
                  <i class="iconfont icon-e781"></i>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="flex justify-between rdx-p-t-60 w-80">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.total_amount}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天销售额</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.total_volume}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天销量(件)</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">--</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天互动量</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.total_product_num}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">推广商品数</span>
            </div>
          </div>
          <div class="flex justify-between rdx-p-t-20 w-80">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.avg_product_price}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天客单价</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.avg_product_commission_rate}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">佣金比例</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.author_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天关联达人</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.shopDatas.live_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天关联直播</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-100 justify-between">
        <div class="flex conten-box-left flex-direction color-7" style="position: sticky;top: 0px; height: 146px;">
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('1')">
            <i class="iconfont icon-e60d rdx-m-r-8 rdx-font-20" :class="show.tabIndex == '1' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '1' ? 'rdx-primary' : ''">基础分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('2')">
            <i class="iconfont icon-e634 rdx-m-r-8" :class="show.tabIndex == '2' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '2' ? 'rdx-primary' : ''">达人分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('3')">
            <i class="iconfont icon-e603 rdx-m-r-8" :class="show.tabIndex == '3' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '3' ? 'rdx-primary' : ''">商品分析</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-show="show.tabIndex == 1">
          <div class="flex">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">销量增长趋势</span>
              </div>
              <div class="flex position-re">
                <div v-if="!show.dataShowB" id="saleroomUp" style="width: 100%; height: 350px;"></div>
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 350px;" v-if="show.dataShowB"></no-data>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">销售额趋势榜</span>
              </div>
              <div class="flex position-re">
                <div v-if="!show.dataShowB" id="saleroom" style="width: 100%; height: 350px;"></div>
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 350px;" v-if="show.dataShowB"></no-data>
              </div>
            </div>
          </div>
          <div class="flex rdx-m-t-20">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">达人销售额占比</span>
              </div>
              <div class="flex position-re rdx-p-t-50">
                <div v-if="!show.dataShowA" id="talentSell" style="width: 100%; height: 220px;"></div>
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 220px;" v-if="show.dataShowA"></no-data>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">达人带货商品数占比</span>
              </div>
              <div class="flex position-re rdx-p-t-50">
                <div v-if="!show.dataShowA" id="talentGoods" style="width: 100%; height: 220px;"></div>
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 220px;" v-if="show.dataShowA"></no-data>
              </div>
            </div>
          </div>
          <div class="flex rdx-m-t-20">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">商品品类Top5</span>
              </div>
              <div class="flex position-re rdx-p-t-50">
                <div v-if="!show.dataShow" id="classTop" style="width: 100%; height: 220px;"></div>
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 220px;" v-if="show.dataShow"></no-data>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">商品品牌Top5</span>
              </div>
              <div class="flex position-re rdx-p-t-50">
                <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                  style="width: 100%; height: 220px;" v-if="show.dataShow"></no-data>
                <div v-if="!show.dataShow" id="bandTop" style="width: 100%; height: 220px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">达人列表</span>
            </div>
            <div class="select-box rdx-p-t-38">
              <span class="name">分类：</span>
              <div class="select-item rdx-m-r-12" :class="talent == '-1' ? 'active' : ''"
                @click="handleTalentCate('-1')">
                全部</div>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="select-item rdx-m-r-12" :class="talent == index ? 'active' : ''"
                  v-for="(item,index) in getData.talentCateList" :key="index" @click="handleTalentCate(index,item.id)">
                  {{item.name}}
                </div>
              </div>
            </div>
            <div class="select-box rdx-p-t-20">
              <span class="name">粉丝：</span>
              <!-- <div class="select-item rdx-m-r-12" :class="followers == '-1' ? 'active' : ''"
                @click="handleFollowerCate('-1')">全部</div> -->
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="select-item rdx-m-r-12" :class="followers == index ? 'active' : ''"
                  v-for="(item,index) in getData.followersList" :key="index"
                  @click="handleFollowerCate(index,item.key)">
                  {{item.value}}
                </div>
              </div>
            </div>
            <div class="select-box rdx-p-t-20">
              <span class="name">口碑：</span>
              <div class="select-item rdx-m-r-12" :class="repLevel == '-1' ? 'active' : ''"
                @click="handleRepLevelCate('-1')">全部</div>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="select-item rdx-m-r-12" :class="repLevel == index ? 'active' : ''"
                  v-for="(item,index) in getData.repLevelList" :key="index" @click="handleRepLevelCate(index,item.id)">
                  {{item.name}}
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <search-item @clickKey='clickTalentKey' searchType="4" searchWidth="365"></search-item>
            </div>
            <el-table :data="getData.talentList" style="width: 100%;" @sort-change="handlesortTalent">
              <template slot="empty">
                <no-data></no-data>
              </template>
              <el-table-column prop="nickname" label="达人"></el-table-column>
              <el-table-column sortable="custom" prop="follower_count" label="粉丝数" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="reputation_score" label="带货口碑" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="product_count" label="推广商品数" align="center" width="120">
              </el-table-column>
              <!--              <el-table-column sortable="custom" prop="address" label="关联人数" align="center">
                <template>
                  <span>--</span>
                </template>
              </el-table-column> -->
              <el-table-column sortable="custom" prop="live_count" label="关联直播" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="volume" label="预估销量(件)" align="center" width="150">
              </el-table-column>
              <el-table-column sortable="custom" prop="amount" label="预估销售额" align="center" width="150">
              </el-table-column>
            </el-table>
            <div class="block flex rdx-p-t-20 justify-center" v-if="getData.talentList!=''">
              <el-pagination background :total="talentTotal" :page-size="talentParams.size"
                :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleTalentSizeChange" @current-change="handleTalentCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 3">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">推广商品列表</span>
            </div>
            <div class="select-box rdx-p-t-38">
              <span class="name">分类：</span>
              <div class="select-item rdx-m-r-12" :class="goods == '-1' ? 'active' : ''" @click="handleGoodsCate('-1')">
                全部</div>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="select-item rdx-m-r-12" :class="goods == index ? 'active' : ''"
                  v-for="(item,index) in getData.goodsCateList" :key="index" @click="handleGoodsCate(index,item.id)">
                  {{item.name}}
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <search-item @clickKey='clickGoodKey' searchType="7" searchPlaceholder="请输入商品关键词" searchWidth="365"></search-item>
            </div>
            <el-table :data="getData.goodsList" @sort-change="handlesortGoods" @row-click="linkShow">
              <template slot="empty">
                <no-data></no-data>
              </template>
              <el-table-column prop="title" label="商品"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="price" label="价格" width="100"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="max_commission_rate" label="佣金比例" width="120">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="amount" label="销售额" width="120"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="volume" label="销量(件)" width="120"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="day_pv_count" label="近30天浏览量" width="150"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="conversion_rate" label="近30天转化率" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="author_count" label="关联达人" width="120"></el-table-column>
              <el-table-column align="center" prop="volume" label="操作" width="80">
                <template slot-scope="scope">
                  <el-tooltip effect="dark" content="商品详情" placement="bottom">
                    <div class="flex w-100 justify-center">
                      <span class="tiktok-buttonA flex align-center justify-center">
                        <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
                      </span>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <div class="block rdx-p-t-20 justify-center flex" v-if="getData.goodsList!=''">
              <el-pagination background :total="goodTotal" :page-size="goodParams.size" :page-sizes="[10, 20, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleGoodsSizeChange"
                @current-change="handleGoodsCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <top-up></top-up>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  import * as tools from '@/common/tools.js'
  import goodsClass from '../../components/goodsClass.vue'
  import searchItem from '@/components/searchItem.vue'
  import top from '@/layout/components/Top.vue'
  import mapChart from './components/mapChart.vue'
  import topUp from '@/components/toUp.vue'
  export default {
    components: {
      noData,
      goodsClass,
      searchItem,
      top,
      mapChart,topUp
    },
    data() {
      return {
        getData: {
          talentList: [], //达人数据
          shopDatas: {}, //店铺基本信息
          amountList: [], //达人销售额
          countList: [], //带货商品数
          labelList: [], //商品品类
          brandList: [], //商品品牌
          followersList: [], //粉丝
          repLevelList: [], //口碑
          goodsCateList: [], //商品分类
          talentCateList: [], //达人分类
          goodsList: [], //商品列表
          amoutVolume: [], //销售额
          volumeData: [], //销量
        },
        talent: '-1',
        goods: '-1',
        followers: '',
        repLevel: '-1',
        talentTotal: 0,
        goodTotal: 0,
        goodKeyWord: '', //商品搜索关键字
        talentKeyWord: '', //达人搜索关键字
        goodParams: {
          page: 1,
          size: 10,
          keyword: '',
          bigCategory: '',
          keyword: '',
          sort: '',
          order: '',
        },
        talentParams: {
          page: 1,
          size: 10,
          category: '',
          reputationLevel: '',
          followerCount: '',
          keyword: '',
          sort: '',
          order: '',
        },
        shopId: '', //店铺Id,
        startDate: '',
        endDate: '',
        val: {
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
        },
        show: {
          dataShow: false,
          dataShowA: false,
          dataShowB: false,
          tabIndex: '1',
        }
      }
    },
    created() {
      this.shopId = this.$route.query.id,
        this.initialTime()
      this.getShopData()
      this.getGeneral()
      this.getTalentData()
      this.getGoodsData()
      window.addEventListener("scroll", this.onScrolls) //实时监控滑块在
    },
    destroyed() { //取消实时监控滑块
      window.removeEventListener('scroll', this.onScrolls)
    },
    mounted() {
      this.getSaleroomUp()
      this.getSaleroom()
      this.getTalentSell()
      this.getTalentGoods()
      this.getBandTop()
      this.getClassTop()
    },
    methods: {
      //点击复制
      copy(text) {
        tools.copy(text)
      },
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
      },
      //小店库详情
      async getShopData() {
        var param = {
          "shopId": this.shopId
        }
        const {
          data
        } = await this.$get('/api/shop/detail/detail', param)
        if (data != undefined) {
          this.getData.shopDatas = data
          this.getData.shopDatas.total_amount = tools.numberVerify(this.getData.shopDatas.total_amount) //近30天销售额
          this.getData.shopDatas.total_volume = tools.numberVerify(this.getData.shopDatas.total_volume) //近30天销量
          this.getData.shopDatas.total_product_num = tools.numberVerify(this.getData.shopDatas
            .total_product_num) //推广商品数
          this.getData.shopDatas.avg_product_price = tools.numberVerify(this.getData.shopDatas
            .avg_product_price) //近30天客单价
          this.getData.shopDatas.author_count = tools.numberVerify(this.getData.shopDatas.author_count) //近30天关联达人
          this.getData.shopDatas.live_count = tools.numberVerify(this.getData.shopDatas.live_count) //近30天关联直播
          this.getData.shopDatas.avg_product_commission_rate = this.getData.shopDatas.avg_product_commission_rate
            .toFixed(2) //佣金比例
          this.getData.shopDatas.update_time= tools.getDateDiff(this.getData.shopDatas.update_time/1000)
        }

      },
      //推广商品列表
      async getGoodsData() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "keyword": this.goodParams.keyword,
          "bigCategory": this.goodParams.bigCategory,
          "page": this.goodParams.page,
          "size": this.goodParams.size,
          "sort": "",
          "orderby": "",
        }
        const {
          data
        } = await this.$get('/api/shop/detail/commodity/analyse', param)
        console.log('222s', data)
        if (data != undefined) {
          this.getData.goodsList = data.list //商品数据
          this.getData.goodsCateList = data.category //商品分类
          this.goodTotal = data.page_info && data.page_info.total //分页
        }

      },
      //达人列表
      async getTalentData() {
        var param = {
          "shopId": this.shopId,
          "category": this.talentParams.category,
          "reputationLevel": this.talentParams.reputationLevel,
          "followerCount": this.talentParams.followerCount,
          "keyword": this.talentParams.keyword,
          "page": this.talentParams.page,
          "size": this.talentParams.size,
          "sort": this.talentParams.sort,
          "orderBy": this.talentParams.order,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/author/analyse', param)
        //console.log('111111saqw',data)
        if (data != undefined) {
          this.getData.talentList = data.list //达人数据
          this.getData.talentCateList = data.category //达人分类
          this.getData.repLevelList = data.reputation_filter //口碑
          this.talentTotal = data.page_info && data.page_info.totalCount //分页
        }

      },
      //口碑，粉丝
      async getGeneral() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        //console.log('111q',data)
        this.getData.followersList = data.followers //粉丝
        this.getData.followersList.forEach((item) => {
          if (item.key == "") {
            item.value = item.value.replace("不限", "全部")
          }
        })
        //this.getData.repLevel = data.reputationLevel //口碑
      },
      //跳转到商品详情页
      linkShow(e) {
        this.$router.push({
          path: "/goods/goods_detail",
          query: {
            id: e.product_id
          }
        })
      },
      //达人分类点击
      handleTalentCate(index, val) {
        if (index == -1) {
          this.talent = '-1'
          this.talentParams.category = ''
        } else {
          this.talent = index
          this.talentParams.category = val
        }
        this.getTalentData()
      },
      //粉丝分类点击
      handleFollowerCate(index, val) {
        if (index == -1) {
          this.followers = '-1'
          this.talentParams.followerCount = ''
        } else {
          this.followers = index
          this.talentParams.followerCount = val
        }
        this.getTalentData()
      },
      //口碑分类点击
      handleRepLevelCate(index, val) {
        if (index == -1) {
          this.repLevel = '-1'
          this.talentParams.reputationLevel = ''
        } else {
          this.repLevel = index
          this.talentParams.reputationLevel = val
        }
        this.getTalentData()
      },
      //商品分类点击
      handleGoodsCate(index, val) {
        if (index == -1) {
          this.goods = '-1'
          this.goodParams.bigCategory = ''
        } else {
          this.goods = index
          this.goodParams.bigCategory = val
        }
        this.getGoodsData()
      },
      //获取达人列表分页数据
      handleTalentSizeChange(val) {
        this.talentParams.page = 1
        this.talentParams.size = val
        this.getTalentData()
      },
      handleTalentCurrentChange(val) {
        this.talentParams.page = val
        this.getTalentData()
      },
      //获取商品列表分页数据
      handleGoodsSizeChange(val) {
        this.goodParams.page = 1
        this.goodParams.size = val
        this.getGoodsData()
      },
      handleGoodsCurrentChange(val) {
        this.goodParams.page = val
        this.getGoodsData()
      },
      //商品关键词搜索
      clickGoodKey(val) {
        this.goodParams.keyword = val
        this.getGoodsData()
      },
      //达人关键词搜索
      clickTalentKey(val) {
        this.talentParams.keyword = val
        this.getTalentData()
      },
      //商品升序和降序
      handlesortGoods(column) {
        if (column.order === "descending") {
          this.goodParams.order = 'desc'
          this.goodParams.sort = column.prop
        } else {
          this.goodParams.order = 'asc'
          this.goodParams.sort = column.prop
        }
        console.log("adad", column)
        this.getGoodsData()
      },
      //达人升序和降序
      handlesortTalent(column) {
        if (column.order === "descending") {
          this.talentParams.order = 'desc'
          this.talentParams.sort = column.prop
        } else {
          this.talentParams.order = 'asc'
          this.talentParams.sort = column.prop
        }
        this.getTalentData()
      },
      //初始时间
      initialTime() {
        this.val.timeBengin = this.fun_date(-30).split('_')[0]
        this.val.timeEnd = this.fun_date(-30).split('_')[1]
        this.startDate = this.val.timeBengin.replace(/-/g, '')
        this.endDate = this.val.timeEnd.replace(/-/g, '')
      },
      //计算天数
      fun_date(aa) {
        var date1 = new Date();
        var m1 = date1.getMonth() + 1;
        m1 = m1 < 10 ? '0' + m1 : m1
        var d1 = date1.getDate();
        d1 = d1 < 10 ? '0' + d1 : d1
        var time1 = date1.getFullYear() + '-' + m1 + '-' + d1; //time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var m2 = date2.getMonth() + 1;
        m2 = m2 < 10 ? '0' + m2 : m2
        var d2 = date2.getDate();
        d2 = d2 < 10 ? '0' + d2 : d2
        var time2 = date2.getFullYear() + '-' + m2 + '-' + d2; //time2表示倒推几天
        return time2 + "_" + time1;
      },
      //销量增长趋势
      async getSaleroomUp() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/amout/volume', param)
        this.show.dataShow = false
        this.getData.volumeData = []
        if (data != undefined) {
          this.getData.volumeData = data
          var list1 = [];
          var list2 = [];
          this.getData.volumeData.forEach((item) => {
            item.time_node = tools.time_cycle(5, item.time_node)
            item.time_node = item.time_node.replace('-', '/')
            list1.push(item.time_node)
            list2.push(item.total_volume)
          })
        } else {
          this.show.dataShowB = true
        }

        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('saleroomUp'))

        myChart.setOption({
          color: ['#FFBD76'],
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          grid: {
            top: 40,
            bottom: 0,
            right: 20,
            left: 0,
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: list1
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,189,118,1)'
              }, {
                offset: 1,
                color: 'rgba(255,255,255,1)'
              }])
            },
            data: list2,
            symbol: "none",
            type: 'line',
            smooth: true
          }]
        });
      },
      //销售额趋势
      async getSaleroom() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/amout/volume', param)
        console.log('测试', data)
        if (data != undefined) {
          this.getData.amoutVolume = data
          let list1 = [];
          let list2 = [];
          this.getData.amoutVolume.forEach((item) => {
            item.time_node = tools.time_cycle(5, item.time_node)
            item.time_node = item.time_node.replace('-', '/')
            list1.push(item.time_node)
            list2.push(item.total_amount)
          })

          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('saleroom'))

          myChart.setOption({
            color: ['#FFBD76'],
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 40,
              bottom: 0,
              right: 20,
              left: 0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,189,118,1)'
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,1)'
                }])
              },
              data: list2,
              symbol: "none",
              type: 'line',
              smooth: true
            }]
          });
        } else {
          this.show.dataShowB = true
        }


      },
      //达人销售额占比
      async getTalentSell() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/amount/count', param)
        console.log('1111s', data)
        if (data.amount != '') {
          this.getData.amountList = data.amount
          let list = [];
          this.getData.amountList.forEach((item) => {
            list.push({
              name: item.title,
              value: item.rate
            })
          })

          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('talentSell'))

          myChart.setOption({
            color: ['#FFBD76', '#FF6334', '#FF3E34', '#E60012'],
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '达人带货商品数',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        } else {
          this.show.dataShowA = true
        }
      },
      //达人带货商品数
      async getTalentGoods() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/amount/count', param)
        if (data.count != '') {
          this.getData.countList = data.count
          let list = [];
          this.getData.countList.forEach((item) => {
            list.push({
              name: item.title,
              value: item.rate
            })
          })

          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('talentGoods'))

          myChart.setOption({
            color: ['#FFBD76', '#FF6334', '#FF3E34', '#E60012'],
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '达人带货商品数',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        } else {
          this.show.dataShowA = true
        }
      },
      //商品品类top
      async getClassTop() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/brand/label', param)
        if (data.labelList != '') {
          this.getData.labelList = data.labelList
          let list = [];
          this.getData.labelList.forEach((item) => {
            list.push({
              name: item.name,
              value: item.volume
            })
          })

          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('classTop'))

          myChart.setOption({
            color: ['#FFBD76', '#FF6334', '#FF3E34', '#E60012'],
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '商品品类top',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        } else {
          this.show.dataShow = true
        }
      },
      //品牌top
      async getBandTop() {
        var param = {
          "shopId": this.shopId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/shop/detail/brand/label', param)
        console.log('1223', data)
        if (data.brandList != '') {
          this.getData.brandList = data.brandList
          let list = [];
          this.getData.brandList.forEach((item) => {
            list.push({
              name: item.name,
              value: item.volume
            })
          })

          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('bandTop'))

          // var chartDom = document.getElementById('bandTop')
          // var myChart = this.$echarts.init(chartDom)

          myChart.setOption({
            color: ['#FFBD76', '#FF6334', '#FF3E34', '#E60012'],
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '品牌top',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        } else {
          this.show.dataShow = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./shopShow.scss";
</style>
