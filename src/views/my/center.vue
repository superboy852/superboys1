<template>
  <div class="base-box">
    <div class="flex line-bottom rdx-m-b-20 align-center rdx-p-b-20">
      <span class="my-title-tag rdx-m-r-12"></span>
      <span class="font-strong">个人资料及认证</span>
    </div>
    <div class="rdx-flex rdx-m-t-20">
      <el-avatar :size="78" :src="info.avatar" class="rdx-m-r-10 button-a" ></el-avatar>
      <span class="rdx-font-20">{{info.nick_name}}</span>
    </div>
    <div class="flex rdx-m-t-50">
      <img src="../../assets/imgs/my_0.png" class="button-a" style="width: 324px; height: 126px; margin-right: 13px;" v-if="user.role == 0"  @click="clickVip('0')">
      <img src="../../assets/imgs/my_1.png" class="button-a" style="width: 324px; height: 126px; margin-right: 13px;" v-if="user.role == 1"  @click="clickVip('0')">
      <img src="../../assets/imgs/my_2.png" class="button-a" style="width: 324px; height: 126px; margin-right: 13px;" v-if="user.role == 2"  @click="clickVip('1')">
      <img src="../../assets/imgs/my_3.png" class="button-a" style="width: 324px; height: 126px; margin-right: 13px;" v-if="user.role == 3"  @click="clickVip('2')">
      <img src="../../assets/imgs/my_4.png" class="button-a" style="width: 324px; height: 126px; margin-right: 13px;" v-if="user.role == 4"  @click="clickVip('3')">
    </div>

    <div class="w-100 rdx-p-b-30 rdx-p-t-30 cell flex justify-between align-center">
      <div>
        <span class="rdx-content-color">积分商城</span>
        <span class="rdx-tips-color rdx-m-l-30">当前积分</span>
        <span class="rdx-primay rdx-font-26">
          <span v-if="info.integral == null" class="rdx-m-l-10 rdx-primary">0</span>
          <span v-else class="rdx-m-l-10 rdx-primary">{{info.integral}}</span>
        </span>
      </div>
      <div>
        <span class="rdx-tips-color">赚积分，送会员</span>
        <span class="rdx-primary rdx-p-lr-10 button-a" @click="integralMall">去看看</span>
      </div>
    </div>
    <div class="w-100 rdx-p-b-30 rdx-p-t-30 cell flex justify-between align-center" v-if="info.bind_mobile!= null">
      <div >
        <span class="rdx-content-color">手机绑定</span>
        <span class="rdx-tips-color rdx-m-l-30" v-if="info.bind_mobile == ''">手机未绑定</span>
        <span class="rdx-tips-color rdx-m-l-30" v-else>已绑定手机 {{info.bind_mobile}}</span>
      </div>
      <span class="rdx-primary button-a rdx-p-r-10" v-if="info.bind_mobile == ''" @click="innerPhone = true">未绑定</span>
      <span class="rdx-primary button-a rdx-p-r-10" v-else @click="phoneChange = true">换绑</span>
    </div>

    <div class="w-100 rdx-p-b-30 rdx-p-t-30 cell flex justify-between align-center" v-if="info.bind_wechat == ''">
      <div>
        <span class="rdx-content-color">微信绑定</span>
        <span class="rdx-primay rdx-font-26"></span>
      </div>
      <span class="rdx-primary button-a rdx-p-r-10"  @click="clickWechat">未绑定微信</span>

    </div>
    <div v-else class="w-100 rdx-p-b-30 rdx-p-t-30 cell flex justify-between align-center">
      <div>
        <span class="rdx-content-color">微信绑定</span>
        <span class="rdx-tips-color rdx-m-l-30">已绑定微信 {{info.bind_wechat}}</span>
      </div>
      <span class="rdx-primary button-a rdx-p-r-10" @click="wechatChange= true">换绑</span>
    </div>
    <!-- <div class="w-100 rdx-m-t-20 rdx-p-t-20 cell flex justify-between align-center">
      <div>登录密码</div>
      <span class="rdx-primary button-a rdx-p-r-10" @click="resetPasswords = true">修改</span>
    </div>
    <div class="w-100 rdx-m-t-20 rdx-p-t-20 rdx-p-b-20 cell">资质认证</div> -->
    <!-- <div class="rdx-flex rdx-row-between rdx-m-b-20">
      <div class="auth-card auth-shop">
        <div>
          <div class="title">我是商家，寻求推广</div>
          <div>适用于拥有线上店铺的商家身份认证（目前仅支持抖音小店）认证成功后即可 可使用全域KOL广告营销、商家&达人对接等功能</div>
          <div class="auth-btn button-a" @click="merchantsQualification">去认证</div>
        </div>
        <img src="@/assets/imgs/auth-shop.png" class="auth-img" alt />
      </div>
      <div class="auth-card auth-expert">
        <div>
          <div class="title">我是达人，流量变现</div>
          <div>适用于达人播主身份认证（目前支持抖音达人播主认证）认证成功后即可 使用KOL广告营销、商家&达人对接等功能</div>
          <div class="auth-btn button-a" @click="telentQualification">去认证</div>
        </div>
        <img src="@/assets/imgs/auth-expert.png" class="auth-img" alt />
      </div>
    </div> -->

