<template>
  <div class="base-box2">
    <div class="flex flex-direction rdx-radius-10 rdx-bg-color rdx-p-b-20">
      <div class="rdx-p-20">
        <div class="explain flex flex-direction rdx-p-20">
          <div class="flex align-center">
            <i class="iconfont icon-e679 rdx-content-color rdx-font-20"></i>
            <span class="rdx-p-l-4 font-strong">开票说明</span>
          </div>
          <div class="flex flex-direction rdx-content-color rdx-line-height-30 rdx-p-t-6 rdx-font-14">
            <p>1、发票基于订单开具，金额为实际支付金额（多个订单可合并开票，单个订单不可拆分开票）</p>
            <p>2、普票、专票服务名称均为*软件*蝉妈妈-短视频直播带货数据软件</p>
            <p>3、提交开票申请后，普票会发送到您提供的电子邮箱（15个工作日内），专票将在15个工作日内（iOS账期较长，开票将在30个工作日左右）邮寄到您提供的收票地址</p>
            <p>4.、金额达到10000的订单，不支持开具电子普票</p>
            <p>5、在开票过程中，如您有疑问，请联系电话：0592-5935218</p>
            <p>6、微信支付请联系客服chandashi510开具发票</p>
          </div>
        </div>
      </div>
      <div class="flex align-center rdx-m-t-20 rdx-m-b-10">
        <div class="nav rdx-p-lr-20" style="border-bottom: 0px;">
          <span class="nav-title">订单类型</span>
        </div>
        <el-select v-model="orderType" placeholder="全部" style="width: 170px; margin-top: -20px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="sticky-head">
        <el-table v-loading="loading" :data="tableData">
          <template slot="empty">
            <no-data marginTop="0" class="rdx-p-t-30"></no-data>
          </template>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column align="center" prop="order_id" label="订单编号" width="220"></el-table-column>
          <el-table-column align="center" label="产品名称">
            <template slot-scope="scope">
              <span>{{scope.row.pack_name}}{{scope.row.pack_duration}}</span>
            </template>
          </el-table-column>
          <!--        <el-table-column align="center" label="类型">
                <template slot-scope="{ row }">
                  <div v-if="row.pay_type == 1">支付宝支付</div>
                  <div v-if="row.pay_type == 2">微信支付</div>
                </template>
              </el-table-column> -->

          <el-table-column align="center" prop="price" label="支付金额（元）"></el-table-column>
          <!--        <el-table-column align="center" prop="name" label="推荐人">
                <template>
                  <span>--</span>
                </template>
              </el-table-column> -->
          <el-table-column align="center" prop="create_time" label="支付时间"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="{ row }">
              <div v-if="row.pay_status == 1">未支付</div>
              <div v-if="row.pay_status == 2">已支付</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block flex justify-center rdx-p-t-20" v-if="tableData!=''">
          <el-pagination background :total="orderTotal" :page-size="params.size" :page-sizes="[10, 20, 30,]"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handlePerformanceSizeChange"
            @current-change="handlePrformanceCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="flex rdx-radius-10 rdx-m-t-20 rdx-bg-color rdx-p-20 flex-direction" style="height: 1000px;">
      <div class="nav" style="border-bottom: 0;">
        <span class="nav-title">发票信息</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="flex flex-direction">
        <el-form-item label="已选总金额" label-width="136px">
          <div class="flex rdx-p-l-10">
            <span class="rdx-font-16 font-strong">0元</span>
            <span class="rdx-font-12 rdx-content-color rdx-p-l-4">该金额为实际支付金额</span>
          </div>
        </el-form-item>
        <el-form-item label="可开票金额" label-width="136px">
          <div class="flex rdx-p-l-10">
            <span class="rdx-font-16 font-strong">0元</span>
            <span class="rdx-font-12 rdx-content-color rdx-p-l-4">该金额为实际支付金额</span>
          </div>
        </el-form-item>
        <el-form-item label="发票类型" label-width="136px">
          <div class="flex rdx-p-l-10 rdx-m-t-8">
            <el-radio-group v-model="radio" @change="changeRadio">
              <el-radio :label="1">增值税专用发票</el-radio>
              <el-radio :label="2">电子普通发票</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="抬头类型" label-width="136px">
          <div class="flex rdx-p-l-10">
            <div class="button-a" :class="val.type == 1 ? 'bill-tab-active' : 'bill-tab'" @click="onType('1')">企业</div>
            <div class="rdx-m-l-20 button-a" :class="val.type == 2 ? 'bill-tab-active' : 'bill-tab'"
              @click="onType('2')" v-show="radio == 2">个人</div>
          </div>
        </el-form-item>
        <!--企业 增值税专用发票 -->
        <block v-show='val.type == 1 && radio == 1'>
          <el-form-item label="发票抬头" prop="name" label-width="136px">
            <el-input v-model="ruleForm.name" placeholder="请填写公司名称" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="identify" label-width="136px">
            <el-input v-model="ruleForm.identify" placeholder="请填写纳税人识别号" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="开户行账号" prop="bank" label-width="136px">
            <el-input v-model="ruleForm.bank" placeholder="请填写开户行账号" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="address" label-width="136px">
            <el-input v-model="ruleForm.address" placeholder="请填写注册地址" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="mobile" label-width="136px">
            <el-input v-model="ruleForm.mobile" placeholder="请填写公司电话" style="width: 360px;"></el-input>
          </el-form-item>
        </block>
        <!--企业 电子普通发票 -->
        <block v-show='val.type == 1 && radio == 2'>
          <el-form-item label="发票抬头" prop="name" label-width="136px">
            <el-input v-model="ruleForm.name" placeholder="请填写公司名称" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="identify" label-width="136px">
            <el-input v-model="ruleForm.identify" placeholder="请填写纳税人识别号" style="width: 360px;"></el-input>
          </el-form-item>
        </block>
        <!--个人 电子普通发票 -->
        <block v-show='val.type == 2 && radio == 2'>
          <el-form-item label="真实姓名" prop="user_name" label-width="136px">
            <el-input v-model="ruleForm.user_name" placeholder="请填写公司名称" style="width: 360px;"></el-input>
          </el-form-item>
        </block>
        <div class="flex line-bottom rdx-p-t-40 rdx-m-b-30"></div>
        <div class="nav" style="border-bottom: 0;">
          <span class="nav-title">收票信息</span>
        </div>
        <!--企业 增值税专用发票 -->
        <block v-show='val.type == 1 && radio == 1'>
          <el-form-item label="收件人手机号" prop="phone" label-width="136px">
            <el-input v-model="ruleForm.phone" placeholder="请填写收件人手机号" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="收票地址" prop="ticketAddress" label-width="136px">
            <el-input v-model="ruleForm.ticketAddress" placeholder="请填接收发票的地址" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="发票备注" prop="remark" label-width="136px">
            <el-input v-model="ruleForm.remark" placeholder="请填写备注" style="width: 360px;"></el-input>
          </el-form-item>
        </block>
        <!--企业 个人-->
        <block v-show='radio == 2'>
          <el-form-item label="收件人邮箱" prop="mail" label-width="136px">
            <el-input v-model="ruleForm.mail" placeholder="请填写收件人邮箱" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="发票备注" prop="remark" label-width="136px">
            <el-input v-model="ruleForm.remark" placeholder="请填写备注" style="width: 360px;"></el-input>
          </el-form-item>
        </block>
        <div class="flex" style="padding:50px 0px 0px 136px;">
          <div
            class="order-button flex justify-center align-center rdx-p-lr-70 rdx-radius-5 rdx-line-height-40 rdx-light-color button-a"
            @click="submitForm('ruleForm')">提交</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData
    },
    data() {
      return {
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '已支付'
        }, {
          value: '3',
          label: '未支付'
        }],
        orderType: '',
        radio: 1,
        loading: false,
        val: {
          type: '1'
        },
        tableData: [],
        orderTotal: 0,
        params: {
          size: 5,
          page: 1
        },
        ruleForm: {},
        rules: {
          name: [{
            required: true,
            message: '请填写公司名称',
            trigger: 'blur'
          }],
          identify: [{
            required: true,
            message: '请填写纳税人识别号',
            trigger: 'blur'
          }],
          mail: [{
            required: true,
            message: '请填写收件人邮箱',
            trigger: 'blur'
          }],
          bank: [{
            required: true,
            message: '请填写开户行账号',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请填写注册地址',
            trigger: 'blur'
          }],
          mobile: [{
            required: true,
            message: '请填写公司电话',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请填写收件人手机号',
            trigger: 'blur'
          }],
          ticketAddress: [{
            required: true,
            message: '请填接收发票的地址',
            trigger: 'blur'
          }],
          user_name: [{
            required: true,
            message: '请填写公司名称',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {
      this.tableList()
    },
    methods: {
      //点击发票类型
      changeRadio(e) {
        this.val.type = 1
      },
      //抬头类型
      onType(type) {
        this.val.type = type
      },
      //提交数据
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //添加增值税发票
      // async vatInvoice() {
      //   const {
      //     data
      //   } = await this.$post('/api/user/invoice/vatInvoice', this.vatParams)
      // },
      // //添加普通发票
      // async commercialInvoice() {
      //   var param = {
      //     "lookedUpType": this.orderInvice.lookedType,
      //     "invoiceLookedUp": this.orderInvice.invoiceTitle,
      //     "taxpayerIdentificationNumber": this.orderInvice.identificationNumber,
      //     "email": this.orderInvice.email,
      //   }
      //   const {
      //     data
      //   } = await this.$post('/api/user/invoice/commercialInvoice', param)
      // },    
      //获取订单数据
      async tableList() {
        const {
          data
        } = await this.$get('/api/user/queryVipOrder', this.params)
        this.tableData = data.list
        this.orderTotal = data.page_info.total
      },
      clickInvoice() {
        this.$router.replace('/my/my_invoice');
      },
      //业绩奖励的分页
      handlePrformanceCurrentChange(val) {
        this.params.page = val
        this.tableList()
      },
      handlePerformanceSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.tableList()
      },
    }
  }
</script>
<style lang="scss" scoped>
  //表格控制
  /deep/.el-table th {
    font-size: 14px;
    background-color: #E7ECF1;
    color: #666666;
    height: 34px;
  }

  /deep/.el-table--small th {
    padding: 0px;
  }

  /deep/.el-table td {
    padding: 8px 0px;
  }

  .base-box2 {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 80px);
  }

  .explain {
    background: #F3F5F8;
    border: 1px solid #E2E3E5;
    border-radius: 6px;
  }

  .order-button {
    background: $rdx-old;
  }

  .order-button:hover {
    background-color: #c3001a;
  }

  /deep/.el-form-item__label {
    color: #333333;
  }

  .bill-tab {
    width: 58px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #999999;
    border-radius: 5px;
  }

  .bill-tab-active {
    width: 58px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    color: $rdx-old;
    border: 1px solid $rdx-old;
    border-radius: 5px;
  }
</style>
