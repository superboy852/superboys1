<template>
  <div class="flex w-100 flex-direction">
    <div class="select-box">
      <span class="name">选择分类：</span>
      <div class="select-item rdx-m-r-12" :class="val.oneIndex == '-1' ? 'active' : ''" @click="oneClick('-1')">全部</div>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <div class="select-item rdx-m-r-12" :class="val.oneIndex == index ? 'active' : ''"
          v-for="(item,index) in dataCategory" :key="index" @click="oneClick(index,item.first_category)">
          {{item.first_category}}
        </div>
      </div>
    </div>
    <div class="select-box">
      <span class="name">子类目：</span>
      <div class="select-item rdx-m-r-12" :class="val.twoIndex == '-1' ? 'active' : ''" @click="twoClick('-1')">全部</div>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <div class="select-item rdx-m-r-12" :class="val.twoIndex == index2 ? 'active' : ''"
          v-for="(cate2,index2) in categoryTwo" :key="index2" @click="twoClick(index2,cate2)">{{ cate2 }}</div>
      </div>
    </div>
    <div class="select-box">
      <span class="name">细分类目：</span>
      <div class="select-item rdx-m-r-12" :class="val.threeIndex == '-1' ? 'active' : ''" @click="threeClick('-1')">全部
      </div>
      <div class="select-item rdx-m-r-12" :class="val.threeIndex == index3 ? 'active' : ''"
        v-for="(cate3,index3) in categoryThree" :key="index3" @click="threeClick(index3,cate3)">{{ cate3 }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dataCategory: []
    },
    data() {
      return {
        category: [], //一级分类
        categoryTwo: [], //二级分类
        categoryThree: [], //三级分类
        val: {
          oneIndex: '-1', //一级目录下标
          twoIndex: "-1", //二级目录下标
          threeIndex: "-1", //三级目录下标
        }
      }
    },
    mounted() {
    },
    methods: {
      //三级分类
      threeClick(index, val) {
        if (index == -1) {
          this.params.secondCategory = ''
          this.val.threeIndex = '-1'
          this.categoryThree = []
        } else {
          this.val.threeIndex = index
          this.params.secondCategory = val
        }
        this.params.secondCategory = index
        this.tableList()
      },
      //点击二级分类
      twoClick(index, val) {
        if (index == -1) {
          this.params.firstCategory = ''
          this.val.twoIndex = '-1'
          this.categoryThree = []
        } else {
          this.val.twoIndex = index
          this.params.firstCategory = val
          this.val.threeIndex = '-1'
          this.categoryThree = this.dataCategory[this.val.oneIndex].sub[this.val.twoIndex]
        }
        this.tableList()
      },
      //点击一级分类
      oneClick(index, val) {
        if (index == -1) {
          this.params.productCategory = ''
          this.val.oneIndex = '-1'
          this.categoryTwo = []
        } else {
          this.val.oneIndex = index
          this.params.productCategory = val
          this.val.twoIndex = '-1'
          this.categoryTwo = this.dataCategory[this.val.oneIndex].second_category
        }
        this.tableList()
      },
    }
  }
</script>

<style>
</style>
