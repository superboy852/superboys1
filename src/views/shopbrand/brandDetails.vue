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
        <span class="color-content">品牌详情</span>
      </div>
      <div class="flex new-top-box justify-between">
        <Avatar v-if="getData.brandDatas.brand_icon==''" :username="getData.brandDatas.brand_name"
          :src="getData.brandDatas.brand_name" :background-color="extra(getData.brandDatas.brand_name)"
          style="width: 240px; height: 300px;" color="#fff" :inline="true" :rounded='false' :size='150'></Avatar>
        <img :src="getData.brandDatas.brand_icon" style="width: 240px; height: 300px; border: 1px solid #F8F8F8;"
          v-if="getData.brandDatas.brand_icon!=''">
        <div class="flex rdx-flex-1 rdx-p-l-40 flex-direction">
          <div class="flex justify-between align-center">
            <div class="flex rdx-font-20">{{getData.brandDatas.brand_name}}</div>
            <div class="flex align-center">
              <div class="rdx-font-14 rdx-tips-color rdx-p-r-10">数据更新于 {{getData.brandDatas.update_time}}</div>
              <el-tooltip class="item" effect="dark" content="复制品牌名称" placement="top">
                <div class="tag flex align-center justify-center" @click="copy(getData.brandDatas.brand_name)">
                  <i class="iconfont icon-e781"></i>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="rdx-p-t-4">
            <span class="new-top-tips rdx-font-14 rdx-p-tb-2 rdx-p-lr-4"
              style="color: #FF9C4C;">{{getData.brandDatas.category}}</span>
          </div>
          <div class="flex justify-between rdx-p-t-60 w-60">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.total_amount}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天销售额</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.total_volume}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天销量(件)</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.interaction}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天互动量</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.total_product_num}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">推广商品数</span>
            </div>
          </div>
          <div class="flex justify-between rdx-p-t-20 w-60">
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.total_amount}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天关联达人</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.video_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天关联视频</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
              <span class="rdx-font-20">{{getData.brandDatas.live_count}}</span>
              <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">近30天关联直播</span>
            </div>
            <div class="flex flex-direction rdx-flex-1">
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-100 justify-between">
        <div class="flex conten-box-left flex-direction color-7" style="position: sticky;top: 0px; height: 183px;">
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
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('4')">
            <i class="iconfont icon-e6de rdx-m-r-8"
              :class="show.tabIndex == '4' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '4' ? 'rdx-primary' : ''">观众分析</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 1">
          <div class="item-bg flex flex-direction">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex justify-between">
              <div class="flex rdx-flex-5 flex-direction">
                <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
                  <span class="tips"></span>
                  <span class="rdx-font-20">带货达人分类占比</span>
                </div>
                <pie-chart chartId="classId" :formatter="chartData.formatter" :chartData="chartData.talentClassData"
                  :chartWidth="chartData.chartWidth">
                </pie-chart>
              </div>
              <div class="flex rdx-flex-5 flex-direction  ">
                <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
                  <span class="tips"></span>
                  <span class="rdx-font-20">商品分类占比</span>
                </div>
                <pie-chart chartId="productId" :formatter="chartData.formatter" :chartData="chartData.productClassData"
                  :chartWidth="chartData.chartWidth">
                </pie-chart>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
              <span class="tips"></span>
              <span class="rdx-font-20">商品一级分类浏览量分布</span>
            </div>
            <bar-chart v-if="chartData.livingData.date!=''" chartId="living" :chartData="chartData.livingData" :chartWidth="chartData.chartWidth"></bar-chart>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-60">
              <span class="tips"></span>
              <span class="rdx-font-20">达人列表</span>
            </div>
            <goods-class @onTalent="handleStar" classShow='2'></goods-class>
            <div class="flex align-center flex align-center">
              <span class="rdx-font-14 rdx-m-t-4">高级筛选：</span>
              <p class="rdx-m-l-20">
                <span class="rdx-font-14 rdx-tips-color">粉丝数</span>
                <el-select v-model="screen.follower" @change="clickFollower" placeholder="不限" class="rdx-m-l-26"
                  style="width: 100px;height: 24px;">
                  <el-option v-for="item in searchConditions.followers" :key="item.key" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </p>
              <p class="rdx-m-l-28">
                <span class="rdx-font-14 rdx-tips-color">带货口碑</span>
                <el-select v-model="screen.reputationLevel" @change="clickRepLevel" placeholder="不限" class="rdx-m-l-26"
                  style="width: 100px;height: 24px;">
                  <el-option label="不限" value=""></el-option>
                  <el-option v-for="item in searchConditions.reputationLevel" :key="item.key" :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </p>
            </div>
            <el-table :data="tableData" stripe class="w-100 rdx-m-t-20">
              <template slot="empty">
                <no-data marginTop="0" style="margin-top: 20px;"></no-data>
              </template>
              <el-table-column prop="talent" label="达人">
                <template slot-scope="{ row }" class="flex align-center">
                  <div class=" rdx-m-l-8 flex ">
                    <img :src="row.avatar" class="round" style="width: 62px;height: 62px;"/>
                    <div class="rdx-m-l-16 align-center ">
                      <div class="flex align-center">
                        <span class="flex">{{row.brand_name}}</span>
                        <img src="../../assets/imgs/code.png" class="rdx-m-l-16 flex rdx-m-t-6"
                          style="width: 14px; height: 14px;" />
                        <div style="width: 42px; height: 18px; background-color: #FFBD76;text-align: center;"
                          class="flex rdx-radius-9 rdx-m-l-8 rdx-m-t-4 position-re">
                          <span class="rdx-font-12 position-ab" style="color: #FF9018; top: -2px; right: 24%;">直播</span>
                        </div>
                        <img src="../../assets/imgs/search_ico_4.png" class="rdx-m-l-6 flex rdx-m-t-6"
                          style="width: 14px;height: 14px;" />
                      </div>
                      <div class="align-center flex rdx-m-t-16">
                        <span class="flex rdx-font-14 rdx-tips-color">抖音号： woyebuzhidao</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="follower_count" label="粉丝数" align="center" width="120">
              </el-table-column>
