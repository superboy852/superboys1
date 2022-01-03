<template>
  <div style="margin: 0px auto;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction talent-show">
      <div class="flex rdx-font-14 rdx-p-t-12 rdx-p-b-12 aligin-center rdx-line-height-30">
        <i class="iconfont icon-e614 rdx-m-r-4"></i>
        <span><a href="/talent/talent_search">达人</a></span>
        <i class="iconfont icon-e616"></i>
        <span class="color-content">达人详情</span>
      </div>
      <div class="flex new-top-box justify-between">
        <img :src="getData.livingDetail.avatar" style="width: 240px; height: 300px;">
        <div class="flex flex-direction rdx-flex-1 rdx-p-l-40">
          <div class="flex justify-between">
            <div class="flex align-center">
              <span class="rdx-font-20">{{getData.livingDetail.nickname}}</span>
              <span class="new-top-tips2 rdx-font-12 rdx-line-height-18 rdx-radius-10 rdx-p-lr-10 rdx-m-l-12 rdx-m-r-6"
                style="height: 18px; margin-top: 3px;">直播</span>
              <i class="iconfont icon-e736 color-old rdx-m-t-4"></i>
            </div>
            <div class="flex">
              <el-tooltip class="item" effect="dark" content="复制抖音号" placement="top">
                <div class="tag flex align-center justify-center" @click="copy(getData.livingDetail.unique_id)">
                  <i class="iconfont icon-e781"></i>
                </div>
              </el-tooltip>
              <el-popover placement="bottom" width="130" trigger="hover" transition="ease"
                :style="show.codeShowOk ? '' : 'display: none;'">
                <div class="flex justify-center">
                  <div class="flex flex-direction align-center">
                    <div id="qrcode2" ref="qrcode2"></div>
                  </div>
                </div>
                <div slot="reference" class="flex align-center justify-center button-a">
                  <span class="tag rdx-m-l-10 flex align-center justify-center">
                    <div id="qrcode" ref="qrcode" style="width: 26px; height: 26px;"></div>
                  </span>
                </div>
              </el-popover>
              <el-tooltip class="item" effect="dark" content="收藏" placement="top" v-if="!show.favoriteYes">
                <div class="tag flex align-center justify-center rdx-m-l-10"
                  :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavorite">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="top" v-if="show.favoriteYes">
                <div class="tag flex align-center justify-center rdx-m-l-10"
                  :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavoriteNot">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="flex rdx-font-14 rdx-content-color">{{getData.livingDetail.unique_id}}</div>
          <div class="flex justify-between">
            <div class="flex flex-direction">
              <div class="flex align-center rdx-font-14 rdx-m-t-20">
                <span class="rdx-warning-disabled-bg flex align-center rdx-line-height-24 rdx-m-r-10"
                  style="height: 24px;" v-if="getData.livingDetail.gender == 0">
                  <i class="iconfont icon-e60c color-old rdx-p-r-4"></i>男
                </span>
                <span class="rdx-warning-disabled-bg flex align-center rdx-line-height-24 rdx-m-r-10"
                  style="height: 24px;" v-if="getData.livingDetail.gender == 1">
                  <i class="iconfont icon-e602 rdx-primary rdx-p-r-4"></i>女
                </span>
                <span class="new-top-tips rdx-p-lr-8 rdx-line-height-24">{{getData.livingDetail.label}}</span>
                <i class="iconfont icon-e718 rdx-primary-dark rdx-m-l-10"
                  v-if="getData.livingDetail.verify_name != ''"></i>
                <span class="rdx-p-l-6"
                  v-if="getData.livingDetail.verify_name != ''">{{getData.livingDetail.verify_name}}</span>
                <span class="talent-tigs rdx-light-color rdx-m-l-10 rdx-p-lr-8 rdx-line-height-24">MCN</span>
                <span class="rdx-tips-color rdx-p-l-6">{{getData.livingDetail.mcn_name}}</span>
              </div>
              <div class="flex rdx-font-14 rdx-m-t-12">
                <span class="new-top-tips rdx-line-height-24 rdx-p-lr-10">带货口碑 <i
                    style="color: FF9018;">{{getData.reputations.score}}</i>
                  <block v-if="getData.reputations.levels > 0">高</block>
                  <block v-if="getData.reputations.levels < 0">低</block>
                  <block v-if="getData.reputations.levels == 0">正常</block>
                </span>
                <span class="new-top-tips rdx-line-height-24 rdx-p-lr-10 rdx-m-l-12">达人带货月榜 第<i
                    style="color: FF9018;">{{getData.salesRank}}</i></span>
                <span class="new-top-tips rdx-line-height-24 rdx-p-lr-10 rdx-m-l-12">涨粉达人月榜 第<i
                    style="color: FF9018;">{{getData.fansRank}}</i>名 </span>
              </div>
            </div>
            <!--            <div class="flex talent-tigs2 align-center rdx-font-14 rdx-p-lr-16 rdx-line-height-32">星图指数：81.6 <i class="iconfont icon-e616 rdx-font-12"></i> </div> -->
          </div>
          <div class="rdx-font-14 rdx-content-color rdx-line-height-26 rdx-p-tb-30">
            简介：{{getData.livingDetail.signature}}</div>
          <div class="flex">
            <div class="flex flex-direction w-20">
              <span class="rdx-font-18">{{getData.livingDetail.total_favorited}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">总点赞数 昨日 <i class="iconfont"
                  :class="getData.livingDetail.diggincr == 0 ? '':getData.livingDetail.diggincr > 0?'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i></span>
            </div>
            <div class="flex flex-direction w-20">
              <span class="rdx-font-18">{{getData.livingDetail.follower_count}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">总粉丝数 昨日 <i class="iconfont"
                  :class="getData.livingDetail.flincr == 0 ? '' : getData.livingDetail.flincr > 0 ?'icon-e82d rdx-primary' : 'icon-e8fe rdx-primary-dark'"></i></span>
            </div>
            <div class="flex flex-direction w-20">
              <span class="rdx-font-18">{{getData.livingDetail.month_live_count}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">近30天直播场次</span>
            </div>
            <div class="flex flex-direction w-20">
              <span class="rdx-font-18">{{getData.livingDetail.month_live_amount}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">近30天销售额</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-100 justify-between">
        <div class="flex conten-box-left flex-direction color-7" style="position: sticky;top: 0px; height: 230px;">
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('1')">
            <i class="iconfont icon-e60d rdx-m-r-8 rdx-font-20" :class="show.tabIndex == '1' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '1' ? 'rdx-primary' : ''">基础分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('2')">
            <i class="iconfont icon-e621 rdx-m-r-8" :class="show.tabIndex == '2' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '2' ? 'rdx-primary' : ''">直播分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('3')">
            <i class="iconfont icon-e61b rdx-m-r-8" :class="show.tabIndex == '3' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '3' ? 'rdx-primary' : ''">视频分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('4')">
            <i class="iconfont icon-e603 rdx-m-r-8" :class="show.tabIndex == '4' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '4' ? 'rdx-primary' : ''">带货分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('5')">
            <i class="iconfont icon-e634 rdx-m-r-8" :class="show.tabIndex == '5' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '5' ? 'rdx-primary' : ''">粉丝分析</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 1">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">带货概况</span>
            </div>
            <div class="flex rdx-p-tb-30 justify-end align-center">
              <span class="rdx-font-14 rdx-tips-color rdx-p-r-24">上架商品数</span>
              <span class="rdx-font-22 rdx-p-r-70">{{getData.overview.total_product_count}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-r-24">推广品类</span>
              <span class="rdx-font-22 rdx-p-r-70">{{getData.overview.total_category_count}}</span>
              <span class="rdx-font-14 rdx-tips-color rdx-p-r-24">推广品牌</span>
              <span class="rdx-font-22">{{getData.overview.total_brand_count}}</span>
            </div>
            <div class="flex justify-between">
              <div class="flex flex-direction rdx-flex-1">
                <span class="font-strong rdx-font-14 rdx-p-l-40">最常推广品类Top5</span>
                <div class="flex flex-wrap rdx-p-t-20 rdx-p-b-30 rdx-p-l-40 rdx-p-r-20" style="height: 135px;">
                  <div class="flex align-center w-50 rdx-p-b-12" v-for="(itemS,index) in chartData.classData.data"
                    :key="index">
                    <span class="talent-legend" v-if="index == 0" style="background-color: #FEE3CC;"></span>
                    <span class="talent-legend" v-if="index == 1" style="background-color: #FFAE66;"></span>
                    <span class="talent-legend" v-if="index == 2" style="background-color: #FF7612;"></span>
                    <span class="talent-legend" v-if="index == 3" style="background-color: #FF3E34;"></span>
                    <span class="talent-legend" v-if="index == 4" style="background-color: #DD001B;"></span>
                    <span class="rdx-font-12 rdx-content-color rdx-p-l-6 rdx-line-1"
                      style="width: 100px;">{{itemS.name}}</span>
                  </div>
                </div>
                <talent-pie chartId="classId" v-if="getData.saleBrand!=''" :formatter="chartData.formatter"
                  :chartData="chartData.classData" :chartWidth="chartData.chartWidth2"></talent-pie>
              </div>
              <div class="flex flex-direction rdx-flex-1">
                <span class="font-strong rdx-font-14 rdx-p-l-40">销量最佳品类 TOP5</span>
                <div class="flex flex-wrap rdx-p-t-20 rdx-p-b-30 rdx-p-l-40 rdx-p-r-20" style="height: 135px;">
                  <div class="flex align-center w-50 rdx-p-b-12" v-for="(itemS,index) in chartData.goodClassData.data"
                    :key="index">
                    <span class="talent-legend" v-if="index == 0" style="background-color: #FEE3CC;"></span>
                    <span class="talent-legend" v-if="index == 1" style="background-color: #FFAE66;"></span>
                    <span class="talent-legend" v-if="index == 2" style="background-color: #FF7612;"></span>
                    <span class="talent-legend" v-if="index == 3" style="background-color: #FF3E34;"></span>
                    <span class="talent-legend" v-if="index == 4" style="background-color: #DD001B;"></span>
                    <span class="rdx-font-12 rdx-content-color rdx-p-l-6 rdx-line-1"
                      style="width: 100px;">{{itemS.name}}</span>
                  </div>
                </div>
                <talent-pie v-if="getData.saleCategory!=''" chartId="goodClassId" :formatter="chartData.formatter"
                  :chartData="chartData.goodClassData" :chartWidth="chartData.chartWidth2"></talent-pie>
              </div>
              <div class="flex flex-direction rdx-flex-1">
                <span class="font-strong rdx-font-14 rdx-p-l-40">最常推广品牌 TOP5</span>
                <div class="flex flex-wrap rdx-p-t-20 rdx-p-b-30 rdx-p-l-40 rdx-p-r-20" style="height: 135px;">
                  <div class="flex align-center w-50 rdx-p-b-12" v-for="(itemS,index) in chartData.brandData.data"
                    :key="index">
                    <span class="talent-legend" v-if="index == 0" style="background-color: #FEE3CC;"></span>
                    <span class="talent-legend" v-if="index == 1" style="background-color: #FFAE66;"></span>
                    <span class="talent-legend" v-if="index == 2" style="background-color: #FF7612;"></span>
                    <span class="talent-legend" v-if="index == 3" style="background-color: #FF3E34;"></span>
                    <span class="talent-legend" v-if="index == 4" style="background-color: #DD001B;"></span>
                    <span class="rdx-font-12 rdx-content-color rdx-p-l-6 rdx-line-1"
                      style="width: 100px;">{{itemS.name}}</span>
                  </div>
                </div>
                <talent-pie v-if="getData.spreadBrand!=''" chartId="brandId" :formatter="chartData.formatter"
                  :chartData="chartData.brandData" :chartWidth="chartData.chartWidth2"></talent-pie>
              </div>
              <div class="flex flex-direction rdx-flex-1">
                <span class="font-strong rdx-font-14 rdx-p-l-40">销量最佳品牌 TOP5</span>
                <div class="flex flex-wrap rdx-p-t-20 rdx-p-l-40 rdx-p-b-30 rdx-p-r-20" style="height: 135px;">
                  <div class="flex align-center w-50 rdx-p-b-12" v-for="(itemS,index) in chartData.goodBrandData.data"
                    :key="index">
                    <span class="talent-legend" v-if="index == 0" style="background-color: #FEE3CC;"></span>
                    <span class="talent-legend" v-if="index == 1" style="background-color: #FFAE66;"></span>
                    <span class="talent-legend" v-if="index == 2" style="background-color: #FF7612;"></span>
                    <span class="talent-legend" v-if="index == 3" style="background-color: #FF3E34;"></span>
                    <span class="talent-legend" v-if="index == 4" style="background-color: #DD001B;"></span>
                    <span class="rdx-font-12 rdx-content-color rdx-p-l-6 rdx-line-1"
                      style="width: 100px;">{{itemS.name}}</span>
                  </div>
                </div>
                <talent-pie v-if="getData.spreadCategory!=''" chartId="goodBrandId" :formatter="chartData.formatter"
                  :chartData="chartData.goodBrandData" :chartWidth="chartData.chartWidth2"></talent-pie>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex justify-between">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">直播概览</span>
              </div>
              <div class="tag flex align-center justify-center" @click="refresh('1')">
                <i class="iconfont icon-e782 rdx-content-color"></i>
              </div>
            </div>
            <div class="flex rdx-p-t-40 rdx-p-b-20">
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 talent-color">{{getData.liveGK.total_live_count}}</span>
                <span class="rdx-font-20 talent-color rdx-p-t-10 rdx-p-b-16">历史总场次</span>
                <span class="rdx-font-14">平均开播时长 {{getData.liveGK.avg_live_time}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 talent-color">{{getData.liveGK.month_live_count}}</span>
                <span class="rdx-font-20 talent-color rdx-p-t-10 rdx-p-b-16">近30天场次</span>
                <span class="rdx-font-14">本周开播场次 {{getData.liveGK.week_count}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 talent-color">{{getData.liveGK.avg_live_volume}}</span>
                <span class="rdx-font-20 talent-color rdx-p-t-10 rdx-p-b-16">近30天场均销量(件)</span>
                <span class="rdx-font-14">15天开播场次 {{getData.liveGK.half_month_count}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 talent-color">{{getData.liveGK.avg_live_amount}}</span>
                <span class="rdx-font-20 talent-color rdx-p-t-10 rdx-p-b-16">近30天场均销售额</span>
                <span class="rdx-font-14">本月场次 {{getData.liveGK.month_count}}</span>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex justify-between">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">视频概况</span>
              </div>
              <div class="tag flex align-center justify-center" @click="refresh('2')">
                <i class="iconfont icon-e782 rdx-content-color"></i>
              </div>
            </div>
            <div class="flex rdx-p-t-40 rdx-p-b-20">
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 color-old">{{getData.videoGK.history_aweme_count}}</span>
                <span class="rdx-font-20 color-old rdx-p-t-10 rdx-p-b-16">历史总场次</span>
                <span class="rdx-font-14">视频平均时长 {{getData.videoGK.average_aweme_duration}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 color-old">{{getData.videoGK.average_digg}}</span>
                <span class="rdx-font-20 color-old rdx-p-t-10 rdx-p-b-16">平均点赞</span>
                <span class="rdx-font-14">周均视频个数 {{getData.videoGK.average_week_aweme_count}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 color-old">{{getData.videoGK.average_digg_percent}}%</span>
                <span class="rdx-font-20 color-old rdx-p-t-10 rdx-p-b-16">平均赞粉比</span>
                <span class="rdx-font-14">月均视频个数 {{getData.videoGK.average_month_aweme_count}}</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 color-old">{{getData.videoGK.product_aweme_count_30}}</span>
                <span class="rdx-font-20 color-old rdx-p-t-10 rdx-p-b-16">近30天场均销量（件）</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="font-strong rdx-font-30 color-old">{{getData.videoGK.product_aweme_amount_30}}</span>
                <span class="rdx-font-20 color-old rdx-p-t-10 rdx-p-b-16">近30天场均销售额</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction">
            <div class="flex justify-between">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">商品概况</span>
              </div>
              <div class="tag flex align-center justify-center" @click="refresh('3')">
                <i class="iconfont icon-e782 rdx-content-color"></i>
              </div>
            </div>
            <div class="flex rdx-p-t-40 rdx-p-b-20">
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.live_count}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">直播场次</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.live_product_count}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">带货场次</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.total_volume}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">总销量（件）</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.total_amount}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">总销售额</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.product_size}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">上架商品</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.product_rate}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">带货转化率</span>
              </div>
            </div>
            <div class="flex rdx-p-t-40 rdx-p-b-20">
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.avg_volume}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">场均销量（件）</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.avg_amount}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">场均销售额</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.avg_uv}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">场均UV价值</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.day_avg_volume}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">日均销量（件）</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.day_avg_amount}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">日常销售额</span>
              </div>
              <div class="flex rdx-flex-1 flex-direction align-center">
                <span class="rdx-font-30">{{getData.analysisCount.day_avg_uv}}</span>
                <span class="rdx-font-14 rdx-p-t-10 rdx-content-color">日均UV价值</span>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">直播人次观看趋势</span>
            </div>
            <div class="flex position-re">
              <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
                style=" height: 350px;" v-if="getData.liveTrends==''"></no-data>
              <bar-chart v-if="getData.liveTrends!=''" chartId="living" :chartData="chartData.livingData"
                :chartWidth="chartData.chartWidth"></bar-chart>
            </div>
          </div>
          <div class="flex rdx-m-t-20">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">直播时长分布</span>
              </div>
              <div class="flex position-re">
                <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
                  style=" height: 350px;" v-if="getData.durLive==''"></no-data>
                <bar-chart v-if="getData.durLive!=''" chartId="livingTime" :chartData="chartData.livingTimeData"
                  :chartWidth="chartData.chartWidth">
                </bar-chart>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">直播开播时间统计</span>
              </div>
              <go-living-data-chart :authorId="authorId" :startDate="startDate" :endDate="endDate">
              </go-living-data-chart>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10 rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">直播记录</span>
            </div>
            <div class="flex align-center rdx-m-t-30">
              <span class="rdx-font-12 rdx-tips-color">销量</span>
              <span class="rdx-p-l-14 rdx-font-22">{{getData.analysisCount.total_volume}}</span>
              <span class="rdx-font-12 rdx-tips-color rdx-p-l-60">累计销量</span>
              <span class="rdx-p-l-14 rdx-font-22">{{getData.analysisCount.total_amount}}</span>
            </div>
            <div class="flex justify-end" style="margin: -20px 0px 26px 0px;">
              <search-item @clickKey='clickLiveKeyWord' searchType="1" searchPlaceholder="请输入直播标题" searchWidth='365'></search-item>
            </div>
            <el-table :data="getData.liveRooms" @sort-change="handlesortChangeLiveRoom" @row-click="jumpUrlLive">
              <template slot="empty">
                <no-data></no-data>
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
              <el-table-column align="center" sortable="custom" prop="begin_live_time" label="开播时间" width="120">
              </el-table-column>
              <el-table-column align="center" prop="duration" label="直播时长" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="total_user" label="观看人次" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="user_peak" label="人气峰值" width="120"></el-table-column>
              <!--              <el-table-column sortable="custom" prop="user_value" label="UV价值" min-width="100"></el-table-column> -->
              <el-table-column prop="product_size" label="商品数" width="100px"></el-table-column>
              <el-table-column sortable="custom" prop="volume" label="销量（件）" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="amount" label="销售额" width="100"></el-table-column>
              <el-table-column align="center" prop="volume1" label="操作" width="100">
                <template slot-scope="scope">
                  <span class="button-a rdx-m-r-16 rdx-primary">查看详情</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="block flex justify-center rdx-p-t-20" v-if="liveTotal!=''">
              <el-pagination background :total="liveTotal" :page-size="liveParams.size"
                :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleLiveSizeChange" @current-change="handleLiveCurrentChange">
              </el-pagination>
            </div>

          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 3">
          <div class="flex">
            <div class="item-bg2 flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">视频时长分布</span>
              </div>
              <div class="flex position-re">
                <video-Time-Chart :authorId="authorId" :startDate="startDate" :endDate="endDate"
                  @videoSummary="videoSummaryChange"></video-Time-Chart>
              </div>
            </div>
            <div class="item-bg2 flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">视频发布时间统计</span>
              </div>
              <div class="flex position-re">
                <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
                  style=" height: 350px;" v-if="chartData.goVideoData.dataX==''"></no-data>
                <bar-chart v-if="chartData.goVideoData.dataX!=''" chartId="goVideo" :chartData="chartData.goVideoData"
                  :chartWidth="chartData.chartWidth">
                </bar-chart>
              </div>
            </div>
          </div>
          <div class="flex justify-between rdx-m-t-20">
            <div class="item-bg2 flex flex-direction" style="width: 465px;">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">点赞数据</span>
              </div>
              <div class="rdx-p-20 bg-F8 flex justify-between rdx-m-t-14 rdx-m-b-10">
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.diggMax}}</span>
                  <span class="rdx-font-14 rdx-content-color">最多点赞视频</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.diggMin}}</span>
                  <span class="rdx-font-14 rdx-content-color">最少点赞视频</span>
                </div>
              </div>
              <diggs-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></diggs-Line>
            </div>
            <div class="item-bg2 flex flex-direction" style="width: 465px;">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">评论数据</span>
              </div>
              <div class="rdx-p-20 bg-F8 flex justify-between rdx-m-t-14 rdx-m-b-10">
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.commentMax}}</span>
                  <span class="rdx-font-14 rdx-content-color">最多评论视频</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.commentMin}}</span>
                  <span class="rdx-font-14 rdx-content-color">最少评论视频</span>
                </div>
              </div>
              <comment-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></comment-Line>
            </div>
            <div class="item-bg2 flex flex-direction" style="width: 465px;">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">转发数据</span>
              </div>
              <div class="rdx-p-20 bg-F8 flex justify-between rdx-m-t-14 rdx-m-b-10">
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.shareMax}}</span>
                  <span class="rdx-font-14 rdx-content-color">最多转发视频</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction align-center">
                  <span class="rdx-font-30">{{videoSummary.shareMin}}</span>
                  <span class="rdx-font-14 rdx-content-color">最少转发视频</span>
                </div>
              </div>
              <share-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></share-Line>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center rdx-m-b-50">
              <span class="tips"></span>
              <span class="rdx-font-20">TA的视频</span>
            </div>
            <div class="flex justify-between rdx-font-14 align-end">
              <el-checkbox-group v-model="val.videoName" size='mini'>
                <el-checkbox label="直播预热视频" @change="clickLiveWarmVideo"></el-checkbox>
                <el-checkbox label="有关联商品" @change="clickAssociatedGoods"></el-checkbox>
              </el-checkbox-group>
              <search-item @clickKey='clickVideoKeyWord' searchType="2" searchPlaceholder="请输入视频标题" searchWidth="365">
              </search-item>
            </div>
            <el-table :data="getData.videoList" class="rdx-m-t-20" @sort-change="handlesortChangeVideo"
              @row-click="jumpUrl">
              <template slot="empty">
                <no-data marginTop="0"></no-data>
              </template>
              <el-table-column label="视频内容">
                <template slot-scope="{ row }">
                  <div class="info rdx-flex">
                    <img :src="row.aweme_cover" alt style="width: 62px;height: 62px;min-width: 60px;" />
                    <div class="rdx-flex-col rdx-m-l-10">
                      <div class="rdx-flex rdx-flex-wrap">
                        <span class="name rdx-m-r-4 rdx-font-14 rdx-line-2"
                          style="width: 200px;">{{ row.aweme_title }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="aweme_create_time" label="发布时间" width="120">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="total_volume" label="预估销量（件）" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="total_amount" label="预估销售额" width="150">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="digg_count" label="点赞数" width="120">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="comment_count" label="评论数" width="120">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="forward_count" label="转发数" width="120">
              </el-table-column>
              <el-table-column align="center" prop="warm_live_count" label="关联直播" width="100"></el-table-column>
              <el-table-column align="center" label="操作" width="100">
                <template slot-scope="scope">
                  <span class="button-a rdx-primary">数据</span>
                  <!--                  <span class="button-a rdx-primary">播放</span> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="block flex justify-center rdx-p-t-20" v-if="videoTotal!=''">
              <el-pagination background :total="videoTotal" :page-size="videoParams.size"
                :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleVideoSizeChange" @current-change="handleVideoCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 4">
          <div class="flex">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">销售趋势</span>
              </div>
              <div class="flex position-re">
                <sell-data-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></sell-data-line>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">销售额趋势</span>
              </div>
              <div class="flex position-re">
                <sell-up-data-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></sell-up-data-line>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">直播推广商品分析</span>
            </div>
            <el-radio-group v-model="val.classVal" class="rdx-m-t-30" size="mini" @change="clickCateOrBrand">
              <el-radio-button label="1">商品品类</el-radio-button>
              <el-radio-button label="2">商品品牌</el-radio-button>
            </el-radio-group>
            <el-table :data="getData.livePromote" class="rdx-m-t-20" @sort-change="handlesortChangeGoodFX">
              <template slot="empty">
                <no-data marginTop="0"></no-data>
              </template>
              <el-table-column prop="tag_name" label="商品品类"></el-table-column>
              <el-table-column prop="avg_price" label="均价" align="center" width="100"></el-table-column>
              <el-table-column sortable="custom" prop="product_count" label="商品数" align="center" width="100">
              </el-table-column>
              <el-table-column sortable="custom" prop="volume" label="销量(件)" align="center" width="130">
              </el-table-column>
              <el-table-column sortable="custom" prop="amount" label="销售额" align="center" width="100"></el-table-column>
              <el-table-column prop="avg_convert_rate" label="平均转化率" align="center" width="130"></el-table-column>
            </el-table>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">商品列表</span>
            </div>
            <div class="flex justify-between align-end">
              <div class="flex flex-direction rdx-m-t-30 rdx-m-b-20">
                <div class="flex rdx-p-b-10 align-center">
                  <span class="name">选择分类：</span>
                  <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !productAllShow }">
                    <div class="rdx-m-b-4 select-item" :class="goodParams.bigCategory ? '' : 'active'"
                      @click="handleGoodsCate('')">全部</div>
                    <div class="rdx-m-b-4 select-item" :key="items.id" v-for="items in getData.goodsCategory"
                      :class="goodParams.bigCategory === items.name ? 'active' : ''"
                      @click="handleGoodsCate(items.name)">
                      {{ items.name }}
                    </div>
                  </div>
                </div>
                <div class="flex align-center">
                  <span class="name">品牌分类：</span>
                  <div class="rdx-flex rdx-flex-1 rdx-flex-wrap" :class="{ 'one-line': !starAllShow }">
                    <div class="rdx-m-b-4 select-item" :class="goodParams.brandCode ? '' : 'active'"
                      @click="handleBrandCate('')">全部</div>
                    <div class="rdx-m-b-4 select-item" :key="items.id" v-for="items in getData.goodsBrand"
                      :class="goodParams.brandCode === items.name ? 'active' : ''" @click="handleBrandCate(items.name)">
                      {{ items.name }}
                    </div>
                  </div>
                </div>
              </div>
              <search-item @clickKey='clickGoodsKeyWord' searchType="7" searchWidth="365" searchPlaceholder="请输入商品标题">
              </search-item>
            </div>
            <div class="flex justify-end">
              <div class="flex rdx-p-b-20 justify-end">
                <span class="rdx-font-14 rdx-tips-color rdx-p-r-10">商品数</span>
                <span class="rdx-font-22 rdx-p-r-70 rdx-line-height-22">{{goodTotal}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-r-10">累计销售</span>
                <span class="rdx-font-22 rdx-p-r-70 rdx-line-height-22">{{getData.goodsTotalCount.total_volume}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-r-10">累计销售额</span>
                <span class="rdx-font-22 rdx-p-r-70 rdx-line-height-22">{{getData.goodsTotalCount.total_amount}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-r-10">关联直播</span>
                <span class="rdx-font-22 rdx-line-height-22">{{getData.goodsTotalCount.total_room_count}}</span>
              </div>
            </div>
            <el-table :data="getData.goodsList" @sort-change="handlesortChangeGoods" @row-click="jumpUrlGoods">
              <template slot="empty">
                <no-data marginTop='0'></no-data>
              </template>
              <el-table-column prop="product_title" label="商品">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="price" label="价格" width="100">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="volume" label="销量(件)" width="120">
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="amount" label="销售额" width="120"></el-table-column>
              <el-table-column prop="volume1" label="操作" width="80">
                <template slot-scope="scope">
                  <span class="rdx-primary">查看</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="block flex rdx-p-t-20 justify-center" :style="getData.goodsList=='' ? 'display: none;':'' ">
              <el-pagination background :total="goodTotal" :page-size="goodParams.size"
                :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleGoodsSizeChange" @current-change="handleGoodsCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 5">
          <div class="flex">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">粉丝分析</span>
              </div>
              <div class="flex position-re">
                <fans-line :authorId="authorId" :startDate="startDate" :endDate="endDate"></fans-line>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">粉丝团分析</span>
              </div>
              <div class="flex position-re">
                <fans-Data-Line :authorId="authorId" :startDate="startDate" :endDate="endDate"></fans-Data-Line>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">观众画像</span>
            </div>
            <div class="flex justify-between rdx-m-t-46">
              <div class="flex flex-direction rdx-flex-1 rdx-p-r-26">
                <div class="flex">
                  <div class="flex rdx-m-r-40 rdx-font-14">性别占比</div>
                  <div class="flex align-center rdx-p-tb-30 rdx-p-t-10 position-re rdx-flex-1 rdx-p-r-20"
                    style="text-align: center;">
                    <i class="iconfont icon-e60c position-ab rdx-font-20"
                      style="color: #4a96fa; left: 0px; top: 0px;"></i>
                    <div class="man position-re w-100">
                      <div class="position-ab man-item" :style="'width: ' + male + '%;'"></div>
                    </div>
                    <i class="iconfont icon-e602 position-ab rdx-font-20"
                      style="color: #FF6968; right: 20px; top: 0px;"></i>
                    <div class="flex justify-between position-ab w-100 rdx-p-r-20" style="bottom: 0px;">
                      <span>{{male}}%</span>
                      <span>{{faMale}}%</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-direction rdx-m-t-80">
                  <span class="rdx-font-14">年龄占比</span>
                  <div class="flex position-re">
                    <div id="age" style="width: 100%; height: 300px;"></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-direction rdx-flex-1 rdx-p-l-26">
                <span class="rdx-font-14">地域占比</span>
                <div class="tab-width position-re rdx-font-14 rdx-m-t-40" style="width: 134px;">
                  <div :class="val.mapIndex == 1 ? 'active' : 'active-out'"
                    style="bottom: -1px; left: 0px; width: 66px;" @click="tapMap('1')">省</div>
                  <div :class="val.mapIndex == 2 ? 'active' : 'active-out'"
                    style="bottom: -1px; right: 0px; width: 66px;" @click="tapMap('2')">市</div>
                </div>
                <div class="flex justify-between">
                  <div class="flex rdx-flex-8 rdx-m-t-20">
                    <map-chart></map-chart>
                  </div>
                  <div class="flex rdx-flex-4 flex-direction rdx-p-l-30 rdx-p-t-50">
                    <div class="rdx-font-14 rdx-p-b-10" v-if="proCity!=''" v-for="(item,index) in proCity" :key="index">
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
    <top-up></top-up>
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
  import top from '@/layout/components/Top.vue'
  import talentPie from './components/talentPie.vue'
  import mapChart from './components/mapChart.vue'
  import topUp from '@/components/toUp.vue'
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
      fansLine,
      top,
      talentPie,
      mapChart,
      topUp
    },
    data() {
      return {
        videoSummary: '',
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
          analysisCount: {
            live_count:0,
            live_product_count:0,
            total_volume:0,
            total_amount:0,
            product_size:0,
            avg_volume:0,
            avg_amount:0,
            avg_uv:'0.00',
            day_avg_volume:0,
            day_avg_amount:0,
            day_avg_uv:'0.00',
            product_rate:'0.00'
          }, //直播分析（商品概况）
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
          salesRank: '', //月榜排名
          fansRank: '', //涨粉排名
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
          tabIndex: '1',
          favoriteYes: false,
          dataShowLivesc: false, //直播开播时间统计
          codeShowOk: false, //显示二维码
          chartTrue: true, //图表是否显示
        },
        videoKeyWord: '',
        goodsKeyWord: '',
        liveKeyWord: '',
        fansAge: [],
        cates: -1,
        brand: -1,
        productAllShow: false, //商品收起
        starAllShow: false, //达人收起
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
        startDate: '',
        endDate: '',
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
          mapIndex: '1'
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
            height: "300px"
          },
          chartWidth2: {
            width: "220",
            height: "220px"
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
      this.isFavorite()
    },
    mounted() {},
    methods: {
      //点击刷新
      refresh(index) {
        if (index == 1) {
          this.getOverview()
        } else if (index == 2) {
          this.getVideoGeneral()
        } else {
          this.getAnalysisCount()
        }
        this.$forceUpdate()
      },
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
        if (index == 5) {
          this.getFansData()
        }
      },
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
      async isFavorite() {
        var favorite = {
          collectId: this.authorId,
          collectType: 1
        }
        const data = await this.$get('/api/user/user_collection/query_is_collect', favorite)
        if (data.data > 0) {
          this.show.favoriteYes = true
        } else {
          this.show.favoriteYes = false
        }
      },
      //取消收藏
      async onFavoriteNot() {
        if (this.show.favoriteYes = true) { //模拟，真实数据要根据获取的字段判断
          var favoriteParam = {
            collectId: this.authorId,
            collectType: 1 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
          }
          const data = await this.$get('/api/user/user_collection/cancel_collection', favoriteParam)
          if (data.errCode == 0) {
            this.show.favoriteYes = false
          } else {
            this.$message.error("收藏失败，请联系管理员")
          }
        }

      },
      //点击收藏夹
      async onFavorite() {
        var favoriteParam = {
          dataId: this.authorId,
          collectType: 1 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
        }
        const {
          data
        } = await this.$post('/api/user/user_collection/add_collection', favoriteParam)
        if (data.errCode == 0) {
          this.show.favoriteYes = true
        } else {
          this.$message.error("收藏失败，请联系管理员")
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
          this.getData.fansRank = data.author_fans_rank.rank
          this.val.codeWx = this.getData.livingDetail.home_url
          this.getData.reputations = data.reputation
          if (this.getData.reputations.level == 1) {
            this.getData.reputations.levels == 高
          } else if (this.getData.reputations.level == 2) {
            this.getData.reputations.levels == 中
          } else if (this.getData.reputations.level == 3) {
            this.getData.reputations.levels == 低
          } else if (this.getData.reputations.level == 0) {
            this.getData.reputations.levels == ""
          }
          if (this.getData.livingDetail.mcn_name == '') {
            this.getData.livingDetail.mcn_name = '未签约'
          }
          this.getData.livingDetail.follower_count = tools.numberVerify(this.getData.livingDetail
            .follower_count) //总粉丝数
          this.getData.livingDetail.flincr = this.getData.livingDetail.follower_incr
          if (this.getData.livingDetail.follower_incr < 0) { //粉丝增量排序升降
            this.getData.livingDetail.follower_incr = Math.abs(this.getData.livingDetail.follower_incr)
          }
          this.getData.livingDetail.follower_incr = tools.numberVerify(this.getData.livingDetail.follower_incr) //粉丝增量
          this.getData.livingDetail.total_favorited = tools.numberVerify(this.getData.livingDetail
            .total_favorited) //总点赞数
          this.getData.livingDetail.diggincr = this.getData.livingDetail.digg_incr
          if (this.getData.livingDetail.digg_incr < 0) { //点赞增量排序升降
            this.getData.livingDetail.digg_incr = Math.abs(this.getData.livingDetail.digg_incr)
          }
          this.getData.livingDetail.digg_incr = tools.numberVerify(this.getData.livingDetail.digg_incr) //点赞增量
          this.getData.livingDetail.month_live_amount = tools.numberVerify(this.getData.livingDetail
            .month_live_amount) //近30天销售额
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
          "keyword": this.goodParams.keyword,
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
          this.getData.liveGK.total_live_count = tools.numberVerify(this.getData.liveGK.total_live_count) //历史总场次
          this.getData.liveGK.avg_live_volume = tools.numberVerify(this.getData.liveGK.avg_live_volume) //近30天销量
          this.getData.liveGK.avg_live_amount = tools.numberVerify(this.getData.liveGK.avg_live_amount) //近30天销售额
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
          this.getData.videoGK.average_digg_percent = (this.getData.videoGK.average_digg_percent).toFixed(2) //
          this.getData.videoGK.history_aweme_count = tools.numberVerify(this.getData.videoGK
            .history_aweme_count) //历史总场次
          this.getData.videoGK.product_aweme_count_30 = tools.numberVerify(this.getData.videoGK
            .product_aweme_count_30) //近30天销量
          this.getData.videoGK.product_aweme_amount_30 = tools.numberVerify(this.getData.videoGK
            .product_aweme_amount_30) //近30天销售额
          this.getData.videoGK.average_digg = this.getData.videoGK.average_digg.toFixed(0)
          this.getData.videoGK.average_digg = tools.numberVerify(this.getData.videoGK.average_digg) //平均点赞
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
        if (data != undefined && data.summary != null) {
          this.getData.analysisCount = data.summary
          this.getData.analysisCount.live_count = tools.numberVerify(this.getData.analysisCount.live_count) //直播场次
          this.getData.analysisCount.live_product_count = tools.numberVerify(this.getData.analysisCount
            .live_product_count) //带货场次
          this.getData.analysisCount.total_volume = tools.numberVerify(this.getData.analysisCount.total_volume) //总销量
          this.getData.analysisCount.total_amount = tools.numberVerify(this.getData.analysisCount.total_amount) //总销售额
          this.getData.analysisCount.product_size = tools.numberVerify(this.getData.analysisCount.product_size) //上架商品
          this.getData.analysisCount.avg_volume = tools.numberVerify(this.getData.analysisCount.avg_volume) //场均销量
          this.getData.analysisCount.avg_amount = tools.numberVerify(this.getData.analysisCount.avg_amount) //场均销售额
          this.getData.analysisCount.avg_uv = Number(this.getData.analysisCount.avg_uv).toFixed(2); //场均UI价值
          this.getData.analysisCount.day_avg_volume = tools.numberVerify(this.getData.analysisCount
            .day_avg_volume) //日均销量
          this.getData.analysisCount.day_avg_amount = tools.numberVerify(this.getData.analysisCount
            .day_avg_amount) //日均销售额
          this.getData.analysisCount.day_avg_uv = Number(this.getData.analysisCount.day_avg_uv).toFixed(2) //日均UI价值

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
          this.getData.livePromote.forEach((item) => {
            item.amount = Number(item.amount).toFixed(2); //销售额
            item.amount = tools.numberVerify(item.amount)
            item.avg_convert_rate = Number(item.avg_convert_rate).toFixed(2); //平均转化率
            item.avg_price = Number(item.avg_price).toFixed(2); //均价
            item.volume = tools.numberVerify(item.volume) //销量
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
          this.getData.videoList.forEach((item) => {
            item.total_amount = Number(item.total_amount).toFixed(1)
            item.aweme_create_time = tools.time_cycle(1, item.aweme_create_time)
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
      //点击省市
      tapMap(index) {
        this.val.mapIndex = index
        if (index == 1) {
          this.proCity = this.territory
        } else {
          this.proCity = this.citys
        }
      },
      //获取粉丝地域分布
      async getFansData() {
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
          let listX = [];
          let listY = []
          this.fansAnaly.forEach((item) => {
            listX.push(item.title + '岁')
            listY.push(item.rate.toFixed(2))
          })

          var chartDom = document.getElementById('age')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            color: ['#FFBD76'],
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 40,
              right: 20,
              left: 0,
              bottom: 0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              // data: lists.name
              data: listX
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              // data: lists.value,
              data: listY,
              type: 'bar',
              barWidth: 20
            }]
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
        if (data != undefined) {
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
            item.date = tools.time_cycle(5, item.date)
            item.date = item.date.replace('-', '/')
            dates.push(item.date)
            hourList.push(item.total_user)
          })
          this.$nextTick(() => {
            this.chartData.livingData.dataX = dates
            this.chartData.livingData.dataY = hourList
          })
        }
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
            item.rates = ((item.rate / num) * 100).toFixed(2)
            //item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate,
            })
          })
          this.chartData.goodBrandData.name = '销量最佳品牌TOP5'
          this.chartData.goodBrandData.color = ['#FEE3CC', '#FFAE66', '#FF7612', '#FF3E34', '#DD001B'],
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
            item.rates = ((item.rate / num) * 100).toFixed(2)
            //item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate
            })
          })
          this.chartData.brandData.name = '最常推广品牌TOP5'
          this.chartData.brandData.color = ['#FEE3CC', '#FFAE66', '#FF7612', '#FF3E34', '#DD001B']

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
            item.rates = ((item.rate / num) * 100).toFixed(2)
            // item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate
            })
          })

          this.chartData.goodClassData.name = '销量最佳品类TOP5'
          this.chartData.goodClassData.color = ['#FEE3CC', '#FFAE66', '#FF7612', '#FF3E34', '#DD001B'],
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
            item.rates = ((item.rate / num) * 100).toFixed(2)
            //item.rate=item.rate.toFixed(2)
            list.push({
              name: item.title,
              value: item.rate
            })
          })
          this.chartData.classData.name = '最常推广品类TOP5'
          this.chartData.classData.color = ['#FEE3CC', '#FFAE66', '#FF7612', '#FF3E34', '#DD001B'],

            this.chartData.classData.data = list
        }
      },
      videoSummaryChange(summary) {
        this.videoSummary = summary || {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './talentShow.scss';
</style>
