<template>
  <div class="box">
    <div class="select-box2">
      <search-item searchType="4" @clickKey='clickKey'></search-item>
      <date-day @dateVal="dateVal"  style="margin-top: -5px;"></date-day>  <!-- 日周月 -->
      <goods-class @onTalent="handleStar" classShow='2' class="rdx-p-t-5" ></goods-class>
    </div>
    <div class="select-box align-center">
      <span class="name ">高级筛选：</span>
      <span class="rdx-tips-color rdx-font-14">达人地域：</span>
      <el-cascader v-model="reg" :options="advancedData.regions" :props="optionProps" size="mini" @change="handleChange"
        style="margin-right: 20px;"></el-cascader>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="带货达人" @change="clickDHTalent"></el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table v-loading="loading" :data="tableData" class="sticky-head" @row-click="jumpurl" @sort-change="handlesortChange">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column align="center" label="排行" type="index" width="80">
        <template slot-scope="scope">
          <div class="flex align-center justify-center">
            <img v-if="scope.$index == 0" class="order" src="../../assets/imgs/first.png" alt="" />
            <img v-if="scope.$index == 1" class="order" src="../../assets/imgs/second.png" alt="" />
            <img v-if="scope.$index == 2" class="order" src="../../assets/imgs/third.png" alt="" />
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index < 9">0{{ scope.$index + 1 }}</i>
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index >= 9">{{ scope.$index + 1 }}</i>
<!--            <span class="rdx-m-l-16 rdx-m-t-4">
              <i class="iconfont rdx-font-20"
                :class="scope.row.icons == 0 ? '' : scope.row.icons > 0 ? 'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i>
              <span class="rdx-font-16 rdx-content-color rdx-m-l-6">{{scope.row.rank_change}}</span>
            </span> -->
          </div>

        </template>
      </el-table-column>
      <el-table-column label="达人">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-three">
            <img :src="row.avatar" alt class="circularHead" />
            <div class="rdx-flex-col rdx-m-l-16" style="font-weight: normal;">
              <div class="rdx-flex rdx-flex-wrap rdx-m-b-6">
                <span class="name rdx-m-r-4 rdx-font-16 rdx-line-1" style="width: 100px;">{{ row.nickname }}</span>
                <i class="iconfont icon-e951 rdx-font-14 rdx-m-l-10 rdx-m-r-8"></i>
                <i class="iconfont icon-e610 rdx-primary rdx-font-14 flex-direction"></i>
              </div>
              <div class="rdx-font-14 ">
                <span>抖音号: {{row.unique_id}}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="download_count" label="下载量" sortable="custom" width="130"></el-table-column>
      <el-table-column align="center" prop="download_count_incr" label="下载增量" sortable="custom" width="130"></el-table-column>
      <el-table-column align="center" prop="follower_count" label="粉丝数" sortable="custom" width="130"></el-table-column>
      <el-table-column align="center" prop="follower_count_incr" label="粉丝增量" width="130" sortable="custom"></el-table-column>
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
        isChoose: true,
        optionvalue: '',
        searchConditions: {},
        productAllShow: false,
        isCategoryAll: false,
        isTagAll: false,
        params: {
          page: 1,
          size: 10,
          starCategory: ""
        },
        categoriesArr: [],
        checkList: [],
        category: [],
        tableData: [],
        productCategory: [],
        reg: [],
        advancedData: {
          regions: []
        },
        optionProps: {
          label: 'key',
          value: 'key',
          children: 'value'
        },
        total: 0,
        loading:false,
        show: {
          talentIco: false, //达人上升图标
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
      this.loadData()
      this.getCategoryData()
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
      //获取地区信息
      handleChange(e) {
        this.params.province = e[0]
        this.params.city = e[1]
        this.loadData()
      },
      //详细数据
      async loadData() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get('/api/rank/author/downLoadAuthorRanking', this.params)
        this.tableData = []
        if(data != undefined){
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item) => {
            item.icons = item.rank_change
            if (item.rank_change < 0) {
              item.rank_change = Math.abs(item.rank_change)
            }
          })
          this.total = data.page_info && data.page_info.total
          this.total = data.page_info && data.page_info.total
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
      async getCategoryData() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        this.productCategory = data.starCategory
        // 地区遍历
        var arrList = []
        data.regions.forEach((item) => {
          var p = {
            key: item.key,
            value: []
          }
          item.value.forEach((itemS) => {
            if(itemS == ''){
              p.value.push({
                'key': '全部'
              })
            }else{
              p.value.push({
                'key': itemS
              })
            }
          })
          arrList.push(p)
        })
        this.advancedData.regions = arrList
        //console.log("arrList",arrList)
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
      //时间值获取
      dateVal(val){
        this.params.day = val.day
        this.params.dayType = val.dayType
        this.loadData()
      },
      //点击搜索
      clickKey(val) {
        this.params.keyword = val
        this.loadData()
      },
      //获取分类
      handleStar(name) {
        this.params.starCategory = name
        this.loadData()
      },
      //带货达人
      clickDHTalent(e) {
        if (e === true) {
          this.params.isTakeProduct = 1
        } else {
          this.params.isTakeProduct = 0
        }
        this.loadData()
      },

      //获取分页数据
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
        } = await this.$get('/api/rank/author/downLoadAuthorRanking', this.params)
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
        data.list.forEach((item)=>{
          item.icons = item.rank_change
          if(item.rank_change<0){
            item.rank_change=Math.abs(item.rank_change)
          }
        })
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