<!--              <el-table-column prop="takeGoods" label="带货口碑" align="center" width="120">
              </el-table-column>
              <el-table-column prop="productsPromoted" label="推广商品数" align="center" width="130">
              </el-table-column> -->
              <el-table-column prop="aweme_count" label="关联视频" align="center" width="120">
              </el-table-column>
              <el-table-column prop="live_count" label="关联直播" align="center" width="120">
              </el-table-column>
              <el-table-column prop="interactiveQuantity" label="互动量" align="center" width="120">
              </el-table-column>
              <el-table-column prop="volume" label="商品销售量(件)" align="center" width="150">
              </el-table-column>
              <el-table-column prop="amount" label="商品销售额" align="center" width="120">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-show="show.tabIndex == 3">
          <div class="item-bg flex flex-direction">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-60">
              <span class="tips"></span>
              <span class="rdx-font-20">商品分析</span>
            </div>
            <goods-class @onProduct="handleProductCate" classShow='1'></goods-class>
            <el-table :data="productData" stripe>
              <template slot="empty">
                <no-data marginTop="0"></no-data>
              </template>
              <el-table-column prop="product" class="" label="商品">
                <template slot-scope="{ row }" class="flex align-center">
                  <div class="rdx-m-l-8 flex align-center">
                    <img :src="row.image" class="img" style="width: 62px;height: 62px;" />
                    <div class="rdx-m-l-16 align-center ">
                      <span class="flex">{{row.title}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="max_commission_rate" label="佣金比例" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.max_commission_rate}}%</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="销售额" align="center" width="120">
              </el-table-column>
              <el-table-column prop="volume" label="销售量" align="center" width="120">
              </el-table-column>
              <el-table-column prop="views" label="近30天浏览量" align="center" width="150">
              </el-table-column>
              <el-table-column prop="conversionRate" label="近30天转化率" align="center" width="150">
              </el-table-column>
              <el-table-column prop="associationTalent" label="关联达人" align="center" width="120">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 4">
          <div class="item-bg flex flex-direction">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-40">
              <span class="tips"></span>
              <span class="rdx-font-20">互动分析</span>
            </div>
            <div class="flex align-end justify-end">
              <span class="rdx-tips-color rdx-p-r-10">累计点赞数</span>
              <span>{{val.likeAll}}w</span>
              <span class="rdx-tips-color rdx-p-l-40 rdx-p-r-10">累计评论数</span>
              <span>{{val.commentAll}}w</span>
            </div>
            <interact-chart :explainParams="brandId" :startDate="startDate" :endDate="endDate"></interact-chart>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="rdx-m-t-10">
              <el-radio-group v-model="val.time" @change="changeTime">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">15天</el-radio-button>
                <el-radio-button label="3">30天</el-radio-button>
                <el-radio-button label="4">90天</el-radio-button>
                <el-radio-button label="5">180天</el-radio-button>
              </el-radio-group>
            </div>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-40">
              <span class="tips"></span>
              <span class="rdx-font-20">观众画像</span>
            </div>
            <div class="flex justify-between rdx-m-t-46">
              <div class="flex flex-direction rdx-flex-1 rdx-p-r-26">
                <div class="flex">
                  <div class="flex rdx-m-r-40 rdx-font-14">性别占比</div>
                  <div class="flex align-center rdx-p-tb-30 rdx-p-t-10 position-re rdx-flex-1 rdx-p-r-20"
                    style="text-align: center;">
                    <i class="iconfont icon-e60c position-ab rdx-font-20"
                      style="color: #4a96fa; left: 0px; top: 0px;"></i>
                    <div class="man position-re">
                      <div class="position-ab man-item" :style="'width: ' + male + '%;'"></div>
                    </div>
                    <i class="iconfont icon-e602 position-ab rdx-font-20"
                      style="color: #FF6968; right: 20px; top: 0px;"></i>
                    <div class="flex justify-between position-ab w-100 rdx-p-r-20" style="bottom: 0px;">
                      <span>{{male}}%</span>
                      <span>{{faMale}}%</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-direction rdx-m-t-80">
                  <span class="rdx-font-14">年龄占比</span>
                  <div class="flex position-re">
                    <div id="age" style="width: 100%; height: 300px;"></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-direction rdx-flex-1 rdx-p-l-26">
                <span class="rdx-font-14">地域占比</span>
                <div class="tab-width position-re rdx-font-14 rdx-m-t-40" style="width: 134px;">
                  <div :class="val.mapIndex == 1 ? 'active' : 'active-out'"
                    style="bottom: -1px; left: 0px; width: 66px;" @click="tapMap('1')">省</div>
                  <div :class="val.mapIndex == 2 ? 'active' : 'active-out'"
                    style="bottom: -1px; right: 0px; width: 66px;" @click="tapMap('2')">市</div>
                </div>
                <div class="flex justify-between">
                  <div class="flex rdx-flex-8 rdx-m-t-20">
                    <map-chart :roomId="roomId"></map-chart>
                  </div>
                  <div class="flex rdx-flex-4 flex-direction rdx-p-l-30 rdx-p-t-50">
                    <div class="rdx-font-14 rdx-p-b-10" v-if="proCity!=''" v-for="(item,index) in proCity" :key="index">
                      {{item.title}} {{item.rate}}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>



      </div>
    </div>
    <top-up></top-up>
  </div>
