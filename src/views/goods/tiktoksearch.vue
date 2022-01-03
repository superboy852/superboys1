<template>
  <div class="box">
    <el-input v-model="params.keyword" @change="clickKeyWord" size="medium" placeholder="请输入达人名称、手机号" class="top-search">
      <el-button  slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div class="select-box">
      <span class="name">选择分类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !starAllShow }">
        <div :class="['select-item', params.star_category ? '' : 'active']">全部</div>
        <div
          :key="star.cid"
          v-for="star in starCategory"
          :class="['select-item', params.star_category === star.cid ? 'active' : '']"
          @click="handleStarCate(star.cid)"
        >
          {{ star.cname }}
        </div>
      </div>
      <i
        class="rdx-m-t-4 rdx-pointer"
        :class="[starAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
        @click="starAllShow = !starAllShow"
      ></i>
    </div>

    <div class="select-box">
      <span class="name">带货分类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
        <div :class="['select-item', params.product_category ? '' : 'active']">全部</div>
        <div
          :key="product.id"
          v-for="product in productCategory"
          :class="['select-item', params.product_category === product.id ? 'active' : '']"
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

    <div class="select-box">
      <span class="name" style="text-align: right;padding-top: 10px;">高级筛选：</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="有联系方式" @change="clickContact"></el-checkbox>
          <el-checkbox label="已开通商品橱窗" @change="clickOpenShow"></el-checkbox>
          <el-checkbox label="直播达人" @change="clickLiveTalent"></el-checkbox>
          <el-checkbox label="带货直播达人" @change="clickDHLiveTalent"></el-checkbox>
          <el-checkbox label="星图达人" @change="clickMapTalent"></el-checkbox>
          <el-checkbox label="低粉爆款达人" @change="clickLFHGTalent"></el-checkbox>
          <el-checkbox label="品牌自播" @change="clickBrand"></el-checkbox>
          <el-checkbox label="店铺达人" @change="clickShopAuthorTalent"></el-checkbox>
        </el-checkbox-group>
    </div>

    <div class="select-box">
      <span class="select_title name">筛选条件：</span>
      <span class="select_title">性别：</span>
      <el-select @change="loadData()" v-model="params.gender" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.genders" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">年龄：</span>
      <el-select @change="loadData()" v-model="params.age" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.ages" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">地区：</span>
      <el-select clearable @change="loadData()" v-model="params.platfoms" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in searchConditions.platfoms" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">粉丝总数：</span>
      <el-select @change="loadData()" v-model="params.follower_count" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.followerCount" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">认证类型：</span>
      <el-select @change="loadData()" v-model="params.verification_type" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.verificatType" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">带货口碑：</span>
      <el-select @change="loadData()" v-model="params.reputation_level" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.repLevel" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
    </div>

    <div class="select-box">
      <span class="select_title name">粉丝画像：</span>
      <span class="select_title">地区：</span>
      <el-cascader v-model="value1" :options="advancedData.region" :props="optionProps" @change="handleChange" style="width: 130px; margin-right: 10px">

      </el-cascader>
      <span class="select_title">性别：</span>
      <el-select @change="loadData()" v-model="params.fans_gender" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.genders" :key="item.key" :label="item.value == '男性'?'男性居多':'女性居多'" :value="item.key"> </el-option>
      </el-select>
      <span class="select_title">年龄：</span>
      <el-select @change="loadData()" v-model="params.fans_age" placeholder="请选择" style="width: 100px; margin-right: 10px">
        <el-option v-for="item in advancedData.ages" :key="item.key" :label="item.value" :value="item.key"> </el-option>
      </el-select>
    </div>

    <el-table :data="tableData">
      <el-table-column label="达人" min-width="240">
        <template slot-scope="{ row }">
          <div class="info rdx-flex">
            <img :src="row.avatar" alt class="img" />
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4">{{ row.nickname }}</span>
                <span class="iconfont icon-e951 rdx-font-14" style="margin-left: 10px;margin-right: 8px;"></span>
                <span class="iconfont icon-e610 rdx-primary rdx-font-14 flex-direction"></span>
              </div>
              <div class="dyids">
                <span>抖音号:</span>
                <span>{{row.unique_id}}</span>

              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="follower_count" sortable label="粉丝数" width="120"></el-table-column>
      <el-table-column align="center" prop="follower_incr" sortable label="粉丝增量" width="120"></el-table-column>
      <el-table-column align="center" prop="aweme_digg_medium" sortable label="视频预期点赞" width="150"></el-table-column>
      <el-table-column align="center" prop="aweme_digg_follower_ration" sortable label="平均赞粉比" width="150"></el-table-column>
      <el-table-column align="center" prop="live_pv_medium" sortable label="直播预期观看人数" width="200"></el-table-column>
      <el-table-column align="center" prop="live_average_interact_30" sortable label="直播互动率" width="150"></el-table-column>
      <el-table-column align="center" prop="live_average_amount_30" sortable label="近30日直播场均销售额" width="260"></el-table-column>
      <el-table-column align="center" prop="amount2" label="操作" width="180">
        <template>
          <img src="@/assets/imgs/video_fun_1.png" class="btn " style="margin-right: 10px;"/>
          <img src="@/assets/imgs/video_fun_2.png" class="btn " style="margin-right: 10px;"/>
          <img src="@/assets/imgs/video_fun_3.png" class="btn " />
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div class="isvip" v-if="isvip == 'vip0'"><img src="../../assets/imgs/isvip.png" alt=""  @click="jumpurlVip()" /></div>
      <div class="block" v-if="isvip != 'vip0'">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isvip: 'vip0',
      optionvalue: '',
      productAllShow: false,
      starAllShow:false,
      searchConditions: {},
      isCategoryAll: false,
      isTagAll: false,
      params: { page: 1, size: 10},
      categoriesArr: [],
      checkList: [],
      tableData: [],
      starCategory: [],
      productCategory:[],
      advancedData: {
        genders: [],
        ages: [],
        followerCount: [],
        repLevel: [],
        verificatType: [],
        region: [],
        regionCity: []
      },
      city: [],
      value1: [],
      options: [],
      optionProps:{
        label:'key',
        value: 'index',
        children: 'value'
      }

    }
  },
  computed: {},
  created() {
    this.loadData()
    this.getCategoryData()
  },
  methods: {
     handleChange(value) {
            console.log("ssss",value);
          },
    //
    async loadData(){
      const { data } = await this.$get('/api/author/search',this.params)
      this.tableData = data.list
      console.log('0',this.params)
    },
    async getCategoryData(){
      const { data } = await this.$get('/api/common/searchConditions')
      this.productCategory = data.productCategory
      this.starCategory = data.starCategory
      //获取筛选条件信息
      this.advancedData.ages = data.ages
      this.advancedData.genders = data.genders
      this.advancedData.followerCount = data.followers
      this.advancedData.repLevel = data.reputationLevel
      this.advancedData.verificatType = data.verificationType

    },
    handleStarCate(id){
      this.params.star_category = id
      this.loadData()
    },
    handleProductCate(id) {
      this.params.product_category = id
      this.loadData()
    },
    clickKeyWord(e) {
      this.params.keyword = e
      this.loadData()
    },
    clickContact(e){
      if(e===true){
        this.params.contact=1
      }else{
        this.params.contact=0
      }
      this.loadData()
    },
    clickOpenShow(e){
      if(e===true){
        this.params.is_commerce=1
      }else{
        this.params.is_commerce=0
      }
      this.loadData()
    },
    clickLiveTalent(e){
      if(e===true){
        this.params.is_live=1
      }else{
        this.params.is_live=0
      }
      this.loadData()
    },
    clickDHLiveTalent(e){
      if(e===true){
        this.params.is_sell_live=1
      }else{
        this.params.is_sell_live=0
      }
      this.loadData()
    },
    clickMapTalent(e){
      if(e===true){
        this.params.is_star_author=1
      }else{
        this.params.is_star_author=0
      }
      this.loadData()
    },
    clickLFHGTalent(e){
      if(e===true){
        this.params.is_low_fans_high_gmv=1
      }else{
        this.params.is_low_fans_high_gmv=0
      }
      this.loadData()
    },
    clickBrand(e){
      if(e===true){
        this.params.is_brand_self_author=1
      }else{
        this.params.is_brand_self_author=0
      }
      this.loadData()
    },
    clickShopAuthorTalent(e){
      if(e===true){
        this.params.is_shop_author=1
      }else{
        this.params.is_shop_author=0
      }
      this.loadData()
    },
    jumpurl(jumpurl) {
      this.$router.push(jumpurl)
    },
    //跳转会员付费页面
    jumpurlVip(){
      this.$router.push({
        path: "/renew/index",
      })
    },
    jumpparamurl(jumpurl, param) {
      console.log(jumpurl)
      console.log(param)
      this.$router.push({ path: jumpurl, query: { id: param } })
    }

  },

}
</script>
<style lang="scss" scoped>
.select_title {
  color: rgb(151, 151, 151);
  line-height: 50px;
  text-align: center;
  margin-left: 10px;
}
.xiaodianImg {
  widows: 62px;
  height: 62px;
  border-radius: 31px;
}
.el-input__inner {
  width: 300px;
  height: 50px;
}
/deep/.el-input--small .el-input__inner {
  height: 50px;
}
.block {
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-left: 50px;
  overflow: visible !important;
}
.dataUpdateTime {
  line-height: 50px;
  text-align: center;
  margin-left: 400px;
  display: flex;
  flex-direction: row;
  color: rgb(216, 41, 41);
  font-weight: 900;
  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    color: rgb(216, 41, 41);
    font-size: 18px;
    font-weight: 600;
    background-color: initial;
    border: 1px solid rgb(216, 41, 41);
    outline: none;
    cursor: pointer;
  }
  span {
    margin: 0 30px;
    white-space: nowrap;
  }
}
.isvip > img {
  width: 1574px;
  height: 110px;
}
.footer {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.pricenow {
  color: $rdx-primary;
}
.pricebefore {
  padding-left: 5px;
  text-decoration: line-through;
}
.order {
  height: 36px !important;
  width: 40px !important;
}
.box {
  padding: 20px;
  background: $rdx-bg-color;
  border-radius: 10px;
}
.fontchoose {
  color: $rdx-primary !important;
  font-weight: 800 !important;
}
.borderchoose {
  border-bottom: 4px solid $rdx-primary;
  border-radius: 2px;
}
.labelxxyy {
  color: #423422;
  border: 1px solid #423422;
  margin: 20px;
}
.search {
  padding: 20px;
  background: $rdx-bg-color;
  border-radius: 10px;
}
.top-search {
  width: 500px;
  margin-bottom: 4px;
  /deep/ .el-input__inner {
    border-color: $rdx-primary;
  }
  /deep/ .el-input-group__append {
    background-color: $rdx-primary;
    color: $rdx-light-color;
    border: 1px solid $rdx-primary;
  }
}

.select-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 4px 0;
  margin-bottom: 10px;

  .name {
    width: 80px;
    font-weight: 1200;
    color: #000;
  }
  .one-line {
    height: 25px;
    overflow: hidden;
  }
  .select-item {
    padding: 0px 13px;
    color: $rdx-tips-color;
    cursor: pointer;
    height: 25px;
    &:hover,
    &.active {
      color: $rdx-primary;
    }
  }
  .checkbox {
    /deep/ .el-checkbox__label {
      color: $rdx-tips-color;
      font-weight: 400;
    }
  }
}
.info {
  color: $rdx-tips-color;
  height: 140px;
  font-size: 16px;
  cursor: pointer;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .name {
    color: $rdx-main-color;
    font-weight: bold;
  }
   .name:hover{
     color:$rdx-primary ;
   }
  .code {
    width: 14px;
    height: 14px;
  }
  .vip {
    width: 14px;
    height: 14px;
  }
  .category {
    font-size: $rdx-font-xs;
  }
  .type {
    height: 16px;
    line-height: 16px;
    padding: 0 6px;
    color: $rdx-primary;
    font-size: $rdx-font-xs;
    background: #f4d0d0;
    border-radius: 12px;
  }
  .tag {
    height: 14px;
    line-height: 14px;
    padding: 0 6px;
    color: $rdx-primary;
    font-size: $rdx-font-xs;
    border-radius: 12px;
    // border: 1px solid $rdx-primary;
    &.success {
      color: $rdx-success;
      // border: 1px solid $rdx-success;
      background-color: $rdx-success-light;
      padding: 2px 10px;
    }
    &.warning {
      color: $rdx-warning;
      // border: 1px solid $rdx-warning;
      background-color: $rdx-primary-light;
      padding: 2px 10px;
    }
  }
}
.btn {
  width: 46px;
  height: 46px;
}
.dyids{
  font-size: 14px;
  font-weight: 350;
  text-align: left;
  color: #999999;
}
.risenum{
  width: 26px;
  height: 12px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #666666;
  line-height: 80px;
  margin-left: 5px;
}
.cztag{
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #666666;
  margin-left: 10px;
}
/deep/.el-checkbox{margin: 10px 0px 0px 20px}
/deep/.el-checkbox .el-checkbox__label{font-size: 16px;}
/deep/.el-checkbox__inner{width: 24px;height: 24px; border-radius: 8px; border: 1px solid #E6E7EB;}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {border: 2px solid #dd001b;  box-sizing: content-box; content: ""; border-left: 0; border-top: 0; height: 12px; left: 7px; position: absolute; top: 2px; width: 5px; transform: rotate(45deg) scaleY(1);}//选中
/deep/.el-checkbox__input.is-checked .el-checkbox__inner {background-color: #FFFFFF;border-color: #DD001B;} //选中背景
</style>
