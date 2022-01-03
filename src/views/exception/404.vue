<template>
  <div class="rdx-flex rdx-flex-col rdx-col-center rdx-row-center">
    <img src="@/assets/imgs/404.png" />
    <div class="right-wrap">
      <p>抱歉，你访问的页面不存在</p>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
