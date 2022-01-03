<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' :keywordInit="params.keyword" searchType="6" searchPlaceholder="请输入小店关键词"></search-item>
      <goods-class @onProduct="handleProductCate" classShow='1' class="rdx-p-t-5"  style="margin-top: -10px;"></goods-class>
    </div>
    <div class="select-box align-center">
      <span style="margin-right: 16px;">高级筛选：</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="有视频带货" @change="clickVideoDH"></el-checkbox>
          <el-checkbox label="有直播带货" @change="clickLiveDH"></el-checkbox>
        </el-checkbox-group>


        <span style="margin-left: 20px;">
          <span class="rdx-tips-color">近30天销售额：</span>
          <input v-model="minPrice" class="priceinput" type="number" name="" id="" placeholder="￥" />
          <span> - </span>
          <input v-model="maxPrice" class="priceinput" type="number" name="" id="" placeholder="￥" />
          <el-button v-if="minPrice != '' || maxPrice != ''" @click="priceSearch()" class="button-all" type="primary">确定</el-button>
        </span>

        <span style="margin-left: 20px;">
          <span class="rdx-tips-color">近30天互动增量：</span>
          <input v-model="minIncremental" class="priceinput" type="number" name="" id="" />
          <span> - </span>
          <input v-model="maxIncremental" class="priceinput" type="number" name="" id="" />
          <el-button v-if="minIncremental != '' || maxIncremental != ''" class="button-all" @click="incrementSearch()" type="primary">确定</el-button>
        </span>
    </div>


    <div class="select-box align-center">
      <span class="name">舆论画像：</span>
      <span class="select_title">男女比例：</span>
      <el-select @change="clickGender" clearable v-model="genders" size="mini" placeholder="请选择" style="margin-right: 20px; ">
        <el-option label="全部" value=""></el-option>
        <el-option label="男性居多" value="0"></el-option>
        <el-option label="女性居多" value="1"></el-option>
      </el-select>
      <span class="select_title">主要年龄：</span>
      <el-select clearable @change="clickAges" v-model="age" size="mini" placeholder="请选择">
        <el-option label="不限" value=""></el-option>
        <el-option v-for="item in advancedData.ages" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title" style="margin-left: 20px">主要地区：</span>
      <el-cascader clearable v-model="reg" :options="advancedData.regions" :props="optionProps" size="mini" @change="handleChange"
        style="margin-right: 20px;"></el-cascader>
    </div>

    <div class="sticky-head">
      <el-table v-loading="loading" :data="tableData" @sort-change="handlesortChange" @row-click="jumpurl">
        <template slot="empty" v-if="tableData == undefined">
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
        <el-table-column prop="day_volume" sortable="custom" label="昨日销量(件)" align="center" width="150"></el-table-column>
        <el-table-column prop="day_amount" sortable="custom" label="昨日销售额(元)" align="center" width="150"></el-table-column>
        <el-table-column prop="day_interaction_inc" sortable="custom" label="昨日互动增量" align="center" width="150"></el-table-column>
        <el-table-column prop="product_sum_all" label="总商品数" align="center"  width="130"></el-table-column>
        <el-table-column prop="author_sum_30" label="关联达人" align="center"  width="130"></el-table-column>
        <el-table-column prop="aweme_sum_30" label="关联视频" align="center"  width="130"></el-table-column>
        <el-table-column prop="live_sum_30" label="关联直播" align="center"  width="130"></el-table-column>
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
import { productsearchUrl, searchConditionsUrl } from '@/api'
  import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  import Avatar from 'vue-avatar'

