<template>
  <div>
    <div class="close-login" @click="closeLogin"></div>
    <div class="login-index" style="width: 418px;">
      <div class="flex flex-direction align-center" v-if="show.loginPc">
        <div class="flex justify-end w-100">
          <img src="../assets/imgs/login_wx.png" style="width: 16px; height: 16px;">
          <span class="rdx-tips-color rdx-p-l-8 rdx-p-r-10 rdx-font-10">微信扫码登录</span>
          <div class="button-a"><img src="../assets/imgs/login_code.png" style="width: 37px; height: 37px;" @click="goWx"></div>
        </div>
        <div class="flex flex-direction">
          <div class="flex w-100 justify-center rdx-font-18 font-strong">短信登录/注册</div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="rdx-m-t-32"
            style="width: 290px;">
            <el-form-item prop="mobile" class="position-re">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号" maxlength='11'></el-input>
              <div class="position-ab" style="left: 20px; top: 9px;">
                <img src="../assets/imgs/login_m.png" style="width: 15px; height: 20px;">
              </div>
            </el-form-item>
            <el-form-item prop="codeIco">
              <div class="flex w-100 justify-between">
                <el-input v-model="loginForm.codeIco" placeholder="请输入验证码" style="width: 160px;"></el-input>
                <div class="login-code rdx-flex-1 rdx-text-center rdx-primary rdx-font-18 button-a rdx-m-l-10">
                  <img :src="val.imgSrc" style="width: 100px; height: 36px;" @click="getIco">
                </div>
              </div>
              <div class="position-ab" style="left: 20px; top: 8px;">
                <img src="../assets/imgs/login_pc_ico_3.png" style="width: 18px; height: 18px;">
              </div>
            </el-form-item>
            <el-form-item prop="code" class="position-re">
              <div class="flex w-100 justify-between">
                <el-input v-model="loginForm.code" placeholder="请输入手机短信" style="width: 160px;"></el-input>
                <div class="login-code rdx-flex-1 rdx-text-center rdx-primary rdx-font-14 button-a rdx-m-l-10" v-if="!show.codeShow"
                  @click="onCode">获取手机短信</div>
                <div class="login-code-not rdx-flex-1 rdx-text-center rdx-primary rdx-font-14 rdx-m-l-10" v-if="show.codeShow">
                  {{newTime}}秒
                </div>
              </div>
              <div class="position-ab" style="left: 20px; top: 8px;">
                <img src="../assets/imgs/login_p.png" style="width: 14px; height: 18px;">
              </div>
            </el-form-item>
            <div
              class="button-all w-100 rdx-line-height-40 rdx-radius-20 flex justify-center align-center rdx-m-t-30 rdx-m-b-12"
              @click="submit">登 录</div>
          </el-form>
        </div>
      </div>
      <div class="flex flex-direction align-center position-re" v-if="!show.loginPc">
        <div class="flex position-ab button-a" style="right: 0px; top: 0px;">
          <div class="animationLogin"><img src="../assets/imgs/login_pc.png" style="width: 39px; height: 39px;"
              @click="goWx"></div>
        </div>
        <div class="flex justify-center rdx-font-20 rdx-primary rdx-p-t-24">微信扫描二维码</div>
        <div class="login-wx rdx-m-t-18 flex align-center justify-center position-re" style="height: 186px; width: 186px;">
          <img :src="val.wxCode" style="width: 170px; height: 170px;" v-if="val.wxCode != ''">
          <div class="position-ab amima-wx" v-if="val.wxCode != ''"><img src="../assets/imgs/login_pc_ico_2.png"
              style="width: 173px; height: 5px;"></div>
        </div>
