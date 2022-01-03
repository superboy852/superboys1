<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' searchPlaceholder="请输入视频关键词" :keywordInit="params.keyword" searchType="2"></search-item>
      <goods-class @onTalent="handleStar" classShow='2' style="margin-top: -5px;"></goods-class>
    </div>
    <div class="select-box align-center">
      <span class="name">观众：</span>
      <span class="select_title">主要性别：</span>
      <el-select @change="clickGender" v-model="fansGender" size="mini" placeholder="请选择" style=" margin-right: 20px"
        class="rdx-tips-color">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in advancedData.genders" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      <span class="select_title" style="margin-left: 20px;">主要年龄：</span>
      <el-select @change="clickAges" v-model="fansAge" size="mini" placeholder="请选择" style=" margin-right: 20px"
        class="rdx-tips-color">
        <el-option label="不限" value=""></el-option>
        <el-option v-for="item in advancedData.ages" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title" style="margin-left: 20px;">主要地区：</span>
      <el-cascader clearable v-model="reg" :options="advancedData.regions" :props="optionProps" size="mini" @change="handleChange"
        style="margin-right: 20px;"></el-cascader>
    </div>

    <div class="select-box align-center">
      <span class="name">达人：</span>
      <span class="select_title">粉丝数：</span>
      <el-select @change="clickFollowCount" v-model="follower" size="mini" placeholder="请选择" style=" margin-right: 20px"
        class="rdx-tips-color">
        <el-option v-for="item in advancedData.followerCount" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
    </div>

    <div class="select-box align-center">
      <span class="name">视频：</span>
      <span class="select_title">点赞数：</span>
      <el-select @change="diggsClick" v-model="diggsValue" placeholder="请选择" size="mini" style="margin-right: 20px;"
        class="rdx-tips-color">
        <el-option label="不限" value=""></el-option>
        <el-option v-for="(item,index) in diggsList" :key="index" :value="item.value"> </el-option>
      </el-select>

      <span class="select_title">视频时长：</span>
      <el-select @change="durationClick" v-model="durationValue" placeholder="请选择" size="mini" class="rdx-tips-color">
        <el-option v-for="(item,index) in durationList" :key="index" :value="item.value"> </el-option>
      </el-select>

      <el-checkbox-group v-model="checkList" style="margin-left: 20px;">
        <el-checkbox label="关联商品视频" @change="clickGoodsRelatived"></el-checkbox>
        <el-checkbox label="低粉高赞" @change="clickFansHottest"></el-checkbox>
      </el-checkbox-group>

    </div>

    <div class="select-box position-re">
      <el-radio-group style="" v-model="tabPosition"
        @change="pastChooseClick">
        <el-radio-button v-for="(past,index) in pastChoose" :key="index" :label="past" class="rdx-font-14">{{past}}</el-radio-button>
      </el-radio-group>
    </div>

    <el-table v-loading="loading" :data="tableData"  @sort-change="handlesortChange" class="rdx-m-t-10 talent-one">
      <template slot="empty">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column label="视频内容">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-two">
            <img class="rectangleHead" :src="row.aweme_info.aweme_cover" @click="jumpUrl(row.aweme_info.aweme_id)">
            <div class="rdx-flex-col rdx-m-l-10 rdx-flex-1">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4 rdx-font-16 rdx-line-2"
                  @click="jumpUrl(row.aweme_info.aweme_id)">{{ row.aweme_info.aweme_title }}</span>
              </div>
              <div class="rdx-flex rdx-flex-wrap rdx-font-14 rdx-p-t-14 sp-text">
                <span class="rdx-m-r-4 rdx-tips-color">视频热词:</span>
                <span v-for="(item,index2) in row.aweme_info.hot_words" :key="index2" :style="row.aweme_info.hot_words == ''?'display: none;':''">
                  <span class="tag1 rdx-m-l-8"
                    :class="index2 == 0 ? 'tag1k' : (index2 == 1 ? 'tag2k' : 'tag3k')">{{ item }}</span>
                </span>
              </div>
              <div class="rdx-flex rdx-flex-wrap rdx-p-t-14">
                <span class="rdx-m-r-4 rdx-font-14 rdx-tips-color sp-text">视频时长: {{ row.aweme_info.duration }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="播主" align="center" width="160">
        <template slot-scope="{ row }">
          <div class="rdx-flex flex-direction align-center">
            <span class="name"  @click="jumpTalentUrl(row.author_info.author_id)">{{ row.author_info.nickname }}</span>
            <span class="rdx-tips-color rdx-font-14 rdx-p-t-14">{{row.aweme_info.aweme_create_time}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.digg_count" sortable="custom" label="点赞数" width="130"></el-table-column>
      <el-table-column align="center" prop="aweme_info.comment_count" sortable="custom" label="评论数" width="130">
      </el-table-column>
      <el-table-column align="center" prop="aweme_info.share_count" sortable="custom" label="分享数" width="130"></el-table-column>
      <el-table-column align="center" prop="amount2" label="操作" width="100">
        <template slot-scope="scope">
          <div class="flex w-100 justify-center">
            <el-tooltip effect="dark" content="视频详情" placement="bottom">
               <span class="tiktok-buttonA flex align-center justify-center">
                 <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
               </span>
            </el-tooltip>
            <el-tooltip class="rdx-m-l-10" effect="dark" content="收藏" placement="bottom">
              <span class="flex align-center justify-center round tiktok-buttonB">
                <i class="iconfont icon-e629 rdx-light-color rdx-font-14"></i>
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
    productsearchUrl,
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
  export default {
    components: {
      searchItem,
      noData,
      goodsClass
    },
    data() {
      return {
        reg: [],
        optionProps: {
          label: 'key',
          value: 'key',
          children: 'value'
        },
        isCategoryAll: false,
        pastChoose: ['2小时', '6小时', '12小时', '24小时', '近3天', '近7天', '近15天', '近30天', '近60天', '近90天'],
        checkList: [],
        searchConditions: {},
        params: {
          page: 1,
          size: 10,
          starFirstCategory: ''
        },
        tableData: [],
        total: 0,
        searchConditions: {},
        productAllShow: false,
        diggsList: [],
        durationList: [],
        tabPosition: "近30天",
        advancedData: {
          genders: [],
          ages: [],
          followerCount: [],
          region: [],
        },
        follower: '不限',
        fansGender: '全部',
        fansAge: '不限',
        diggsValue: '不限',
        durationValue: '不限',
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
      this.params.day = this.dates(30*24)
      //this.loadData()
      this.diggsData()
      if(tools.getQueryString('keyword')){
        this.params.keyword = tools.getQueryString('keyword')
        this.tableList()
      }else{
        this.tableList()
      }
    },
	destroyed(){
	  window.removeEventListener('scroll', this.getScroll)
	},
    mounted() {
      setTimeout(() => {
        console.log("tokenOkSearch", this.tokenOk)
      }, 1000)
    },
    methods: {
      //筛选条件
      async diggsData() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        this.diggsList = data.diggs
        this.durationList = data.duration

        this.advancedData.ages = data.ages
        this.advancedData.genders = data.genders
        this.advancedData.genders.forEach((item) => {
          item.value = (item.value).slice(0, 1)
        })
        this.advancedData.followerCount = data.followers
        this.advancedData.region = data.regions
        // 地区遍历
        var arrList = []
        data.regions.forEach((item) => {
          var p = {
            key: item.key,
            value: []
          }
          item.value.forEach((itemS) => {
            if (itemS == '') {
              p.value.push({
                'key': '全部'
              })
            } else {
              p.value.push({
                'key': itemS
              })
            }
          })
          arrList.push(p)
        })
        this.advancedData.regions = arrList
      },
      //获取分类信息
      async loadData() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data
      },
      //获取详细数据
      async tableList() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get('/api/video/awemeSearch', this.params)
        this.tableData = []
        if (data != undefined) {
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item) => {
            item.aweme_info.duration=this.time_minus(item.aweme_info.duration)
            item.aweme_info.aweme_create_time=tools.time_cycle(2,item.aweme_info.aweme_create_time)
            item.aweme_info.digg_count=tools.numberVerify(item.aweme_info.digg_count)
            item.aweme_info.comment_count=tools.numberVerify(item.aweme_info.comment_count)
            item.aweme_info.share_count=tools.numberVerify(item.aweme_info.share_count)

          })
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
      //将秒值转换为时分秒的时间
      time_minus(timeDiff) {
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let minute = parseInt((timeDiff % 86400 % 3600) / 60)
        let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)
        day = day ? (day + '天') : ''
        hour = hour ? (hour + '时') : ''
        minute = minute ? (minute + '分') : ''
        second = second ? (second + '秒') : ''
        return day + hour + minute + second
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
      //获取分类
      handleStar(name) {
        this.params.starFirstCategory = name
        this.tableList()
      },
      //时长
      pastChooseClick(e) {
        if (e == '2小时') {
          var sc = 2;
          this.params.day = this.dates(sc)
          this.tableList()
        } else if (e == '6小时') {
          var sc = 6;
          this.params.day = this.dates(sc)
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
      //点赞数
      diggsClick(e) {
        this.params.diggs = e
        this.tableList()
      },
      //视频时长
      durationClick(e) {
        this.params.duration = e
        this.tableList()
      },
      //跳转到视频详情页
      jumpUrl(id) {
        var url = this.$router.resolve({path: '/video/video_detail',query: {id: id}})
        window.open(url.href, '_blank')
      },
      //跳转到达人详情页
      jumpTalentUrl(id) {
        var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: id}})
        window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip() {
        this.$router.push({
          path: "/renew/index",

        })
      },
      //点击搜索
      clickKey(val) {
        this.params.keyword = val
        this.tableList()
      },
      //筛选条件：性别
      clickGender(e) {
        this.params.fansGender = e
        this.tableList()
      },
      //筛选条件：年龄
      clickAges(e) {
        this.params.fansAge = e
        this.tableList()
      },
      //筛选条件：粉丝数
      clickFollowCount(e) {
        this.params.followerCount = e
        this.tableList()
      },
      //筛选条件：地区
      handleChange(e) {
        this.params.voiceProvince = e[0]
        this.params.voiceCity = e[1]
        this.tableList()
      },
      clickGoodsRelatived(e) {
        if (e === true) {
          this.params.goodsRelatived = 1
        } else {
          this.params.goodsRelatived = 0
        }
        this.tableList()
      },
      clickFansHottest(e) {
        if (e === true) {
          this.params.fansHottest = 1
        } else {
          this.params.fansHottest = 0
        }
        this.tableList()
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
        } = await this.$get('/api/video/awemeSearch', this.params)
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
  .tag1k {
    background: #FEF5D9;
    color: #FF7E00;
    border-radius: 4px;
  }

  .tag2k {
    background: #E7F9EF;
    color: #00903D;
    border-radius: 4px;
  }

  .tag3k {
    background: #fb99a5;
    color: #d21b32;
    border-radius: 4px;
  }

  @import "../../assets/styles/listNew.scss";
</style>
