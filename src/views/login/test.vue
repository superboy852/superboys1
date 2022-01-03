<template>
  <div class="data-large flex justify-center align-center" ref="largeBody">
    <div class="flex justify-between" ref="largeId">
      <div class="left flex flex-direction">
        <div class="left-user flex flex-direction rdx-light-color position-re">
          <div class="flex align-center justify-between">
            <img src="../../assets/imgs/logo_3.png" style="width: 127px; height: 42px;">
<!--            <div class="super-but flex align-center justify-center">小时榜第 {{getData.largeInfor.room.rank}} 名</div> -->
          </div>
          <div class="flex justify-between rdx-light-color w-100 position-ab align-end" style="bottom: 25px;"
            v-if="getData.largeInfor.author.avatar != ''">
            <div class="user-c flex justify-between align-center" v-if="show.blockShow">
              <div class="flex align-center button-a" @click="linkLivingShow(getData.largeInfor.author.author_id)">
                <img :src="getData.largeInfor.author.avatar" class="head-img head-border button-a">
                <div class="flex flex-direction justify-around rdx-p-l-16">
                  <span class="font-strong rdx-font-24">{{getData.largeInfor.author.nickname}}</span>
                  <span class="rdx-p-t-10">{{getData.largeInfor.author.follower_count}}粉丝</span>
                </div>
              </div>
              <el-popover placement="bottom" width="170" trigger="hover" transition="ease"
                :style="show.codeShowOk ? '' : 'display: none;'">
                <div class="flex justify-center">
                  <div class="flex flex-direction align-center">
                    <div id="qrcode2" ref="qrcode2" style="width: 150px; height: 150px;"></div>
                  </div>
                </div>
                <div slot="reference" class="flex align-center justify-center rdx-m-r-8 button-a">
                  <span class="code-wx rdx-radius-10 rdx-bg-color flex align-center justify-center">
                    <div id="qrcode" ref="qrcode" style="width: 46px; height: 46px;"></div>
                  </span>
                </div>
              </el-popover>
            </div>
            <div class="user-c-not flex justify-center align-center" v-if="!show.blockShow">
              <img :src="getData.largeInfor.author.avatar" class="head-img head-border button-a">
            </div>
            <div class="flex rdx-p-r-50 align-end rdx-m-t-20" style="position: relative; top: 14px;">
              <div class="flex flex-direction position-re" style="margin-bottom: 27px;">
                <div class="position-ab" style="right: -140px; top: -130px;">
                  <img src="../../assets/imgs/money.gif" style=" width: 360px; height: 206px;">
                </div>
                <span class="rdx-font-26 rdx-light-color">GMV</span>
                <span class="rdx-font-50 flex align-center justify-center round rdx-bg-color font-strong"
                  style="width: 60px; height: 60px; color: #FD6A5B; margin-top: 21px;">￥</span>
              </div>
              <span class="rdx-p-l-24 position-re font-strong" style="font-size: 140px; font-family: DINEngschriftStd;">
                <count-up :delay="val.delay" :endVal="Number(val.amountNew)" :options="options"></count-up>
                <span class="number-tips flex align-center justify-center rdx-font-14 round position-ab"
                  style="top: -26px; right: 190px;" v-if="show.numberA">千</span>
                <span class="number-tips flex align-center justify-center rdx-font-14 round position-ab"
                  style="top: -26px; right: 296px;" v-if="show.numberB">十万</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="left-item flex justify-between">
            <div class="flex w-100 flex-direction position-re">
              <div class="left-watch data-bg flex rdx-m-t-24 flex-direction">
                <div class="flex justify-between rdx-p-b-40" style="border-bottom: 1px solid #353C65;">
                  <div class="flex watch-top align-center">
                    <div class="watch-ico flex align-center justify-center round">
                      <img src="../../assets/imgs/data_watch.png" style="width: 22px; height: 19px;">
                    </div>
                    <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">累计观看人次</div>
                  </div>
                  <div class="rdx-font-36 font-strong" style="color: #FFBD76;">{{getData.largeInfor.room.total_userAAA}}
                  </div>
                </div>
                <div class="flex rdx-p-t-24 justify-between align-center">
                  <div class="flex position-re rdx-flex-1">
                    <el-carousel height="36px" class="w-100" direction="vertical">
                      <el-carousel-item v-for="(barrageDataS,index3) in getData.barrageData.list" :key="index3">
                        <div class="flex rdx-light-color align-center">
                          <span class="large-color">{{barrageDataS.format_time}}</span>
                          <img src="../../assets/imgs/1.png" style="width: 36px; height: 36px;"
                            class="round rdx-m-l-24">
                          <span class="rdx-p-r-26 large-color rdx-line-1 rdx-p-l-4">“{{barrageDataS.nickname}}”</span>
                          <span class="rdx-line-1">{{barrageDataS.content}}</span>
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <div class="font-strong button-a" style="color: #FFBD76;" @click="openBarrage">更多弹幕</div>
                </div>
              </div>
              <!--更多弹幕弹窗-->
              <div class="position-ab rdx-radius-30 data-bg flex flex-direction rdx-m-t-24 rdx-p-26 barrage-more"
                :class="show.moreBarrage ? 'am-barrage' : '' " v-if="show.moreBarrage" style="top: 0px; width: 485px;">
                <div class="flex justify-between rdx-p-b-36" style="border-bottom: 1px solid #353C65;">
                  <div class="flex watch-top align-center">
                    <div class="watch-ico flex align-center justify-center round">
                      <img src="../../assets/imgs/data_watch.png" style="width: 30px; height: 26px;">
                    </div>
                    <div class="rdx-font-20 rdx-p-l-18 rdx-light-color">互动率</div>
                  </div>
                  <div class="rdx-font-36 font-strong" style="color: #FFBD76;">
                    <count-up :delay="val.delay" :endVal="val.barrageVal" :options="options2"></count-up>
                  </div>
                </div>
                <div style="width: 100%; overflow: hidden;">
                  <div class="flex flex-direction living-box" ref="livingBox">
                    <div class="flex align-center large-color" v-for="(barrageDataS,index4) in getData.barrageData.list"
                      :key="index4">
                      <div>{{barrageDataS.format_time}}</div>
                      <div class="flex align-center">
                        <img :src="barrageDataS.avatar" style="width: 36px; height: 36px;" class="round rdx-m-l-24">
                        <span class="rdx-p-l-20 rdx-te rdx-line-1" style="width: 80px;">{{barrageDataS.nickname}}</span>
                        <span class="rdx-p-l-20 rdx-te rdx-line-1 rdx-p-t-20 rdx-p-b-20"
                          style="width: 230px;">{{barrageDataS.content}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="position-ab rdx-bg-color round flex align-center justify-center button-all-all button-a"
                  style="top: 0px; right: 0px; width: 26px; height: 26px;" @click="closeBarrage">
                  <i class="iconfont icon-e686 rdx-font-20"></i>
                </div>
              </div>
              <div class="left-UV flex flex-direction align-center rdx-light-color rdx-m-t-24">
                <div class="flex justify-between w-100">
                  <div class="flex flex-direction">
                    <span class="rdx-font-26">{{getData.largeInfor.room.user_count}}</span>
                    <div class="flex align-center rdx-p-t-6">
                      <img src="../../assets/imgs/large_left_ico1.png" style="width: 16px; height: 12px;">
                      <span class="rdx-p-l-8">实时观看</span>
                    </div>
                  </div>
                  <div class="flex flex-direction align-center">
                    <span class="rdx-font-26"
                      style="font-family: MicrosoftYaHeiHeavy;">{{getData.largeInfor.room.user_value}}</span>
                    <div class="flex align-center rdx-p-t-6">
                      <img src="../../assets/imgs/large_left_ico2.png" style="width: 16px; height: 14px;">
                      <span class="rdx-p-l-8">UV价值</span>
                    </div>
                  </div>
                  <div class="flex flex-direction">
                    <span class="rdx-font-26">{{getData.largeInfor.room.user_peak}}</span>
                    <div class="flex align-center rdx-p-t-6">
                      <!--                      <img src="../../assets/imgs/large_left_ico3.png" style="width: 14px; height: 14px;"> -->
                      <div class="iconfont icon-e749"></div>
                      <span class="rdx-p-l-8">用户峰值</span>
                    </div>
                  </div>
                </div>
                <div class="flex position-re watch-a">
                  <div class="watch-am">1</div>
                </div>
              </div>
              <div class="left-view flex flex-direction rdx-m-t-24 position-re">
                <div class="flex justify-between rdx-p-b-24 position-ab">
                  <div class="flex watch-top align-center">
                    <div class="watch-ico flex align-center justify-center round">
                      <img src="../../assets/imgs/data_ico_1.png" style="width: 29px; height: 13px;">
                    </div>
                    <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">观看趋势</div>
                  </div>
                </div>
                <div ref="watchId" class="rdx-m-t-10" style="width: 100%; height: 450px;"></div>
              </div>
            </div>
          </div>
          <div class="goods data-bg flex flex-direction rdx-m-t-24">
            <div class="flex justify-between">
              <div class="flex watch-top align-center rdx-light-color">
                <div class="watch-ico flex align-center justify-center round" style="background-color: #ff3f5a;">
                  <img src="../../assets/imgs/data_ico_1.png" style="width: 29px; height: 13px;">
                </div>
                <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">商品/销量</div>
              </div>
              <div class="flex align-center">
                <div class="flex rdx-light-color rdx-p-r-20" v-if="show.blockShow">
                  <div class="rdx-tips-color rdx-p-l-34 rdx-p-t-10" v-if="getData.goodsAmount != ''">商品数</div>
                  <div class="rdx-font-26 rdx-p-l-6" v-if="getData.goodsAmount != ''">
                    {{getData.goodsAmount.product_size}}
                  </div>
                  <div class="rdx-tips-color rdx-p-l-8 rdx-p-t-10" v-if="getData.goodsAmount != ''">总销量</div>
                  <div class="rdx-font-26 rdx-p-l-6" v-if="getData.goodsAmount != ''">
                    {{getData.goodsAmount.total_volume}}
                  </div>
                  <div class="rdx-tips-color rdx-p-l-8 rdx-p-t-10" v-if="getData.goodsAmount != ''">单</div>
                </div>
                <div class="flex goods-tab">
                  <div class="rdx-tips-color rdx-flex-1 rdx-text-center button-a rdx-line-height-38"
                    :class="show.putawayIndex == 'crawl_time' ? 'goods-active rdx-light-color' : '' "
                    @click="onPutaway('crawl_time')">上架时间
                  </div>
                  <div class="rdx-tips-color rdx-flex-1 rdx-text-center button-a rdx-line-height-38"
                    :class="show.putawayIndex == 'rt_amount' ? 'goods-active rdx-light-color' : '' "
                    @click="onPutaway('rt_amount')">销售额
                  </div>
                </div>
              </div>

            </div>
            <div ref="goodsId" style="width: 100%; height: 170px;"></div>

            <div class="goods-table flex rdx-tips-color rdx-m-t-25 rdx-font-14">
              <div class="w-50 rdx-p-l-40 rdx-p-t-6 rdx-p-b-6 rdx-p-l-40">商品</div>
              <div class="w-15 rdx-p-l-20 rdx-p-t-6 rdx-p-b-6 rdx-text-center">直播价</div>
              <div class="w-15 rdx-p-l-20 rdx-p-t-6 rdx-p-b-6 rdx-text-center">销量(件)</div>
              <div class="w-15 rdx-p-l-20 rdx-p-t-6 rdx-p-b-6 rdx-text-center">销售额</div>
            </div>
            <div class="goods-box">
              <!--  @mouseenter="putawayEnter" @mouseleave="putawayLeave"             <vue-seamless-scroll :data="getData.putawayData" v-if="getData.putawayData != ''"
                :class-option="defaultOption" id="putawayId">
                <ul>
                  <div class="flex rdx-tips-color align-center" style="border-bottom: 1px solid #353c65;"
                    v-for="(putawayS,index2) in getData.putawayData" :key="index2">
                    <div class="w-50 rdx-p-l-40 rdx-p-t-14 rdx-p-b-14 rdx-p-l-40 flex align-center">
                      <img :src="putawayS.image" style="width: 52px; height: 52px;">
                      <span class="rdx-light-color rdx-p-l-18">{{putawayS.product_title}}</span>
                    </div>
                    <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.final_price}}</div>
                    <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.volume}}</div>
                    <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.amount}}</div>
                  </div>
                </ul>
              </vue-seamless-scroll> -->
              <div style="height: 100%; overflow-y: auto; width: 766px;" ref="putawayId" @mouseenter="putawayEnter"
                @mouseleave="putawayLeave">
                <div class="flex rdx-tips-color align-center" style="border-bottom: 1px solid #353c65; height: 80px;"
                  v-for="(putawayS,index2) in getData.putawayData" :key="index2">
                  <div class="w-50 rdx-p-l-40 rdx-p-t-14 rdx-p-b-14 rdx-p-l-40 flex align-center">
                    <img :src="putawayS.image" style="width: 52px; height: 52px;" onerror="javascript:this.src='http://douyin.guanxingshu.com/img/no_img.png'">
                    <span class="rdx-light-color rdx-p-l-18">{{putawayS.product_title}}</span>
                  </div>
                  <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.final_price}}</div>
                  <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.volume}}</div>
                  <div class="w-15 rdx-p-l-20 rdx-p-t-14 rdx-p-b-14 rdx-text-center">{{putawayS.amount}}</div>
                </div>
              </div>
              <no-data marginTop="20" class="rdx-p-t-30" v-if="getData.putawayData == ''"></no-data>
            </div>

          </div>
        </div>
      </div>
      <div class="right-c">
        <div class="living-ok data-bg rdx-light-color flex" style="height: 281px;">
          <div class="flex position-re align-center justify-center" @click="linkLiving" v-if="show.blockShow">
            <img :src="getData.largeInfor.room.live_cover" style="width: 180px; height: 230px; border-radius: 6px;">
            <span class="video-button flex align-center justify-center position-ab button-a">
              <i class="iconfont icon-ea82 rdx-light-color rdx-font-26"></i>
            </span>
          </div>
          <div class="flex rdx-p-l-16 flex-direction position-re">
            <span class="rdx-font-26 link-primary" @click="linkLiving">{{getData.largeInfor.room.user_count}}宝贝 正在围观
              {{getData.largeInfor.room.room_title}}</span>
            <div class="flex rdx-p-t-12">
              <el-popover placement="bottom" width="170" trigger="hover" transition="ease">
                <div class="flex justify-center">
                  <div class="flex flex-direction align-center">
                    <img src="../../assets/imgs/gzh.jpg" style="width: 150px; height: 150px;">
                    <span class="rdx-font-12 rdx-tips-color">手机查看实时数据</span>
                  </div>
                </div>
                <div slot="reference" class="living-right flex align-center justify-center button-a">
                  <i class="iconfont icon-e641 rdx-font-24"></i>
                </div>
              </el-popover>
              <div class="flex align-center rdx-m-l-16" v-if="getData.largeInfor.room.status == 2">
                <div class="flex flex-direction rdx-tips-color">
                  <span>开播 {{getData.largeInfor.room.begin_time}} 下播 --- </span>
                  <!--                  <span class="rdx-line-height-30">累计直播 {{getData.largeInfor.room.live_duration}}</span> -->
                </div>
              </div>
              <div class="flex align-center rdx-m-l-16" v-if="getData.largeInfor.room.status == 4">
                <div class="flex flex-direction rdx-tips-color">
                  <span>开播 {{getData.largeInfor.room.begin_time}} 下播 {{getData.largeInfor.room.room_finish_time}}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-center position-ab" style="bottom: 0px;">
              <div class="living-button flex align-center justify-center rdx-m-r-24"
                v-if="getData.largeInfor.room.status == 2">
                <span class="rdx-font-24 rdx-p-r-14">直播中</span>
                <img src="../../assets/imgs/large_left_ico4.gif" style="width: 24px; height: 24px;">
              </div>
              <div class="living-button flex align-center justify-center rdx-m-r-14"
                v-if="getData.largeInfor.room.status == 4">
                <span class="rdx-font-24 rdx-p-r-24">已下播</span>
                <img src="../../assets/imgs/large_left_ico5.png" style="width: 24px; height: 24px;">
              </div>
            </div>
          </div>
        </div>
        <div class="living-ok data-bg rdx-m-t-25" style="height: 287px;">
          <div class="flex watch-top align-center rdx-light-color rdx-p-b-25" style="border-bottom: 1px solid #353c65;">
            <div class="watch-ico flex align-center justify-center round" style="background-color: #48d9c4;">
              <img src="../../assets/imgs/data_ico_2.png" style="width: 22px; height: 22px;">
            </div>
            <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">音浪收入</div>
          </div>
          <div class="flex w-100 justify-between" style="height: 180px; overflow: hidden;"
            v-if="getData.incomeData != ''">
            <vue-seamless-scroll style="width: 100%;" :data="getData.incomeData" :class-option="defaultOption2"
              id="incomeId">
              <div class="flex w-100 justify-between rdx-p-t-20 rdx-light-color align-center income-box"
                v-for="(incomeS,index4) in getData.incomeData" :key="index4" style="overflow: hidden;">
                <div class="flex align-center">
                  <img :src="incomeS.avatar" class="round rdx-m-r-8" style="width: 40px; height: 40px;">
                  <span>{{incomeS.nickname}}</span>
                </div>
                <div>{{incomeS.score_percent}}%</div>
              </div>
            </vue-seamless-scroll>
          </div>
          <div class="flex w-100 justify-center rdx-tips-color rdx-p-t-20" v-if="getData.incomeData == ''">
            暂无数据
          </div>


        </div>
        <div class="living-ok data-bg rdx-m-t-25 position-re">
          <div class="flex justify-between rdx-p-b-6 position-ab">
            <div class="flex watch-top align-center">
              <div class="watch-ico flex align-center justify-center round" style="background-color: #ff3f5a;">
                <img src="../../assets/imgs/data_ico_1.png" style="width: 29px; height: 13px;">
              </div>
              <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">涨粉/粉丝团趋势</div>
            </div>
            <!--            <div class="rdx-tips-color flex align-center">
              <span class="data-lineA rdx-m-r-6"></span>
              <span>涨粉人数</span>
              <span class="data-lineB rdx-m-l-24 rdx-m-r-6"></span>
              <span>新增粉丝团</span>
            </div> -->
          </div>
          <div class="flex justify-between rdx-p-l-40 align-center rdx-light-color position-ab rdx-flex-1"
            style="top: 90px; left: -20px; width: 100%;">
            <div class="flex align-center">
              <span class="rdx-tips-color">累计涨粉</span>
              <span class="rdx-font-26 rdx-p-l-8">{{getData.fansChartsList.increment_following_count}}</span>
            </div>
            <div class="flex align-center">
              <span class="rdx-tips-color">转粉率</span>
              <span class="rdx-font-26 rdx-p-l-8 rdx-p-r-10">{{val.rateFans}}%</span>
            </div>
          </div>
          <div ref="fansId" style="width: 100%; height: 228px;"></div>
        </div>
        <div class="living-ok data-bg rdx-m-t-25 position-re" style="padding-bottom: 0px; height: 250px;">
          <div class="flex justify-between rdx-p-b-26 position-ab">
            <div class="flex watch-top align-center">
              <div class="watch-ico flex align-center justify-center round" style="background-color: #48d9c4;">
                <img src="../../assets/imgs/data_ico_3.png" style="width: 23px; height: 18px;">
              </div>
              <div class="rdx-font-20 rdx-p-l-14 rdx-light-color font-strong">观众画像</div>
            </div>
          </div>
          <el-carousel height="250px" class="w-100" :interval="10000">
            <el-carousel-item>
              <div class="flex w-100" style="margin-top: 70px;">
                <div ref="audience" style="width: 100%; height: 150px;"></div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="flex w-100" style="margin-top: 70px;">
                <div ref="man" style="width: 100%; height: 150px;"></div>
              </div>
            </el-carousel-item>
          </el-carousel>

        </div>
      </div>
    </div>
    <!--视频播放-->
    <div class="video">
      <el-dialog title="直播" :modal="show.labelShow" :visible.sync="show.videoShow" width="300px"
        :before-close="videoClose">
        <div>
          <!--          <video id="videoElement" controls style="width: 100%; height: 500px; object-fit: cover;"></video> -->
          <video id="videoElement" controls autoplay width="100%" height="500px"></video>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import lineChart from "@/components/lineChart.vue"
  import pieChart from "@/components/pieChart.vue"
  import countUp from 'vue-countup-v2'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import * as tools from '@/common/tools.js';
  import noData from '../../components/noData.vue'
  import QRCode from 'qrcodejs2'
  import flvjs from 'flv.js'
  export default {
    components: {
      lineChart,
      pieChart,
      countUp,
      vueSeamlessScroll,
      noData
    },
    data() {
      return {
        flvPlayer: null,
        getData: {
          watchDataAll: [],
          largeInfor: {
            author: {
              avatar: ""
            },
            room: {
              amount: ""
            }
          }, //信息
          barrageData: {}, //弹幕/累计观看人次
          barrageDataNew: [], //弹幕新的数组
          putawayData: [], //商品列表
          goodsAmount: {}, //商品/销量
          incomeData: [], //音浪收入
          fansChartsList: {}, //粉丝团趋势
        },
        options: {
          useEasing: true,
          useGrouping: true,
        },
        options2: {
          useGrouping: true,
          suffix: '%'
        },
        val: {
          delay: 0,
          endVal: 0,
          amountNew: 0, //总销售额
          roomId: "", //直播房间号
          timestamp: "", //时间戳 秒
          barrageVal: 0, //弹幕互动率
          timeAdd: 0, //开播累计时间
          man: 0, //男性图表值
          woman: 0, //女性图表值
          codeWx: '', //二维码
          widthInit: 1, //图表缩放补偿
          numberText: "", //亿万值
          numberText2: "", //亿万值
          rateFans: 0, //转粉率
          putawayTop: 0, //商品上升高度
        },
        show: {
          labelShow: false,
          moreBarrage: false, //弹幕关闭
          putawayIndex: 'crawl_time', //crawl_time上架时间 rt_amount销售额
          dataShow: false,
          fansShow: false, //涨粉/粉丝团趋势展示
          watchType: '1', //1在线 2新增
          blockShow: true, //内容是否显示
          videoShow: false, //视频播放弹窗
          numberA: false, //千位显示
          numberB: false, //十万显示
          codeShow: false, //闭环显示二维码
          codeShowOk: false, //显示二维码
        },
        chartData: {
          watchData: {}, //观看趋势
          goods: {}, //商品/销量
          fansData: {}, //涨粉/粉丝团趋势
          audienceData: {}, //观众画像
        },
        clientWidth: 0, //屏幕宽度
      }
    },
    watch: {
      "getData.largeInfor.room.user_count": function(newVal, old) {
      }
    },
    computed: {
      defaultOption() {
        return {
          singleHeight: 81, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        }
      },
      defaultOption2() {
        return {
          step: 0.7, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        }
      }
    },
    created() {
      this.val.timestamp = parseInt(Date.parse(new Date()) / 1000)
      this.clientWidth = window.document.body.offsetWidth
      if (this.clientWidth < 1600) { //屏幕小于一定值隐藏
        this.show.blockShow = true
      }
    },
    mounted() {
      this.val.roomId = this.$route.query.id
      // this.val.roomId = "7003145055079074567"
      this.val.status = tools.getQueryString('status') //设置状态 0预告  2直播  4下播
      this.getLargeInfor()
      this.getBarrage()
      this.getWatch()
      this.getGoodsList()
      this.getGoods()
      this.getFans()
      this.getAudience()
      this.getIncome()
      this.barrageTime = setInterval(() => {
        this.getBarrage()
      }, 10000)
      this.chartTime = setInterval(() => {
        this.getLargeInfor()
        this.getWatch()
        this.getFans()
        this.getAudience()
        this.getIncome()
        this.getGoods()
      }, 5000)
      this.getResize()
    },
    beforeDestroy() {
      clearInterval(this.livingTime)
      clearInterval(this.barrageTime)
      clearInterval(this.chartTime)
      clearInterval(this.setTimePutaway)
      clearInterval(this.scrollToGo)
      // clearInterval(this.timeGo())
      window.document.body.removeAttribute('style')
      document.getElementById('app').removeAttribute('style')
      if (this.flvPlayer) {
        this.flvPlayer.pause()
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
      }
    },
    methods: {
      qrcode() {
        let qrcode = new QRCode('qrcode', {
          width: 46,
          height: 46,
          correctLevel: 3,
          text: this.val.codeWx
        })
        this.show.codeShowOk = true
      },
      qrcode2() {
        let qrcode = new QRCode('qrcode2', {
          width: 150,
          height: 150,
          correctLevel: 3,
          text: this.val.codeWx
        })
      },

      getResize() {
        var widthRatio = window.screen.width //分辨率宽
        var widthUsable = document.body.clientWidth //可见区域宽
        if (widthRatio < 1920 || widthUsable < 1920) {
          var widthAuto = widthUsable / 1920
          if (widthAuto < 0.9) {
            this.val.widthInit = 1 + (1 - widthAuto) + 0.1
            this.$refs.largeId.setAttribute('style',
              'transform: scale(' + widthAuto + ');')
          }
        }else{
          this.$refs.largeBody.setAttribute('style','height: auto;')
        }
      },
      //音浪收入
      async getIncome() {
        var params = {
          roomId: this.val.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/real/time/usersGif', params)

        if (data != undefined || data != '') {
          data.list.forEach((item) => {
            item.score_percent = item.score_percent.toFixed(2)
          })
          this.getData.incomeData = data.list
        }
      },
      //获取弹幕信息
      async getBarrage() {
        var params = {
          roomId: this.val.roomId,
          cursor: "",
          sizes: ""
        }
        const {
          data
        } = await this.$get('/api/live/real/time/dm', params, true)
        if (data != '' || data != undefined) {
          this.getData.barrageData = data
          this.getData.barrageData.list.forEach((item) => {
            var time = item.format_time.split(' ')[1].split(':')[0] + ':' + item.format_time.split(' ')[1].split(
              ':')[1]
            item.format_time = time
          })
          this.val.barrageVal = data.inter_rate.toFixed(2) * 100
          this.getData.barrageData.total_userAAA = tools.numberVerify(this.getData.barrageData.total_user)
        } else {
          this.$message.error('暂无弹幕信息')
        }
      },
      //获取个人信息
      async getLargeInfor() {

        var params = {
          timestamp: this.val.timestamp,
          roomId: this.val.roomId,
          jsVer: "",
        }
        const {
          data
        } = await this.$get('/api/live/real/time/info', params)
        if (data != '' || data != undefined) {
          this.getData.largeInfor = data
          this.val.codeWx = this.getData.largeInfor.room.share_url
          this.val.amountNew = this.getData.largeInfor.room.amount
          this.getData.largeInfor.room.user_value = this.getData.largeInfor.room.user_value.toFixed(2)
          this.getData.largeInfor.room.user_count = tools.numberVerify(this.getData.largeInfor.room.user_count)
          this.getData.largeInfor.room.total_userAAA = tools.numberVerify(this.getData.largeInfor.room.total_user)
          // let time = new Date(this.getData.largeInfor.room.average_residence_time * 1000)
          // let minute = time.getMinutes()
          // let second = time.getSeconds()
          // this.getData.largeInfor.room.average_residence_time = minute + "'" + second //平均停留

          this.getData.largeInfor.room.begin_time = tools.time_cycle('4', this.getData.largeInfor.room
            .begin_time) //开播
          if (this.getData.largeInfor.room.status == 4) {
            this.getData.largeInfor.room.room_finish_time = tools.getDateDiff(this.getData.largeInfor.room
              .room_finish_time)
          }

          //计算万值显示提示
          setTimeout(() => {
            if (this.val.amountNew / 1000 > 1 && this.val.amountNew / 1000000 < 1) {
              this.show.numberA = true
            }
            if (this.val.amountNew / 1000000 > 1) {
              this.show.numberB = true
            }
          }, 2000)
          //显示二维码
          if (!this.val.codeShow) {
            this.qrcode()
            this.qrcode2()
          }
          this.val.codeShow = true
        } else {
          this.$message.error('暂无直播信息')
        }
      },
      //获取更多弹幕数据
      getLiving() {
        this.getBarrage()
        this.livingTime = setInterval(() => {
          this.$refs.livingBox.scrollTop += 61
          this.$forceUpdate()
        }, 1000)
      },
      //关闭更多弹幕
      closeBarrage() {
        this.show.moreBarrage = false
        clearInterval(this.livingTime)
      },
      //打开更名弹幕弹窗
      openBarrage() {
        this.show.moreBarrage = true
        setTimeout(() => {
          this.getLiving()
        }, 300)
      },
      //观众来源
      async getAudience() {
        var analysis = {}
        var params = {
          roomId: this.val.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/real/time/analysis', params)
        if (data != undefined || data != '') {
          analysis = data

        }
        let myChart = this.$echarts.init(this.$refs.audience)
        let option;
        option = {
          color: ['#6dedda', '#48d9c4', '#2fb3a0', '#148b7a'],
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          grid: {
            top: 140,
            bottom: 20,
            left: 50,
            right: 20
          },
          legend: {
            show: true,
            left: 56,
            top: 10,
            orient: 'vertical',
            icon: 'roundRect',
            itemWidth: 28,
            itemHeight: 6,
            textStyle: {
              fontSize: 16,
              color: '#999999',
            }
          },
          series: [{
            name: '观众画像',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ["65%", "43%"],
            label: {
              show: false,
              position: 'right'
            },
            data: [{
                value: analysis.user_count_composition.city,
                name: '同城'
              },
              {
                value: analysis.user_count_composition.video_detail,
                name: '视频'
              },
              {
                value: analysis.user_count_composition.my_follow,
                name: '粉丝'
              },
              {
                value: analysis.user_count_composition.other,
                name: '其他'
              },
            ]
          }]
        }
        this.val.man = parseInt(analysis.gender.male)
        this.val.woman = parseInt(analysis.gender.female)
        var manInit = 100 - this.val.man
        var myMan = this.$echarts.init(this.$refs.man)
        var optionMan;
        optionMan = {
          color: ['#F19EC2', '#E5E5E5'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          grid: {
            top: 140,
            bottom: 20,
            left: 50,
            right: 20
          },
          legend: {
            show: true,
            left: 56,
            bottom: 30,
            orient: 'vertical',
            icon: 'roundRect',
            itemGap:20,
            itemWidth: 28,
            itemHeight: 6,
            textStyle: {
              fontSize: 16,
              color: '#999999',
            }
          },
          series: [{
            type: 'pie',
            name:'男女占比',
            radius: ['50%', '80%'],
            center: ["55%", "43%"],
            label: {
              show: false,
            },
            data: [{
                value: this.val.man,
                name: '男'
              },
              {
                value: this.val.woman,
                name: '女'
              }
            ]
          }]
        }
        this.$nextTick(() => {
          myChart.clear()
          myChart.setOption(option)
          myMan.clear()
          myMan.setOption(optionMan)
        })
      },
      //涨粉/粉丝团趋势
      async getFans() {
        this.show.fansShow = false
        var fansCharts = []
        var fansDate = []
        var total_fans_count = []
        var today_new_fans_count = []
        var params = {
          roomId: this.val.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/real/time/fansCharts', params)
        if (data != undefined || data != '') {
          this.show.fansShow = true
          this.getData.fansChartsList = data
          // this.getData.fansChartsList.following_rate = this.getData.fansChartsList.following_rate.toFixed(2) //转粉率
          if (this.getData.largeInfor.room.total_user != undefined && this.getData.largeInfor.room.total_user != 0) {
            this.val.rateFans = (this.getData.fansChartsList.increment_following_count / this.getData.largeInfor.room
              .total_user * 100).toFixed(2)
          }
          this.getData.fansChartsList.increment_following_count = this.getData.fansChartsList
            .increment_following_count >= 10000 ? (this.getData.fansChartsList.increment_following_count / 10000)
            .toFixed(1) + 'w' : this.getData.fansChartsList.increment_following_count
          fansCharts = data.chart
          fansCharts.forEach((item) => {
            fansDate.push(tools.time_cycle('4', item.crawl_time))
            total_fans_count.push(item.hot_rank)
            today_new_fans_count.push(item.today_new_fans_count)
          })

          let myChart = this.$echarts.init(this.$refs.fansId)
          let option;
          option = {
            color: ['#FFBD76'],
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            legend: {
              show: true,
              right: 10,
              top: 12,
              orient: 'vertical',
              icon: 'roundRect',
              itemWidth: 28,
              itemHeight: 6,
              textStyle: {
                fontSize: 16,
                color: '#999999',
              }
            },
            grid: {
              top: 120,
              bottom: 20,
              right: 16
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: fansDate
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#353C65'
                }
              },
              boundaryGap: false,
              axisLabel: {
                color: '#999999'
              },
            },
            series: [{
              areaStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(210,196,136,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(210,196,136,0)'
                }])
              },
              name: '涨粉人数',
              symbol: "none",
              data: total_fans_count,
              type: 'line',
              smooth: true
            }]
          }
          this.$nextTick(() => {
            myChart.clear()
            myChart.setOption(option)
          })
        }
      },
      onWatch(type) {
        this.show.watchType = type
      },
      //观看趋势
      async getWatch() {
        this.getData.watchDataAll = []
        var params = {
          roomId: this.val.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/real/time/watchCharts', params, true)
        this.getData.watchDataAll = data
        var dataDate = []
        var dataLine = []
        var dataUser = []
        this.getData.watchDataAll.forEach((item) => {
          dataDate.push(tools.time_cycle(4, item.crawl_time))
          // if (item.user_count / 10000 > 1) {
          //   dataLine.push((item.user_count / 10000).toFixed(2))
          //   this.val.numberText = 'w'
          // } else {
          //   dataLine.push(item.user_count)
          //   this.val.numberText = ''
          // }
          // if (item.total_user_incr / 10000 > 1) {
          //   dataUser.push((item.total_user_incr / 10000).toFixed(2))
          //   this.val.numberText = 'w'
          // } else {
          //   dataUser.push(item.total_user_incr)
          //   this.val.numberText = ''
          // }
          dataLine.push(item.user_count)
          dataUser.push(item.total_user_incr)
        })
        let myChart = this.$echarts.init(this.$refs.watchId)
        var my = this
        let option;
        option = {
          color: ['#FFBD76', ],
          tooltip: {
            trigger: 'axis',
            // formatter: function(datas) {
            //   return datas[0].seriesName + ':' + datas[0].data + my.val.numberText + '<br/>' + datas[1]
            //     .seriesName + ':' + datas[1].data + my.val.numberText
            // },
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          legend: {
            show: true,
            right: 0,
            top: 0,
            itemGap: 24,
            orient: 'horizontal',
            icon: 'roundRect',
            itemWidth: 28,
            itemHeight: 6,
            textStyle: {
              fontSize: 16,
              color: '#999999',
            }
          },
          grid: {
            top: 80,
            bottom: 20,
            right: 10,
            left: 60
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dataDate,
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#353C65'
              }
            },
            axisLabel: {
              color: '#999999',
              fontsize: 12,
              // margin: 0,
              // padding: 0,
              formatter: "{value}" + this.val.numberText
            },
            boundaryGap: false,
          },
          series: [{
              areaStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                  offset: 0,
                  color: 'rgba(210,196,136,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(210,196,136,0)'
                }])
              },
              name: '在线',
              symbol: "none",
              data: dataLine,
              type: 'line',
              smooth: true
            }
          ]
        }
        this.$nextTick(() => {
          myChart.clear()
          myChart.setOption(option)
        })
      },
      //点击销售额
      onPutaway(sort) {
        clearInterval(this.setTimePutaway)
        this.show.putawayIndex = sort
        this.getGoods()
        this.getGoodsList()
      },
      //鼠标移出时动作
      putawayLeave() {
        this.setTimePutaway = setInterval(() => {
          var falg = 0
          var scrollHeight = this.$refs.putawayId.scrollHeight;
          var scrollTop = this.$refs.putawayId.scrollTop;
          var objHeight = this.$refs.putawayId.offsetHeight;
          if (scrollHeight <= (scrollTop + objHeight + 10)) {
            this.$refs.putawayId.scrollTop = 0
          } else {
            this.scrollToGo = setInterval(()=>{
              this.$refs.putawayId.scrollTo(this.$refs.putawayId.scrollTop,this.$refs.putawayId.scrollTop += 10)
              falg += 1
              if(falg >= 8){
                clearInterval(this.scrollToGo)
              }
            },100)
          }
        }, 2000)
      },
      //鼠标悬停时动作
      putawayEnter() {
        clearInterval(this.setTimePutaway)
        clearInterval(this.scrollToGo)
      },
      //获取商品列表
      async getGoodsList() {
        this.getData.putawayData = []
        var params = {
          timestamp: this.val.timestamp,
          roomId: this.val.roomId,
          sort: this.show.putawayIndex,
          formDataStr: "",
          formDataSign: ""
        }
        const {
          data
        } = await this.$get('/api/live/real/time/productItem', params)
        if (data != undefined || data.list != '') {
          this.getData.putawayData = data.list
          this.setTimePutaway = setInterval(() => {
            var falg = 0
            var scrollHeight = this.$refs.putawayId.scrollHeight;
            var scrollTop = this.$refs.putawayId.scrollTop;
            var objHeight = this.$refs.putawayId.offsetHeight;
            if (scrollHeight <= (scrollTop + objHeight + 10)) {
              this.$refs.putawayId.scrollTop = 0
            } else {
              this.scrollToGo = setInterval(()=>{
                this.$refs.putawayId.scrollTo(this.$refs.putawayId.scrollTop,this.$refs.putawayId.scrollTop += 10)
                console.log("1120",falg)
                falg += 1
                if(falg >= 8){
                  console.log("11ZZ")
                  clearInterval(this.scrollToGo)
                }
              },100)
            }
            console.log("1120AAA",this.$refs.putawayId.scrollTop)
          }, 2000)
        }
        this.$forceUpdate()
      },
      //商品/销量
      async getGoods() {
        var dataDate = []
        var rt_amount = []
        var params = {
          roomId: this.val.roomId,
          sort: this.show.putawayIndex
        }
        const {
          data
        } = await this.$get('/api/live/real/time/productSales', params, true)
        if (data != undefined || data != '') {
          this.show.dataShow = false
          this.getData.goodsAmount = data
          console.log("销量", this.getData.goodsAmount)
          this.getData.goodsAmount.list.forEach((item) => {
            dataDate.push(tools.time_cycle(4, item.crawl_time))
            rt_amount.push(item.rt_volume)
            // if (item.rt_volume / 10000 > 1) {
            //   this.getData.goodsAmount.list.forEach((arr)=>{
            //     rt_amount.push((arr.rt_volume / 10000).toFixed(2))
            //     this.val.numberText2 = 'w'
            //   })
            // }
          })
          this.getData.goodsAmount.product_size = tools.numberVerify(this.getData.goodsAmount.product_size)
          this.getData.goodsAmount.total_volume = tools.numberVerify(this.getData.goodsAmount.total_volume)
          let myChart = this.$echarts.init(this.$refs.goodsId)
          var my = this
          let option;
          option = {
            color: ['#FFBD76'],
            tooltip: {
              trigger: 'axis',
              formatter: function(datas) {
                return datas[0].seriesName + ':' + datas[0].data + my.val.numberText2
              },
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 25,
              bottom: 20,
              // left:200,
              right: 16
            },
            xAxis: {
              type: 'category',
              data: dataDate,
              boundaryGap: false,
              axisLabel: {
                interval: dataDate.length - 2
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#353C65'
                }
              },
              axisLabel: {
                color: '#999999',
                formatter: "{value}" + this.val.numberText2
              },
              boundaryGap: false,
            },
            series: [{
              areaStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(210,196,136,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(210,196,136,0)'
                }])
              },
              name: '销量',
              symbol: "none",
              data: rt_amount,
              type: 'line',
              smooth: true
            }]
          }
          this.$nextTick(() => {
            myChart.clear()
            myChart.setOption(option)
          })
        }
      },
      //打开视频
      linkLiving() {
        if (this.getData.largeInfor.room.status == 2 || this.getData.largeInfor.room.status == 0) {
          this.show.videoShow = true
          setTimeout(() => {
            this.flvGo()
          }, 300)
        } else {
          this.$message.success("该视频已下播")
        }
      },
      //关闭视频
      videoClose() {
        this.show.videoShow = false
        if (this.flvPlayer) {
          this.flvPlayer.pause()
          this.flvPlayer.unload()
          this.flvPlayer.detachMediaElement()
          this.flvPlayer.destroy()
          this.flvPlayer = null
        }
      },
      //播放flv
      flvGo() {
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement');
          this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: this.getData.largeInfor.room.flv_pull_url
          });
          this.flvPlayer.attachMediaElement(videoElement);
          this.flvPlayer.load();
          this.flvPlayer.play();
        }
      },
      //跳转到直播详情
      linkLivingShow(id) {
        var url = this.$router.resolve({
          path: '/talent/talent_detail',
          query: {
            id: id
          }
        })
        window.open(url.href, '_blank')
      }

    }
  }
</script>

<style lang="scss" scoped>
  // @import "./data.scss";

  /deep/.el-carousel__indicators--vertical {
    display: none;
  }
</style>