<!-- 换绑手机号 -->
    <div>
      <el-dialog :visible.sync="phoneChange" width="400px">
        <p class="rdx-font-18" style="margin-top: -40px;">修改绑定手机</p>
        <el-form :model="exchange" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm rdx-m-t-40">
          <el-form-item label="旧手机号" prop="mobile">
            <el-input v-model="exchange.mobile" placeholder="请输入手机号" maxlength="11" :disabled="phone == 1"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verification">
            <el-input v-model="exchange.verification" class="position-re" placeholder="请输入6位验证码"></el-input>

            <div class="rdx-font-14 position-ab" style="right: 15px;top: 6px;">
              <div class="login-code rdx-primary button-a" v-if="!show.codeShow2"
                @click="onCode">获取验证码
                </div>
              <div class="login-code-not rdx-flex-1 rdx-primary" v-if="show.codeShow2">
                {{newTime}}秒
              </div>
            </div>
          </el-form-item>

          <el-dialog width="400px" title="请重新绑定手机号" :visible.sync="innerPhoneChange" append-to-body>
            <el-form :model="exchange" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm ">
              <el-form-item label="新手机号" prop="mobile">
                <el-input v-model="exchange.mobile" placeholder="请输入手机号" ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verification">
                <el-input v-model="exchange.verification" class="position-re" placeholder="请输入6位验证码"></el-input>

                <div class="rdx-font-14 position-ab" style="right: 15px;top: 6px;">
                  <div class="login-code rdx-primary button-a" v-if="!show.codeShow2"
                    @click="onCode">获取验证码
                    </div>
                  <div class="login-code-not rdx-flex-1 rdx-primary" v-if="show.codeShow2">
                    {{newTime}}秒
                  </div>
                </div>
              </el-form-item>
              <el-form-item class="flex " style="margin-left: 102px;">
                <el-button class="rdx-font-14" @click="innerPhoneChange = false" style="width: 84px;height: 40px;">取消</el-button>
                <el-button type="primary" class="rdx-font-14 button-all" @click="step('1')" style="width: 84px;height: 40px;">完成</el-button>
              </el-form-item>
               </el-form>
          </el-dialog>

          <el-form-item class="flex" label-width="77%">
            <el-button type="primary" :disabled="disabled == 1"  class="rdx-font-14 button-all " @click="phoneClick" style="width: 84px;height: 40px;">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 首绑 -->
    <el-dialog width="400px" title="请绑定手机号" :visible.sync="innerPhone" append-to-body>
      <el-form :model="exchange" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm ">
        <el-form-item label="新手机号" prop="mobile">
          <el-input v-model="exchange.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verification">
          <el-input v-model="exchange.verification" class="position-re" placeholder="请输入6位验证码"></el-input>

          <div class="rdx-font-14 position-ab" style="right: 15px;top: 6px;">
            <div class="login-code rdx-primary button-a" v-if="!show.codeShow"
              @click="onCode(exchange.mobile)">获取验证码
              </div>
            <div class="login-code-not rdx-flex-1 rdx-primary" v-if="show.codeShow">
              {{newTime}}秒
            </div>
          </div>
        </el-form-item>
        <el-form-item class="flex " style="margin-left: 102px;">
          <el-button class="rdx-font-14" @click="innerPhone = false" style="width: 84px;height: 40px;">取消</el-button>
          <el-button type="primary" class="rdx-font-14 button-all" :disabled="disableds == 1"  @click="step('1')" style="width: 84px;height: 40px;">完成</el-button>
        </el-form-item>
         </el-form>
    </el-dialog>

