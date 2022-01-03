<template>
  <div class="flex w-100 rdx-font-14 flex-direction">
    <div class="flex rdx-p-b-15" v-if="classShow == 1 || classShow == 3">
      <span class="name">商品分类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
        <div class="rdx-m-b-4 select-item" :class="productCategory ? '' : 'active'" @click="handleProductCate('')">全部</div>
        <div class="rdx-m-b-4 select-item" :key="product.id" v-for="product in searchConditions.productCategory" :class="productCategory === product.catName ? 'active' : ''" @click="handleProductCate(product.catName)">
          {{ product.catName }}
        </div>
      </div>
      <i class="rdx-m-t-4 rdx-pointer" :class="productAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="productAllShow = !productAllShow"></i>
    </div>
    <div class="flex rdx-p-b-15" v-if="classShow == 2 || classShow == 3">
      <span class="name">达人分类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !starAllShow }">
        <div class="rdx-m-b-4 select-item" :class="starCategory ? '' : 'active'" @click="handleStar('')">全部</div>
        <div class="rdx-m-b-4 select-item" :key="product.cid" v-for="product in searchConditions.starCategory" :class="starCategory === product.cname ? 'active' : ''" @click="handleStar(product.cname)">
          {{ product.cname }}
        </div>
      </div>
      <i class="rdx-m-t-4 rdx-pointer" :class="starAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="starAllShow = !starAllShow"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props:['classShow'],
    data() {
      return {
        searchConditions: [], //分类数据(包括商品,达人分类)
        productAllShow: false, //商品收起
        starAllShow:false,//达人收起
        productCategory:'',//商品名称
        starCategory:'',//达人名称
      }
    },
    mounted() {
      this.loadSearchConditions()
    },
    methods: {
      //点击达人分类
      handleStar(name) {
        this.starCategory = name
        this.$emit("onTalent",this.starCategory)
      },
      //获取分类
      handleProductCate(name) {
        this.productCategory = name
        this.$emit("onProduct",this.productCategory)
      },
      //分类
      async loadSearchConditions() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        this.searchConditions = data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .name{padding: 3px 0px;margin-right: 6px;}
  .select-item {
    padding: 3px 10px;
    color: $rdx-content-color;
    cursor: pointer;
    &.active {
      color: $rdx-primary;
      background: #FCE5E8;
      border-radius: 4px;
    }
    &:hover{
      color: $rdx-primary;
    }
  }

  .one-line {
    height: 26px;
    overflow: hidden;
  }
</style>
