<template>
  <div class="box flex justify-center">
    <div class="rdx-m-t-50" style="width: 800px; ">
       <div class="font-strong flex justify-center rdx-font-22 rdx-m-b-20" >投诉建议</div>
      <el-form :rules="rules" :model="val" ref="ruleForm">
        <el-form-item label="投诉链接" class="rdx-m-t-8 rdx-m-l-44" prop="url">
          <el-input v-model="val.url" @change="complaintUrl" class="rdx-m-l-12" style="width: 640px;"></el-input>
        </el-form-item>
        <el-form-item label="投诉原因" class="rdx-m-t-8 rdx-m-l-44" prop="cause">
          <el-select class="rdx-m-l-10" placeholder="请选择投诉原因" v-model="val.cause" @change="complaintCause">
            <el-option label="意见反馈" value="yjfk"></el-option>
            <el-option label="侵权" value="qinq"></el-option>
            <el-option label="政治敏感" value="zzmg"></el-option>
            <el-option label="暴恐血腥" value="bkxx"></el-option>
            <el-option label="赌博" value="db"></el-option>
            <el-option label="谣言" value="yy"></el-option>
            <el-option label="隐私泄露" value="ysxl"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>


        </el-form-item>
        <el-form-item label="详细说明" class="rdx-m-t-8 rdx-m-l-44" prop="content">
          <el-input v-model="val.content" @change="complaintContent" :rows="6" type="textarea" class="rdx-m-l-12" style="width: 640px;"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" class="rdx-m-t-8 rdx-m-l-44" prop="email">
          <el-input placeholder="留下您的联系邮箱，以便我们将处理结果通知给您，我们会严格保密" @change="complaintEmail" v-model="val.email"
            class="rdx-m-l-12" style="width: 640px;"></el-input>
        </el-form-item>
        <div class="flex justify-center" style="margin-bottom: 150px;">
          <el-button type="primary tabbutton" @click="clickBtn">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components: {
      noData
    },
    data() {
      return {
        params: {
          page: 1,
          size: 10
        },
        val: {
          email: '', //邮箱
          url: '', //链接
          content: '', //内容
          cause: '', //原因
        },
        rules: {
          url: [{
            required: true,
            message: '请输入投诉链接',
            trigger: 'blur'
          }],
          cause: [{
            required: true,
            message: '请选择投诉原因',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请输入详细内容',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请选择邮箱',
            trigger: 'blur'
          }],
        },
        tableData: [],
        total: 0,
        showImg: [],
      }
    },
    mounted() {
      //this.tableList()
    },
    methods: {
      //链接
      complaintUrl(e){
        console.log('111',e)
      },
      //原因
      complaintCause(e){
        console.log('122211',e)
      },
      //内容
      complaintContent(e){
        console.log('33',e)
      },
      //邮箱
      complaintEmail(e){
        console.log('555',e)
      },
      //提交
      clickBtn(){
        this.$refs['ruleForm'].validate((valid) => {
          if (!valid) return
          //this.$router.replace('/starview/complaint');
        })
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

  /deep/.tabbutton {
    color: #fff;
    background-color: #DD001B;
    width: 120px;
    height: 40px;
  }

  /deep/.tabbutton:hover {
    box-shadow: 0px 0px 3px 0px #DD001B;
    background-color: #DC143C;
  }

  /deep/.el-form-item__label {
    vertical-align: middle;
    float: left;
    font-size: 14px;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  /deep/.el-radio-button--medium .el-radio-button__inner {
    padding: 5px 13px;
    font-size: 14px;
    border-radius: 0;
  }
  /deep/.el-form-item__error{
    left: 100px;
  }


</style>