<!-- 换绑成功 -->
    <div>
      <el-dialog :visible.sync="inTie" width="400px">
        <div class="rdx-font-18" style="margin-top: -40px;">绑定{{ini.tie}}</div>
        <div class="rdx-m-t-18" style="text-align: center;">
          <img src="../../assets/imgs/dag.png" style="width: 89px;height: 89px;" />
          <p class="rdx-font-18 rdx-content-color">绑定{{ini.tie}}成功</p>
          <el-button type="primary" class="button-all rdx-font-16 rdx-m-t-46" style="width: 100px;height: 40px;" @click="tle">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 绑定微信 -->
        <div>
          <el-dialog :visible.sync="wechatChange" width="400px">
            <p class="rdx-font-18" style="margin-top: -40px;">绑定微信</p>
            <el-form :model="wechat" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm rdx-m-t-40">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="wechat.mobile" placeholder="请输入手机号" :disabled="phone == 1"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verification">
                <el-input v-model="wechat.verification" class="position-re" placeholder="请输入6位验证码"></el-input>

                <div class="rdx-font-14 position-ab" style="right: 15px;top: 4px;">
                  <div class="login-code rdx-primary button-a" v-if="!show.codeShow"
                    @click="onCodeWechat">获取验证码
                    </div>
                  <div class="login-code-not rdx-flex-1 rdx-primary" v-if="show.codeShow">
                    {{newTime}}秒
                  </div>
                </div>
              </el-form-item>

              <el-dialog width="400px" title="扫描二维码" :visible.sync="innerwechatChange" append-to-body>
                <el-empty v-if="wechatImg == ''" description="暂无图片"></el-empty>
                <div style="text-align: center;margin-top: -20px;">
                  <img :src="wechatImg" style="width: 200px;height: 200px;" />
                </div>
              </el-dialog>

              <el-form-item class="flex" label-width="77%">
                <el-button type="primary" :disabled="disabled == 1"  class="rdx-font-14 aligin-end rdx-m-r-60" @click="changeWechat" style="width: 84px;height: 40px;">下一步</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>
        </div>

    <!-- 重置密码 -->
    <div>
      <el-dialog :visible.sync="resetPasswords" width="400px">
        <p class="rdx-font-18" style="margin-top: -40px;">重置密码</p>
        <el-form :model="password" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm rdx-m-t-20">
          <el-form-item label="旧密码" prop="old">
            <el-input v-model="password.old" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new">
            <el-input v-model="password.new" class="position-re" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input v-model="password.confirmPassword" class="position-re" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item class="rdx-m-t-40" style="margin-bottom: -10px;">
              <el-button @click="resetPassword('password')" style="width: 360px;margin-left: -38%;" class="button-all">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--付费弹窗-->
    <pay-up class="position-ab zIndex" :members='val.members' v-if="show.payShow" @submitOk="submitOk"
      @closePay="closePay"></pay-up>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import payUp from "@/components/payUp.vue";
