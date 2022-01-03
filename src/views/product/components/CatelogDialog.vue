<template>
  <el-dialog :visible.sync="dialogVisible" title="产品类目目录设置" :show-close="false" :close-on-click-modal="false" class="dialog">
    <div class="base-header rdx-tips-color">
      <span class="rdx-m-l-24">
        <i class="el-icon-warning-outline rdx-m-r-8 rdx-primary"></i>拖动目录移动位置及排序
      </span>
      <el-link :underline="false" @click="loadData" class="rdx-m-r-20">
        <i class="iconfont icon-jiazai rdx-m-r-8"></i>刷新
      </el-link>
    </div>
    <div class="rdx-flex rdx-m-l-24 rdx-m-b-8">
      <span class="rdx-flex-2">目录名称</span>
      <span class="rdx-flex-1">关联类目数</span>
      <span class="rdx-flex-2">目录操作</span>
    </div>
    <el-tree
      ref="tree"
      draggable
      node-key="id"
      :data="treeData"
      :props="treeProps"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :expand-on-click-node="false"
      @node-drop="nodeDrop"
    >
      <div class="tree" slot-scope="{node, data }">
        <span class="rdx-flex-2">{{data.name}}</span>
        <span class="rdx-flex-1">
          <!-- <el-button v-if="data.isLeaf" type="text" @click="handleTransfer(data)">转移</el-button> -->
        </span>
        <span class="rdx-flex-2">
          <el-button type="text" @click="handleRename(data)">重命名</el-button>
          <el-button type="text" @click="handleAdd(data, 'parent')">创建同级目录</el-button>
          <el-button type="text" @click="handleAdd(data, 'id')">创建子目录</el-button>
          <el-button type="text" :disabled="!data.isLeaf" @click="handleDel(node, data)">删除目录</el-button>
        </span>
      </div>
    </el-tree>

    <span slot="footer">
      <el-link :underline="false" @click="dialogVisible = false" class="rdx-m-r-20">取消</el-link>
      <el-button type="primary" @click="dialogVisible = false">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { catalogUrl, catalogTreeUrl } from '@/api'

export default {
  props: {
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      treeData: [],
      treeProps: { label: 'name' },
      dropRequestFlag: false
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
    async loadData() {
      const { content } = await this.$get(catalogTreeUrl)
      this.treeData = content
    },
    handleAdd(data, key) {
      this.$prompt('请输入类目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
        inputErrorMessage: '请输入类目名称'
      }).then(async ({ value }) => {
        const { content } = await this.$post(catalogUrl, { parent: data[key], name: value })
        const newNode = { id: content, name: value, children: [] }
        if (key === 'parent') {
          this.treeData.unshift(newNode)
          return
        }
        // 增加子节点前空值判断
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newNode)
      })
    },
    handleRename(data) {
      this.$prompt('请输入新的类目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
        inputErrorMessage: '请输入新的类目名称'
      }).then(async ({ value }) => {
        await this.$post(`${catalogUrl}/${data.id}`, { name: value })
        data.name = value
      })
    },
    handleDel(node, data) {
      this.$confirm(`确定删除类目<${data.name}>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$post(`${catalogUrl}/${data.id}`, { status: 'disabled' })
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      })
    },
    handleTransfer() {
      this.$message.warning('接口未提供')
    },
    async nodeDrop(draggingNode, dropNode, type) {
      const parent = type === 'inner' ? dropNode.data.id : dropNode.data.parent
      await this.$post(`${catalogUrl}/${draggingNode.data.id}`, { parent })
      return true
    },
    allowDrag(draggingNode) {
      // 判断节点能否被拖拽
      return true
    },
    allowDrop() {
      // 判定目标节点能否被放置
      return true
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
.tree {
  flex: 1;
  display: flex;
  align-items: center;
  color: $rdx-tips-color;
  font-size: $rdx-font-sm;
}
</style>