export default {
  components:{
    searchItem,noData,goodsClass,Avatar
  },
  data() {
    return {
      radio: '',
      loading: false,
      search: '',
      isChoose: true,
      checkList: [],
      reg: [],
      genders: '',
      searchConditions: {
        productCategory: []
      },
      productAllShow: false,
      minPrice: '',
      maxPrice: '',
      minIncremental: '',
      maxIncremental: '',
      advancedData: {
        genders: [],
        ages: [],
        regions:[]
      },
      optionProps: {
        label: 'key',
        value: 'key',
        children: 'value'
      },
      productAllShow: false,
      starAllShow: false,
      params: {
        page: 1,
        size: 10,
        productCategory:'',
        voiceGender: ''
      },
      tableData: [],
      total: 0,
      age: '不限',
      show:{
        tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
        scrollStop:false,
      },
    }
  },
  computed: {
    ...mapGetters(['tokenOk', 'token'])
  },
  created() {
    window.addEventListener('scroll', this.getScroll, false)
    this.getCategoryData()
    if(tools.getQueryString('keyword')){
      this.params.keyword = tools.getQueryString('keyword')
      this.loadData()
    }else{
      this.loadData()
    }
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
    //默认将首个字符串生成头像背景颜色
    extra(name){
      var temp = [];
      temp.push("#");
      for (var i = 0; i < name.length; i++) {
        temp.push(parseInt(name[i].charCodeAt(0),10).toString(16));
      }
      return temp.slice(0,5).join('').slice(0,4)
    },
    //近30天互动增量
    incrementSearch() {
      if(this.minIncremental==""){
        this.params.interactionVolume = '-' + this.maxIncremental
      }else if(this.maxIncremental==''){
        this.params.interactionVolume = this.minIncremental + '-'
      }else{
        this.params.interactionVolume = this.minIncremental + '-' + this.maxIncremental
      }
      this.loadData()
    },
    //近30天销售额
    priceSearch() {
      if(this.minPrice == ""){
        this.params.avgAmount = '-' + this.maxPrice
      }else if(this.maxPrice == ""){
        this.params.avgAmount = this.minPrice + '-'
      }else{
        this.params.avgAmount = this.minPrice + '-' + this.maxPrice
      }
      this.loadData()
    },
    //获取地区信息
    handleChange(e) {
      this.params.voiceProvince=e[0]
      this.params.voiceCity=e[1]
      this.loadData()
    },
    //跳转页面
    jumpurl(e) {
      var url = this.$router.resolve({path: '/shop/brand_detail',query: {id: e.brand_id}})
      window.open(url.href, '_blank')
    },
    //跳转会员付费页面
    jumpurlVip(){
      this.$router.push({
        path: "/renew/index",

      })
    },
    //商品升序和降序
    handlesortChange(column){
      if(column.order === "descending"){
        this.params.order= 'desc'
        this.params.sort= column.prop
      }else{
        this.params.order= 'asc'
        this.params.sort= column.prop
      }
      this.loadData()
    },
    //获取数据
    async loadData() {
      this.params.page = 1
      this.loading = true
      const { data } = await this.$get('/api/rank/brand/search', this.params)
      this.tableData = []
      if(data != undefined){
        this.loading = false
        this.params.page = 2
        this.tableData = data.list
        this.tableData.forEach((item)=>{
          if(item.brand_logo == ''){
            item.brand_img = item.brand_name.substr(0,1)
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
    //筛选条件
    async getCategoryData(){
      const { data } = await this.$get('/api/common/searchConditions')
      this.searchConditions.productCategory = data.productCategory
      this.starCategory = data.starCategory

      this.advancedData.ages = data.ages
      this.advancedData.genders = data.genders
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
    //分类
    handleProductCate(id) {
      this.params.productCategory = id
      this.loadData()
    },
    //获取分页
    handleSizeChange(val) {
      this.params.page = 1
      this.params.size = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.loadData()
    },
    //筛选条件：性别
    clickGender(e){
      console.log('的撒打算、',e)
      if(e==""){
        this.params.voiceGender=""
      }else if(e==0){
        this.params.voiceGender="0"
      }else{
        this.params.voiceGender="1"
      }

      this.loadData()
    },
    //筛选条件：年龄
    clickAges(e){
      this.params.voiceAge=e
      this.loadData()
    },
    //有视频带货
    clickVideoDH(e){
      if(e===true){
        this.params.hasAweme=1
      }else{
        this.params.hasAweme=0
      }
      this.loadData()
    },
    //有直播带货
    clickLiveDH(e){
      if(e===true){
        this.params.hasLive=1
      }else{
        this.params.hasLive=0
      }
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
      } = await this.$get('/api/rank/brand/search', this.params)
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

// input::-webkit-outer-spin-button,
//   input::-webkit-inner-spin-button {
//    -webkit-appearance: none;
//   }
//   input[type='number'] {
//    -moz-appearance: textfield;
//   }
//   /deep/.el-table .el-table__body-wrapper tr:hover{cursor: pointer;}

</style>
