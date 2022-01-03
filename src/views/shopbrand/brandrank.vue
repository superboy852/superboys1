<template>
  <div class="box">
    <div class="select-box2">
      <div class="flex justify-between align-center">
        <search-item @clickKey='clickKey' searchType="5" searchPlaceholder="请输入品牌关键词"></search-item>
      </div>

      <div class="flex justify-between">
        <date-day @dateVal="dateVal" style="margin-top: -5px;"></date-day> <!-- 日周月 -->
        <!-- <div class="button-a rdx-p-t-10 rdx-p-b-10 rdx-p-l-28 rdx-p-r-28 font-strong rdx-primary rdx-font-16 rdx-radius-20" style="border: 1px solid #DD001B;">
          导出
        </div> -->
      </div>
      <goods-class @onProduct="handleProductCate" classShow='1' class="rdx-p-t-5"></goods-class>
    </div>
    <div class="select-box align-center">
      <span class="name">高级筛选：</span>
      <span class="select_title">商品来源：</span>
      <el-select @change="clickPlatfoms" v-model="params.platfoms" placeholder="请选择" size="mini" class="rdx-m-r-20">
        <el-option v-for="item in platfomsBL" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>

      <span class="select_title">佣金比例：</span>
      <el-select @change="loadData()" v-model="params.tbMaxCommissionRate" size="mini" placeholder="请选择"
        class="rdx-m-r-20">
        <el-option v-for="item in searchConditions.tbMaxCommissionRate" :key="item.key" :label="item.value"
          :value="item.key"> </el-option>
      </el-select>
      </span>
    </div>

    <el-table v-loading="loading" :data="tableData" class="sticky-head" @sort-change="handlesortChange"
      @row-click="jumpurl">
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
      <el-table-column label="品牌">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-three">
            <Avatar v-if="row.brand_logo==''" :username="row.brand_name" :src="row.brand_name" :background-color="extra(row.brand_name)" color="#fff" :inline="true"></Avatar>
             <img :src="row.brand_logo" alt class="round" style="width: 50px;height: 50px;min-width: 50px;" v-if="row.brand_logo!=''" />


            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4">{{ row.brand_name }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="month_order_count" sortable="custom" label="昨日销量(件)" width="150">
      </el-table-column>
      <el-table-column align="center" prop="amount" sortable="custom" label="销售额" width="120"></el-table-column>
      <el-table-column align="center" prop="product_count" sortable="custom" label="商品数" width="130"></el-table-column>
      <el-table-column align="center" prop="aweme_count" sortable="custom" label="关联视频" width="130"></el-table-column>
      <el-table-column align="center" prop="live_count" sortable="custom" label="关联直播" width="130"></el-table-column>
      <el-table-column align="center" label="品牌类目" width="150">
        <template slot-scope="{row}">
          <span v-for="(labelS,index) in row.label" :key="index">{{labelS}} <block v-if='row.label.length != index + 1'>,</block> </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10" v-if="show.tableFoot=='-1' && tableData !='' ">
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
</template>
<script>
  import {
    brandRankUrl,
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
  import dateDay from '@/components/dateDay.vue'
  import Avatar from 'vue-avatar'
  export default {
    components: {
      searchItem,
      noData,
      dateDay,
      goodsClass,
      Avatar
    },
    data() {
      return {
        search: '',
        isChoose: true,
        optionvalue: '',
        productAllShow: false,
        dataUpdateTime: '2021-08-26 12:12',
        searchConditions: {},
        isCategoryAll: false,
        isTagAll: false,
        total: 0,
        params: {
          page: 1,
          size: 10,
          category: ''
        },
        tableData: [],
        platfomsBL: [],
        loading: false,
        show: {
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop: false,
        }
      }
    },
    computed: {
      ...mapGetters(['tokenOk', 'token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      //this.brandrankData()
      this.loadData()
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
      //默认将首个字符串生成头像背景颜色
      extra(name){
        var temp = [];
        temp.push("#");
        for (var i = 0; i < name.length; i++) {
          temp.push(parseInt(name[i].charCodeAt(0),10).toString(16));
        }
        return temp.slice(0,5).join('').slice(0,4)
      },
      //时间值获取
      dateVal(val) {
        this.params.day = val.day
        this.params.dayType = val.dayType
        this.brandrankData()
      },
      //跳转页面
      jumpurl(e) {
        var url = this.$router.resolve({path: '/shop/brand_detail',query: {id: e.brand_id}})
        window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",
        })
      },
      //筛选条件数据
      async loadData() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
        this.platfomsBL = data.platfom
        this.tbMaxCommissionData = data.tbMaxCommissionRate
        //console.log(data)
      },
      //展示数据
      async brandrankData() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get(brandRankUrl, this.params)
        this.tableData = []
        if (data != undefined) {
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
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
        this.params.category = id
        this.brandrankData()
      },
      //获取分页
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.brandrankData()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.brandrankData()
      },
      //点击搜索
      clickKey(e) {
        this.params.keyword = e
        this.brandrankData()
      },
      //商品来源
      clickPlatfoms(val) {
        this.params.platfom = val
        this.brandrankData()
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
        this.brandrankData()
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
        } = await this.$get(brandRankUrl, this.params)
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
        console.log("this.tableData", this.tableData, this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
</style>
