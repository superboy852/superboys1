<template>
  <div class="flex flex-direction box w-100" style="background-color: #FFFFFF; border-radius: 12px;">
    <div class="flex position-re w-100" style="margin-left: 10%; z-index: 1;">
      <!-- 头部 -->
      <div class="flex flex-direction w-50" style="z-index: 3;">
        <p class="biaot">达人智能匹配</p><br />
        <p class="rdx-m-t-23 rdx-m-b-30" style="color: #999;width: 80%;">拒绝直播带货翻车，精准寻找达人的新利器！带货效果提高100%！！！</p>
      </div>
      <img src="../../assets/imgs/tools_1.png" class="flex flex-direction position-ab"
        style="width: 550px; height: 422px;right: 320px;top: 70px; z-index: 2;" />
    </div>

    <div class="tcxz flex w-80" align="center">
      <div class="w-50 flex flex-direction" style="margin-top: 104px; border-right: 1px solid #E5E5E5;">
        <p class="rdx-m-b-34" style="font-size: 32px; color: #333;">直播达人匹配</p>
        <p class="rdx-m-b-31">
          <b>
            <span style="font-size: 36px; color: #333;">￥</span>
            <span style="font-size: 56px; color: #333;">99</span>
          </b>
        </p>
        <p class="rdx-m-b-58" style="font-size: 20px; color: #999;">
          <del>原价：￥199</del>
        </p>
        <div>
          <el-button class="tc-button button-all" @click="paymentButton('1')">立即体验</el-button>
        </div>
      </div>
      <div class="w-50 flex flex-direction" style="margin-top: 104px;">
        <p class="rdx-m-b-34" style="font-size: 32px; color: #333;">视屏达人匹配</p>
        <p class="rdx-m-b-31">
          <b>
            <span style="font-size: 36px; color: #333;">￥</span>
            <span style="font-size: 56px; color: #333;">69</span>
          </b>
        </p>
        <p class="rdx-m-b-58" style="font-size: 20px; color: #999;">
          <del>原价：￥199</del>
        </p>
        <div>
          <el-button class="tc-button button-all" @click="paymentButton('2')">立即体验</el-button>
        </div>
      </div>
    </div>

    <!-- 按钮弹窗 -->
    <el-dialog :visible.sync="paymentBut" width="973px">
      <div class="line-bottom flex justify-between obj-head align-center">
        <div class="flex rdx-m-l-20 rdx-font-18">
          <h2 class="rdx-line-height-50 rdx-p-lr-6" :class="zfbt == '1'?'btSelected':'rdx-content-color'">直播</h2>
          <h2 class="rdx-m-l-60 rdx-line-height-50 rdx-p-lr-6" :class="zfbt == '2'?'btSelected':'rdx-content-color'">短视频
          </h2>
        </div>
        <el-button class="rdx-primary rdx-m-r-40 rdx-font-14" style="margin-top: -14px;" type="text"
          @click="intelligentMatch">查看智能匹配记录</el-button>
      </div>
      <div v-if="matching == 'tg'">
        <div class="rdx-p-lr-20 rdx-p-b-30 rdx-p-t-22" style="background-color: #F8F8F8;">
          <h2 class="rdx-font-16 rdx-main-color">您要推广的内容</h2>
          <div class="rdx-m-t-20 rdx-content-color flex">
            <div class="flex flex-direction">
              <span><i class="color-content">*</i>行业</span>
              <el-cascader :options="options" :props="props" clearable placeholder="请选择行业" class="rdx-m-t-20 zfdyb">
              </el-cascader>
            </div>
            <div class="flex flex-direction" :class="zfbt == '1'?'rdx-m-l-20':'rdx-m-l-52'">
              <span><i class="color-content">*</i>商品客单价区间</span>
              <el-select v-model="unitPrice" placeholder="请选择客单价" class="rdx-m-t-20 zfdyb">
                <el-option v-for="item in guestUnitPrice" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-direction" v-if="zfbt == '1'" :class="zfbt == '1'?'rdx-m-l-20':''">
              <span><i class="color-content">*</i>直播类型</span>
              <el-select v-model="liveType" placeholder="不限" class="rdx-m-t-20 zfdyb" style="width: 143px;">
                <el-option v-for="item in liveTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-direction" :class="zfbt == '1'?'rdx-m-l-20':'rdx-m-l-52'">
              <el-checkbox v-model="checked"><a class="rdx-content-color" @click="checkedClick('1')">是否过滤同类型产品达人</a>
              </el-checkbox>
              <el-input placeholder="请输入产品关键字" v-if="checkbox == 1" class="zfdyb rdx-m-t-20"></el-input>
            </div>
          </div>
        </div>
        <div class="rdx-m-t-30 rdx-p-lr-20">
          <h2 class="rdx-font-16 rdx-main-color">您要推广的内容</h2>
          <div class="rdx-content-color rdx-m-t-22 ">
            <span class="rdx-font-14 ">预算</span>
            <div class="rdx-m-t-10 flex">
              <div class="rdx-p-14 flex flex-direction ys button-a" :class="budget==1?'ysSelect':''"
                @click="budgetClick('1')">
                <span class="rdx-font-14" :style="budget==1?'color: #DD001B;':''">1万元以内</span>
                <span class="rdx-tips-color rdx-font-12 rdx-m-t-15 ">尝鲜体验</span>
              </div>
              <div class="rdx-p-14 rdx-m-l-14 flex flex-direction ys button-a" :class="budget==2?'ysSelect':''"
                @click="budgetClick('2')">
                <span class="rdx-font-14" :style="budget==2?'color: #DD001B;':''">1-5万元以内</span>
                <span class="rdx-tips-color rdx-font-12 rdx-m-t-15 ">基础预算</span>
              </div>
              <div class="rdx-p-14 rdx-m-l-14 flex flex-direction ys button-a" :class="budget==3?'ysSelect':''"
                @click="budgetClick('3')">
                <span class="rdx-font-14" :style="budget==3?'color: #DD001B;':''">5-15万元以内</span>
                <span class="rdx-tips-color rdx-font-12 rdx-m-t-15 ">较多预算</span>
              </div>
              <div class="rdx-p-14 rdx-m-l-14 flex flex-direction ys button-a" :class="budget==4?'ysSelect':''"
                @click="budgetClick('4')">
                <span class="rdx-font-14 flex" :style="budget==4?'color: #DD001B;':''">请输入预算
                  <input type="text" class="enputner rdx-p-l-4 rdx-p-r-4"
                    style="border: none;width: 40px;border-bottom: 1px solid #DCDFE6;">万</span>
                <span class="rdx-tips-color rdx-font-12 rdx-m-t-15 ">自定义预算</span>
              </div>
            </div>
          </div>
        </div>
        <div align="center" class="rdx-m-t-56 rdx-p-b-10">
          <el-button @click="paymentBut=false" style="width: 166px; border-radius: 6px; border: 1px solid #DCDFE6;">取消
          </el-button>
          <el-button @click="matching = 'pp'" class="button-all rdx-m-l-26 buttonys"
            style="width: 166px; border-radius: 6px; height: 32px;">下一步</el-button>
        </div>
      </div>

      <div class="" v-if="matching == 'pp'">
        <div class="flex flex-direction rdx-p-lr-20 rdx-p-b-30 rdx-p-t-22" style="background: #F8F8F8;">
          <h2 class="rdx-font-16 rdx-main-color rdx-m-t-28">设置达人粉丝画像</h2>
          <div class="rdx-m-t-28 flex flex-direction w-100">
            <span>粉丝性别</span>
            <div class="flex rdx-font-12 rdx-content-color rdx-m-t-18">
              <el-radio-group v-model="gender">
                <el-radio-button label="不限"></el-radio-button>
                <el-radio-button label="男生为主"></el-radio-button>
                <el-radio-button label="女生为主"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="rdx-m-t-28 flex flex-direction w-100">
            <span>粉丝年龄</span>
            <div class="flex rdx-font-12 rdx-content-color rdx-m-t-18">
              <el-radio-group v-model="age">
                <el-radio-button label="不限"></el-radio-button>
                <el-radio-button label="<18"></el-radio-button>
                <el-radio-button label="18-23"></el-radio-button>
                <el-radio-button label="24-30"></el-radio-button>
                <el-radio-button label="31-40"></el-radio-button>
                <el-radio-button label="41-50"></el-radio-button>
                <el-radio-button label="50+"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="rdx-m-t-32">
            <span>粉丝地域</span>
            <div class="rdx-m-t-16">
              <el-cascader :options="options" :props="props" clearable>
              </el-cascader>
            </div>
          </div>
        </div>
        <div class="rdx-m-t-30 rdx-p-lr-20">
          <h2 class="rdx-font-16 rdx-main-color">您的视频偏好风格</h2>
          <div class="rdx-m-t-24 flex">
            <div class="preferences button-a rdx-m-r-14" v-for="(item,index) in liveTypeList"
              v-model="preferencesColour" @click="colourClick(index)"
              :class="item.check == true ?'preferenceSelect':'preferences'">{{item.label}}</div>
          </div>
        </div>
        <div class="rdx-m-t-60 rdx-p-b-10" align="center">
          <el-button @click="matching = 'tg'" style="width: 166px; border-radius: 6px; border: 1px solid #DCDFE6;">上一步</el-button>
          <el-button type="danger" class="rdx-m-l-20" style="width: 166px; border-radius: 6px; height: 32px;" @click="match = true">匹配达人</el-button>
          <el-button type="warning" class="rdx-m-l-20" style="width: 166px; border-radius: 6px; height: 32px;">查看样例</el-button>
        </div>
      </div>

    </el-dialog>

    <!-- 匹配达人 -->
    <el-dialog :visible.sync="match" width="392px">
      <div class="flex flex-direction rdx-p-20">
        <div class="rdx-font-18" style="margin-top: -50px;">付费购买本次达人智能匹配</div>
        <div class="rdx-m-t-30 flex align-center">
          <span class="rdx-font-14">价格</span>
          <h2 class="rdx-font-20 rdx-m-l-42" style="color: #d50000;">69.00元</h2>
          <strike class="rdx-font-12 rdx-tips-color rdx-m-l-10">139.00元</strike>
        </div>
        <div class="rdx-m-t-28 flex aligin-center">
          <span class="rdx-font-14 flex">支付方式</span>
          <div style="width: 127px;height: 42px;border: 2px solid #DD001B;"
            class="rdx-radius-5 flex rdx-m-l-14 button-a position-re">
            <img src="../../assets/imgs/zfb.png" class="rdx-m-t-8 rdx-m-l-24 position-re"
              style="width: 22px;height: 22px;" />
            <span class="rdx-font-14 rdx-line-height-38 rdx-m-l-8">支付宝</span>
            <div class="time-bg2 position-ab" style="bottom: -1px;right: 0px;">
              <i data-v-49c69403 class="iconfont icon-e608 rdx-light-color position-ab rdx-font-10"
                style="bottom: 0px; right: 0px;"></i>
            </div>
          </div>

        </div>
        <div class="rdx-m-t-15">
          <span class="rdx-font-12 rdx-tips-color">温馨提示： 开通专业版即可享受5次/月的达人智能匹配</span>
        </div>
        <div class="rdx-m-t-35 flex">
          <el-button class="button-all rdx-radio-5" style="width: 84px; height: 30px; color: #FFFFFF;">立即支付</el-button>
          <el-button class="button-all" style="width: 84px; height: 30px; color: #FFFFFF;">查看样例</el-button>
          <div class="rdx-m-l-22 rdx-m-t-8 flex">
            <div class="rdx-font-12 rdx-content-color" style="width: 120px;margin-top: 8px;">支付问题咨询客服微信</div>
            <el-popover class="item" placement="bottom" trigger="hover" width="100px">
              <el-button type="text" slot="reference" style="margin-top: -2px;"><img
                  src="../../assets/imgs/zfwtzxkf.png" class="rdx-m-l-6" style="width: 16px;height: 16px;" />
              </el-button>
              <div style="text-align: center;">
                <img src="../../assets/imgs/gzh.jpg" style="width: 73px;height: 73px;text-align: center;">
              </div>

            </el-popover>
            <el-popover class="item" placement="bottom" trigger="hover" width="100px">
              <el-button type="text" slot="reference" style="margin-top: -2px;"><img src="../../assets/imgs/code.png"
                  class="rdx-m-l-6" style="width: 16px;height: 16px;" />
              </el-button>
              <div style="text-align: center;">
                <img src="../../assets/imgs/gzh.jpg" style="width: 73px;height: 73px;text-align: center;">
              </div>

            </el-popover>


          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 智能匹配记录 -->
    <el-dialog :visible.sync="intelligent" width="973px" style="padding: 20px;">
      <div class="flex justify-between aligin-center rdx-p-lr-20 rdx-p-t-10" style="margin-top: -48px;">
        <h2 class="rdx-font-16 rdx-main-color ">历史智能匹配记录</h2>
        <el-button type="text" class="rdx-p-r-22" style="margin-top: -10px;">再次匹配</el-button>
      </div>
      <div class="rdx-m-t-16 obj-reuse">
        <el-table :data="tableData" style="width: 100%" height="400px">
          <el-table-column align="center" prop="date" label="生成日期">
          </el-table-column>
          <el-table-column align="center" prop="type" label="类型">
          </el-table-column>
          <el-table-column align="center" prop="industry" label="行业">
          </el-table-column>
          <el-table-column align="center" prop="text" label="详细匹配信息">
          </el-table-column>
          <el-table-column align="center" prop="name" label="推荐达人">
          </el-table-column>
          <el-table-column align="center" label="操作"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <div class="w-100" style="margin-left: 15%;">
      <div class="flex w-100">
        <div class=" flex flex-direction position-re">
          <img src="../../assets/imgs/hysxbhd.png" class="" style="width: 297px; height: 377px;margin-top: 104px;" />
          <img src="../../assets/imgs/tools_2.png" class="position-ab rdx-m-l-246"
            style="width: 322px; height: 243px;display: inline-block; bottom: 0px; left: 246px;" />
        </div>
        <div class=" flex flex-direction" style="margin-left: 25%;" align="left">
          <p class="biaot" style="font-size: 43px;">30+达人维度匹配</p>
          <p class="fubiaot">拒绝直播带货翻车，精准寻找达人的新利器！带货效果提高300%！！！</p>
        </div>
      </div>

      <div class="flex">
        <div class=" flex flex-direction" style=" display: inline-block;">
          <p class="biaot" style="font-size: 43px;">为商家量身定制的报告</p>
          <p class="fubiaot">打造推荐达人组合的形式，以推荐若干个头部达人搭配部分中腰部<br>
            达人的形式，同时考虑“粉丝覆盖最多”“带货能力最好”等不同<br>
            卖点，为商家量身定制极大提高营销效果</p>
        </div>
        <div class=" flex flex-direction position-re">
          <img src="../../assets/imgs/tools_3.png" class=""
            style="width:351px; height: 369px;margin-top: 175px;margin-left: 45%;" />
        </div>
      </div>

      <div class="flex">
        <div class=" flex flex-direction position-re">
          <img src="../../assets/imgs/tools_4.png" style="width: 456px; height: 310px;margin-top: 196px;" />
        </div>
        <div class=" flex flex-direction" style="margin-left: 10%; margin-top: 50px;" align="left">
          <p class="biaot" style="font-size: 43px;">高效达人对接</p>
          <p class="fubiaot">联系达人却如同石沉大海？联系不到达人找蝉妈妈鹊桥平台，我们会<br>帮您联系到心仪的达人</p>
        </div>
      </div>
    </div>

    <div align="center" class="w-100">
      <p class="biaot" style="font-size: 43px; margin-top: 175px;"><b>不知道怎么选达人？看这里！</b></p>
      <div style="width: 1262px;height: 570px; margin-top: 54px; margin-bottom: 121px;">
        <video controls width="100%" height="570px"
          src="https://cdn-static.chanmama.com/res/2020_0305_ChanMama_PVideo01_x264.mp4"></video>
      </div>
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
        paymentBut: false,
        match: false, //匹配达人   支付
        checked: true, //过滤
        checkbox: '1',
        colour: false, //偏好风格
        intelligent: false, //智能匹配
        props: {
          multiple: true
        }, //级联选择
        zfbt: '', //标题选中情况
        unitPrice: '', //客单价
        budget: '1', //预算
        matching: 'tg', //初始化下一步
        gender: '不限', //粉丝性别
        age: '不限', //粉丝年龄
        liveType: '', //直播类型
        preferencesColour: [], //视频偏向风格
        colourIndex: '',
        videoPreferences: [],
        liveTypeList: [{
          value: '0',
          label: '不限',
          check: true
        }, {
          value: '1',
          label: '直播拼场',
          check: false
        }, {
          value: '2',
          label: '直播专场',
          check: false
        }],
        guestUnitPrice: [{ //客单价选择
            value: '0',
            label: '<30'
          }, {
            value: '1',
            label: '30-50'
          },
          {
            value: '2',
            label: '50-100'
          },
          {
            value: '3',
            label: '100-200'
          },
          {
            value: '4',
            label: '200-500'
          },
          {
            value: '5',
            label: '500-1000'
          },
          {
            value: '6',
            label: '>1000'
          }
        ],
        options: [{
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
          }, {
            value: 3,
            label: '江苏',
          }, {
            value: 4,
            label: '浙江',
          }]
        }, {
          value: 5,
          label: '西北',
          children: [{
            value: 6,
            label: '陕西',
          }, {
            value: 7,
            label: '新疆维吾尔族自治区',
          }]
        }],
        tableData: [{ //智能匹配记录
          date: '1',
          type: '1',
          industry: '1',
          text: '1',
          name: '1'
        }, { //智能匹配记录
          date: '1',
          type: '1',
          industry: '1',
          text: '1',
          name: '1'
        }]

      }
    },
    methods: {

      paymentButton(e) { //标题选中
        this.paymentBut = true;
        this.matching = 'tg';
        this.zfbt = e;
      },
      budgetClick(i) { //预算选择
        this.budget = i;
      },
      intelligentMatch() { //智能匹配
        this.intelligent = true;
      },
      checkedClick(e) {
        if (this.checkbox == e) {
          this.checkbox = "-1"
        } else {
          this.checkbox = e
        }
        console.log(this.checkbox)
      },
      colourClick(e) {
        // if (this.colourIndex == e) {
        //   this.colourIndex = '-1'
        // } else {
        //   this.colourIndex = e
        // }
        //  console.log(e)
        this.liveTypeList[e].check = !this.liveTypeList[e].check
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.tcxz {
    margin-left: 10%;
    height: 450px;
    background-color: #fff;
    border-radius: 5px;
    border-top: 6px solid #4343D4;
    position: relative;
    z-index: 2;
    box-shadow: 0px 3px 8px 0px rgba(153, 153, 153, 0.45);
  }

  /deep/.biaot {
    font-size: 38px;
    margin-top: 249px;
    color: #333;
  }

  /deep/.fubiaot {
    color: #999;
    margin-top: 23px;
  }

  /deep/.tc-button {
    color: #fff;
    width: 242px;
    height: 50px;
    font-size: 20px;
    border-radius: 5px;
    background: #4343D4;
  }
  .tc-button:hover{
    background: $rdx-pink;
  }

  /deep/.buttonys {
    color: #fff;
  }

  /deep/.zfdyb {
    width: 242px;
    height: 30px;
  }

  /deep/.ys {
    width: 156px;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
  }

  /deep/.ysSelect {
    border: 1px solid #DD001B;
  }

  /deep/.enputner {
    -webkit-appearance: none;
    background-color: #FFFFFF;
    border: none;
    box-sizing: border-box;
    color: #DD001B;
    display: inline-block;
    font-size: inherit;
    height: 20px;
    line-height: 20px;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    text-align: center;
  }

  /deep/.el-radio-button--small .el-radio-button__inner {
    padding: 8px 16px !important;
    font-size: 12px !important;
  }

  /deep/.time-bg2 {
    position: absolute;
    right: 0px;
    bottom: -1px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAwCAYAAABE1blzAAAAAXNSR0IArs4c6QAABFpJREFUaEPdml1TG2UUgJ/zJiR81aLSKR9BUj6UMhVEoFKkWEpahI4X/kqv9cprxwtndMbpDH4gUKCDjsNMtbVWS8jucU53aTEFmiwJ2bA3ucju5n1yNuc87zkRztih4O6R6Ve4An5Kzhgf6/Sdh6eTIJMKyTMF+DPt55KkJxz6qSLTQOHMAG6Q7fDJXwFyIHeAYeDJmQC8T09XHm/WIXMKFrlBIA3s1jXgMsOpFv7o8klOgy4C14BLgAtzy6O6Btyk83KBRM7BvKLjQAeQPJA4H9YloCWTNOl+H/kIWBJ0XOHNQyrCn3UHuMyF1iaS7wluQeEmcBl4/YhyV1+AK3S1J5FRAxNYAN4FUsfU8voB3KS302fPCvgdRWZALZk0vUJU4g+4ykBayXc7CpPAvCD2WPaXaGDxBrQy0Mjjt8H/UNAFkAmgC0jUPaA5pfLvgOCuK8xJUMDbSwTbPy2eEVzljdeEpnFBbgBzoJYpy4UzyPgBmlMq+RHFWfGeFRgBmsuMXDwjuEKmO4F/PUgmpl3SC7RGhItPBC2ZtPKg26NhGvxFkKkip4zKGI9HNHTKW4LmgPdDpyw1Ux4HX1tA064WUgOBU6rt4awMHKVdUaJYO8DfudjyBDd2wCltg9oWhSJ2qrZKxwWHGyWwktslOGVU7tOPYLD71g8smQhiGdMy5aucMv6A5pSwm3F4V8HNC2rthb6oKy/xutOJ4HeMN7Sx807glPIxqCWTzjKcskSel06rPuAG2TYfbwD8mRM4ZTwBgybs7oTADQXzyqGIThk/QNugKv6Ih+YEnQ0zZbWSyVFfQHUeUXPKJP6sJRPwp0CyQEvUMJzgusoCFjulINcUDG6/T3mCtUa6tHKACrLGW8MOPwc6rzAucPEUMmX1XdT6lAlSgy7sUwLWhK2kU0YKX0U2vPtOCW4pLAOWKSvtlLUBfOGUz7pd1oi1PuXB1nnUhVXquui/wUOc0pJJY6VWVqH7lA+4QbbRo5ARuMqzDvOpOGVU3vKGL1YGmvlrSPFnBHc7nOichlNGBSw9gqFTDhI0hWw2MHXERCfqYqpxXWmARU5pTdihOoCzL2zn2PGZFe8tejsKeKNBK69mThklunsg28cCrtHVIzgTZWstTIHa7rsWTlkuoAK/AVuHAloySfO4J4E/rYjNvg3OykC9DEzzwLcCay8t+IVTerfsLxkKYzFwynIj+CvwhSI//Q+wyCmtT2lN2Dg4ZTmAfwPfgH4G+stzQGvCNpMcU9xi6JQ20Tlfzp1jcO4/AncV/VKQz3dhW2zn7VE4J2Cz73mC2bf93urleApY1B4CG6Bf+7ivHKnv+7n3SNbpnBESWYUlUCvimRqRWebzAXstzg3773kge6B23h5gcA8U7jtkxUeXHdwVGrYusWnAyDrdthPoU/QTYCwsA0kQDW9kN6/WES5cC8HCMQD73CLA52sphGA+aB7EAHcUNgT9weF+TMJqhm37h5Nni/4PGz1R77n5uRYAAAAASUVORK5CYII=) no-repeat right top;
    width: 18px;
    height: 16px;
    background-size: 100%;
    border-radius: 0 0 5px 0;
  }

  /*2021-11-22*/
  /deep/.el-dialog__body {
    padding: 30px 0px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  .obj-head {
    height: 50px;
    margin-top: -50px;
  }

  /deep/.btSelected {
    border-bottom: 3px solid #DD001B;
    color: #DD001B;
  }

  /deep/.el-button {
    border: 0px;
  }
  .preferences {
    width: 90px;
    height: 30px;
    background: #EEEEEE;
    font-size: 14px;
    border-radius: 5px;
    color: #666;
    line-height: 30px;
    text-align: center;
  }

  .preferenceSelect {
	width: 90px;
	height: 30px;
	border: 1px solid #FF4C62;
	background: transparent;
	border-radius: 5px;
    font-size: 14px;
    color: #FF4C62;
    line-height: 30px;
    text-align: center;
  }
  .obj-reuse{
	  /deep/.el-table th{background-color: #E7ECF1;}
  }
</style>
