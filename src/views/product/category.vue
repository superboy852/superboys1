<template>
  <div>
    <div class="base-header">
      <Breadcrumb :menuList="menuList" />
      <div class="header-item">
        <el-link :underline="false" @click="catelogDialogShow = true">
          <i class="iconfont icon-shezhi rdx-m-r-4"></i>类目目录设置
        </el-link>
        <el-button type="primary" class="rdx-m-l-20" @click="spuDialogShow = true">创建产品类目</el-button>
      </div>
    </div>
    <div class="base-header">
      <el-link :underline="false">产品视图</el-link>
      <div class="header-item">
        <el-link :underline="false">
          <i class="iconfont icon-shaixuan rdx-m-r-4"></i>筛选
        </el-link>
        <el-link :underline="false" class="rdx-m-l-20">
          <i class="el-icon-sort-down"></i>创建时间
        </el-link>
        <el-link :underline="false" class="rdx-m-l-20">
          <i class="el-icon-upload2"></i>
        </el-link>
      </div>
    </div>

    <el-table v-loading="loading" :data="tableData" size="medium" class="rdx-m-t-10">
      <el-table-column label="产品类目名称/ID">
        <template slot-scope="{row}">
          <div class="rdx-primary">{{row.name}}</div>
          <div>{{row.no}}</div>
        </template>
      </el-table-column>
      <el-table-column label="类目所属目录" prop="category"></el-table-column>
      <el-table-column label="类目属性" prop="cateValue"></el-table-column>
      <el-table-column label="商品属性" prop="goodValue"></el-table-column>
      <el-table-column label="操作">
        <el-button type="text">编辑</el-button>
        <el-button type="text">调整目录</el-button>
        <el-button type="text">下架</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="rdx-m-t-10 rdx-text-right">
      <el-pagination
        background
        :total="total"
        :page-size="params.pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <CatelogDialog :visible.sync="catelogDialogShow" />
    <SpuDialog :visible.sync="spuDialogShow" />
  </div>
</template>

<script>
import { catalogSpuPageUrl } from '@/api'
import SpuDialog from './components/SpuDialog'
import CatelogDialog from './components/CatelogDialog'

export default {
  components: { CatelogDialog, SpuDialog },
  data() {
    return {
      menuList: ['产品中心', '产品设置'],
      params: { page: 1, pageSize: 10 },
      loading: false,
      total: 0,
      tableData: [],
      catelogDialogShow: false,
      spuDialogShow: false
    }
  },
  methods: {
    async loadData() {
      const { page, pageSize } = this.params
      this.loading = true
      const { content } = await this.$get(`${catalogSpuPageUrl}/${page}/${pageSize}`)
      this.loading = false
      this.params.page++
      this.tableData = content.items
      this.total = content.total
    },
    hanldeCatelogSetting() {},
    handleSizeChange(val) {
      this.params.page = 1
      this.params.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.loadData()
    }
  },
  created() {
    this.loadData()
  }
}
</script>
