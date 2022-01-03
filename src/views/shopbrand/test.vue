<template>
  <div class="box flex flex-direction">
    <div class="flex box-shadow flex-direction ">
      <div class="flex line-bottom rdx-p-b-20">
        <img :src="getData.shopDatas.shop_icon" class="round" style="width: 88px; height: 88px;">
        <div class="flex flex-direction rdx-p-l-15">
          <div class="flex align-center">
            <strong class="font-strong">{{getData.shopDatas.shop_name}}</strong>
            <span
              class="rdx-font-14 rdx-line-height-25 rdx-warning-light-bg rdx-p-l-10 rdx-p-r-10 font-strong rdx-m-l-16">口碑
              <a class="rdx-warning-disabled">--</a> 高</span>
            <span
              class="rdx-font-14 rdx-line-height-25 rdx-warning-light-bg rdx-p-l-10 rdx-p-r-10 font-strong rdx-m-l-16">月榜
              第--名</span>
          </div>
          <div class="rdx-content-color rdx-p-t-8 rdx-line-height-28">商家体验分：{{getData.shopDatas.expr_score}}</div>
          <div class="rdx-content-color rdx-line-height-28">商品体验：{{getData.shopDatas.product_desc}}
            商家服务：{{getData.shopDatas.product_serv}} 物流体验：{{getData.shopDatas.product_post}}</div>
        </div>
      </div>
      <div class="flex">
        <div class="flex rdx-flex-1 line-right flex-direction rdx-p-t-30">
          <div class="flex">
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">{{getData.shopDatas.total_amount}}</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天销售额</li>
            </ul>
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">{{getData.shopDatas.total_volume}}</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天销售（件）</li>
            </ul>
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">--</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天互动量</li>
            </ul>
          </div>
          <div class="flex rdx-p-t-30">
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">{{getData.shopDatas.total_product_num}}</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">推广商品数</li>
            </ul>
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">{{getData.shopDatas.avg_product_price}}</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天客单价</li>
            </ul>
            <ul class="flex align-center flex-direction rdx-flex-1">
              <li class="font-strong">{{getData.shopDatas.avg_product_commission_rate}}</li>
              <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">佣金比例</li>
            </ul>
          </div>
        </div>
        <div class="flex rdx-flex-1 align-center rdx-p-l-50">
          <ul class="flex rdx-flex-1 flex-direction">
            <li class="font-strong">{{getData.shopDatas.author_count}}</li>
            <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天关联达人</li>
          </ul>
          <!-- <ul class="flex rdx-flex-1 align-center flex-direction">
            <li class="font-strong">{{getData.shopDatas.video_count}}</li>
            <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天关联视频</li>
          </ul> -->
          <ul class="flex rdx-flex-1 align-center flex-direction">
            <li class="font-strong">{{getData.shopDatas.live_count}}</li>
            <li class="rdx-tips-color rdx-font-14 rdx-line-height-30">近30天关联直播</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex rdx-m-t-20">
      <div class=" flex flex-direction searchWh justify-between" style=" position: sticky; top: 80px;">
        <div class="flex justify-center align-center rdx-p-t-30 button-a" @click="scrollToView('zzqs')">
          <i class="iconfont icon-e617" style="font-size: 23px;"
            :class="show.tabIndex == 'zzqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="searchdh" :class="show.tabIndex == 'zzqs' ? 'rdx-primary' : 'rdx-tips-color'">增长趋势</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('xsfx')">
          <i class="iconfont icon-e62d" style="font-size: 21px;"
            :class="show.tabIndex == 'xsfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="searchdh" :class="show.tabIndex == 'xsfx' ? 'rdx-primary' : 'rdx-tips-color'">销售分析</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('drlb')">
          <i class="iconfont icon-e660" style="font-size: 21px;"
            :class="show.tabIndex == 'drlb' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'drlb' ? 'rdx-primary' : 'rdx-tips-color'">达人列表</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('spfx')">
          <i class="iconfont icon-e603" style="font-size: 18px;"
            :class="show.tabIndex == 'spfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="  searchdh" :class="show.tabIndex == 'spfx' ? 'rdx-primary' : 'rdx-tips-color'">商品分析</span>
        </div>
        <div class="flex justify-center align-center rdx-p-b-30 button-a" @click="scrollToView('tglb')">
          <i class="iconfont icon-e668" style="font-size: 23px;"
            :class="show.tabIndex == 'tglb' ? 'rdx-primary' : 'rdx-tips-color'">
          </i>
          <span class="searchdh" :class="show.tabIndex == 'tglb' ? 'rdx-primary' : 'rdx-tips-color'">推广列表</span>
        </div>
      </div>


      <div class=" rdx-m-l-20 searchWh-right">

        <div class="flex justify-between w-100">
          <div class="flex flex-direction rdx-p-r-50 rdx-flex-1 box-shadow w-50">
            <div class="flex" id="zzqs">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">销量增长趋势</h2>
            </div>
            <div v-if="!show.dataShowB" id="saleroomUp" style="width: 100%; height: 350px;"></div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShowB"></no-data>
          </div>
          <div class="flex flex-direction rdx-flex-1 rdx-m-l-20 box-shadow w-50">
            <div class="flex">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">销售额趋势榜</h2>
            </div>
            <div v-if="!show.dataShowB" id="saleroom" style="width: 100%; height: 350px;"></div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShowB"></no-data>
          </div>
        </div>
        <div class="flex justify-between rdx-m-t-20  w-100">
          <div class="flex flex-direction rdx-p-r-50 rdx-flex-1 box-shadow w-50">
            <div class="flex" id="xsfx">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">达人销售额占比</h2>
            </div>
            <div v-if="!show.dataShowA" id="talentSell" style="width: 100%; height: 350px;"></div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShowA"></no-data>
          </div>
          <div class="flex flex-direction rdx-flex-1 rdx-m-l-20 box-shadow w-50">
            <div class="flex" id="spfx">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">达人带货商品数占比</h2>
            </div>
            <div v-if="!show.dataShowA" id="talentGoods" style="width: 100%; height: 350px;"></div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShowA"></no-data>
          </div>
        </div>

        <div class="flex justify-between rdx-m-t-20 w-100">
          <div class="flex flex-direction rdx-p-r-50 rdx-flex-1 box-shadow w-50">
            <div class="flex">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">商品品类Top5</h2>
            </div>
            <div v-if="!show.dataShow" id="classTop" style="width: 100%; height: 350px;"></div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShow"></no-data>
          </div>
          <div class="flex flex-direction rdx-flex-1 rdx-m-l-20 box-shadow w-50">
            <div class="flex">
              <span class="tips"></span>
              <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">商品品牌Top5</h2>
            </div>
            <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
              style="width: 100%; height: 350px;" v-if="show.dataShow"></no-data>
            <div v-if="!show.dataShow" id="bandTop" style="width: 100%; height: 350px;"></div>
          </div>
        </div>

        <div class="box-shadow rdx-m-t-20">
          <div class=" flex flex-direction ">
            <div class="flex justify-between">
              <div class="flex rdx-p-b-6" id="drlb">
                <span class="tips"></span>
                <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">达人列表</h2>
              </div>
              <search-item @clickKey='clickTalentKey' searchType="4" searchWidth="420"></search-item>
            </div>
            <div class="select-box">
              <span class="name">选择分类：</span>
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
            <div class="select-box">
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
            <div class="select-box">
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
            <el-table :data="getData.talentList" style="width: 100%;" @sort-change="handlesortTalent">
              <template slot="empty">
                <no-data></no-data>
              </template>
              <el-table-column prop="nickname" label="达人" width="150"></el-table-column>
              <el-table-column sortable="custom" prop="follower_count" label="粉丝数"></el-table-column>
              <el-table-column sortable="custom" prop="reputation_score" label="带货口碑"></el-table-column>
              <el-table-column sortable="custom" prop="product_count" label="推广商品数"></el-table-column>
              <el-table-column sortable="custom" prop="address" label="关联人数">
                <template>
                  <span>--</span>
                </template>
              </el-table-column>
              <el-table-column sortable="custom" prop="live_count" label="关联直播"></el-table-column>
              <el-table-column sortable="custom" prop="volume" label="预估销量(件)"></el-table-column>
              <el-table-column sortable="custom" prop="amount" label="预估销售额"></el-table-column>
            </el-table>
          </div>
          <div class="block" v-if="getData.talentList!=''">
            <el-pagination background :total="talentTotal" :page-size="talentParams.size"
              :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleTalentSizeChange" @current-change="handleTalentCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="box-shadow rdx-m-t-20">
          <div class=" flex flex-direction">
            <div class="flex justify-between">
              <div class="flex rdx-p-b-20" id="tglb">
                <span class="tips"></span>
                <h2 class="rdx-font-20 font-strong rdx-line-height-25 rdx-p-l-10">推广商品列表</h2>
              </div>
              <search-item @clickKey='clickGoodKey' searchType="7" searchPlaceholder="请输入商品关键词" searchWidth="420"></search-item>
            </div>
            <div class="select-box">
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
            <el-table :data="getData.goodsList" style="width: 100%; font-size: 16px;"
              :header-cell-style="{background:'#E7ECF1',color:'#333333'}" @sort-change="handlesortGoods">
              <template slot="empty">
                <no-data></no-data>
              </template>
              <el-table-column prop="title" label="商品" width="300"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="price" label="价格" width="100"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="max_commission_rate" label="佣金比例">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="amount" label="销售额"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="volume" label="销量(件)"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="day_pv_count" label="近30天浏览量" width="150"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="conversion_rate" label="近30天转化率" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="author_count" label="关联达人"></el-table-column>
              <el-table-column align="center" prop="volume" label="操作">
                <template slot-scope="scope">
                  <img src="@/assets/imgs/line.png" @click="linkShow(scope.row.product_id)" class="btn button-a" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block" v-if="getData.goodsList!=''">
            <el-pagination background :total="goodTotal" :page-size="goodParams.size" :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, sizes, prev, pager, next, jumper" @size-change="handleGoodsSizeChange"
              @current-change="handleGoodsCurrentChange">
            </el-pagination>
          </div>
        </div>

      </div>

    </div>
  </div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  import * as tools from '@/common/tools.js'
  import goodsClass from '../../components/goodsClass.vue'
  import searchItem from '@/components/searchItem.vue'
  export default {
    components: {
      noData,
      goodsClass,
      searchItem
    },
    data() {
      return {
        show: {
          tabIndex: '-1',
          tabIndexs: '-1'
        },
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
    mounted(){
      this.getSaleroomUp()
      this.getSaleroom()
      this.getTalentSell()
      this.getTalentGoods()
      this.getBandTop()
      this.getClassTop()
    },
    methods: {
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
          this.getData.shopDatas.total_amount = tools.numberVerify(this.getData.shopDatas.total_amount)  //近30天销售额
          this.getData.shopDatas.total_volume = tools.numberVerify(this.getData.shopDatas.total_volume)  //近30天销量
          this.getData.shopDatas.total_product_num = tools.numberVerify(this.getData.shopDatas.total_product_num)  //推广商品数
          this.getData.shopDatas.avg_product_price = tools.numberVerify(this.getData.shopDatas.avg_product_price)  //近30天客单价
          this.getData.shopDatas.author_count = tools.numberVerify(this.getData.shopDatas.author_count)  //近30天关联达人
          this.getData.shopDatas.live_count = tools.numberVerify(this.getData.shopDatas.live_count)  //近30天关联直播
          this.getData.shopDatas.avg_product_commission_rate = this.getData.shopDatas.avg_product_commission_rate.toFixed(2)  //佣金比例



          //console.log('0',this.getData.shopDatas)
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
          "orderBy":this.talentParams.order,
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
      linkShow(id) {
        this.$router.push({
          path: "/goods/goods_detail",
          query: {
            id: id
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
        this.getData.volumeData=[]
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
			backgroundColor:'rgba(0,0,0,0.7)',
			textStyle:{
			  color:'#ffffff'
			},
			borderColor:'rgba(0,0,0,0.7)'
          },
          grid: {
            top: 30,
            bottom: 50,
            left: 50,
            right: 0
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
			symbol:"none",
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
        console.log('测试',data)
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
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 30,
              bottom: 50,
              left: 50,
              right: 0
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
			  symbol:"none",
              type: 'line',
              smooth: true
            }]
          });
        }else{
          this.show.dataShowB=true
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
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '达人带货商品数',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        }else{
          this.show.dataShowA=true
        }
      },
      onScrolls() {
        let scrolleds = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolleds < 400 && scrolleds > 0) {
          this.show.tabIndex = "zzqs"
          this.show.tabIndexs = "-1"
        } else if (scrolleds < 800 && scrolleds > 400) {
          this.show.tabIndex = "xsfx"
          this.show.tabIndexs = "-1"
        } else if (scrolleds < 1300 && scrolleds > 800) {
          this.show.tabIndex = "spfx"
          this.show.tabIndexs = "-1"
        } else if (scrolleds < 1800 && scrolleds > 1200) {
          this.show.tabIndex = "drlb"
          this.show.tabIndexs = "-1"
        } else if (scrolleds < 2500 && scrolleds > 1800) {
          this.show.tabIndex = "tglb"
          this.show.tabIndexs = "-1"
        }
      },
      //点击滚动固定位置
      scrollToView(index) {
        this.show.tabIndex = index;
        if (index == 'zzqs') {
          document.getElementById('zzqs').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'xsfx') {
          document.getElementById('xsfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'spfx') {
          document.getElementById('spfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'drlb') {
          document.getElementById('drlb').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'tglb') {
          document.getElementById('tglb').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        this.$forceUpdate()
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
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '达人带货商品数',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              data: list
            }]
          })
        }else{
          this.show.dataShowA=true
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
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '商品品类top',
              type: 'pie',
              radius: ['40%', '70%'],
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
            tooltip: {
              trigger: 'item',
              formatter: "{b} ({d}%)",
			  backgroundColor:'rgba(0,0,0,0.7)',
			  textStyle:{
			    color:'#ffffff'
			  },
			  borderColor:'rgba(0,0,0,0.7)'
            },
            series: [{
              name: '品牌top',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
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
  @import "../../assets/styles/listNew.scss";

  /deep/.el-table .cell {
    padding: 20px;
  }

  .block {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 20px;
    overflow: visible !important;
  }
</style>