export default {
  components: {
    payUp
  },
  data() {
    return {
      phoneChange:false,
      innerPhoneChange:false,
      innerPhone:false,//首绑
      wechatChange:false,
      inTie:false,  //换绑成功弹窗
      innerwechatChange:false,
      resetPasswords:false,
      imgViewDialogVisible:false,
      phone:'1',
      disabled:'1',
      disableds:'1',
      wechatImg:'',
      ini:{tie:''},
      info: {},
      val:{
        members:''
      },
      exchange:{
        mobile:'',
        verification:''
      },
      wechat:{
        mobile:'',
        verification:''
      },
      password:{
        old:'',
        new:'',
        confirmPassword:''
      },
      show:{
        codeShow:false,
        payShow:false,//付费弹窗
      },
      newTime:60,//倒计时
      rules:{
        old:[
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 20, message: '旧密码在6到20个字符之间', trigger: 'blur' }
        ],
        new:[
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '新密码在6到20个字符之间', trigger: 'blur' }
        ],
        confirmPassword:[
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '新密码在6到20个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.tableList()
    this.wethetImg()
  },
  methods: {
    //关闭购买会员弹窗
    closePay() {
      this.show.payShow = false
    },
    //提交订单
    submitOk(order_id) {
      this.paramsSub = {
        orderId: order_id
      }
    },
    phoneClick(){  //手机号换绑
    this.innerPhoneChange = true;
    },
    async changeWechat(){   //微信换绑/绑定
    var params = {
      sms: this.wechat.verification
    }
      const {
        data
      } = await this.$post('/api/user/sms/verify/wxChangeBind',params)
      // console.log("==========",data)
      if (data.errCode == 0) {
        this.innerwechatChange = true;
        this.wechatImg = data.qrcodeUrl;
        this.wethetImg()
      } else {
        this.$message.error("验证失败")
        return false
      }


    },
    resetPassword(password){   //重置密码提交
       this.$refs[password].validate((valid) => {
          if (valid) {
            this.$message.success("暂无接口")
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    integralMall() { //积分商城
      this.$router.replace('/my/my_score');
    },
    //跳转会员页面
    clickVip(index){
      this.show.payShow = true
      this.val.members = index
    },
    merchantsQualification(){ //跳转到商家资质验证
      this.$router.push({path:"/my/my_qualification"})
    },
    telentQualification(){
      this.$router.push({path:"/my/my_talent"})
    },
    //获取订单数据
    async tableList(){
      const {
        data
      } = await this.$get('/api/user/getUserInfoDetail')
      this.info = data

      this.wechat.mobile = this.info.bind_mobile
      this.exchange.mobile = this.info.bind_mobile
      if(this.exchange.mobile == ''){
        this.phone = 0;
      }

    },
    async onCode(mobil){
    //点击验证码 倒计时
        var params = {
          mobile: mobil
        }
        const {
          data
        } = await this.$post('/api/user/sms/send/bindMobile', params)
        if (data.errCode == 0) {
          this.$message.success(data.errMsg)
          this.disableds = 0
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
        async onCodeWechat(){ //获取绑定微信手机短信
          var params = {}
          const data = await this.$get('/api/user/sms/send/wxChangeBind',params,true)
        // console.log("===========",data)
          if (data.errCode == '0') {
            this.$message.success(data.errMsg)
            this.disabled = 0
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
        async mobileSubject(){  //手机号首次提交绑定
          var param = {
            mobile: this.exchange.mobile,
            sms: this.exchange.verification
          }
            const {
              data
            } = await this.$post('/api/user/bindMobile',param)
            if (data.errCode == 0) {
              this.inTie = true;
            } else {
              this.$message.error(data.errMsg)
              return false
            }
        },
        async wethetImg(){
          var param = {
            sms: this.wechat.verification
          }
          const {
            data
          } = await this.$get('/api/user/getBindQRCode',param)
          if(data.errCode == 0){
            this.wechatImg = data.qrcodeUrl
          }

        },
        wehatSubject(){  //微信提交绑定
          // const {
          //   data
          // } = await this.$get('')
          // if (data.errCode == 0) {
          //   this.$message.success(data.errMsg)
          // } else {
          //   this.$message.error(data.errMsg)
          //   return false
          // }
        },
        clickWechat(){
          if( this.wechat.mobile == ''){
            this.$message.error("请先绑定手机号")
          }else{
             this.wechatChange = true
          }

        },
        step(e){
          // this.inTie = true;
          if(e == '1'){
            this.ini.tie = '手机';
            this.mobileSubject()
          }else{
            this.ini.tie = '微信';
          }

        },
    tle(){
      this.inTie = false;
      this.innerPhoneChange = false;
      this.innerPhone = false;
      this.phoneChange = false;
    }

  }
}
</script>

<style lang="scss" scoped>
  .base-box{height: calc(100vh - 50px);overflow: hidden;}
  .my-title-tag{background-color: #dd001b; width: 4px; height: 20px; border-radius: 4px;}
.cell {
  font-size: 18px;
  border-bottom: 1px solid $rdx-border-color;
}
.auth-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 48%;
  height: 230px;
  padding: 10px;
  color: $rdx-light-color;
  border-radius: 10px;
  .title {
    line-height: 48px;
    font-size: 22px;
  }
  .auth-img {
    margin-left: 10px;
    width: 180px;
    height: 180px;
  }
  .auth-btn {
    display: inline-block;
    margin-top: 30px;
    padding: 4px 20px;
    border: 1px solid #fff;
    border-radius: 20px;
  }
  .auth-btn:hover {border: 1px solid $rdx-primary; background-color: $rdx-primary; color:#FFFFFF}
}

.auth-shop {
  background: #ff7472;
}
.auth-expert {
  background: #5acbb9;
}
/deep/.el-input--small .el-input__inner {
	    height: 40px;
	    line-height: 40px;
	}
</style>
