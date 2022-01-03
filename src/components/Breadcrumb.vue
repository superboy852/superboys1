<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(menu, index) in menuList">
        <el-breadcrumb-item v-if="index === menuList.length - 1" :key="menu">{{menu}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else to :key="menu" @click="handleBack(index)">{{menu}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>-->
    <span :class="['item', index !== menuList.length -1 ? 'active' : '']" v-for="(item, index) in menuList" :key="item">
      {{item}}
      <i v-if="index !== menuList.length -1" class="el-icon-arrow-right icon"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    menuList: { type: Array, require: true }
  },
  methods: {
    handleBack(index) {
      const length = this.menuList.length
      this.$router.go(index - length)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: $rdx-font-md;
  color: $rdx-tips-color;
}
.active {
  color: $rdx-primary;
}
.icon {
  color: $rdx-tips-color;
}
</style>
