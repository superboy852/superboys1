<template>
  <div>
    <div class="base-header">
      <Breadcrumb :menuList="menuList" />
      <el-button type="primary">创建产品类目</el-button>
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

    <el-table :data="tableData" class="table" size="medium">
      <el-table-column type="selection" width="55"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: ['产品中心', '产品库'],
      search: '',
      tableData: [
        {
          id: 1,
          no: '1092708342',
          name: '晚餐巾',
          category: '生活日用-纸-餐巾纸',
          cateValue: '品牌, 系统类型, 原产地, 原料, 折 叠方式, 工艺',
          goodValue: '层数, 颜色, 展开尺寸, 克重gsm, 内包装规格, 外包装规格, 压花, 印制'
        }
      ]
    }
  }
}
</script>
