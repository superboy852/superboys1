<template>
  <div class="base">
    <div class="title">基础信息</div>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
      <el-form-item label="类目名称" prop="name">
        <el-row>
          <el-col :xs="24" :sm="24" :md="18" :lg="12">
            <el-input v-model="form.name" placeholder="请输入类目名称" :maxlength="64"></el-input>
            <div class="tips">不超过 64 字符，需以中英文或数字开头</div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="类目分类" prop="catalog_id">
        <el-row>
          <el-col :xs="24" :sm="24" :md="18" :lg="12">
            <el-cascader
              filterable
              class="full-width"
              :options="catelogTree"
              :props="cascaderProps"
              v-model="form.catalog_id"
              placeholder="请选择或搜索类目分类"
            ></el-cascader>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="rdx-flex rdx-row-center rdx-m-t-40">
      <el-button type="primary" plain>暂存</el-button>
      <el-button type="primary" :disabled="isNext" @click="handleNext">下一步：类目属性</el-button>
    </div>
  </div>
</template>

<script>
import { catalogTreeUrl } from '@/api'

export default {
  props: {
    active: { type: Number, require: true }
  },
  data() {
    return {
      catelogTree: [],
      cascaderProps: { value: 'id', label: 'name', expandTrigger: 'hover', emitPath: true },
      form: { name: '', catalog_id: '' },
      rules: {
        name: [{ required: true, message: '请输入类目名称', trigger: 'blur' }],
        catalog_id: [{ required: true, message: '请选择类目分类', trigger: 'change' }]
      }
    }
  },
  computed: {
    isNext() {
      return !this.form.name || !this.form.catalog_id
    }
  },
  methods: {
    async loadData() {
      const { content } = await this.$get(catalogTreeUrl)
      this.catelogTree = content
    },
    handleNext() {
      this.$refs.form.validate(isPass => {
        if (isPass) {
          this.$emit('update:active', 1)
        }
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
.base {
  padding: 20px 30px;
  .title {
    color: $rdx-main-color;
    font-size: $rdx-font-lg;
    font-weight: bold;
  }
  .tips {
    color: $rdx-tips-light-color;
  }
}
</style>
