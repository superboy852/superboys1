<template>
  <div class="box" style="margin-left: 160px;margin-right: 160px;">
    <p class="rdx-font-18 rdx-m-t-18 rdx-m-b-18">资质认证</p>

  <div class="rdx-bg-color " >
    <div class="rdx-p-t-30" style="margin-left: 50px;">
      <el-steps :space="300" :active="2" finish-status="success" align-center="">
        <el-step title="选择认证类型"></el-step>
        <el-step title="设置资料"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="flex flex-direction box rdx-m-t-20" style="margin-left: 25%;">
        <el-form :model="enterprise" :rules="personalRules" ref="ruleForm" v-if="invoice == 1" label-width="120px">
          <el-form-item label="资质类型" prop="type">
            <el-radio-group v-model="invoice" @change="changed('enterprise')">
                  <el-radio label="1"  :class="invoice === 1 ? 'active' : 'rdx-tips-color'">企业</el-radio>
                  <el-radio label="2"  :class="invoice === 2 ? 'active' : 'rdx-tips-color'">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="enterprise.name" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称" prop="storeName">
            <el-input v-model="enterprise.storeName" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="店铺链接" prop="storeLink">
            <el-input v-model="enterprise.storeLink" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="businessLicense">
            <div class="flex flex-direction">
              <el-upload action="#" list-type="picture-card" :auto-upload="false" width="104px">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                </div>
                <p style="text-align: center; margin-top: -40px;" class="rdx-font-14 rdx-tips-color">营业执照</p>
            </el-upload>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="联系人微信" prop="wechat" class="rdx-p-t-20">
            <el-input v-model="enterprise.wechat" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="mobile">
            <el-input v-model="enterprise.mobile" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item  style="margin-top: 40px;">
            <el-button class="buttonWh" pain @click="submitForm('enterprise')">上一步</el-button>
            <el-button class="buttonWh button-all"  type="primary" @click="resetForm('enterprise')">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="personal" :rules="rules" ref="ruleForm" v-if="invoice == 2" label-width="120px">
          <el-form-item label="资质类型" prop="type">
            <el-radio-group v-model="invoice" @change="changed('personal')">
                  <el-radio label="1"  :class="invoice === 1 ? 'active' : 'rdx-tips-color'">企业</el-radio>
                  <el-radio label="2"  :class="invoice === 2 ? 'active' : 'rdx-tips-color'">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="personal.name" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称" prop="storeName">
            <el-input v-model="personal.storeName" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="店铺链接" prop="storeLink">
            <el-input v-model="personal.storeLink" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="cardId">
            <el-input v-model="personal.cardId" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="card"  >
            <div class="flex ">
              <el-upload action="#" list-type="picture-card" :auto-upload="false" width="104px">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                </div>
                <p style="margin: -40px ;" class="rdx-font-14 rdx-tips-color">身份证正面(头像)</p>
            </el-upload>
            <el-upload action="#" list-type="picture-card" :auto-upload="false" width="104px" class="rdx-m-l-20">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                </div>
                <p style="margin: -40px ;" class="rdx-font-14 rdx-tips-color">身份证反面(国徽)</p>
            </el-upload>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="联系人微信" prop="wechat" class="rdx-p-t-20">
            <el-input v-model="personal.wechat" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="mobile">
            <el-input v-model="personal.mobile" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 40px;">
              <el-button class="buttonWh" pain @click="submitForm('enterprise')">上一步</el-button>
              <el-button class="buttonWh button-all"  type="primary" @click="resetForm('enterprise')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        invoice:'1',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        enterprise:{},
        personal:{},
        rules:{
          name:[
              { required: true, message: '请输入企业名称', trigger: 'blur' },
              { min: 4, max: 30, message: '请输入正确的企业名称', trigger: 'blur' }
           ],
         storeName:[
             { required: true, message: '请输入店铺名称', trigger: 'blur' },
             { min: 4, max: 15, message: '请输入正确的店铺名！', trigger: 'blur' }
          ],
         storeLink:[
              { required: true, message: '请输入店铺链接', trigger: 'blur' },
              { min: 0, max: 256, message: '店铺链接不能为空', trigger: 'blur' }
           ],
          cardId:[
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { min: 10, max: 20, message: '请输入正确的身份证号', trigger: 'blur' }
           ],
         card:[
             { required: true, message: '请选择身份证图片', trigger: 'blur' },
             { min: 10, max: 20, message: '请输入正确的身份证号', trigger: 'blur' }
          ],
         wechat:[
             { required: true, message: '请输入联系人微信', trigger: 'blur' },
             { min: 4, max: 25, message: '请输入正确的联系人微信号', trigger: 'blur' }
          ],
         mobile:[
             { required: true, message: '请输入联系人手机号', trigger: 'blur' },
             { min: 6, max: 15, message: '请输入正确的联系人手机号', trigger: 'blur' }
          ]
          },
        personalRules:{
          name:[
              { required: true, message: '请输入企业名称', trigger: 'blur' },
              { min: 4, max: 30, message: '请输入正确的企业名称', trigger: 'blur' }
           ],
         storeName:[
             { required: true, message: '请输入店铺名称', trigger: 'blur' },
             { min: 4, max: 15, message: '请输入正确的店铺名！', trigger: 'blur' }
          ],
         storeLink:[
              { required: true, message: '请输入店铺链接', trigger: 'blur' },
              { min: 0, max: 256, message: '店铺链接不能为空', trigger: 'blur' }
           ],
         businessLicense:[
              { required: true, message: '', trigger: 'blur' }
           ],
         wechat:[
             { required: true, message: '请输入联系人微信', trigger: 'blur' },
             { min: 4, max: 25, message: '请输入正确的联系人微信号', trigger: 'blur' }
          ],
         mobile:[
             { required: true, message: '请输入联系人手机号', trigger: 'blur' },
             { min: 6, max: 15, message: '请输入正确的联系人手机号', trigger: 'blur' }
          ]
        }
        }
    },
    mounted() {

    },
    methods:{
      changed(e){
        this.$refs.e.clearValidate();
      },
      submitForm(){ //上一步
        this.$router.replace('/my/my_user');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/list.scss";
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
    .buttonWh {width: 120px;height: 40px; font-size: 16px;border-radius: 5px;}
</style>
