<template>
  <div class="box">
    <div class="select-box2">
      <date-day @dateVal="dateVal"></date-day>
      <goods-class @onTalent="handleStar" classShow='2' class="rdx-p-t-5"></goods-class>
    </div>
    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" @row-click="jumpurl" ref="tableMain">
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
              <img :src="row.avatar" alt class="squareHead" />
              <div class="rdx-flex-col rdx-m-l-10" style="font-weight: normal;">
                <div class="rdx-flex rdx-flex-wrap">
                  <span class="name rdx-m-r-4">{{ row.nickname }}</span>
                  <img src="@/assets/imgs/code.png" class="code rdx-m-r-4" />
                </div>
                <div class="rdx-flex rdx-flex-wrap">
                  <span class="rdx-m-r-4">抖音号: {{ row.unique_id }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="star_first_category" sortable="custom" label="播主类型" width="120"></el-table-column>
        <el-table-column align="center" prop="product_size" label="直播商品数" width="120"></el-table-column>
        <el-table-column align="center" prop="follower_count" label="粉丝数" width="120" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="score" sortable="custom" label="直播热度值" width="120">
        </el-table-column>
        <el-table-column align="center" prop="live_count" label="直播场次" width="120" sortable="custom"></el-table-column>
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
    rankUrl,
    searchConditionsUrl
  } from '@/api'
  import {
    formatDate
  } from '@/utils'
  import LivingTabs from './components/LivingTabs'
  import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  import dateDay from '@/components/dateDay.vue'
  export default {
    components: {
      LivingTabs,searchItem,noData,goodsClass,dateDay,top
    },
    data() {
      return {
        isvip: 'vip0',
        loading: false,
        searchConditions: {
          starCategory: []
        },
        starAllShow: false,
        params: {
          page: 1,
          size: 10,
          starCategory: '',
        },
        tableData: [],
        total: 0,

        show:{
          tableFoot:'-2',//表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
        },
      }
    },
    computed: {
      ...mapGetters(['tokenOk','token'])
    },
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      this.loadSearchConditions()
      this.loadData()
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
      async loadSearchConditions() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      async loadData() {
        this.params.page = 1
        this.loading = true
        this.tableData = []
        const {
          data
        } = await this.$get(rankUrl, this.params)
        this.loading = false
        if(data != undefined && data != ''){
          this.params.page = 2
          this.tableData = data.list
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
      handleStar(name) {
        this.params.starCategory = name
        this.loadData()
      },//时间值获取
    dateVal(val){
      this.params.day = val.day
      this.params.dayType = val.dayType
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
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.loadData()
      },
      //跳转页面
      jumpurl(e) {
        var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: e.author_id}})
        window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",

        })
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
        } = await this.$get(rankUrl, this.params)
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
        //console.log("this.tableData", this.tableData,this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-table .el-table__body-wrapper tr:hover {
    cursor: pointer;
  }

  @import "../../assets/styles/listNew.scss";
</style>
