<template>
  <div class="box">
    <div class="select-box2">
      <goods-class @onTalent="handleStar" classShow='2' class="rdx-p-t-5" ></goods-class>
      <date-day @dateVal="dateVal" timeType='1' style="margin-top: -5px;"></date-day>  <!-- 日周月 -->
    </div>
    <el-table v-loading="loading" :data="tableData" class="sticky-head" @sort-change="handlesortChange">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column align="center" label="排行" type="index" width="80">
        <template slot-scope="scope">
          <div>
            <img v-if="scope.$index == 0" class="order" src="../../assets/imgs/first.png" />
            <img v-if="scope.$index == 1" class="order" src="../../assets/imgs/second.png" />
            <img v-if="scope.$index == 2" class="order" src="../../assets/imgs/third.png" />
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index < 9">0{{ scope.$index + 1 }}</i>
            <i class="rank-text" v-if="scope.$index > 2 && scope.$index >= 9">{{ scope.$index + 1 }}</i>
            <!-- <span class="rdx-m-l-16 rdx-m-t-4">
              <i class="iconfont rdx-font-20"
                :class="scope.row.icons >= 0 ? 'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i>
              <span class="rdx-font-16 rdx-content-color rdx-m-l-6">{{scope.row.rank_change}}</span>
            </span> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="视频">
        <template slot-scope="{row}">
          <div class="info flex">
            <div><img :src="row.aweme_cover" style="width: 66px;height: 66px;min-width: 66px;" @click="jumpUrl(row.aweme_id)"/></div>
            <div class="flex flex-direction rdx-m-l-10">
              <div class="rdx-font-16 rdx-content-color rdx-line-2" style="width: 300px;" @click="jumpUrl(row.aweme_id)">
                {{row.aweme_title}}
              </div>
              <div class="rdx-font-14 rdx-tips-color">{{row.aweme_create_time==0?'--':''}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="达人">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-three">
            <img :src="row.avatar" alt style="width: 35px; height: 35px;" class="round" @click="jumpAuthor(row.author_id)" />
            <div class="rdx-flex-col rdx-m-l-16" style="font-weight: normal;">
              <div class="rdx-flex rdx-flex-wrap rdx-m-b-6">
                <span class="name rdx-m-r-4 rdx-font-16 rdx-line-1" style="width: 100px;" @click="jumpAuthor(row.author_id)">{{ row.nickname }}</span>
              </div>
              <div class="rdx-font-14 rdx-line-1 rdx-tips-color">
                <div class="rdx-font-14 rdx-tips-color">{{row.author_begin_time==0?'--':''}}</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="digg_count" label="点赞数" width="130" sortable="custom"></el-table-column>
      <el-table-column align="center" prop="share_count" label="转发数" width="130"></el-table-column>
      <el-table-column align="center" prop="comment_count" label="评论数" width="130"></el-table-column>
      <el-table-column align="center" prop="caoz" label="操作" width="90">
        <template slot-scope="{ row }">
          <div class="flex w-100 justify-center">
            <el-tooltip effect="dark" content="视频详情" placement="bottom">
               <span class="tiktok-buttonA flex align-center justify-center" @click="jumpUrl(row.aweme_id)">
                 <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
               </span>
            </el-tooltip>
            <el-tooltip effect="dark" content="观看视频" placement="bottom">
               <span class="tiktok-buttonD flex align-center justify-center rdx-m-l-10" @click="jumpVideo(row.aweme_url)">
                 <i class="iconfont icon-ea82 rdx-light-color rdx-font-12"></i>
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
      params: { page: 1, size: 10,category:'',day:'',dayType:''},
      categoriesArr: [],
      checkList: [],
      category:[],
      tableData: [],
      productCategory:[],
      total: 0,
      sortPx: 1,
      loading:false,
      show:{
        talentIco:false,//达人上升图标
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
    //this.loadData()
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
    //时间值获取
    dateVal(val){
      console.log("val",val)
      this.params.day = val.day
      this.params.dayType = val.dayType
      this.loadData()
    },
    //详细数据
    async loadData() {
      this.params.page = 1
      this.loading = true
      const { data } = await this.$get('/api/video/hotAweme',this.params)
      this.tableData = []
      if(data != undefined){
        this.loading=false
        this.params.page = 2
        this.tableData = data.list
        this.tableData.forEach((item)=>{
          item.author_begin_time = item.aweme_create_time
          if(item.aweme_create_time!=0){
            item.aweme_create_time=tools.time_cycle(2,item.aweme_create_time)
          }
          if(item.author_begin_time!=0){
            item.author_begin_time=tools.getDateDiff(item.author_begin_time)
          }
        })
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
    async getCategoryData(){
      const { data } = await this.$get('/api/common/searchConditions')
      this.productCategory = data.productCategory
    },
    //跳转页面
    jumpUrl(e) {
      var url = this.$router.resolve({path: '/video/video_detail',query: {id: e}})
      window.open(url.href, '_blank')
    },
    //跳转到视频地址
    jumpVideo(url){
      window.open(url,'_blank')
    },
    //跳转到达人详情
    jumpAuthor(id){
      var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: id}})
      window.open(url.href, '_blank')
    },
    //跳转会员付费页面
    jumpurlVip(){
      this.$router.push({
        path: "/renew/index",

      })
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
    //获取分类
    handleStar(name) {
      this.params.category = name
      this.loadData()
    },
    //获取日期
    changeDate(val) {
      this.params.dayType = "day"
      this.params.day = val.replace(/-/g, "");
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
      } = await this.$get('/api/video/hotAweme', this.params)
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
