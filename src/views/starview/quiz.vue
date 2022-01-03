<template>
  <div class="box flex justify-center">
    <div class="w-80">
      <div class="rdx-m-b-20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/starview/starview_operator' }" class="rdx-primary">问答</el-breadcrumb-item>
          <el-breadcrumb-item>发起提问</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="rdx-font-14 font-strong rdx-main-color rdx-m-b-14">
        请将您的问题告诉我们 :
      </div>
      <div class="rdx-m-b-24">
        <el-input type="text" placeholder="请在这里描述您的问题" v-model="value"></el-input>
      </div>
      <div class="rdx-font-14 font-strong rdx-main-color rdx-m-b-14">
        问题描述(选填)
      </div>
      <div class="rdx-m-b-20">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quill-editor>
      </div>
      <div class="rdx-m-b-20 flex justify-between">
        <div class="selId">
          <el-select v-model="typeValue">
            <el-option label="短视频运营" value="选项1"></el-option>
            <el-option label="数据报告" value="选项2"></el-option>
            <el-option label="抖音直播" value="选项3"></el-option>
            <el-option label="TikTok运营" value="选项4"></el-option>
            <el-option label="抖音带货" value="选项5"></el-option>
            <el-option label="抖音运营" value="选项6"></el-option>
            <el-option label="行业资讯" value="选项7"></el-option>
            <el-option label="抖音小店" value="选项8"></el-option>
            <el-option label="抖音电商" value="选项9"></el-option>
            <el-option label="直播电商" value="选项10"></el-option>
            <el-option label="榜单解读" value="选项11"></el-option>
            <el-option label="小红书运营" value="选项12"></el-option>
            <el-option label="兴趣电商" value="选项13"></el-option>
          </el-select>
        </div>
        <div class="htId">
          <el-input type="text" placeholder="选择话题" v-model="value1"></el-input>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex align-center">
          <div>
            <el-checkbox></el-checkbox>
          </div>
          <div class="rdx-font-12 rdx-main-color">匿名</div>
        </div>
        <div>
          <el-button type="primary">发布问题</el-button>
        </div>
      </div>
      <div class="rdx-font-12 rdx-content-color flex justify-center" style="margin-top: 230px;">©2019
        创客互联(chanmama.com),All Rights Reserved.闽ICP备 18007321号-5</div>
    </div>
  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.snow.css'
  import searchItem from '@/components/searchItem.vue'
  export default {
    components: {
      noData,
      searchItem
    },
    data() {
      return {
        params: {
          page: 1,
          size: 10
        },
        typeValue: '请选择分类',
        value:'',
        value1:'',
        val: {

        },
        content: null,
        editorOption: {
          modules: {
            toolbar: [
              [{
                'font': []
              }],
              ['bold', 'italic', 'underline', 'image', 'link', 'code-block', 'clean'], // toggled buttons 富文本编辑器
              [{
                'list': 'ordered'
              }]
            ]
          },
          placeholder: '您可以在这里继续补充问题细节',
        },
      }
    },
    mounted() {
      //this.tableList()
    },
    methods: {
      onEditorBlur() { //失去焦点事件
      },
      onEditorFocus() { //获得焦点事件
      },
      onEditorChange() { //内容改变事件
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

  .bq-sty {
    background: #F4D0D0;
  }

  .xb-sty {
    border-bottom: 1px solid #e5e5e5;
  }
  /deep/.ql-editor{
    height: 160px;
  }
  /deep/.button-search{
    height: 30px !important;
  }
  /deep/.el-input__inner{
    font-size: 12px !important;
    height: 30px !important;
  }
  /deep/ .selId .el-input__inner{
    width: 400px;
  }
  /deep/ .htId .el-input__inner{
    width: 740px;
  }
</style>
