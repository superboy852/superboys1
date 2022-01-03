<template>
  <el-dialog
    :visible.sync="dialogVisible"
    fullscreen
    center
    :modal="false"
    :show-close="false"
    class="full-dialog"
    :before-close="handleClose"
  >
    <div class="back" @click="handleClose">
      <i class="iconfont icon-fanhui rdx-m-r-12"></i>创建产品类目
    </div>
    <Process :list="processList" :active="processActive" />
    <SpuBase v-show="processActive === 0" :active.sync="processActive" />
    <SpuBase v-show="processActive === 1" :active.sync="processActive" />
  </el-dialog>
</template>

<script>
import Process from '@/components/Process'
import SpuBase from './SpuBase'

export default {
  components: { Process, SpuBase },
  props: {
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      processList: ['基础信息', '类目属性', '商品属性'],
      processActive: 0
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleClose() {
      this.$confirm('此操作无法保存当前编辑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('update:visible', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  color: $rdx-main-color;
  font-size: $rdx-font-xl;
  font-weight: bold;
  cursor: pointer;
}
</style>
