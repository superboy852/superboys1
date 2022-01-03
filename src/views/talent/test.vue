<template>
  <div class="box flex flex-direction talentShow">
    <div class="box-shadow ">
      <div class="flex line-bottom justify-between rdx-p-b-20 position-re">
        <div class="flex align-center">
          <img :src="getData.livingDetail.avatar" class="round" style="width: 88px; height: 88px;">
          <div class="flex flex-direction rdx-p-l-20 justify-center" style="height: 88px;">
            <div class="flex align-center">
              <strong class="font-strong rdx-p-r-20 btn_hover">{{getData.livingDetail.nickname}}</strong>
              <span class="rdx-warning-disabled-bg rdx-line-height-18 rdx-warning rdx-radius-8 rdx-font-12">直播</span>
              <i class="iconfont icon-e610 rdx-m-l-10 rdx-primary"></i>
            </div>
            <div class="rdx-tips-color rdx-font-14 rdx-p-t-10">抖音号 {{getData.livingDetail.unique_id}}</div>
          </div>
        </div>
        <div class="flex align-center position-ab" style="top: 0px; right: 0px;">
          <!-- <div class="rdx-font-14 rdx-tips-color">数据更新于 2021-10-27</div> -->
          <el-tooltip class="item" effect="dark" content="复制" placement="top">
            <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a"@click="copy(getData.livingDetail.unique_id)">
              <i class="iconfont icon-e781 rdx-font-22"></i>
            </div>
          </el-tooltip>

         <!-- <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <div class="tag rdx-radius-8 rdx-p-6 flex align-center justify-center rdx-m-l-10 button-a">
              <i class="iconfont icon-e612 rdx-font-22"></i>
            </div>
          </el-tooltip> -->
          <el-popover placement="bottom" width="170" trigger="hover" transition="ease"
            :style="show.codeShowOk ? '' : 'display: none;'" >
            <div class="flex justify-center">
              <div class="flex flex-direction align-center">
                <div id="qrcode2" ref="qrcode2" style="width: 100px; height: 100px;"></div>
              </div>
            </div>
            <div slot="reference" class="flex align-center justify-center rdx-m-r-8 button-a">
              <span class="code-wx rdx-bg-color rdx-m-l-10 flex align-center justify-center">
                <div id="qrcode" ref="qrcode" style="width: 26px; height: 26px;"></div>
              </span>
            </div>
          </el-popover>

          <el-tooltip class="item" effect="dark" content="收藏" placement="top" v-if="!show.favoriteYes">
            <div class="rdx-radius-8 rdx-p-6 flex align-center justify-center button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavorite">
              <i class="iconfont icon-e629 rdx-font-22"></i>
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="取消收藏" placement="top" v-if="show.favoriteYes">
            <div class="rdx-radius-8 rdx-p-6 flex align-center justify-center button-a" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavoriteNot">
              <i class="iconfont icon-e629 rdx-font-22"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="flex justify-between line-bottom">
        <div class="flex flex-direction w-60 rdx-p-r-20 rdx-p-t-20" style="border-right: 1px solid #eeeeee;">
          <div class="flex align-center">
            <div class="bg-F3F3F3 flex align-center rdx-p-l-10 rdx-p-r-10 rdx-p-t-4 rdx-p-b-4 rdx-font-14">
              <i class="iconfont rdx-p-r-6 rdx-font-18"
                :class="getData.livingDetail.gender==2?'icon-e602 rdx-warning  ':'icon-e602 rdx-primary-dark'">

              </i>
              <span v-if="getData.livingDetail.gender==1">男</span>
              <span v-else="getData.livingDetail.gender==2">女</span>
            </div>
            <div class="flex rdx-p-l-30 align-center">
              <i class="iconfont icon-e718 rdx-primary-dark rdx-font-20 rdx-m-r-6"></i>
              <span>{{getData.livingDetail.verify_name}}</span>
            </div>
            <div
              class="bg-DDDDDD flex align-center rdx-p-l-10 rdx-p-r-10 rdx-p-t-4 rdx-p-b-4 rdx-font-14 rdx-light-color rdx-m-l-30 rdx-font-14">
              MCN</div>
            <div class="rdx-tips-color">{{getData.livingDetail.mcn_name}}</div>
            <div class="rdx-p-l-30 btn_hover">星图指数：{{getData.livingDetail.star_exp}} </div>
            <i class="iconfont icon-e616"></i>
          </div>
          <span class="rdx-content-color rdx-p-t-16 rdx-line-height-26 rdx-p-b-20">
            简介：{{getData.livingDetail.signature}}
          </span>
        </div>
        <div class="rdx-flex-1 rdx-p-l-20 rdx-p-t-30">
          <span class="rdx-warning-disabled-bg rdx-line-height-18 rdx-font-14 rdx-m-r-20">带货口碑 <i
              class="rdx-warning-dark">{{getData.reputations.score}}</i>
              <span v-if="getData.reputations.leves!=''">{{getData.reputations.levels}}</span>
              </span>
          <span class="rdx-warning-disabled-bg rdx-line-height-18 rdx-font-14 rdx-m-r-20 btn_hover" >达人带货月榜 <i
              class="font-strong">第{{getData.salesRank}}名</i></span>
          <span class="rdx-warning-disabled-bg rdx-line-height-18 rdx-font-14 btn_hover">涨粉达人月榜 <i
              class="font-strong">第{{getData.fansRank}}名</i></span>
        </div>
      </div>
      <div class="flex rdx-p-t-30">
        <div class="flex flex-direction rdx-flex-3">
          <div class="font-strong">{{getData.livingDetail.follower_count}}</div>
          <div class="flex rdx-tips-color rdx-p-t-10 align-center">
            <span>总粉丝数</span>
            <span class="rdx-p-l-10">昨日</span>
            <i class="iconfont rdx-m-l-4 rdx-m-r-4" :class="getData.livingDetail.flincr == 0 ? '' : getData.livingDetail.flincr > 0 ?'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i>
            <span class="rdx-primary rdx-p-t-4">{{getData.livingDetail.follower_incr}}</span>
          </div>
        </div>
        <div class="flex flex-direction rdx-flex-3">
          <div class="font-strong">{{getData.livingDetail.total_favorited}}</div>
          <div class="flex rdx-tips-color rdx-p-t-10 align-center">
            <span>总点赞数</span>
            <span class="rdx-p-l-10">昨日</span>
            <i class="iconfont rdx-m-l-4 rdx-m-r-4" :class="getData.livingDetail.diggincr == 0 ? '':getData.livingDetail.diggincr > 0?'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i>
            <span class="rdx-success rdx-p-t-4">{{getData.livingDetail.digg_incr}}</span>
          </div>
        </div>
        <div class="flex flex-direction rdx-flex-3">
          <div class="font-strong">{{getData.livingDetail.month_live_count}}</div>
          <div class="flex rdx-tips-color rdx-p-t-10 align-center">近30天直播场次</div>
        </div>
        <div class="flex flex-direction rdx-flex-3">
          <div class="font-strong">{{getData.livingDetail.month_live_amount}}</div>
          <div class="flex rdx-tips-color rdx-p-t-10 align-center">近30天销售额</div>
        </div>
      </div>
    </div>

    <div class="flex rdx-m-t-20">

      <div class=" flex flex-direction searchWh justify-between" style=" position: sticky; top: 80px;height: 626px;">
        <div class="flex justify-center align-center rdx-p-t-20 button-a" @click="scrollToView('zbgl')">
          <i class="iconfont icon-e8c1" style="font-size: 21px;"
            :class="show.tabIndex == 'zbgl' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="  searchdh" :class="show.tabIndex == 'zbgl' ? 'rdx-primary' : 'rdx-tips-color'">直播概览</span>
        </div>
        <div class="flex justify-center align-center  button-a" @click="scrollToView('spgl')">
          <i class="iconfont icon-e61b" style="font-size: 18px;"
            :class="show.tabIndex == 'spgl' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'spgl' ? 'rdx-primary' : 'rdx-tips-color'">视频概览</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('dhgl')">
          <i class="iconfont icon-e61e" style="font-size: 21px;"
            :class="show.tabIndex == 'dhgl' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'dhgl' ? 'rdx-primary' : 'rdx-tips-color'">带货概览</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('spgk')">
          <i class="iconfont icon-e603" style="font-size: 18px;"
            :class="show.tabIndex == 'spgk' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'spgk' ? 'rdx-primary' : 'rdx-tips-color'">商品概况</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('gkqs')">
          <i class="iconfont icon-e60a" style="font-size: 18px;"
            :class="show.tabIndex == 'gkqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'gkqs' ? 'rdx-primary' : 'rdx-tips-color'">观看趋势</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('zbtj')">
          <i class="iconfont icon-e637" style="font-size: 23px;"
            :class="show.tabIndex == 'zbtj' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'zbtj' ? 'rdx-primary' : 'rdx-tips-color'">直播统计</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('spfx')">
          <i class="iconfont icon-e603" style="font-size: 18px;"
            :class="show.tabIndex == 'spfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'spfx' ? 'rdx-primary' : 'rdx-tips-color'">商品分析</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('sptj')">
          <i class="iconfont icon-e637" style="font-size: 23px;"
            :class="show.tabIndex == 'sptj' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'sptj' ? 'rdx-primary' : 'rdx-tips-color'">视频统计</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('hdfx')">
          <i class="iconfont icon-e64a" style="font-size: 21px;"
            :class="show.tabIndex == 'hdfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'hdfx' ? 'rdx-primary' : 'rdx-tips-color'">互动分析</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('tdsp')">
          <i class="iconfont icon-e749" style="font-size: 18px;"
            :class="show.tabIndex == 'tdsp' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'tdsp' ? 'rdx-primary' : 'rdx-tips-color'">TA的视频</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('xsqs')">
          <i class="iconfont icon-e617" style="font-size: 25px;"
            :class="show.tabIndex == 'xsqs' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class="searchdh" :class="show.tabIndex == 'xsqs' ? 'rdx-primary' : 'rdx-tips-color'">销售趋势</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('tgfx')">
          <i class="iconfont icon-e668" style="font-size: 23px;"
            :class="show.tabIndex == 'tgfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'tgfx' ? 'rdx-primary' : 'rdx-tips-color'">推广分析</span>
        </div>
        <div class="flex justify-center align-center button-a" @click="scrollToView('splb')">
          <i class="iconfont icon-e660" style="font-size: 21px;"
            :class="show.tabIndex == 'splb' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'splb' ? 'rdx-primary' : 'rdx-tips-color'">商品列表</span>
        </div>
        <div class="flex justify-center align-center button-a " @click="scrollToView('fsfx')">
          <i class="iconfont icon-e634" style="font-size: 21px;"
            :class="show.tabIndex == 'fsfx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'fsfx' ? 'rdx-primary' : 'rdx-tips-color'">粉丝分析</span>
        </div>
        <div class="flex justify-center align-center rdx-p-b-20 button-a" @click="scrollToView('gzhx')">
          <i class="iconfont icon-e6de" style="font-size: 18px;"
            :class="show.tabIndex == 'gzhx' ? 'rdx-primary' : 'rdx-tips-color'"></i>
          <span class=" searchdh" :class="show.tabIndex == 'gzhx' ? 'rdx-primary' : 'rdx-tips-color'">观众画像</span>
        </div>
      </div>

      <div class=" rdx-m-l-20 searchWh-right">
        <div class="flex flex-direction box-shadow w-100 position-re">
          <div class="flex align-center rdx-p-b-20" id="zbgl">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">直播概览</h2>
          </div>
          <div class="flex justify-around">
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.liveGK.total_live_count}}</span>
              <span class="rdx-tips-color position-ab" style="top:90px">历史总场次</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.liveGK.month_live_count}}</span>
              <span class="rdx-tips-color position-ab" style="top:90px">近30天场次</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.liveGK.avg_live_volume}}</span>
              <span class="rdx-tips-color position-ab" style="top:90px">近30天场均销量(件)</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.liveGK.avg_live_amount}}</span>
              <span class="rdx-tips-color position-ab" style="top:90px">近30天场均销售额</span>
            </div>
          </div>
          <div class="flex rdx-radius-8 item-bg rdx-line-height-40 rdx-font-14 rdx-p-l-20 rdx-m-t-42 bg_ys">
            <div class="flex w-20" style="min-width: 200px;">
              <span class="rdx-tips-color">平均开播时长</span> <i
                class="font-strong rdx-p-l-6">{{getData.liveGK.avg_live_time}}</i>
            </div>
            <div class="flex w-20" style="min-width: 200px;">
              <span class="rdx-tips-color">周均开播场次</span> <i
                class="font-strong rdx-p-l-6">{{getData.liveGK.avg_week_count}}</i>
            </div>
            <div class="flex w-20" style="min-width: 200px;">
              <span class="rdx-tips-color">本周开播场次</span> <i
                class="font-strong rdx-p-l-6">{{getData.liveGK.week_count}}</i>
            </div>
            <div class="flex w-20" style="min-width: 200px;">
              <span class="rdx-tips-color">15天开播场次</span> <i class="font-strong rdx-p-l-6">{{getData.liveGK.half_month_count}}</i>
            </div>
            <div class="flex w-20" style="min-width: 200px;">
              <span class="rdx-tips-color">本月场次</span> <i
                class="font-strong rdx-p-l-6">{{getData.liveGK.month_count}}</i>
            </div>
          </div>
        </div>
        <div class="flex rdx-m-t-20 flex-direction box-shadow position-re">
          <div class="flex align-center rdx-p-b-20" id="spgl">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">视频概览</h2>
          </div>
          <div class="flex justify-around">
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.videoGK.history_aweme_count}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">历史总场次</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.videoGK.average_digg}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">平均点赞</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.videoGK.average_digg_percent}}%</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">平均赞粉比</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.videoGK.product_aweme_count_30}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">近30天场均销量(件)</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center">
              <span class="font-strong">{{getData.videoGK.product_aweme_amount_30}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">近30天场均销售额</span>
            </div>
          </div>
          <div class="flex rdx-radius-8 item-bg rdx-line-height-40 rdx-font-14 rdx-p-lr-20 rdx-m-t-46 bg_ys">
            <div class="flex w-30" style="min-width: 200px;">
              <span class="rdx-tips-color">视频平均时长</span> <i
                class="font-strong rdx-p-l-6">{{getData.videoGK.average_aweme_duration}}</i>
            </div>
            <div class="flex w-30" style="min-width: 200px;">
              <span class="rdx-tips-color">周均视频个数</span> <i
                class="font-strong rdx-p-l-6">{{getData.videoGK.average_week_aweme_count}}</i>
            </div>
            <div class="flex w-30" style="min-width: 200px;">
              <span class="rdx-tips-color">月均视频个数</span> <i
                class="font-strong rdx-p-l-6">{{getData.videoGK.average_month_aweme_count}}</i>
            </div>
          </div>
        </div>
        <div class="flex rdx-m-t-20 flex-direction box-shadow w-100">
          <div class="flex align-center rdx-p-b-20" id="dhgl">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">带货概览</h2>
          </div>
          <div class="flex">
            <div class="flex rdx-flex-4 rdx-m-r-20 rdx-line-height-40 justify-between rdx-p-lr-20 item-bg bg_ys">
              <span class="rdx-font-14 rdx-tips-color">上架商品数</span>
              <span class="font-strong">{{getData.overview.total_product_count}}</span>
            </div>
            <div class="flex rdx-flex-4 rdx-m-r-20 rdx-line-height-40 justify-between rdx-p-lr-20 item-bg bg_ys">
              <span class="rdx-font-14 rdx-tips-color">推广品类</span>
              <span class="font-strong">{{getData.overview.total_category_count}}</span>
            </div>
            <div class="flex rdx-flex-4 rdx-m-r-20 rdx-line-height-40 justify-between rdx-p-lr-20 item-bg bg_ys">
              <span class="rdx-font-14 rdx-tips-color">推广品牌</span>
              <span class="font-strong">{{getData.overview.total_brand_count}}</span>
            </div>
          </div>
          <div class="flex justify-between rdx-p-t-24 ">
            <div class="flex rdx-flex-1 rdx-p-l-20 w-50 position-re" style=" height: 350px;">
              <no-data marginTop="0" class="flex w-100 justify-center align-center position-ab"
                style=" height: 350px;left: -50px;" v-if="getData.saleBrand==''"></no-data>
              <dl class="flex flex-direction" style="width: 220px;">
                <dt class="font-strong rdx-p-b-20">最常推广品类 TOP5</dt>

                <dd v-if="getData.saleBrand!=''" class="rdx-line-height-30 rdx-font-14 rdx-primary" v-for="(item,index) in getData.saleBrand"
                  :key="index">
                  {{item.title}}（{{item.rates}}%）
                </dd>
              </dl>
              <div class="flex rdx-flex-1">
                <pie-chart v-if="getData.saleBrand!=''" chartId="classId" :formatter="chartData.formatter"
                  :chartData="chartData.classData" :chartWidth="chartData.chartWidth"></pie-chart>
              </div>
            </div>
            <div class="flex rdx-flex-1 w-50 position-re" style=" height: 350px;">
              <no-data marginTop="0" class="flex w-100 justify-center align-center position-ab"
                style=" height: 350px;" v-if="getData.saleCategory==''"></no-data>
              <dl class="flex flex-direction" >
                <dt class="font-strong rdx-p-b-20">销量最佳品类 TOP5</dt>

                <dd v-if="getData.saleCategory!=''" class="rdx-line-height-30 rdx-font-14 rdx-primary"
                  v-for="(item,index) in getData.saleCategory" :key="index">
                  {{item.title}}（{{item.rates}}%）
                </dd>
              </dl>
              <div class="flex rdx-flex-1">
                <pie-chart v-if="getData.saleCategory!=''" chartId="goodClassId" :formatter="chartData.formatter"
                  :chartData="chartData.goodClassData" :chartWidth="chartData.chartWidth"></pie-chart>
              </div>
            </div>
          </div>
          <div class="flex justify-between rdx-p-t-24 ">
            <div class="flex rdx-flex-1 rdx-p-l-20 w-50 position-re" style=" height: 350px;">
              <no-data marginTop="0" class="flex w-100 justify-center align-center position-ab"
                style=" height: 350px;left: -50px;" v-if="getData.spreadBrand==''"></no-data>
              <dl class="flex flex-direction" >
                <dt class="font-strong rdx-p-b-20">最常推广品牌 TOP5</dt>
                <dd v-if="getData.spreadBrand!=''" class="rdx-line-height-30 rdx-font-14 rdx-primary"
                  v-for="(item,index) in getData.spreadBrand" :key="index">
                  {{item.title}}（{{item.rates}}%）
                </dd>
              </dl>

              <div class="flex rdx-flex-1">
                <pie-chart v-if="getData.spreadBrand!=''" chartId="brandId" :formatter="chartData.formatter"
                  :chartData="chartData.brandData" :chartWidth="chartData.chartWidth"></pie-chart>
              </div>
            </div>
            <div class="flex rdx-flex-1 w-50 position-re" style=" height: 350px;">
             <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center position-ab"
                style=" height: 350px;" v-if="getData.spreadCategory==''"></no-data>
              <dl class="flex flex-direction" >
                <dt class="font-strong rdx-p-b-20">销量最佳品牌 TOP5</dt>
                <dd v-if="getData.spreadCategory!=''" class="rdx-line-height-30 rdx-font-14 rdx-primary"
                  v-for="(item,index) in getData.spreadCategory" :key="index">
                  {{item.title}}（{{item.rates}}%）
                </dd>
              </dl>
              <div class="flex rdx-flex-1">

                <pie-chart v-if="getData.spreadCategory!=''" chartId="goodBrandId" :formatter="chartData.formatter"
                  :chartData="chartData.goodBrandData" :chartWidth="chartData.chartWidth"></pie-chart>
              </div>
            </div>
          </div>
        </div>
        <div class="flex rdx-m-t-20 flex-direction box-shadow w-100 position-re" style="height: 230px;">
          <div class="flex align-center rdx-p-b-20" id="spgk">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">商品概况</h2>
          </div>
          <div class="flex justify-around align-center">
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.live_count}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">直播场次</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.live_product_count}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">带货场次</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.total_volume}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">总销量（件）</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.total_amount}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">总销售额</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.product_size}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">上架商品</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.product_rate}}</span>
              <span class="rdx-tips-color position-ab" style="top: 90px;">带货转化率</span>
            </div>
          </div>
          <div class="flex justify-between rdx-m-t-60 rdx-m-b-20">
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.avg_volume}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">场均销量（件）</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.avg_amount}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">场均销售额</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.avg_uv}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">场均UV价值</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.day_avg_volume}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">日均销量（件）</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.day_avg_amount}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">日常销售额</span>
            </div>
            <div class="flex flex-direction rdx-line-height-30 align-center rdx-flex-2">
              <span class="font-strong">{{getData.analysisCount.day_avg_uv}}</span>
              <span class="rdx-tips-color position-ab" style="top: 180px;">日均UV价值</span>
            </div>
          </div>
        </div>
        <div class="flex rdx-m-t-20 flex-direction box-shadow position-re w-100">
          <div class="flex align-center rdx-p-b-20" id="gkqs">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">直播观看人次趋势</h2>
          </div>
          <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
            v-if="getData.liveTrends==''"></no-data>
          <bar-chart v-if="getData.liveTrends!=''" chartId="living" :chartData="chartData.livingData"
            :chartWidth="chartData.chartWidth"></bar-chart>
        </div>
        <div class="flex rdx-m-t-20 justify-between w-100">
          <div class="flex rdx-flex-1 flex-direction rdx-p-l-20 box-shadow position-re w-50">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">直播时长分布</h2>
            </div>
            <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
              v-if="getData.durLive==''"></no-data>
            <bar-chart v-if="getData.durLive!=''" chartId="livingTime"
              :chartData="chartData.livingTimeData" :chartWidth="chartData.chartWidth">
            </bar-chart>
          </div>
          <div class="flex rdx-flex-1 flex-direction rdx-m-l-20 box-shadow w-50">
            <div class="flex align-center rdx-p-b-20" id="zbtj">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">直播开播时间统计</h2>
            </div>
            <go-living-data-chart :authorId="authorId" :startDate="startDate" :endDate="endDate"></go-living-data-chart>
          </div>
        </div>
        <div class="rdx-m-t-20 box-shadow w-100">
          <div class=" flex flex-direction ">
            <div class="flex justify-between">
              <div class="flex align-center rdx-p-b-20" id="spfx">
                <span class="tips"></span>
                <h2 class="font-strong rdx-p-l-10">商品分析</h2>
              </div>

                <search-item @clickKey='clickLiveKeyWord' searchType="1" searchPlaceholder="请输入直播标题关键词"></search-item>
            </div>
            <dl class="flex rdx-p-t-10 rdx-p-b-20 align-end">
              <dt class="rdx-font-14 rdx-tips-color">销量</dt>
              <dd class="font-strong rdx-p-l-6 rdx-p-r-12">{{analyseTotalVolumn}}</dd>
              <dt class="rdx-font-14 rdx-tips-color">销售额</dt>
              <dd class="font-strong rdx-p-l-6 rdx-p-r-12">{{analyseTotalAmount}}</dd>
            </dl>
            <el-table :data="getData.liveRooms" style="width: 100%; font-size: 16px;"
              :header-cell-style="{background:'#E7ECF1',color:'#333333'}" @sort-change="handlesortChangeLiveRoom"
              @row-click="jumpUrlLive">
              <template slot="empty">
                <no-data marginTop="0"></no-data>
              </template>
              <el-table-column prop="room_title" label="直播场次" min-width="130">
                <template slot-scope="{ row }">
                  <div class="info rdx-flex">
                    <div class="rdx-flex-col rdx-m-l-10">
                      <div class="rdx-flex rdx-flex-wrap">
                        <span class="name rdx-m-r-4 rdx-font-14">{{ row.room_title }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="begin_live_time" label="开播时间" width="120"></el-table-column>
              <el-table-column align="center" prop="duration" label="直播时长" min-width="100"></el-table-column>
              <el-table-column sortable="custom" prop="total_user" label="观看人次" min-width="100"></el-table-column>
              <el-table-column sortable="custom" prop="user_peak" label="人气峰值" min-width="100"></el-table-column>
              <el-table-column sortable="custom" prop="user_value" label="UV价值" min-width="100"></el-table-column>
              <el-table-column prop="product_size" label="商品数" min-width="100px"></el-table-column>
              <el-table-column sortable="custom" prop="volume" label="销量（件）" min-width="100"></el-table-column>
              <el-table-column sortable="custom" prop="amount" label="销售额" min-width="100"></el-table-column>
              <el-table-column align="center" prop="volume1" label="操作" min-width="100">
                <template slot-scope="scope">
                  <span class="button-a rdx-m-r-16 rdx-primary">查看详情</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block" v-if="liveTotal!=''">
            <el-pagination background :total="liveTotal" :page-size="liveParams.size" :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, sizes, prev, pager, next, jumper" @size-change="handleLiveSizeChange"
              @current-change="handleLiveCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="flex rdx-m-t-20 justify-between w-100">
          <div class="flex w-50 rdx-flex-1 flex-direction box-shadow position-re">
            <div class="flex align-center rdx-p-b-20" id="sptj">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">视频时长分布</h2>
            </div>
            <video-Time-Chart :authorId="authorId" :startDate="startDate" :endDate="endDate"></video-Time-Chart>
          </div>
          <div class="flex w-50 rdx-flex-1 flex-direction rdx-m-l-20 box-shadow position-re">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">视频发布时间统计</h2>
            </div>
            <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center" style=" height: 350px;"
              v-if="chartData.goVideoData.dataX==''"></no-data>
            <bar-chart v-if="chartData.goVideoData.dataX!=''" chartId="goVideo" :chartData="chartData.goVideoData"
              :chartWidth="chartData.chartWidth">
            </bar-chart>
          </div>
        </div>
        <div class="flex w-100 rdx-m-t-20 justify-between" id="hdfx">
          <div class="flex w-30 rdx-flex-1 flex-direction rdx-m-r-20 box-shadow">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">点赞数据</h2>
            </div>
            <div
              class="flex justify-between item-bg rdx-radius-8 rdx-line-height-30 rdx-p-10 rdx-flex-1 rdx-m-r-10 rdx-m-b-20">
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最多点赞视频</span>
              </div>
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最少点赞视频</span>
              </div>
            </div>
            <diggs-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></diggs-Line>
          </div>
          <div class="flex w-30 rdx-flex-1 flex-direction rdx-m-r-20 box-shadow position-re">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">评论数据</h2>
            </div>
            <div
              class="flex justify-between item-bg rdx-radius-8 rdx-line-height-30 rdx-p-10 rdx-flex-1 rdx-m-r-10 rdx-m-b-20">
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最多评论视频</span>
              </div>
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最少评论视频</span>
              </div>
            </div>
            <comment-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></comment-Line>
          </div>
          <div class="flex w-30 rdx-flex-1 flex-direction rdx-p-r-20 box-shadow position-re">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">转发数据</h2>
            </div>
            <div
              class="flex justify-between item-bg rdx-radius-8 rdx-line-height-30 rdx-p-10 rdx-flex-1 rdx-m-r-10 rdx-m-b-20">
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最多转发视频</span>
              </div>
              <div class="flex flex-direction align-center rdx-flex-1">
                <span class="font-strong">--</span>
                <span>最少转发视频</span>
              </div>
            </div>
              <share-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></share-Line>
          </div>
        </div>
        <div class="rdx-m-t-20 box-shadow w-100">

          <div class=" flex flex-direction">
            <div class="flex justify-between">
              <div class="flex align-center rdx-p-b-20" id="tdsp">
                <span class="tips"></span>
                <h2 class="font-strong rdx-p-l-10">Ta的视频</h2>
              </div>
              <search-item @clickKey='clickVideoKeyWord' searchType="2" searchPlaceholder="请输入视频标题"></search-item>
            </div>
            <el-checkbox-group v-model="val.videoName">
              <el-checkbox label="直播预热视频" @change="clickLiveWarmVideo"></el-checkbox>
              <el-checkbox label="有关联商品" @change="clickAssociatedGoods"></el-checkbox>
            </el-checkbox-group>
            <el-table :data="getData.videoList" style="width: 100%; font-size: 16px;" class="rdx-m-t-20"
              :header-cell-style="{background:'#E7ECF1',color:'#333333'}" @sort-change="handlesortChangeVideo"
              @row-click="jumpUrl">
              <template slot="empty">
                <no-data marginTop="0"></no-data>
              </template>
              <el-table-column label="视频内容" min-width="240">
                <template slot-scope="{ row }">
                  <div class="info rdx-flex">
                    <img :src="row.aweme_cover" alt style="width: 62px;height: 62px;min-width: 60px;" />
                    <div class="rdx-flex-col rdx-m-l-10">
                      <div class="rdx-flex rdx-flex-wrap">
                        <span class="name rdx-m-r-4 rdx-font-14 rdx-line-2" style="width: 200px;">{{ row.aweme_title }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="aweme_create_time" label="发布时间" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="total_volume" label="预估销量（件）" width="160">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="total_amount" label="预估销售额" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="digg_count" label="点赞数" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="comment_count" label="评论数" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="forward_count" label="转发数" width="120">
              </el-table-column>
              <el-table-column align="center" prop="warm_live_count" label="关联直播" width="100"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <span class="button-a rdx-m-r-16 rdx-primary">数据</span>
                  <span class="button-a rdx-primary">播放</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block" v-if="videoTotal!=''">
            <el-pagination background :total="videoTotal" :page-size="videoParams.size"
              :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleVideoSizeChange" @current-change="handleVideoCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="flex w-100 rdx-m-t-20 justify-between w-100">
          <div class="flex w-50 rdx-flex-1 flex-direction rdx-m-r-20 w-50 box-shadow position-re">
            <div class="flex align-center rdx-p-b-20" id="xsqs">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">销售趋势</h2>
            </div>
            <sell-data-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></sell-data-line>
          </div>
          <div class="flex w-50 rdx-flex-1 flex-direction rdx-m-r-20 w-50 box-shadow position-re">
            <div class="flex align-center rdx-p-b-20">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">销售额趋势</h2>
            </div>
            <sell-up-data-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></sell-up-data-line>
          </div>
        </div>
        <div class="flex rdx-m-t-20 flex-direction box-shadow w-100">
          <div class="flex align-center rdx-p-b-20" id="tgfx">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">直播推广商品分析</h2>
          </div>
          <el-radio-group v-model="val.classVal" @change="clickCateOrBrand">
            <!--点击后把值传入表格第一行的商品品类，商品品牌-->
            <el-radio-button label="1">商品品类</el-radio-button>
            <el-radio-button label="2">商品品牌</el-radio-button>
          </el-radio-group>
          <el-table :data="getData.livePromote" style="width: 100%; font-size: 16px;" class="rdx-m-t-20"
            :header-cell-style="{background:'#E7ECF1',color:'#333333'}" @sort-change="handlesortChangeGoodFX">
            <template slot="empty">
              <no-data marginTop="0"></no-data>
            </template>
            <el-table-column prop="tag_name" label="商品品类" min-width="150" width="280"></el-table-column>
            <el-table-column prop="avg_price" label="均价" align="center"></el-table-column>
            <el-table-column sortable="custom" prop="product_count" label="商品数" align="center"></el-table-column>
            <el-table-column sortable="custom" prop="volume" label="销量(件)" align="center"></el-table-column>
            <el-table-column sortable="custom" prop="amount" label="销售额" align="center"></el-table-column>
            <el-table-column prop="avg_convert_rate" label="平均转化率" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="box-shadow rdx-m-t-20">
        <div class=" flex flex-direction w-100">
          <div class="flex justify-between">
            <div class="flex align-center rdx-p-b-20" id="splb">
              <span class="tips"></span>
              <h2 class="font-strong rdx-p-l-10">商品列表</h2>
            </div>
            <div class="flex align-center">
              <div class="rdx-font-14 rdx-main-color" ><i class="rdx-p-r-20">共{{goodTotal}}个商品</i><i class="rdx-p-r-20">累计销售
                  {{getData.goodsTotalCount.total_volume}}</i><i class="rdx-p-r-20">累计销售额
                  {{getData.goodsTotalCount.total_amount}}</i><i class="rdx-p-r-20">关联直播
                  {{getData.goodsTotalCount.total_room_count}}</i></div>


            </div>
          </div>


          <div class="flex rdx-p-b-10">
            <span class="name">选择分类：</span>
            <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
              <div class="rdx-m-b-4 select-item" :class="goodParams.bigCategory ? '' : 'active'" @click="handleGoodsCate('')">全部</div>
              <div class="rdx-m-b-4 select-item" :key="items.id" v-for="items in getData.goodsCategory" :class="goodParams.bigCategory === items.name ? 'active' : ''" @click="handleGoodsCate(items.name)">
                {{ items.name }}
              </div>
            </div>
            <!-- <i class="rdx-m-t-4 rdx-pointer" :class="productAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="productAllShow = !productAllShow"></i> -->
          </div>
          <div class="flex">
            <span class="name">品牌分类：</span>
            <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !starAllShow }">
              <div class="rdx-m-b-4 select-item" :class="goodParams.brandCode ? '' : 'active'" @click="handleBrandCate('')">全部</div>
              <div class="rdx-m-b-4 select-item" :key="items.id" v-for="items in getData.goodsBrand" :class="goodParams.brandCode === items.name ? 'active' : ''" @click="handleBrandCate(items.name)">
                {{ items.name }}
              </div>
            </div>
            <!-- <i class="rdx-m-t-4 rdx-pointer" :class="starAllShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="starAllShow = !starAllShow"></i> -->
          </div>

            <div class="flex align-center justify-end position-re">
              <div style="margin-right: 100px;">
                <search-item @clickKey='clickGoodsKeyWord' searchType="7" searchWidth="300" searchPlaceholder="请输入商品标题"></search-item>
              </div>
              <!-- <div class="button-a rdx-m-l-16 rdx-radius-20 rdx-primary font-strong rdx-font-14 rdx-p-l-20 rdx-p-r-20 rdx-p-b-10 rdx-p-t-10 position-ab" style="border: 1px solid #DD001B;right:10px;bottom: 20px;">
                导出
              </div> -->
            </div>

          <el-table :data="getData.goodsList" style="width: 100%; font-size: 16px;"
            :header-cell-style="{background:'#E7ECF1',color:'#333333'}" @sort-change="handlesortChangeGoods"
            @row-click="jumpUrlGoods">
            <template slot="empty">
              <no-data marginTop='0'></no-data>
            </template>
            <el-table-column prop="product_title" label="商品" width="300">
            </el-table-column>
            <el-table-column align="center" sortable="custom" prop="price" label="价格" width="150">
            </el-table-column>
            <el-table-column align="center" sortable="custom" prop="volume" label="销量(件)" width="120"></el-table-column>
            <el-table-column align="center" sortable="custom" prop="amount" label="销售额" width="150"></el-table-column>
            <el-table-column align="center" prop="address" label="其他价格">
              <template slot-scope="scope">
                158
              </template>
            </el-table-column>
            <el-table-column align="center" sortable="custom" prop="durationLiveCount" label="件/每单" width="120">
              <template slot-scope="scope">
                138
              </template>
            </el-table-column>
            <el-table-column align="center" sortable="custom" prop="commission_rate" label="转化率" width="120">
            </el-table-column>
            <el-table-column align="center" prop="volume1" label="累计讲解时长" width="120">
              <template slot-scope="scope">
                6分14秒
              </template>
            </el-table-column>
            <el-table-column align="center" sortable="custom" prop="volume1" label="上/下驾时间" width="150">
              <template slot-scope="scope">
                <div>10/26 18:03</div>
                <div>10/26 18:03</div>
              </template>
            </el-table-column>
            <el-table-column prop="volume1" label="操作">
              <template slot-scope="scope">
                <img src="@/assets/imgs/line.png" class="btn" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" :style="getData.goodsList=='' ? 'display: none;':'' ">
          <el-pagination background :total="goodTotal" :page-size="goodParams.size" :page-sizes="[10, 20, 30, 40, 50]"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handleGoodsSizeChange"
            @current-change="handleGoodsCurrentChange">
          </el-pagination>
        </div>

        </div>
        <div class="flex w-100 justify-between rdx-m-t-20 w-100" >
          <div class="flex w-50 flex-direction rdx-flex-1 rdx-m-r-20 w-50 box-shadow position-re">
            <div class="flex justify-between" id="fsfx">
              <div class="flex align-center">
                <span class="tips"></span>
                <h2 class="font-strong rdx-p-l-10">粉丝趋势</h2>
              </div>
            </div>
            <fans-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></fans-line>
          </div>
          <div class="flex w-50 flex-direction rdx-flex-1  box-shadow w-50 position-re">
            <div class="flex justify-between">
              <div class="flex align-center">
                <span class="tips"></span>
                <h2 class="font-strong rdx-p-l-10">粉丝团趋势</h2>
              </div>
            </div>
            <fans-Data-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></fans-Data-Line>
          </div>
        </div>
        <div class="rdx-m-t-20 flex flex-direction box-shadow position-re w-100">
          <div class="flex align-center rdx-p-b-20" id="gzhx">
            <span class="tips"></span>
            <h2 class="font-strong rdx-p-l-10">观众画像</h2>
          </div>

          <div class="flex w-100">
            <div class="flex flex-direction w-50">
              <div class="flex flex-direction rdx-flex-1 w-100 ">
                <strong class="font-strong rdx-font-15 rdx-p-l-18">性别分布</strong>
                <div class="flex align-center rdx-p-b-15 rdx-p-t-10  position-re" style="text-align: center;">
                  <i class="iconfont icon-e8f7 rdx-font-50" style="color: #4a96fa;"></i>
                  <div class="man position-re">
                    <div class="position-ab man-item" :style="'width: ' + male + '%;'"></div>
                  </div>
                  <i class="iconfont icon-e654 rdx-font-58" style="color: #d6448f;"></i>
                  <div v-if="genders != ''" class="rdx-p-l-50 flex justify-between position-ab"
                    style="bottom: 10px; width: 69%;">
                    <span>{{male}}%</span>
                    <span>{{faMale}}%</span>
                  </div>
                </div>
                <div class="flex flex-direction w-100" style="padding-bottom: -50px;">
                   <strong class="font-strong rdx-font-15 rdx-p-l-18">年龄分布</strong>
                   <div v-if="!show.dataShowS" id="age" style="width: 100%; height: 300px;"></div>
                   <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center position-ab"
                     style=" height: 300px;" v-if="show.dataShowS"></no-data>
                 </div>
              </div>
            </div>

            <div class="flex flex-direction rdx-flex-1 rdx-p-r-20 w-50">
              <div class="flex flex-direction">
                <strong class="font-strong rdx-font-15 rdx-p-l-18">地域分布</strong>
                <div class="flex map-city rdx-p-b-10 rdx-p-b-10 justify-end">
                  <el-radio-group v-model="val.cityVal" @change="clickProvinceOrCity">
                    <el-radio-button label="1">省</el-radio-button>
                    <el-radio-button label="2">市</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="flex rdx-p-t-60">
                <div class="rdx-flex-1">
                  <div id="regionCharts" style="width: 100%; height: 280px;"></div>
                </div>
                <div class="flex flex-direction rdx-flex-1 rdx-p-l-80">

                  <div class="flex rdx-flex-1 align-start">
                    <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
                      style=" height: 200px;" v-if="proCity==''"></no-data>
                    <div class="flex flex-wrap justify-between w-100
                    ">
                      <div class="rdx-font-14 w-50 rdx-p-b-10" v-if="proCity!=''" v-for="(item,index) in proCity" :key="index">
                        {{item.title}} {{item.rate}}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pieChart from "@/components/pieChart.vue"
  import barChart from "@/components/barChart.vue"
  import lineChart from "@/components/lineChart.vue"
  import noData from "@/components/noData.vue"
  import * as tools from '@/common/tools.js';
  import shareLine from "./components/shareLine.vue"
  import commentLine from "./components/commentLine.vue"
  import diggsLine from "./components/diggsLine.vue"
  import fansDataLine from "./components/fansDataLine.vue"
  import searchItem from '@/components/searchItem.vue'
  import videoTimeChart from "./components/videoTimeChart.vue"
  import goodsClass from '../../components/goodsClass.vue'
  import sellDataLine from "./components/sellDataLine.vue"
  import sellUpDataLine from "./components/sellUpDataLine.vue"
  import goLivingDataChart from "./components/goLivingDataChart.vue"
  import fansLine from "./components/fansLine.vue"
  import QRCode from 'qrcodejs2'
  export default {
    components: {
      pieChart,
      barChart,
      noData,
      lineChart,
      shareLine,
      commentLine,
      diggsLine,
      fansDataLine,
      videoTimeChart,
      searchItem,
      goodsClass,
      sellDataLine,
      sellUpDataLine,
      goLivingDataChart,
      fansLine
    },
    data() {
      return {
        getData: {
          liveGK: {}, //直播概况
          videoGK: {}, //视频概况
          livingDetail: {}, //主播信息
          overview: {}, //带货概况
          spreadCategory: [], //销量最佳品牌
          saleCategory: [], //销量最佳品类
          spreadBrand: [], //最常推广品牌
          saleBrand: [], //最常推广品类
          videoList: [], //视频列表
          livePromote: [], //直播推广商品分析
          analysisCount: {}, //直播分析（商品概况）
          liveRooms: [], //商品分析
          goodsList: [], //商品列表
          goodsTotalCount: {},
          goodsCategory: [],
          goodsBrand: [],
          releaseTime: [], //视频发布时长
          durations: [], //视频时长
          awemeAdd: [],
          awemeTotal: [],
          amountChart: [], //销售额趋势
          volumeChart: [], //销售趋势
          fansClubAdd: [], //粉丝团增量
          fansClubTotal: [], //粉丝团总量
          durLive: [],
          liveHour: [],
          liveTrends: [], //直播观看人次,
          salesRank: '',  //月榜排名
          fansRank: '',   //涨粉排名
          reputations: {}, //口碑评分
        },
        goodParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          keyword: '',
          brandCode: '',
          bigCategory: '',
        },
        tgParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          type: 'category',
        },
        videoParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          goodsRelatived: 0,
          hasWarmLive: 0,
          keyword: '',
        },
        liveParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          keyword: '',
        },
        show: {
          tabIndex: '',
          tabIndexs: '',
          favoriteYes:false,
          dataShowLivesc: false,   //直播开播时间统计
          codeShowOk: false, //显示二维码
        },
        videoKeyWord: '',
        goodsKeyWord: '',
        liveKeyWord: '',
        fansAge: [],
        cates: -1,
        brand: -1,
        productAllShow: false, //商品收起
        starAllShow:false,//达人收起
        male: '', //粉丝(男性百分比)
        faMale: '', //粉丝（女性百分比）
        goodTotal: 0,
        videoTotal: 0,
        liveTotal: 0,
        authorId: '', //达人id
        territory: [],
        proCity: [],
        citys: [],
        genders: [],
        startDate:'',
        endDate:'',
        analyseTotalVolumn: 0, //商品分析总销量
        analyseTotalAmount: 0, //商品分析总销售额
        labelShow: true,
        val: {
          videoName: [],
          classVal: "1", //商品品类 商品品牌
          cityVal: "1", //省市
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
          codeWx: '', //二维码
        },
        chartData: {
          classData: {}, //最常推广品类Top5
          goodClassData: {}, //销量最佳品类Top5
          brandData: {}, //最常推广品牌Top5
          goodBrandData: {}, //销量最佳品牌 TOP5
          formatter: '{a} <br/>{b} : {c}%', //饼状图鼠标划入显示数据
          livingData: {}, //直播观看人次趋势
          livingTimeData: {}, //直播时长
          goLivingData: {}, //直播开播时间统计
          videoTimeData: {}, //视频时长分布
          goVideoData: {}, //视频发布时间统计
          likeData: {}, //点赞数据
          commentData: {}, //评论数据
          shareData: {}, //转发数据
          sellData: {}, //销售趋势
          sellUpData: {}, //销售额趋势
          fansData: {}, //粉丝团分析
          fansUpData: {}, //涨粉分析
          ageData: {}, //年龄分布
          legendShow: true,
          chartWidth: {
            width: "300",
            height: "350px"
          },

        }
      }
    },
    created() {
      this.authorId = this.$route.query.id
      this.initialTime()
      this.getGoodsList()
      this.getClass()
      this.getGoodClassData()
      this.getBrand()
      this.goodBrand()
      this.getLivingTime()
      //this.getGoLiving()
      this.getFansUp()
      this.getLiving()
      this.getGoVideo()
      //this.getAge()
      this.getLiveGeneral()
      this.getVideoGeneral()
      this.getFansData()
      this.getLiveDetail()
      this.getOverview()
      this.getVideoData()
      this.getVisualList()
      this.getAnalysisCount()
      this.getLiveRoom()
      window.addEventListener("scroll", this.onScrolls); //实时监控滑块在

      this.isFavorite()

    },
    mounted() {
      this.drawregionCharts()
    },
    destroyed(){                                    //取消实时监控滑块
      window.removeEventListener('scroll', this.onScrolls)
    },
    methods: {
      qrcode() {
        let qrcode = new QRCode('qrcode', {
          width: 26,
          height: 26,
          correctLevel: 3,
          text: this.val.codeWx
        })
        this.show.codeShowOk = true
      },
      qrcode2() {
        let qrcode = new QRCode('qrcode2', {
          width: 100,
          height: 100,
          correctLevel: 3,
          text: this.val.codeWx
        })
      },
      //判断是否已收藏
      async isFavorite(){
        var favorite = {
          collectId:this.authorId,
          collectType:1
        }
        const data = await this.$get('/api/user/user_collection/query_is_collect', favorite)
        if(data.data > 0){
          this.show.favoriteYes = true
        }else{
          this.show.favoriteYes = false
        }
      },
      //取消收藏
      async onFavoriteNot(){
        if(this.show.favoriteYes = true){ //模拟，真实数据要根据获取的字段判断
          var favoriteParam = {
            collectId:this.authorId ,
            collectType:1//收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/cancel_collection', favoriteParam)
          if(data.errCode == 0){
            this.show.favoriteYes = false
          }else{
            this.$message.error("收藏失败，请联系管理员")
          }
        }

      },
      //点击收藏夹
      async onFavorite(){
        var favoriteParam = {
          dataId:this.authorId,
          collectType:1//收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
        }
        const {
          data
        } = await this.$post('/api/user/user_collection/add_collection', favoriteParam)
        if(data.errCode == 0){
          this.show.favoriteYes = true
        }else{
          this.$message.error("收藏失败，请联系管理员")
        }
      },
      onScrolls(){
        let scrolleds = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrolleds < 200 && scrolleds > 0){
          this.show.tabIndex = "zbgl"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 450 && scrolleds > 200){
          this.show.tabIndex = "spgl"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 1400 && scrolleds > 450){
          this.show.tabIndex = "dhgl"
          this.show.tabIndexs = "zhld"
        }else if(scrolleds < 1600 && scrolleds > 1400){
          this.show.tabIndex = "spgk"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 2000 && scrolleds > 1600){
          this.show.tabIndex = "gkqs"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 2600 && scrolleds > 2000){
          this.show.tabIndex = "zbtj"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 3000 && scrolleds > 2600){
          this.show.tabIndex = "spfx"
          this.show.tabIndexs = "lmfx"
        }else if(scrolleds < 3500 && scrolleds > 3000){
          this.show.tabIndex = "sptj"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 4000 && scrolleds > 3500){
          this.show.tabIndex = "hdfx"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 4400 && scrolleds > 4000){
          this.show.tabIndex = "tdsp"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 4800 && scrolleds > 4400){
          this.show.tabIndex = "xsqs"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 5300 && scrolleds > 4800){
          this.show.tabIndex = "tgfx"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 6100 && scrolleds > 5300){
          this.show.tabIndex = "splb"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 6700 && scrolleds > 6100){
          this.show.tabIndex = "fsfx"
          this.show.tabIndexs = "-1"
        }else if(scrolleds < 7000 && scrolleds > 6700){
          this.show.tabIndex = "gzhx"
          this.show.tabIndexs = "-1"
        }else if( scrolleds > 7000){
          this.show.tabIndex = "-1"
          this.show.tabIndexs = "-1"
        }
      },
      //点击滚动固定位置
      scrollToView(index) {
        this.show.tabIndex = index
        if (index == 'zbgl') {
          document.getElementById('zbgl').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'spgl') {
          document.getElementById('spgl').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'dhgl') {
          document.getElementById('dhgl').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'spgk') {
          document.getElementById('spgk').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'gkqs') {
          document.getElementById('gkqs').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'zbtj') {
          document.getElementById('zbtj').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'spfx') {
          document.getElementById('spfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'sptj') {
          document.getElementById('sptj').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'hdfx') {
          document.getElementById('hdfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'tdsp') {
          document.getElementById('tdsp').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'xsqs') {
          document.getElementById('xsqs').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'tgfx') {
          document.getElementById('tgfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'splb') {
          document.getElementById('splb').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'fsfx') {
          document.getElementById('fsfx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
        if (index == 'gzhx') {
          document.getElementById('gzhx').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
      },
      //点击复制
      copy(text) {
        var input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        document.body.removeChild(input);
        this.$message({
          message: '复制成功:' + text,
          type: 'success'
        });

      },
      //初始时间
      initialTime() {
        this.val.timeBengin = this.fun_date(-30).split('_')[0]
        this.val.timeEnd = this.fun_date(-30).split('_')[1]
        this.startDate = this.val.timeBengin.replace(/-/g, '')
        this.endDate = this.val.timeEnd.replace(/-/g, '')
      },
      //计算天数
      fun_date(aa) {
        var date1 = new Date();
        var m1 = date1.getMonth() + 1;
        m1 = m1 < 10 ? '0' + m1 : m1
        var d1 = date1.getDate();
        d1 = d1 < 10 ? '0' + d1 : d1
        var time1 = date1.getFullYear() + '-' + m1 + '-' + d1; //time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var m2 = date2.getMonth() + 1;
        m2 = m2 < 10 ? '0' + m2 : m2
        var d2 = date2.getDate();
        d2 = d2 < 10 ? '0' + d2 : d2
        var time2 = date2.getFullYear() + '-' + m2 + '-' + d2; //time2表示倒推几天
        return time2 + "_" + time1;
      },
      //获取主播信息
      async getLiveDetail() {
        var param = {
          authorId: this.authorId,
        }
        const {
          data
        } = await this.$get('/api/detail/author/detail', param)
        if (data != undefined) {
          this.getData.livingDetail = data
          this.getData.fansRank=data.author_fans_rank.rank
          this.val.codeWx  =this.getData.livingDetail.home_url
          this.getData.reputations = data.reputation
          if(this.getData.reputations.level ==1){
            this.getData.reputations.levels == 高
          }else if(this.getData.reputations.level ==2){
            this.getData.reputations.levels == 中
          }else if(this.getData.reputations.level ==3){
            this.getData.reputations.levels == 低
          }else if(this.getData.reputations.level ==0){
            this.getData.reputations.levels == ""
          }
          if(this.getData.livingDetail.mcn_name == ''){
            this.getData.livingDetail.mcn_name = '未签约'
          }
          this.getData.livingDetail.follower_count = tools.numberVerify(this.getData.livingDetail.follower_count)   //总粉丝数
          this.getData.livingDetail.flincr = this.getData.livingDetail.follower_incr
          if(this.getData.livingDetail.follower_incr < 0){          //粉丝增量排序升降
            this.getData.livingDetail.follower_incr = Math.abs(this.getData.livingDetail.follower_incr)
          }
          this.getData.livingDetail.follower_incr = tools.numberVerify(this.getData.livingDetail.follower_incr)   //粉丝增量
          this.getData.livingDetail.total_favorited = tools.numberVerify(this.getData.livingDetail.total_favorited)   //总点赞数
          this.getData.livingDetail.diggincr = this.getData.livingDetail.digg_incr
          if(this.getData.livingDetail.digg_incr < 0){          //点赞增量排序升降
            this.getData.livingDetail.digg_incr = Math.abs(this.getData.livingDetail.digg_incr)
          }
          this.getData.livingDetail.digg_incr = tools.numberVerify(this.getData.livingDetail.digg_incr)   //点赞增量
          this.getData.livingDetail.month_live_amount = tools.numberVerify(this.getData.livingDetail.month_live_amount)   //近30天销售额
          this.getData.salesRank = data.author_sales_rank.rank
          //显示二维码

            this.qrcode()
            this.qrcode2()

          this.val.codeShow = true
        }
      },
      //商品分析（查询直播间商品）
      async getLiveRoom() {
        var param = {
          "authorId": this.authorId,
          "page": this.liveParams.page,
          "size": this.liveParams.size,
          "keyword": this.liveParams.keyword,
          "order": this.liveParams.order,
          "sort": this.liveParams.sort,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/room', param)
        if (data != undefined) {
          this.getData.liveRooms = data.list
          for (let i = 0; i < this.getData.liveRooms.length; i++) {
            // this.getData.liveRooms[i].live_time = tools.time_minus(this.getData.liveRooms[i].begin_time, this.getData.liveRooms[i].room_finish_time)
            this.getData.liveRooms[i].begin_live_time = tools.time_cycle(2, this.getData.liveRooms[i].begin_time)
            this.getData.liveRooms[i].duration = this.time_minus(this.getData.liveRooms[i].duration) //直播时长
          }
          this.liveTotal = data.page_info && data.page_info.total //分页
        }

      },
      //商品列表
      async getGoodsList() {
        var param = {
          "authorId": this.authorId,
          "page": this.goodParams.page,
          "size": this.goodParams.size,
          "keyword":  this.goodParams.keyword,
          "order": this.goodParams.order,
          "sort": this.goodParams.sort,
          //"platform": this.goodParams.platform,
          //"productType": this.goodParams.productType,
          //"price": '',
          "brandCode": this.goodParams.brandCode,
          "bigCategory": this.goodParams.bigCategory,
          //"firstCategory": this.goodParams.firstCategory,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get('/api/detail/author/product/list', param)
        if (data != undefined) {
          this.getData.goodsList = data.list
          this.getData.goodsTotalCount = data
          this.getData.goodsCategory = data.category
          this.getData.goodsBrand = data.brand
          this.goodTotal = data.page_info && data.page_info.total //分页
        }

      },
      //带货概况
      async getOverview() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/business/overview', param)
        if (data != undefined) {
          this.getData.overview = data
        }
      },
      //直播概况
      async getLiveGeneral() {
        var param = {
          "authorId": this.authorId,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/over/view', param)
        if (data != undefined) {
          this.getData.liveGK = data
          this.getData.liveGK.avg_live_time = this.time_minus(this.getData.liveGK.avg_live_time)
          this.getData.liveGK.total_live_count = tools.numberVerify(this.getData.liveGK.total_live_count)   //历史总场次
          this.getData.liveGK.avg_live_volume = tools.numberVerify(this.getData.liveGK.avg_live_volume)   //近30天销量
          this.getData.liveGK.avg_live_amount = tools.numberVerify(this.getData.liveGK.avg_live_amount)   //近30天销售额
        }
      },
      //视频概况
      async getVideoGeneral() {
        var param = {
          "authorId": this.authorId,
        }
        const {
          data
        } = await this.$get('/api/detail/author/aweme/overview', param)
        if (data != undefined) {
          this.getData.videoGK = data
          this.getData.videoGK.avg_video_time = this.time_minus(this.getData.videoGK.avg_video_time)
          //this.getData.videoGK.average_aweme_duration=this.time_minus(this.getData.videoGK.average_aweme_duration)    //视频平均时长
          this.getData.videoGK.average_digg_percent = (this.getData.videoGK.average_digg_percent).toFixed(2)     //
          this.getData.videoGK.history_aweme_count = tools.numberVerify(this.getData.videoGK.history_aweme_count)   //历史总场次
          this.getData.videoGK.product_aweme_count_30 = tools.numberVerify(this.getData.videoGK.product_aweme_count_30)   //近30天销量
          this.getData.videoGK.product_aweme_amount_30 = tools.numberVerify(this.getData.videoGK.product_aweme_amount_30)   //近30天销售额
          this.getData.videoGK.average_digg = this.getData.videoGK.average_digg.toFixed(0)
          this.getData.videoGK.average_digg = tools.numberVerify(this.getData.videoGK.average_digg)   //平均点赞
        }
      },
      //商品概况
      async getAnalysisCount() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/analysis', param)
        if (data != undefined) {
          this.getData.analysisCount = data.summary
          this.getData.analysisCount.live_count = tools.numberVerify(this.getData.analysisCount.live_count)   //直播场次
          this.getData.analysisCount.live_product_count = tools.numberVerify(this.getData.analysisCount.live_product_count)   //带货场次
          this.getData.analysisCount.total_volume = tools.numberVerify(this.getData.analysisCount.total_volume)   //总销量
          this.getData.analysisCount.total_amount = tools.numberVerify(this.getData.analysisCount.total_amount)   //总销售额
          this.getData.analysisCount.product_size = tools.numberVerify(this.getData.analysisCount.product_size)   //上架商品
          this.getData.analysisCount.avg_volume = tools.numberVerify(this.getData.analysisCount.avg_volume)   //场均销量
          this.getData.analysisCount.avg_amount = tools.numberVerify(this.getData.analysisCount.avg_amount)   //场均销售额
          //this.getData.analysisCount.avg_uv = this.getData.analysisCount.avg_uv.toFixed(2);   //场均UI价值
          this.getData.analysisCount.day_avg_volume = tools.numberVerify(this.getData.analysisCount.day_avg_volume)   //日均销量
          this.getData.analysisCount.day_avg_amount = tools.numberVerify(this.getData.analysisCount.day_avg_amount)   //日均销售额
          this.getData.analysisCount.day_avg_uv = this.getData.analysisCount.day_avg_uv   //日均UI价值

        }
      },
      //时间戳转换时分秒
      time_minus(timeDiff) {
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let minute = parseInt((timeDiff % 86400 % 3600) / 60)
        let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)
        day = day ? (day + '天') : ''
        hour = hour ? (hour + '时') : ''
        minute = minute ? (minute + '分') : ''
        second = second ? (second + '秒') : ''
        return day + hour + minute + second
      },
      //直播商品分析升序和降序
      handlesortChangeLiveRoom(column) {
        if (column.order === "descending") {
          this.liveParams.order = 'desc'
          this.liveParams.sort = column.prop
        } else {
          this.liveParams.order = 'asc'
          this.liveParams.sort = column.prop
        }
        this.getLiveRoom()
      },
      //商品列表升序和降序
      handlesortChangeGoods(column) {
        if (column.order === "descending") {
          this.goodParams.order = 'desc'
          this.goodParams.sort = column.prop
        } else {
          this.goodParams.order = 'asc'
          this.goodParams.sort = column.prop
        }
        this.getGoodsList()
      },
      //视频列表升序和降序
      handlesortChangeVideo(column) {
        if (column.order === "descending") {
          this.videoParams.order = 'desc'
          this.videoParams.sort = column.prop
        } else {
          this.videoParams.order = 'asc'
          this.videoParams.sort = column.prop
        }
        this.getVideoData()
      },
      //推广商品分析升序和降序
      handlesortChangeGoodFX(column) {
        //console.log('12115',column)
        if (column.order === "descending") {
          this.tgParams.order = 'desc'
          this.tgParams.sort = column.prop
        } else {
          this.tgParams.order = 'asc'
          this.tgParams.sort = column.prop
        }
        this.getVisualList()
      },

      //直播推广商品分析
      async getVisualList() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "page": this.tgParams.page,
          "size": this.tgParams.size,
          "type": this.tgParams.type,
          "sort": this.tgParams.sort,
          "order": this.tgParams.order,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get('/api/detail/author/product/visual/list', param)
        if (data != undefined) {
          this.getData.livePromote = data
          this.getData.livePromote.forEach((item)=>{
            item.amount = Number(item.amount).toFixed(2);   //销售额
            item.amount = tools.numberVerify(item.amount)
            item.avg_convert_rate = Number(item.avg_convert_rate).toFixed(2);     //平均转化率
            item.avg_price = Number(item.avg_price).toFixed(2);     //均价
            item.volume = tools.numberVerify(item.volume)    //销量
          })
        }
      },
      //视频列表
      async getVideoData() {
        var param = {
          "authorId": this.authorId,
          "page": this.videoParams.page,
          "size": this.videoParams.size,
          "goodsRelatived": this.videoParams.goodsRelatived,
          "hasWarmLive": this.videoParams.hasWarmLive,
          "keyword": this.videoParams.keyword,
          "order": this.videoParams.order,
          "sort": this.videoParams.sort,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/aweme/list', param)
        if (data != undefined) {
          this.getData.videoList = data.list
          this.getData.videoList.forEach((item)=>{
            item.total_amount = Number(item.total_amount).toFixed(1)
            item.aweme_create_time = tools.time_cycle(1,item.aweme_create_time)
          })
          // for (let i = 0; i < this.getData.videoList.length; i++) {
          //   this.getData.videoList[i].total_amount = Number(this.getData.videoList[i].total_amount).toFixed(1)
          // }
          this.videoTotal = data.page_info && data.page_info.total //分页
        }
      },
      //跳转到商品详情页
      jumpUrlGoods(e) {
        //console.log('12322222', e)
        this.$router.push({
          path: "/shop/shop_detail",
          query: {
            id: e.shop_id
          }
        })
        //this.$router.push({path:"/goods/goodsShow",query:{id:e.room_id}})
      },
      //跳转直播详情页
      jumpUrlLive(e) {
        this.$router.push({
          path: "/living/living_detail",
          query: {
            id: e.room_id
          }
        })
      },
      //跳转到视频详情页
      jumpUrl(e) {
        this.$router.push({
          path: "/video/video_detail",
          query: {
            id: e.aweme_id
          }
        })
      },
      //直播预热视频
      clickLiveWarmVideo(e) {
        if (e === true) {
          this.videoParams.hasWarmLive = 1
        } else {
          this.videoParams.hasWarmLive = 0
        }
        this.getVideoData()
      },
      //有关联商品
      clickAssociatedGoods(e) {
        if (e === true) {
          this.videoParams.goodsRelatived = 1
        } else {
          this.videoParams.goodsRelatived = 0
        }
        this.getVideoData()
      },
      //推广商品分析（商品品类,商品品牌）
      clickCateOrBrand(val) {
        if (val == 1) {
          this.tgParams.type = 'category'
        } else {
          this.tgParams.type = 'brand'
        }
        this.getVisualList()
      },
      //视频直播关键字
      clickLiveKeyWord(val) {
        this.liveParams.keyword = val
        this.getLiveRoom()
      },
      //商品列表关键字
      clickGoodsKeyWord(val) {
        this.goodParams.keyword = val
        this.getGoodsList()
      },
      //视频标题关键字
      clickVideoKeyWord(val) {
        this.videoParams.keyword = val
        this.getVideoData()
      },
      //商品列表（选择分类）
      handleGoodsCate(val) {
        this.goodParams.bigCategory = val
        this.getGoodsList()
      },
      //商品列表（品牌分类）
      handleBrandCate(val) {
        this.goodParams.brandCode = val
        this.getGoodsList()
      },
      //获取商品列表分页数据
      handleGoodsSizeChange(val) {
        this.goodParamsgoodParams.page = 1
        this.goodParams.size = val
        this.getGoodsList()
      },
      handleGoodsCurrentChange(val) {
        this.goodParams.page = val
        this.getGoodsList()
      },
      //获取视频列表分页数据
      handleVideoSizeChange(val) {
        this.videoParams.page = 1
        this.videoParams.size = val
        this.getVideoData()
      },
      handleVideoCurrentChange(val) {
        this.videoParams.page = val
        this.getVideoData()
      },
      //获取商品分析分页数据
      handleLiveSizeChange(val) {
        this.liveParams.page = 1
        this.liveParams.size = val
        this.getLiveRoom()
      },
      handleLiveCurrentChange(val) {
        this.liveParams.page = val
        this.getLiveRoom()
      },
      //省市切换
      clickProvinceOrCity(val) {
        if (val == 1) {
          this.proCity = this.territory
        } else {
          this.proCity = this.citys
        }
      },
      //获取粉丝地域分布
      async getFansData() {
        // var param = {
        //   "authorId": this.authorId,
        // }
        // const {
        //   data
        // } = await this.$get('/api/detail/author/fans/picture', param)
        // console.log('dzxcjzxc',data)
        // if (data != undefined) {
        //   this.territory = data.province //省
        //   this.citys = data.city //市
        //   this.genders=data.gender
        //   if(this.genders!=''){
        //     this.male = this.genders[1].rate
        //     this.faMale = this.genders[0].rate
        //   }

        //   this.territory = this.territory.slice(0, 30)
        //   for (let i = 0; i < this.territory.length; i++) {
        //     this.territory[i].rate = this.territory[i].rate.toFixed(2)
        //   }

        //   this.proCity = this.territory
        //   this.citys = this.citys.slice(0, 30)
        //   for (let i = 0; i < this.citys.length; i++) {
        //     this.citys[i].rate = this.citys[i].rate.toFixed(2)
        //   }
        // }

        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
          "testData": 'T'
        }
        const {
          data
        } = await this.$get('/api/detail/author/fans/picture', param)
        if (data != undefined) {
          this.territory = data.province
          this.citys = data.city
          this.genders = data.gender
          if (this.genders != null) {
            this.male = this.genders[0].rate.toFixed(2)
            this.faMale = this.genders[1].rate.toFixed(2)
          }

          this.territory = this.territory.slice(0, 10)
          for (let i = 0; i < this.territory.length; i++) {
            this.territory[i].rate = this.territory[i].rate.toFixed(2)
          }
          this.proCity = this.territory
          this.citys = this.citys.slice(0, 10)
          for (let i = 0; i < this.citys.length; i++) {
            this.citys[i].rate = this.citys[i].rate.toFixed(2)
          }

          this.fansAnaly = data.age
          let lists = [];
          this.fansAnaly.forEach((item) => {
            lists.push({
              name: item.title + '岁',
              value: item.rate.toFixed(2)
            })
          })

          var chartDom = document.getElementById('age')
            var myChart = this.$echarts.init(chartDom)
            myChart.setOption({
              color: ['#E60012','#FF3E34','#FFBD76','#FF6334'],
              tooltip: {
                trigger: 'item',
          backgroundColor:'rgba(0,0,0,0.7)',
          textStyle:{
            color:'#ffffff'
          },
          borderColor:'rgba(0,0,0,0.7)'
              },
              series: [{
                name:'年龄分布',
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                label: {
                  normal:{
                    show:true,
                    formatter:"{b} ({d}%)"
                  },
                  show: true,
                  position: 'center',
                  emphasis: {
                      show: true,
                      //fontWeight: 'bold'
                  },
                },
                labelLine: {
                  show: false
                },
                data:lists,
              }],
            })
        }
      },



      //年龄分析
      async getAge() {
        var param = {
          "authorId": this.authorId,
        }
        const {
          data
        } = await this.$get('/api/detail/author/fans/picture', param)
        if (data!= undefined) {
          this.fansAge = data.age
          let list = [];
          this.fansAge.forEach((item) => {
            list.push({
              name: item.title,
              value: item.rate
            })
          })
          this.chartData.ageData.title = ''
          this.chartData.ageData.name = '年龄分布'
          this.chartData.ageData.color = ['#E60012', '#FF3E34', '#FF6334', '#FFBD76'],
            this.chartData.ageData.data = list
        }

      },
      //涨粉分析
      getFansUp() {
        this.chartData.fansUpData.date = ['11：50', '12：50', '13：50', '14：50', '15：50', '16：50', '17：50']
        this.chartData.fansUpData.data = [{
          areaStyle: {
            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255,189,118,1)'
            }, {
              offset: 1,
              color: 'rgba(255,255,255,1)'
            }])
          },
          data: [110, 180, 80, 90, 160, 180, 290],
          type: 'line',
          smooth: true
        }]
      },
      //视频发布时间统计
      async getGoVideo() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/aweme/times/chart', param)
        if (data != undefined) {
          this.getData.releaseTime = data
          let videoList = [];
          let countList = [];
          this.getData.releaseTime.forEach((item) => {
            videoList.push(item.date)
            countList.push(item.count)
          })
          this.$nextTick(() => {
            this.chartData.goVideoData.dataX = videoList
            this.chartData.goVideoData.dataY = countList
          })

        }

      },
      //直播开播时间统计
      // async getGoLiving() {
      //   var param = {
      //     "authorId": this.authorId,
      //     "startTime": this.startDate,
      //     "endTime": this.endDate,
      //   }
      //   const {
      //     data
      //   } = await this.$get('/api/detail/author/live/analysis', param)
      //   if (data != undefined) {
      //     this.show.dataShowLivesc = false
      //     this.getData.liveHour = data.day_hours
      //     let dates = [];
      //     let hourList = [];
      //     this.getData.liveHour.forEach((item) => {
      //       dates.push(item.hour)
      //       hourList.push(item.count)
      //     })
      //       this.chartData.goLivingData.dataX = dates
      //       this.chartData.goLivingData.dataY = hourList
      //   }else{
      //     this.show.dataShowLivesc = true
      //   }
      // },
      //直播时长
      async getLivingTime() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/analysis', param)
        if (data != undefined) {
          this.getData.durLive = data.durations
          let dates = [];
          let hourList = [];
          this.getData.durLive.forEach((item) => {
            dates.push(item.duration)
            hourList.push(item.count)
          })
          this.$nextTick(() => {
            this.chartData.livingTimeData.dataX = dates
            this.chartData.livingTimeData.dataY = hourList
          })
        }
      },
      //直播
      async getLiving() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/live/analysis', param)
        if (data != undefined) {
          this.getData.liveTrends = data.trends
          let dates = [];
          let hourList = [];
          this.getData.liveTrends.forEach((item) => {
            item.date = tools.time_cycle(5,item.date)
            item.date = item.date.replace('-','/')
            dates.push(item.date)
            hourList.push(item.total_user)
          })
          this.$nextTick(() => {
            this.chartData.livingData.dataX = dates
            this.chartData.livingData.dataY = hourList
          })
        }
      },

      //地图展示
      drawregionCharts() {
        let mychart = this.$echarts.init(document.getElementById('regionCharts'))
        let dataList = [{
            name: '北京',
            value: 1000
          },
          {
            name: '四川',
            value: 800
          },
          {
            name: '黑龙江',
            value: 2000
          },
          {
            name: '辽宁',
            value: 2000
          },
          {
            name: '吉林',
            value: 2000
          },
          {
            name: '福建',
            value: 800
          },
          {
            name: '内蒙古',
            value: 800
          },
          {
            name: '新疆',
            value: 800
          },
          {
            name: '西藏',
            value: 2000
          },
          {
            name: '青海',
            value: 2000
          },
          {
            name: '宁夏',
            value: 2000
          },
          {
            name: '甘肃',
            value: 800
          },
          {
            name: '云南',
            value: 800
          },
          {
            name: '贵州',
            value: 0
          },
          {
            name: '广西',
            value: 800
          },
          {
            name: '广东',
            value: 2000
          },
          {
            name: '海南',
            value: 0
          },
          {
            name: '香港',
            value: 2000
          },
          {
            name: '湖南',
            value: 800
          },
          {
            name: '湖北',
            value: 800
          },
          {
            name: '河南',
            value: 2000
          },
          {
            name: '河北',
            value: 800
          },
          {
            name: '江西',
            value: 0
          },
          {
            name: '浙江',
            value: 2000
          },
          {
            name: '上海',
            value: 800
          },
          {
            name: '安徽',
            value: 2000
          },
          {
            name: '重庆',
            value: 800
          },
          {
            name: '江苏',
            value: 0
          },
          {
            name: '山西',
            value: 800
          },
          {
            name: '陕西',
            value: 2000
          },
          {
            name: '山东',
            value: 500
          },
          {
            name: '台湾',
            value: 300
          },
          {
            name: '南海诸岛',
            value: 0
          },

        ] // 该数据是从服务器获取到的数据
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.name + params.value; //自行定义formatter格式
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          visualMap: {
            min: 0,
            max: 3000,
            // left: 'left',
            // top: 'bottom',
            text: ['高', '低'], //取值范围的文字
            inRange: {
              color: ['#ffebff', '#8db2ff', ] //取值范围的颜色
            },
            show: false //图注
          },
          geo: {
            map: 'china',
            roam: false, //不开启缩放和平移
            zoom: 1.23, //视角缩放比例
            label: {
              normal: {
                show: false,
                fontSize: '10',
                color: 'rgba(0,0,0,0.7)'
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                // color: {
                //   x:0,
                //   y:0,
                //   x2:0,
                //   y2:1,
                //   colorStops:[{
                //     offset:1,color:'#ff5500'
                //   },{
                //     offset:0,color:'#35AEFF'
                //   }]
                // }
              },
              emphasis: {
                areaColor: '#F3B329', //鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: dataList
          }]

        }
        mychart.setOption(option)
        this.$nextTick(() => {
          mychart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
        })
      },


      //销量最佳品牌 TOP5
      async goodBrand() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/roughly/charts', param)
          let list = [];
          var num = 0;
          if (data.spread_category != null) {
            this.getData.spreadCategory = data.spread_category
            for (var i = 0; i < this.getData.spreadCategory.length; i++) {
              num += this.getData.spreadCategory[i].rate
            }
            this.getData.spreadCategory.forEach((item) => {
              item.rates = ((item.rate/num)*100).toFixed(2)
              //item.rate=item.rate.toFixed(2)
              list.push({
                name: item.title,
                value: item.rate,
              })
            })
            this.chartData.goodBrandData.name = '销量最佳品牌TOP5'
            this.chartData.goodBrandData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334'],
            this.chartData.goodBrandData.data = list
          }
      },
      //最常推广品牌Top5
      async getBrand() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/roughly/charts', param)
        if (data.spread_brand != null) {
          this.getData.spreadBrand = data.spread_brand
          let list = [];
          var num = 0;
          for (var i = 0; i < this.getData.spreadBrand.length; i++) {
            num += this.getData.spreadBrand[i].rate
          }
          this.getData.spreadBrand.forEach((item) => {
            item.rates = ((item.rate/num)*100).toFixed(2)
            //item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate
            })
          })
          this.chartData.brandData.name = '最常推广品牌TOP5'
          this.chartData.brandData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334']

          this.chartData.brandData.data = list
        }
      },
      //销量最佳品类Top5
      async getGoodClassData() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/roughly/charts', param)
          let list = [];
          var num = 0;
          if (data.best_sale_category != null) {
            this.getData.saleCategory = data.best_sale_category
            for (var i = 0; i < this.getData.saleCategory.length; i++) {
              num += this.getData.saleCategory[i].rate
            }
            this.getData.saleCategory.forEach((item) => {
              item.rates = ((item.rate/num)*100).toFixed(2)
              // item.rate=item.rate.toFixed(2)
              list.push({
                name: item.title,
                value: item.rate
              })
            })

            this.chartData.goodClassData.name = '销量最佳品类TOP5'
            this.chartData.goodClassData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334'],
            this.chartData.goodClassData.data = list
          }
      },
      //最常推广品类Top5
      async getClass() {
        var param = {
          "authorId": this.authorId,
          "startTime": this.startDate,
          "endTime": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/author/roughly/charts', param)
        if (data.best_sale_brand != null) {
          this.getData.saleBrand = data.best_sale_brand
          let list = [];
          var num = 0;
          for (var i = 0; i < this.getData.saleBrand.length; i++) {
            num += this.getData.saleBrand[i].rate
          }
          this.getData.saleBrand.forEach((item) => {
            item.rates = ((item.rate/num)*100).toFixed(2)
            //item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate
            })
          })
          this.chartData.classData.name = '最常推广品类TOP5'
          this.chartData.classData.color = ['#FFBD76', '#FF3E34', '#E60012', '#FF6334'],

            this.chartData.classData.data = list
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
  .box{
    /deep/.el-table--small td{
      padding: 10px 0px!important;
    }
  }
  .name{padding: 3px 0px;margin-right: 6px;font-size: 14px;}
  .select-item {
    padding: 3px 10px;
    font-size: 14px;
    color: $rdx-content-color;
    cursor: pointer;
    &.active {
      color: $rdx-primary;
      background: #FCE5E8;
      border-radius: 4px;
    }
    &:hover{
      color: $rdx-primary;
    }
  }

  .one-line {
    height: 26px;
    overflow: hidden;
  }
  .code-wx{width: 42px; height: 42px;border: 1px solid #EEEEEE;border-radius: 8px;}
  .tag:hover{border: 1px solid $rdx-error-disabled; background-color: $rdx-error-disabled;}
  .tag-is{border: 1px solid $rdx-primary; background-color: $rdx-primary; color:#FFFFFF}
  .bg_ys{background: #e7ecf1;}
</style>