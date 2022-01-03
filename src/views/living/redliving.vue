<template>
  <div class="search">
    <div class="select-box">
      <span class="name">热门品类：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !isCategoryAll }">
        <div
          :key="cate"
          v-for="cate in category"
          :class="['select-item', params.category === cate ? 'active' : '']"
          @click="handleCate(cate)"
        >
          {{ cate }}
        </div>
      </div>
      <i
        class="rdx-m-t-4 rdx-pointer"
        :class="[isCategoryAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
        @click="isCategoryAll = !isCategoryAll"
      ></i>
    </div>
    <el-table :data="tableData">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column :label="tableHeader" min-width="400">
        <template slot-scope="{ row }">
          <div class="info rdx-flex">
            <img :src="row.avatar" alt class="img" />
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4">{{ row.name }}</span>
                <img src="@/assets/imgs/code.png" class="code rdx-m-r-4" />
              </div>
              <div class="rdx-flex rdx-flex-wrap">类型： {{ row.type }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="播主类型" width="100"></el-table-column>
      <el-table-column prop="fans" sortable label="粉丝数" width="100"></el-table-column>
      <el-table-column prop="likes" sortable label="人数峰值" width="100"></el-table-column>
      <el-table-column prop="count" sortable label="商品数" width="100"></el-table-column>
      <el-table-column prop="sounds" sortable label="直播销量" width="100"></el-table-column>
      <el-table-column prop="goods" sortable label="销售额" width="100"></el-table-column>
      <el-table-column prop="amount2" label="操作" width="100">
        <template>
          <div class="rdx-flex">
            <img src="@/assets/imgs/like.png" class="rdx-m-r-10 btn" />
            <img src="@/assets/imgs/line.png" class="btn" />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      category: [
        '全部',
        '日用百货',
        '母婴用品',
        '美妆个护',
        '美食饮品',
        '花鸟绿植',
        '书籍',
        '配饰',
        '男装女装',
        '宠物用品',
        '手机数码',
        '鞋帽箱包',
        '礼品文娱',
        '家居家纺',
        '玩具',
        '家电',
        '车品',
        '其他'
      ],
      isCategoryAll: false,
      isTagAll: false,
      params: { category: '', tag: '', condition: [] },
      tableData: [
        {
          id: 'vosdf123',
          avatar: 'https://p26.douyinpic.com/aweme/200x200/fd8f0006569ba665c356.jpg',
          name: '铁山靠得住',
          type: '直播/带货/视频',
          desc: '这是一个很严肃的简介，是真的很严肃...',
          fans: '1065.5W',
          likes: '65324W',
          count: '100',
          sounds: '35.5W',
          goods: '306.5W'
        },
        {
          id: 'vosadfj3',
          avatar: 'https://p3.douyinpic.com/img/tos-cn-avt-0015/ef1f0ef45dd7f7fa845b20f4ce30b208~c5_200x200.jpg',
          name: '是谁在搞笑',
          type: '直播/带货/视频',
          desc: '这是一个很眼熟的简介，是真的很眼熟...',
          fans: '1065W',
          likes: '53324W',
          count: '135',
          sounds: '30.5W',
          goods: '326.5W'
        },
        {
          id: 'daljkdf3',
          avatar: 'https://p6.douyinpic.com/img/tos-cn-i-0813/75b889d2ebd0471c9313a6a34bd906ae~c5_200x200.jpg',
          name: '名字倒过来写',
          type: '直播/带货/视频',
          desc: '这是一个很严肃的简介，是真的很严肃...',
          fans: '1065.5W',
          likes: '65324W',
          count: '102',
          sounds: '36.5W',
          goods: '309.5W'
        }
      ]
    }
  },
  computed: {
    tableHeader() {
      return `播主(共搜索到${this.tableData.length}W结果)`
    }
  },
  methods: {
    handleCate(cate) {
      this.params.category = cate
      // to search
    },
    handleTag(tag) {
      this.params.tag = tag
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 4px 0;
  .name {
    width: 80px;
  }
  .one-line {
    height: 20px;
    overflow: hidden;
  }
  .select-item {
    padding: 2px 10px;
    color: $rdx-tips-color;
    cursor: pointer;
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
  .img {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }
  .name {
    color: $rdx-main-color;
    font-weight: bold;
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
    border: 1px solid $rdx-primary;
    &.success {
      color: $rdx-success;
      border: 1px solid $rdx-success;
    }
    &.warning {
      color: $rdx-warning;
      border: 1px solid $rdx-warning;
    }
  }
}
.btn {
  width: 32px;
  height: 32px;
}
</style>