</template>

<script>
  import lineChart from "@/components/lineChart.vue";
  import noData from "@/components/noData.vue"
  import pieChart from "@/components/pieChart.vue"
  import barChart from "@/components/barChart.vue"
  import goodsClass from '../../components/goodsClass.vue'
  import Avatar from 'vue-avatar'
  import interactChart from "./components/interactChart.vue"
  import top from '@/layout/components/Top.vue'
  import mapChart from './components/mapChart.vue'
  import topUp from '@/components/toUp.vue'
  import {
    searchConditionsUrl
  } from '@/api'
  import * as tools from '@/common/tools.js';
  export default {
    components: {
      noData,
      pieChart,
      barChart,
      lineChart,
      goodsClass,
      Avatar,
      interactChart,
      top,mapChart,topUp
    },
    data() {
      return {
        chartData: {
          talentClassData: {}, //最常推广品类Top5
          productClassData: {}, //商品分类占比
          fansData: {}, //互动情况分析
          ageData: {}, //年龄分布
          formatter: '{a} <br/>{b} : {c}%', //饼状图鼠标划入显示数据
          livingData: {}, //商品一级分类浏览量分布
          legendShow: false,
          labelShow: true,
          sourceWidth: {
            width: "100%",
            height: "420px"
          },
          ageWidth: {
            width: "100%",
            height: "300px"
          },
          chartWidth: {
            width: "300",
            height: "350px"
          }
        },
        show: {
          putawayShow: false, //上架弹窗
          explainShow: false, //讲解弹窗
          onLineIndex: '1', //在线分析tab
          trueShow: false,
          chartShow: false,
          tabIndex: '1'
        },
        productAllShow: false,
        searchConditions: {},
        proCity: [],
        cityVal: "1", //省市
        male: '',
        faMale: '',
        tableData: [],
        productData: [],
        productAllShow: false, //商品收起
        starAllShow: false, //达人收起
        val: {
          lineCheck: ['1', '2', '3'],
          time: "1", //时间段
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
          likeAll: 0, //累计点赞数
          commentAll: 0 ,//累计评论数
          mapIndex:'1'
        },
        screen: {
          follower: '不限',
          reputationLevel: '不限',
        },
        fansList: [{
          value: '0',
          label: '全部'
        }],
        getData: {
          brandDatas: {},
          goodsCategoryData: [],
          dhTalentData: [],
          goodsData: [],
          OverviewData: [],
        },
        params: {
          page: 1,
          size: 10,
          category: ''
        },
        brandId: '', //品牌Id
        goodsCategory: [],
        talentCategory: [],
        talentParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          keyword: '',
          category: '',
        },
        goodsParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          keyword: '',
          bigCategory: '',
        },
        endDate: '', //结束日期
        startDate: '', //开始日期
        genders: [], //性别（男，女）
        talentTotal: 0, //达人分页总条数
        goodsTotal: 0, //商品分页总条数
        fansAnaly: [], //分数画像年龄分布数据
      }
    },
    created() {
      this.brandId = this.$route.query.id
      this.initialTime()
      this.getDoodClassData()
      this.getClassData()
      this.getCategoryOverview()
      this.getDetail()
      this.getAuthorAnalyse()
      this.getCommodityAnalyse()
      this.getFansData()
      this.getCate()
    },
    mounted() {},
    methods: {
      //点击复制
      copy(text) {
        tools.copy(text)
      },
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
        if(index == 4){
          this.getFansData()
        }
      },
      //达人列表分页数据
      handleTalentSizeChange(val) {
        this.talentParams.page = 1
        this.talentParams.size = val
        this.getAuthorAnalyse()
      },
      handleTalentCurrentChange(val) {
        this.talentParams.page = val
        this.getAuthorAnalyse()
      },
      //商品列表分页数据
      handleGoodsSizeChange(val) {
        this.goodsParams.page = 1
        this.goodsParams.size = val
        this.getCommodityAnalyse()
      },
      handleGoodsCurrentChange(val) {
        this.goodsParams.page = val
        this.getCommodityAnalyse()
      },
      //默认将首个字符串生成头像背景颜色
      extra(name) {
        var temp = [];
        temp.push("#");
        for (var i = 0; i < name.length; i++) {
          temp.push(parseInt(name[i].charCodeAt(0), 10).toString(16));
        }
        return temp.slice(0, 5).join('').slice(0, 4)
      },
      //获取品牌信息
      async getDetail() {
        var param = {
          "brandId": this.brandId,
        }
        const {
          data
        } = await this.$get('/api/brand/detail/detail', param)
        if (data != undefined) {
          this.getData.brandDatas = data
          if (this.getData.brandDatas.brand_icon == '') {
            this.getData.brandDatas.brand_img = this.getData.brandDatas.brand_name.substr(0, 1)
          }
          this.getData.brandDatas.total_amount = tools.numberVerify(this.getData.brandDatas.total_amount) //30天销售额
          this.getData.brandDatas.total_volume = tools.numberVerify(this.getData.brandDatas.total_volume) //30天销量
          this.getData.brandDatas.interaction = tools.numberVerify(this.getData.brandDatas.interaction) //30天互动量
          this.getData.brandDatas.total_product_num = tools.numberVerify(this.getData.brandDatas
            .total_product_num) //30天推广商品数
          this.getData.brandDatas.author_count = tools.numberVerify(this.getData.brandDatas.author_count) //30天关联达人
          this.getData.brandDatas.video_count = tools.numberVerify(this.getData.brandDatas.video_count) //30天关联视频
          this.getData.brandDatas.live_count = tools.numberVerify(this.getData.brandDatas.live_count) //30天关联直播
          this.getData.brandDatas.update_time = tools.getDateDiff(this.getData.brandDatas.update_time) //30天关联直播
        }
      },
      //获取达人列表数据
      async getAuthorAnalyse() {
        var param = {
          "brandId": this.brandId,
          "category": this.talentParams.category,
          "followerCount": this.talentParams.followerCount,
          "keyword": this.talentParams.keyword,
          "sort": this.talentParams.sort,
          "orderBy": this.talentParams.order,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "reputationLevel": this.talentParams.reputationLevel,
          "page": this.talentParams.page,
          "size": this.talentParams.size,
        }
        const {
          data
        } = await this.$get('/api/brand/detail/authorAnalyse', param)
        console.log('111qq', data)
        if (data != undefined) {
          this.tableData = data.list
          this.talentCategory = data.category
          this.talentTotal = data.page_info && data.page_info.total //分页
          console.log('7878', this.talentTotal)
        }

      },
      //商品分析
      async getCommodityAnalyse() {
        var param = {
          "brandId": this.brandId,
          "keyword": this.goodsParams.keyword,
          "sort": this.goodsParams.sort,
          "orderBy": this.goodsParams.order,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "page": this.goodsParams.page,
          "size": this.goodsParams.size,
          "bigCategory": this.goodsParams.bigCategory,
        }
        const {
          data
        } = await this.$get('/api/brand/detail/commodityAnalyse', param)
        console.log('1112', data)
        if (data != undefined) {
          this.goodsCategory = data.category
          this.productData = data.list
          this.productData.forEach((item) => {
            item.max_commission_rate = item.max_commission_rate + '%'
          })
          this.goodsTotal = data.page_info && data.page_info.total //分页
        }
      },
      //粉丝数点击
      clickFollower(e) {
        this.talentParams.followerCount = e
        this.getAuthorAnalyse()
      },
      //口碑点击
      clickRepLevel(e) {
        this.talentParams.reputationLevel = e
        this.getAuthorAnalyse()
      },
      //商品分类
      handleProductCate(name) {
        console.log('1qqq', name)
        this.goodsParams.bigCategory = name
        this.getCommodityAnalyse()
      },
      //达人分类
      handleStar(name) {
        this.talentParams.category = name
        this.getAuthorAnalyse()
      },
      //点击省市
      tapMap(index) {
        this.val.mapIndex = index
        if (index == 1) {
          this.proCity = this.territory
        } else {
          this.proCity = this.citys
        }
      },
      //获取粉丝地域分布
      async getFansData() {
        var param = {
          "brandId": this.brandId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/brand/detail/fansPicture', param)
        console.log('ssd', data)
        if (data != undefined) {
          this.territory = data.province
          this.citys = data.city
          this.genders = data.gender
          if (this.genders != null) {
            this.male = this.genders[0].rate.toFixed(2)
            this.faMale = this.genders[1].rate.toFixed(2)
          }

          this.territory = this.territory.slice(0, 10)
          for (let i = 0; i < this.territory.length; i++) {
            this.territory[i].rate = this.territory[i].rate.toFixed(2)
          }
          this.proCity = this.territory
          this.citys = this.citys.slice(0, 10)
          for (let i = 0; i < this.citys.length; i++) {
            this.citys[i].rate = this.citys[i].rate.toFixed(2)
          }

          this.fansAnaly = data.age
          let listX = [];
          let listY = []
          this.fansAnaly.forEach((item) => {
            listX.push(item.title + '岁')
            listY.push(item.rate.toFixed(2))
          })
          
          var chartDom = document.getElementById('age')
          var myChart = this.$echarts.init(chartDom)
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
              right: 20,
              left: 0,
              bottom: 0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              // data: lists.name
              data: listX
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              // data: lists.value,
              data: listY,
              type: 'bar',
              barWidth: 20
            }]
          })
        }
      },
      //年龄分析
      async getAge() {
        const {
          data
        } = await this.$get('/api/live/detail/fansAnalysis')
        this.fansAnaly = data.age
        //console.log('2',this.getData.fansAnaly)
        let lists = [];
        this.fansAnaly.forEach((item) => {
          lists.push({
            name: item.title + '岁',
            value: item.rate.toFixed(2)
          })
        })
        this.chartData.ageData.title = ''
        this.chartData.ageData.name = '年龄分布'
        this.chartData.ageData.color = ['#E60012', '#FF3E34', '#FF6334', '#FFBD76']
        this.chartData.ageData.data = lists
      },
      //
      async getFans() {
        var param = {
          "brandId": this.brandId,
          "startTime": this.startDate,
          "endTime": this.startDate
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansClubAnalysis', param)
        this.fansTrend = data
        let listDate = [];
        let listNum = [];
        this.fansTrend.fans_club_analysis.forEach((item) => {
          item.crawl_time = tools.time_cycle(4, item.crawl_time)
          listDate.push(item.crawl_time)
          listNum.push(item.today_new_fans_count)
        })
        console.log("11", data)
        this.chartData.fansData.date = listDate
        this.chartData.fansData.data = [{
          areaStyle: {
            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255,189,118,1)'
            }, {
              offset: 1,
              color: 'rgba(255,255,255,1)'
            }])
          },
          data: listNum,
          type: 'line',
          smooth: true
        }]
      },
      //商品一级浏览量分布
      async getCategoryOverview() {
        var param = {
          "brandId": this.brandId,
          "startTime": this.startDate,
          "endTime": this.startDate
        }
        const {
          data
        } = await this.$get('/api/brand/detail/categoryOverview', param)
        if (data != undefined) {
          this.getData.OverviewData = data
          var category = [];
          var visitNum = [];
          this.getData.OverviewData.forEach((item) => {
            category.push(item.category)
            visitNum.push(item.visit_num)
          })
          this.chartData.livingData.dataX = category
          this.chartData.livingData.dataY = visitNum
          // this.chartData.livingData.dataX = ['黄金','珠宝','首饰','项链','戒指','手链','耳环',]
          // this.chartData.livingData.dataY = [120, 200, 150, 80, 70, 110, 130]
        }
      },
      //带货达人分类占比
      async getDoodClassData() {
        var param = {
          "brandId": this.brandId,
          "startTime": this.startDate,
          "endTime": this.startDate
        }
        const {
          data
        } = await this.$get('api/brand/detail/amountAndCount', param)
        this.getData.dhTalentData = data.amount
        let list = [];
        this.getData.dhTalentData.forEach((item) => {
          list.push({
            name: item.title,
            value: item.rate
          })
        })
        // this.chartData.talentClassData.name = '达人分类TOP5'
        //this.chartData.talentClassData.title = '达人分类TOP5'
        this.chartData.talentClassData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334'],

          this.chartData.talentClassData.data = list
      },
      //商品分类占比
      async getClassData() {
        var param = {
          "brandId": this.brandId,
          "startTime": this.startDate,
          "endTime": this.startDate
        }
        const {
          data
        } = await this.$get('api/brand/detail/amountAndCount', param)

        this.getData.goodsCategoryData = data.count
        let list = [];
        this.getData.goodsCategoryData.forEach((item) => {
          list.push({
            name: item.title,
            value: item.rate
          })
        })
        // this.chartData.productClassData.name = '商品分类TOP5'
        //this.chartData.productClassData.title = '商品分类TOP5'
        this.chartData.productClassData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334'],

          this.chartData.productClassData.data = list

      },
      //初始时间
      initialTime() {
        this.val.timeBengin = this.fun_date(-7).split('_')[0]
        this.val.timeEnd = this.fun_date(-7).split('_')[1]
        this.startDate = this.val.timeBengin.replace(/-/g, '')
        this.endDate = this.val.timeEnd.replace(/-/g, '')
      },
      //点击时间段
      changeTime(val) {
        if (val == 1) {
          this.val.timeBengin = this.fun_date(-7).split('_')[0]
          this.val.timeEnd = this.fun_date(-7).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 2) {
          this.val.timeBengin = this.fun_date(-15).split('_')[0]
          this.val.timeEnd = this.fun_date(-15).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 3) {
          this.val.timeBengin = this.fun_date(-30).split('_')[0]
          this.val.timeEnd = this.fun_date(-30).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 4) {
          this.val.timeBengin = this.fun_date(-90).split('_')[0]
          this.val.timeEnd = this.fun_date(-90).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 5) {
          this.val.timeBengin = this.fun_date(-180).split('_')[0]
          this.val.timeEnd = this.fun_date(-180).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        }
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
      getAll() {
        this.getDoodClassData()
        this.getClassData()
        this.getAuthorAnalyse()
        this.getCommodityAnalyse()
        this.getCategoryOverview()
      },
      //筛选条件
      async getCate() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      jumpUrl(id) {
        this.$router.push({
          path: "/goods/goods_detail",
          query: {
            id: id
          }
        })
      },
      //粉丝分类
      handleFollowCate(id) {
        this.talentParams.followerCount = id
        this.getDaren()
      },
      //达人分类
      handleTalentCate(id) {
        this.talentParams.category = id
        this.getDaren()
      },
      //口碑
      handleReputationCate(id) {
        this.talentParams.reputationLevel = id
        this.getDaren()
      },
      //获取视频数据
      async getVideoOrder() {
        this.videoCur = []
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add
        if (this.totalIncr != '') {
          this.videoCur = this.totalIncr
          let list1 = [];
          let list2 = [];
          this.videoCur.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.aweme_volume)
          })
          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('videoOrder'));
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
              top: 30,
              bottom: 40,
              left: 50,
              right: 30
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
          })
        } else {
          this.show.dataShow = true
        }
      },
      onSearch(e) {
        this.params.keyword = this.search.keyword
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "./shopShow.scss";
</style>
