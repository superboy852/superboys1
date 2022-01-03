<template>
  <div class="box" style="margin-left: 160px;margin-right: 160px;">

  <div class="rdx-bg-color " >
    <div class="rdx-p-t-30" style="margin-left: 50px;">
      <el-steps :space="300" :active="stype" finish-status="success" align-center="">
        <el-step title="选择认证类型"></el-step>
        <el-step title="设置资料"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div style="text-align: center;" class="w-100">
      <div style="margin: 30px 0;">
        <el-radio v-model="radio" label="1" border>抖音号认证</el-radio>
        <el-radio v-model="radio" label="2" border>小红书号认证</el-radio>
      </div>
      <div class="flex flex-direction justify-center w-100" style="margin-left: 34%;">
        <div style="width: 300px;" class="flex flex-direction " v-if="radio == 1">
          <el-radio-group v-model="radio1" style="width: 240;height: 40px;">
            <el-radio-button label="1"><span class="rdx-font-14">抖音号授权</span></el-radio-button>
            <el-radio-button label="2"><span class="rdx-font-14">提交资料认证</span></el-radio-button>
          </el-radio-group>

          <div class="rdx-m-t-20 flex flex-direction" v-if="radio1 == 1">
            <h3 class="rdx-font-15">选择抖音号</h3>
            <span class="rdx-font-12 rdx-tips-color rdx-m-t-8">可通过授权抖音号得账号进行认证</span>

            <div class="douyinupload flex w-100 justify-center button-a rdx-m-t-20 rdx-m-l-14" @click="addDouyin">
              <div class="flex flex-direction rdx-tips-color rdx-line-height-20 rdx-m-t-16">
                <i class="iconfont icon-eaf3" style="font-size: 19px;"></i>
                <span class="rdx-font-12 ">添加抖音号</span>
              </div>
            </div>
            <div class="rdx-m-t-40 rdx-m-b-40">
              <el-button style="width: 84px;" @click="submitForm">上一步</el-button>
              <el-button type="primary button-all" style="width: 84px;">下一步</el-button>
            </div>
          </div>

          <div v-if="radio1 == 2" style="width: 400px;margin-left: -70px;text-align: left;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="130px" class="demo-ruleForm rdx-m-t-20">
              <el-form-item label="抖音号:" prop="trill">
                <el-input v-model="ruleForm.trill" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="抖音个人信息页面:" prop="personalDetails">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""  >
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item label="抖音创服中心截图:" prop="serviceCenter">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""  >
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item label="联系人姓名:" prop="name">
                <el-input v-model="ruleForm.name" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="联系人微信:" prop="wechat">
                <el-input v-model="ruleForm.wechat" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号:" prop="mobile">
                <el-input v-model="ruleForm.mobile" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('ruleForm')">上一步</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>

      <el-dialog title="抖音号授权" :visible.sync="dialogVisible" width="30%" style="padding: 20px;text-align: left;color: #000000;">
        <div class="flex flex-direction align-center">
          <img src="../../assets/imgs/4.png" style="width: 200px;height: 200px;"/>
          <span class="rdx-m-t-20">请打开抖音App扫码授权</span>
        </div>
      </el-dialog>

      <div style="width: 400px;" class="flex flex-direction " v-if="radio == 2">
       <div style="margin-left: -100px;">
         <el-button type="text" class="" style="margin-left: 420px;">如何获取链接？</el-button>
         <div class="flex">
           <span style="width: 120px;margin-top: 4px;">主页链接</span>
           <el-input style="width: 400px;"></el-input>
         </div>
         <div class="rdx-m-t-40 rdx-m-b-40" style="margin-left: -40px;">
           <el-button style="width: 84px;" @click="submitForm">上一步</el-button>
           <el-button type="primary button-all" style="width: 84px;margin-left: 20px;">下一步</el-button>
         </div>
       </div>
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        stype: 2,
        radio:'1',
        radio1:'1',
        dialogVisible:false,
        ruleForm:[
          {

          }
        ],
        rules:{
          trill:[
               { required: true, message: '请输入抖音号', trigger: 'blur' },
               { min: 4, max: 30, message: '请输入正确的抖音号', trigger: 'blur' }
          ],
          trill:[
               { required: true, message: '请输入抖音号', trigger: 'blur' },
               { min: 4, max: 30, message: '请输入正确的抖音号', trigger: 'blur' }
          ],
          trill:[
               { required: true, message: '请输入抖音号', trigger: 'blur' },
               { min: 4, max: 30, message: '请输入正确的抖音号', trigger: 'blur' }
          ],
          trill:[
               { required: true, message: '请输入抖音号', trigger: 'blur' },
               { min: 4, max: 30, message: '请输入正确的抖音号', trigger: 'blur' }
          ],
        }
        }
    },
    mounted() {

    },
    methods:{
      changed(e){
        this.$refs.e.clearValidate();
      },
      addDouyin(){
        this.dialogVisible = true
      },
      submitForm(){ //上一步
        this.$router.replace('/my/my_user');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNews.scss";
/deep/.el-upload--picture-card {
	      background-color: #fbfdff;
	      border: 1px dashed #c0ccda;
	      border-radius: 6px;
	      box-sizing: border-box;
	      width: 104px;
	      height: 104px;
	      cursor: pointer;
	      line-height: 104px;
	      vertical-align: top;
	  }
    /deep/.el-upload-list--picture-card .el-upload-list__item {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 104px;
        height: 104px;
        margin: 0 8px 8px 0;
        display: inline-block;
    }
    /deep/.douyinupload {width: 272px;height: 80px;border-radius: 4px;border: 1px solid #999;}
    /deep/.douyinupload:hover{box-shadow: 0 0 12px 0 #e1e1e1;}
</style>
