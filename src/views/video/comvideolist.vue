<template>
  <div class="box">
    <el-input v-model="params.keyword" @change="clickKeyWord" size="medium" placeholder="请输入视频链接、关键词、标题或热词试试"
      class="top-search">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <div class="select-box">
      <div class="date-line flex">
        <el-radio-group v-model="chooseVal">
          <el-radio-button label="1">日榜</el-radio-button>
          <el-radio-button label="2">周榜</el-radio-button>
        </el-radio-group>
        <div class="rdx-m-l-20" v-if="chooseVal == '1'">
          <el-date-picker v-model="params.day" type="date" value-format="yyyyMMdd" placeholder="选择日期"
            @change="changeDate"> </el-date-picker>
        </div>
        <div class="rdx-m-l-20" v-if="chooseVal == '2'">
          <el-date-picker v-model="params.week" type="week" format="yyyy 第 WW 周" value-format="yyyy/MM/dd"
            placeholder="选择周" @change="changeWeek"> </el-date-picker>
        </div>
      </div>
    </div>
    <div class="select-box">
      <span class="name">带货分类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
        <div class="rdx-m-b-10" :class="['select-item', params.product_category ? '' : 'active']">全部</div>
        <div class="rdx-m-b-10 rdx-m-l-10"
          :key="product.id"
          v-for="product in category"
          :class="['select-item', params.category === product.id ? 'active' : '']"
          @click="handleProductCate(product.id)"
        >
          {{ product.catName }}
        </div>
      </div>
      <i
        class="rdx-m-t-4 rdx-pointer"
        :class="[productAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
        @click="productAllShow = !productAllShow"
      ></i>
    </div>
    <el-table :data="tableData">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column align="center" label="排行" type="index" width="100">
        <template slot-scope="scope">
          <img v-if="scope.$index == 0" class="order" src="../../assets/imgs/first.png" alt="" />
          <img v-if="scope.$index == 1" class="order" src="../../assets/imgs/second.png" alt="" />
          <img v-if="scope.$index == 2" class="order" src="../../assets/imgs/third.png" alt="" />
          <i class="rank-text" v-if="scope.$index > 2 && scope.$index < 9">0{{ scope.$index + 1 }}</i>
          <i class="rank-text" v-if="scope.$index > 2 && scope.$index >= 9">{{ scope.$index + 1 }}</i>
        </template>
      </el-table-column>
      <el-table-column label="视频内容" min-width="450">
        <template slot-scope="{row}">
          <div class="info rdx-flex">
            <img class="xiaodianImg button-a" :src="row.aweme_info.aweme_cover" @click="linkShow(row.aweme_info.aweme_id)">
            <div class="rdx-flex-col rdx-m-l-10 rdx-flex-1">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 color-blue rdx-font-16 button-a" @click="linkShow(row.aweme_info.aweme_id)">{{row.aweme_info.aweme_title}}</span>
                <span class="name rdx-m-r-4 rdx-font-14 rdx-warning-dark rdx-p-t-12">关联商品：{{row.products.product_title}}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="播主" min-width="200">
        <template slot-scope="{ row }">
          <div class="info rdx-flex">
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 color-blue">{{ row.aweme_info.nick_name }}</span>
              </div>
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 rdx-tips-color rdx-font-14 rdx-p-t-12">{{row.aweme_info.aweme_create_time}}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.brand" label="品牌" width="100"></el-table-column>
      <el-table-column align="center" prop="aweme_info.yesterday_user_count_incr" sortable label="商品抖音访客量/昨日增量"
        width="250"></el-table-column>
      <el-table-column align="center" prop="aweme_info.aweme_digg_count" sortable label="视频点赞" width="120">
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.product_volume_incr" sortable label="商品全网销售/全网增量" width="220">
      </el-table-column>
      <el-table-column align="center" prop="amount2" label="操作" width="150">
        <template slot-scope="{row}">
          <div @click="linkShow(row.aweme_info.aweme_id)" class="rdx-flex button-a" style="float: left;">
            <img src="@/assets/imgs/video_1.png" class="czxz" />
          </div>
          <div @click="linkShow(row.aweme_info.aweme_id)" class="rdx-flex button-a">
            <img src="@/assets/imgs/video_2.png" class="czxz" />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {
    hotAwemeUrl
  } from '@/api'
  import * as tools from '@/common/tools.js';
  export default {
    data() {
      return {
        isCategoryAll: false,
        pastChoose: ['2小时', '6小时', '12小时', '24小时', '近3天', '近7天', '近15天', '近30天', '近60天', '近90天'],
        isvip: 'vip0',
        params: {
          page: 1,
          size: 10,
          product_category: '',
        },
        productAllShow: false,
        chooseVal: '1',
        category: [], //一级分类
        tableData: [],
      }
    },
    mounted() {
      this.tableList()
      this.getCategory()
    },
    methods: {
      //获取分类
      async getCategory(){
        const {
          data
        } = await this.$get('/api/common/searchConditions', this.params)
        this.category = data.productCategory
        console.log("1",this.category)
      },
      //获取带货视频排行榜数据
      async tableList() {
        const {
          data
        } = await this.$get('/api/video/awemeTakeProduct', this.params)
        this.tableData = data.list
        console.log("2",this.params)
      },
      //获取分页数据(重新加载分页数据)
      async pageChange(page) {
        this.params.page = page
        this.tableList()
      },
      //获取日期
      changeDate(val) {
        this.params.daytype = "day"
        this.params.day = val
        this.tableList()
      },
      //获取周
      changeWeek(val) {
        this.params.daytype = "week"
        var date1 = new Date(val),
          time1 = date1.getFullYear() + "" + (date1.getMonth() + 1) + "" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 7); //加7天
        var time2 = date2.getFullYear() + "" + (date2.getMonth() + 1) + "" + date2.getDate();
        this.params.day = time1 + '-' + time2
        this.tableList()
      },
      //获取关键字数据
      clickKeyWord(e) {
        this.params.keyword = e
        this.tableList()
      },
      handleProductCate(id) {
        this.params.product_category = id
        this.tableList()
      },
      //跳转到详情页
      linkShow(id){
        var url = this.$router.resolve({path: '/video/video_detail',query: {id: id}})
        window.open(url.href, '_blank')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .xiaodianImg {
    width: 120px;
    height: 140px;
    border-radius: 10px;
  }
  .order {
    height:36px !important;
    width: 26px !important;
  }

  .block {
    height: 50px;
    text-align: center;
    margin-left: 50px;
    line-height: 50px;
    overflow: visible !important;
  }

  .isvip>img {
    width: 1574px;
    height: 110px;
  }

  .block {
    line-height: 50px;
    text-align: center;
    margin-left: 50px;
  }

  .pricenow {
    color: $rdx-primary;
  }

  .footer {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }

  .czxz {
    width: 46px;
    height: 46px;
    margin-left: 10px;
  }

  .rel {
    width: 295px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Semilight;
    font-weight: 350;
    text-align: left;
    color: #ffcb18;
    line-height: 40px;
  }

  .videobt {
    width: 288px;
    opacity: 1;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #414aff;
    line-height: 30px;
  }

  @import "../../assets/styles/list.scss";
</style>