<!--        <div class="login-wx rdx-m-t-18 flex align-center justify-center position-re rdx-line-height-46" v-if="val.wxCode == ''">
          暂无二维码，请联系管理员
        </div> -->
        <div class="flex rdx-font-12 flex-direction align-center rdx-p-t-26 rdx-p-b-5">
          <span>欢迎使用观星树数据</span>
          <span class="rdx-p-t-10">请使用微信扫码登录，新用户自动注册</span>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default{
    data(){
      return{
        val:{
          imgSrc: "", //图形地址
          randomNum: "", //32位随机值
          wxCode:"",//微信二维码
          topTime:600,//hover 显示时间
          shareId:"",//分享传参
        },
        show:{
          loginPc:false, //false 电脑  true二维码
        },
        loginForm: {
          mobile: "", //手机号
          codeIco: "", //图形验证码
          code: "", //手机验证码
        },
        rules: {
          mobile: [{required: true, message: '请输入手机号', trigger: 'blur'}],
          codeIco: [{required: true, message: '请输入图形验证码', trigger: 'blur'}],
          code: [{required: true, message: '请输入手机短信', trigger: 'blur'}]
        },
        newTime: 60, //倒计时时间
      }
    },
    computed: {
      ...mapGetters(['collapsed', 'token', 'user', 'tokenOk'])
    },
    mounted() {
      this.getIco()
      this.getWxCode()
      this.getShare()
    },
    methods:{
      //获取shareId
      getShare(){
        var url = window.location.href.split('=')
        if(url.length > 1){
          this.val.shareId = url[1]
        }
      },
      //关闭弹窗
      closeLogin() {
        clearInterval(this.wxCodeTime)
        this.show.loginPc = false
        this.saveTokenOk('')
        if(this.$refs['loginForm']){
          this.$refs['loginForm'].resetFields()
        }
        this.$emit("onLoginClose",false)
      },
      //提交数据
      submit() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.postSubmit()
          }
        })
      },
      //提交数据
      async postSubmit(){
        var params = {
          mobile: this.loginForm.mobile,
          sms: this.loginForm.code,
          ptId: '1',
          deviceId: "银河一号",
          shareId:this.val.shareId
        }
        const {
          data
        } = await this.$post('/api/user/loginRegister', params)
        if (data.errCode == 0) {
          this.saveUser(data.data)
          this.saveToken(data.data.token)
          this.$emit("submitLoginOk",true)
        } else {
          this.$message.error(data.errMsg)
        }
      },
      //获取图形验证码
      async getIco() {
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        // var pwd = '';
        for (var i = 0; i < 32; i++) {
          this.val.randomNum += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        var params = {
          requestId: this.val.randomNum
        }
        const {
          data
        } = await this.$get('/api/imageVerify', params)
        this.val.imgSrc = "http://121.40.151.218:9090/api/imageVerify?requestId=" + this.val.randomNum
      },
      //点击验证码 倒计时
      async onCode() {
        if (this.loginForm.codeIco == '' || this.loginForm.mobile == '') {
          return false
        }
        var params = {
          requestId: this.val.randomNum,
          yzm: this.loginForm.codeIco,
          mobile: this.loginForm.mobile
        }
        const {
          data
        } = await this.$post('/api/user/sendMsg', params)
        if (data.errCode == 0) {
          this.$message.success(data.errMsg)
        } else {
          this.$message.error(data.errMsg)
          return false
        }
        this.show.codeShow = true
        this.countDown = setInterval((res) => {
          this.newTime = this.newTime - 1;
          if (this.newTime == 0) { //移除定时器
            clearInterval(this.countDown)
            this.show.codeShow = false
            this.newTime = 60
          }
        }, 1000);
      },
      //获取二维码
      async getWxCode(){
        var params = {
          sceneId: this.val.randomNum,
          shareId:this.val.shareId
        }
        const {
          data
        } = await this.$get('/api/user/getLoginQRCode',params)
        this.val.wxCode = data.qrcodeUrl
        if(this.show.loginPc == false){
          this.wxCodeTime = setInterval(()=>{
            this.isWxCode()
          },2000)
        }
      },
      //轮询获取是否扫码二维码
      async isWxCode(){
        var params = {
          sceneId: this.val.randomNum
        }
        const { data } = await this.$get('/api/user/getScanWxQRCodeResult',params)
        if(data != undefined){
          this.saveUser(data)
          this.saveToken(data.token)
          this.$emit("submitLoginOk",true)
        }
      },
      //点击登录微信或电脑
      goWx() {
        this.show.loginPc = !this.show.loginPc
      },
      ...mapActions(['saveCollapsed', 'saveToken', 'saveUser', 'deleteToken', 'deleteUser', 'saveTokenOk']),
    }
  }
</script>

<style lang="scss" scoped>
  .close-login{position: fixed; z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000000;}
  //登录弹窗
  .login-index {
    position: fixed; z-index: 999999; left:50%; top:50%;
        margin: -178px 0px 0px -209px;
        background: #FFFFFF;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        width:418px; padding: 15px; border-radius: 20px;
        .top-login {
        height: 3px;
        background: #eeeeee;
        border-radius: 2px;
      }

      .top-out {
        height: 3px;
        background: $rdx-primary;
        border-radius: 2px;
      }

      .login-code {
        line-height: 40px;
        height: 40px;
        background: #fdf2f3;
        border-radius: 29px;
      }

      .login-code-not {
        line-height: 40px;
        height: 40px;
        background: #EEEEEE;
        border-radius: 29px;
        color: #666666;
      }

      /deep/input {
        height: 40px;
        line-height: 40px;
        border: 1px solid #EEEEEE;;
        outline: none;
        background-color: transparent;
        padding: 0px 10px 0px 45px;
        border-radius: 21px;
        font-size: 14px;
      }
      input:hover {
        border-color: $rdx-primary
      }
      /deep/input:focus {
        border-color: $rdx-primary;
        box-shadow: 0px 0px 2px 0px $rdx-primary;
      }

      /deep/.el-button--small.is-round {
        background: $rdx-primary;
        border-color: $rdx-primary;
        color: #FFFFFF;
        outline: none;
        line-height: 40px;
        border-radius: 20px;
        font-size: 16px;
        width: 100%;
        padding: 0px;
      }
      /deep/.el-form-item--small.el-form-item{margin-bottom:22px}
      /deep/.el-form-item__error{padding-left: 22px;}

    //登录弹窗
      /deep/.el-dialog {
        border-radius: 30px;
      }
      /deep/.el-dialog__body {
        padding: 13px;
      }
      //微信
      .login-wx {
        width: 186px;
        height: 186px;
        background: url(../assets/imgs/login_pc_ico_1.png) no-repeat left top;
        background-size: 100%;
      }
      .amima-wx {
        animation: amimaWx 1.6s linear infinite normal;
      }
      @keyframes amimaWx {
        0% {
          top: 0px;
        }
        100% {
          top: 170px;
        }
      }

  }
</style>
