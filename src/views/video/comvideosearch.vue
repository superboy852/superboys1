<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' searchType="2" searchPlaceholder="请输入视频关键词"></search-item>
      <goods-class @onProduct="handleProductCate" classShow='1' style="margin-top: -5px;"></goods-class>
    </div>
    <div class="select-box">
      <span class="name">更多筛选：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <div class="rdx-m-r-12" :key="index" v-for="(screen,index) in gdsx"
          :class="['select-item', gend === screen ? 'active' : '']" @click="handlegdsx(index,screen)">
          {{ screen }}
        </div>
      </div>
    </div>

    <div class="select-box">
      <el-radio-group v-model="tabPosition"
        @change="pastChooseClick">
        <el-radio-button v-for="(past,index) in pastChoose" :key="index" :label="past">{{past}}</el-radio-button>
      </el-radio-group>
    </div>

    <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" class="rdx-m-t-10">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column label="视频内容">
        <template slot-scope="{ row }">
          <div class="info rdx-flex">
            <img class="rectangleHead button-a" :src="row.aweme_info.aweme_cover">
            <div class="rdx-flex-col rdx-m-l-10 rdx-flex-1">
              <div class="rdx-flex flex-wrap">
                <div class="name rdx-m-r-4 color-blue rdx-font-16 button-a" @click="linkVideo(row.aweme_info.aweme_id)">
                  {{ row.aweme_info.aweme_title }}
                </div>
              </div>
              <div>
                <div class="rdx-m-r-4 rdx-font-13 rdx-tips-color">
                  关联商品：{{row.products.product_title}}</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="播主" align="center" width="150">
        <template slot-scope="{ row }">
          <div class="info flex flex-direction">
            <div class="name rdx-m-r-4 color-blue">{{row.author_info.nickname}}</div>
            <div class="rdx-m-r-4 rdx-tips-color rdx-font-14">{{row.aweme_info.aweme_create_time}}</div>

          </div>
          <!-- <div class="info rdx-flex info-two">
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 color-blue">11</span>
              </div>
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 rdx-tips-color rdx-font-14">{{row.aweme_info.aweme_create_time}}</span>
              </div>
            </div>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.brand" label="品牌" width="120"></el-table-column>
      <el-table-column align="center" prop="aweme_info.yesterday_user_count_incr" sortable="custom" label="商品抖音访客量/昨日增量"
        width="220"></el-table-column>
      <el-table-column align="center" prop="aweme_info.aweme_digg_count" sortable="custom" label="视频点赞" width="120">
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.product_volume_incr" sortable="custom" label="商品全网销售/全网增量"
        width="190">
      </el-table-column>
      <el-table-column align="center" prop="amount2" label="操作" width="100">
        <template slot-scope="{ row }">
          <div class="flex w-100 justify-center">
            <el-tooltip effect="dark" content="视频详情" placement="bottom">
               <span class="tiktok-buttonA flex align-center justify-center" @click="linkVideo(row.aweme_info.aweme_id)">
                 <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
               </span>
            </el-tooltip>
            <el-tooltip effect="dark" content="达人详情" placement="bottom">
               <span class="tiktok-buttonD flex align-center justify-center rdx-m-l-10" @click="linkTalent(row.author_info.author_id)">
                 <i class="iconfont icon-e634 rdx-light-color"></i>
               </span>
            </el-tooltip>
          </div>
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
        isCategoryAll: false,
        productAllShow: false,
        pastChoose: ['2小时', '6小时', '12小时', '24小时', '近3天', '近7天', '近15天', '近30天', '近60天', '近90天'],
        total: 3,
        params: {
          page: 1,
          size: 10,
          productCategory: '',
          keyword: '',
          day: '',
        },
        category: [], //一级分类
        gdsx: [
          '视频数据',
          '商品数据'
        ],
        gend: '视频数据',
        tabPosition: '近30天',
        tableData: [],
        option_data: '1',
        product_category: '',
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
      this.params.day = this.dates(30*24);
      this.tableList()
      this.getCategory()
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
      //获取带货视频排行榜数据
      async tableList() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get('/api/video/awemeTakeProductSearch', this.params)
        this.tableData = []
        if (data != undefined) {
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item)=>{
            item.aweme_info.aweme_create_time  = tools.getDateDiff(item.aweme_info.aweme_create_time)
            item.aweme_info.aweme_digg_count  = tools.numberVerify(item.aweme_info.aweme_digg_count)  //点赞
            item.aweme_info.product_volume_incr  = tools.numberVerify(item.aweme_info.product_volume_incr) //全网增量
            item.aweme_info.yesterday_user_count_incr  = tools.numberVerify(item.aweme_info.yesterday_user_count_incr) //昨日增量
          })

          this.total = Number(data.page_info && data.page_info.totalCount)
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
      //获取时间
      dates(time) {
        var newTime = new Date(new Date().getTime() - time * 60 * 60 * 1000);
        var nowTime = new Date(newTime);
        var m = nowTime.getMonth() + 1;
        m=m < 10 ?'0' + m : m;
        var d = nowTime.getDate();
        d=d < 10 ?'0' + d : d;
        var h = nowTime.getHours();
        h=h < 10 ?'0' + h : h;
        var mm = nowTime.getMinutes();
        mm=mm < 10 ?'0' + mm : mm;
        var s = nowTime.getSeconds();
        s=s < 10 ?'0' + s : s;
        var day = nowTime.getFullYear() + '-' + m + '-' + d + h + ':' + mm + ':' + s;
        day = day.replace(/-/g, '').replace(/:/g, '')
        return day;
      },

      //获取分类
      async getCategory() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        this.category = data.productCategory
      },
      handleProductCate(id) {
        this.params.productCategory = id
        this.tableList()
      },
      //获取分页数据
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.tableList()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.tableList()
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
        this.tableList()
      },
      //筛选
      handlegdsx(index, screen) {
        if (index == 0) {
          this.params.option_data = 1
          this.gend = screen
          this.tableList()
        } else {
          this.params.option_data = 2
          this.gend = screen
          this.tableList()
        }
      },
      //时长
      pastChooseClick(e) {
        if (e == '2小时') {
          var sc = 2;
          this.params.day = this.dates(sc)
          console.log('测试',this.params.day)
          this.tableList()
        } else if (e == '6小时') {
          var sc = 6;
          this.params.day = this.dates(sc)
          console.log('测试',this.params.day)
          this.tableList()
        } else if (e == '12小时') {
          var sc = 12;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '24小时') {
          var sc = 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近3天') {
          var sc = 3 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近7天') {
          var sc = 7 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近15天') {
          var sc = 15 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近30天') {
          var sc = 30 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近60天') {
          var sc = 60 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '近90天') {
          var sc = 90 * 24;
          this.params.day = this.dates(sc)
          this.tableList()
        }
      },
      //点击搜索
      clickKey(val) {
        this.params.keyword = val
        this.tableList()
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",

        })
      },
      //跳转到达人详情
      linkTalent(id){
        var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: id}})
        window.open(url.href, '_blank')
      },
      //跳转到视频详情
      linkVideo(id){
        var url = this.$router.resolve({path: '/video/video_detail',query: {id: id}})
        window.open(url.href, '_blank')
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
        } = await this.$get('/api/video/awemeTakeProductSearch', this.params)
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
    }
  }
</script>
<style lang="scss" scoped>
  .order {
    height: 36px !important;
    width: 40px !important;
  }

  .block {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 20px;
    overflow: visible !important;
  }


  .czxz {
    width: 46px;
    height: 46px;
    border-radius: 20px;
    margin-left: 10px;
  }



  @import "../../assets/styles/listNew.scss";
</style>
