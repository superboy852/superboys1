<template>
  <div class="box" style="padding: 20px 0px;">
    <div class="select-box2">
      <div class="flex ">
        <span class="tips">&ensp;</span>
        <span class="rdx-m-l-12 font-strong">抖音版&emsp;商品收藏</span>
      </div>
      <search-item @clickKey='onSearch' v-model="search.keyword" searchType="7" searchPlaceholder='请输入商品名称' class="rdx-m-t-14"></search-item>
      <div class="select-box rdx-m-t-20">
        <span class="name">商品分类：</span>
        <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
          <div class="rdx-m-b-10" :class="['select-item', params.category == '' ? 'active' : '']"
            @click="handleProductCate('')">全部</div>
          <div class="rdx-m-b-10 rdx-m-l-10" :key="product.id" v-for="product in searchConditions.productCategory"
            :class="['select-item', params.category === product.id ? 'active' : '']"
            @click="handleProductCate(product.id)">
            {{ product.catName }}
          </div>
        </div>
        <i class="rdx-m-t-4 rdx-pointer" :class="[productAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
          @click="productAllShow = !productAllShow"></i>
      </div>
    </div>
    <div>
      <div>
        <el-table :data="tableData" stripe class="w-100 rdx-m-r-20 rdx-line-height-52 rdx-font-16">
          <el-table-column prop="name" label="商品">
            <template slot-scope="{ row }" class="flex">
              <div class=" rdx-m-l-10 rdx-m-t-12 rdx-m-b-12 flex align-center">
                <img :src="row.product_cover_img" class="img" style="width: 70px;height: 70px;" />
                <div class="rdx-m-l-18 rdx-line-2" style="width: 280px;">{{ row.product_name }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center" width="120">
            <template slot-scope="{ row }">
              <div class="flex align-center position-re" style="margin-left: 25%;">
                <img src="../../assets/imgs/gdxgj.png" class="img" style="width: 12px;height: 12px;" />
                <div class="rdx-m-l-6 flex">{{ row.product_price }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="product_visit_num" label="昨日浏览" align="center" width="120">
          </el-table-column>
          <el-table-column prop="product_yesterday_sales" label="昨日销量" align="center" width="120">
          </el-table-column>
          <el-table-column prop="product_conversion_Rate" label="昨日转化率" align="center" width="120">
          </el-table-column>
          <el-table-column prop="commission" label="佣金" align="center" width="100">
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <div class="flex justify-center w-100">
                <el-tooltip class="item" effect="dark" content="商品详情" placement="bottom">
                  <span class="tiktok-buttonA flex align-center justify-center" @click="jumpUrl(scope.row.relation_id)">
                    <i class="iconfont icon-e603 rdx-light-color rdx-font-14"></i>
                  </span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                  <span class="tiktok-buttonB flex align-center justify-center rdx-m-l-20" @click="clickCollect(scope.row.relation_id)">
                    <i class="iconfont icon-e629 rdx-light-color rdx-font-14"></i>
                  </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <div class="rdx-font-16 rdx-m-t-15" style="color: #999;" align="center">
        没有更多了~
      </div> -->

      <div style="height: 46px;">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    searchConditionsUrl
  } from '@/api'

   import searchItem from '@/components/searchItem.vue'
  export default {
    components:{
      searchItem
    },
    data() {
      return {
        productAllShow: false,
        searchConditions: {},
        params: {
          page: 1,
          size: 10,
          category: ''
        },
        search: {
          keyword: ''
        },
        tableData: [],
        collectParams:{},
      }
    },
    created() {
      this.getCate()
      this.getGoodsCollection()
    },
    methods: {
      //点击取消收藏
      clickCollect(id){
        this.collectParams.string = id
        this.getCancelCollection()
      },
      //取消商品收藏
      async getCancelCollection() {
        console.log('12AA',this.collectParams.string)
        var params = {
          collectId: this.collectParams.string,
          collectType:2
        }
        const {
          data
        } = await this.$get('/api/user/user_collection/cancel_collection',params)
        // console.log('123',this.collectParams)
        console.log('12',data)
        if(data > 0){
         this.$message.success('取消收藏成功')
         this.getGoodsCollection()
        }else{
          this.$message.error('取消收藏失败')
        }

      },
      //获取商品收藏信息
      async getGoodsCollection() {
        const {
          data
        } = await this.$get('/api/user/user_collection/get_goods_collection',this.params)
        this.tableData = data.list
        // console.log('12',this.tableData)
        //console.log('12',this.tableData)
      },
      //筛选条件
      async getCate() {
        const {
          data
        } = await this.$get(searchConditionsUrl)
        this.searchConditions = data

      },
      jumpUrl(id) {
        this.$router.push({path:"/goods/goods_detail",query:{id:id}})
      },
      onSearch(e) {
        this.params.keyword=this.search.keyword
        this.getGoodsCollection()
      },
      handleProductCate(id) {
        this.params.category= id
        this.getGoodsCollection()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
  .name {
    color: $rdx-main-color;
    font-weight: bold;
    cursor: pointer;
  }
</style>
