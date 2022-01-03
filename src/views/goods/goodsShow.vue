<template>
  <div style="margin: 0px auto;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction goods-show">
      <div class="flex rdx-font-14 rdx-p-t-12 rdx-p-b-12 aligin-center rdx-line-height-30">
        <i class="iconfont icon-e614 rdx-m-r-4"></i>
        <span><a href="/goods/goods_search">商品</a></span>
        <i class="iconfont icon-e616"></i>
        <span class="color-content">商品详情</span>
      </div>
      <div class="flex new-top-box justify-between">
        <img :src="getData.info.image" style="width: 240px; height: 300px;" >
        <div class="flex w-100 justify-between rdx-p-l-30">
          <div class="flex flex-direction" style="min-width: 500px;">
            <div class="rdx-font-20">{{getData.info.title}}</div>
            <div class="flex rdx-p-l-16 rdx-p-t-6" v-if="getData.info.shop_name != undefined ">
              <div class="rdx-primary-bg rdx-radius-20 rdx-light-color flex align-center justify-center" style="width: 18px; height: 18px;">
                <i class="iconfont icon-e610 rdx-font-10"></i>
              </div>
              <span class="rdx-font-14 rdx-tips-color rdx-p-l-4">{{getData.info.shop_name}}</span>
            </div>
            <div class="flex rdx-p-l-16 rdx-m-t-80">
              <div class="flex rdx-flex-3">价值</div>
              <div class="flex rdx-flex-9 rdx-primary rdx-font-18 align-center">￥{{getData.info.price}} <i class="line-through rdx-tips-color rdx-font-14 rdx-p-l-4">￥{{getData.info.market_price}}</i></div>
            </div>
            <div class="flex rdx-p-l-16 rdx-m-t-10">
              <div class="flex rdx-flex-3">佣金</div>
              <div class="flex rdx-flex-9 rdx-primary rdx-font-18">{{getData.info.commission_rate}}%约￥{{getData.info.remain_count}}</div>
            </div>
            <div class="flex rdx-p-l-16 rdx-m-t-10">
              <div class="flex rdx-flex-3">最低价</div>
              <div class="flex rdx-flex-9 rdx-primary rdx-font-18">
                <span v-if="show.zsShow" class=" rdx-font-14 rdx-main-color">￥{{getData.info.min_price}}</span>
                <span v-if="!show.zsShow"
                  class="rdx-light-color rdx-font-14 rdx-primary-bg rdx-radius-4 rdx-p-t-2 rdx-p-b-2 rdx-p-l-16 rdx-p-r-16 button-all-all"
                  @click="clickCk">查看</span>
              </div>
            </div>
            <div class="flex rdx-p-l-16 rdx-m-t-10 rdx-tips-color link-primary" @click="linkGo('1')">想要高佣金？</div>
            <div class="flex rdx-p-l-16 rdx-m-t-10 color-old button-a" @click="linkGo('2')">查看行业趋势＞</div>
          </div>
          <div class="flex flex-direction w-60 position-re">
            <div class="position-ab goods-copy-button" style="left: 0%; margin: 6px 0px 0px 0px;" @click="copy(getData.info.title)">复制</div>
            <div class="flex align-center justify-end">
              <div class="rdx-font-14 rdx-tips-color rdx-p-r-10">数据更新于 {{getData.info.crawl_time}}</div>
              <el-tooltip class="item" effect="dark" content="复制标题" placement="top">
                <div class="tag flex align-center justify-center" @click="copyUrl">
                  <i class="iconfont icon-e781"></i>
                </div>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="收藏" placement="top" v-if="!show.favoriteYes">
                <div class="flex align-center justify-center rdx-m-l-10" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavorite(getData.info.id)">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="top" v-if="show.favoriteYes">
                <div class="flex align-center justify-center rdx-m-l-10" :class="show.favoriteYes ? 'tag-is' : 'tag'" @click="onFavoriteNot(getData.info.id)">
                  <i class="iconfont icon-e629"></i>
                </div>
              </el-tooltip>
            </div>
            <div class="flex rdx-m-t-80 rdx-p-t-50 justify-end">
              <div class="flex justify-center flex-direction align-center">
                <span class="rdx-font-18">{{getData.info.pv_count}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-line-height-30">30天浏览量</span>
                <div class="flex rdx-m-t-14">
                  <span class="new-top-tips rdx-font-14 rdx-line-height-24 rdx-p-lr-8">30天带货视频 <i style="color: #FF9846;"> {{getData.info.video_count}} </i> 个</span>
                </div>
              </div>
              <div class="flex justify-center flex-direction align-center" style="padding-left: 130px;">
                <span class="rdx-font-18">{{getData.info.order_count}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-line-height-30">30天订单数</span>
                <div class="flex rdx-m-t-14">
                  <span class="new-top-tips rdx-font-14 rdx-line-height-24 rdx-p-lr-8">30天带货直播 <i style="color: #FF9846;"> {{getData.info.live_count}} </i> 场</span>
                </div>
              </div>
              <div class="flex justify-center flex-direction align-center" style="padding-left: 130px;">
                <span class="rdx-font-18">{{getData.info.month_conversion_rate}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-line-height-30">30天转化率</span>
                <div class="flex rdx-m-t-14">
                  <span class="new-top-tips rdx-font-14 rdx-line-height-24 rdx-p-lr-8">30天热推达人 <i style="color: #FF9846;"> {{getData.info.live_count + getData.info.user_count}} </i> 人</span>
                </div>
              </div>
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
            <i class="iconfont icon-e634 rdx-m-r-8" :class="show.tabIndex == '2' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '2' ? 'rdx-primary' : ''">达人分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('3')">
            <i class="iconfont icon-e621 rdx-m-r-8" :class="show.tabIndex == '3' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '3' ? 'rdx-primary' : ''">直播分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('4')">
            <i class="iconfont icon-e61b rdx-m-r-8"
              :class="show.tabIndex == '4' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '4' ? 'rdx-primary' : ''">视频分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('5')">
            <i class="iconfont icon-e6de rdx-m-r-8"
              :class="show.tabIndex == '5' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '5' ? 'rdx-primary' : ''">观众分析</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 1">
          <div class="item-bg flex flex-direction">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-28">
              <span class="tips"></span>
              <span class="rdx-font-20">在线流量分析</span>
            </div>
            <div class="flex rdx-m-t-28 justify-between">
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.total_volume}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估总销量(件)</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.live_volume}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估直播销量(件)</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.aweme_volume}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估视频销量(件)</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.total_amount}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估销售额</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.live_amount}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估直播销售额</span>
              </div>
              <div class="flex flex-direction align-center">
                <span class="rdx-font-22">{{getData.general.aweme_amount}}</span>
                <span class="rdx-font-14 rdx-tips-color rdx-p-t-6">预估视频销售额</span>
              </div>
            </div>
            <div class="flex justify-between rdx-m-t-70">
              <div class="flex rdx-flex-1 rdx-p-r-80 flex-direction">
                <div class="flex align-center">
                  <span class="tips"></span>
                  <span class="rdx-font-20">热推达人分析</span>
                </div>
                <div class="flex position-re w-100">
                  <div v-if="!show.dataShow" id="talent" style="width: 100%; height: 300px;margin-left: -10px;"></div>
                  <no-data marginTop="0" class="flex flex-direction  justify-center align-center"
                    style="width: 100%; height: 300px;" v-if="show.dataShow"></no-data>
                </div>
              </div>
              <div class="flex rdx-flex-1 rdx-p-l-80 flex-direction">
                <div class="flex align-center">
                  <span class="tips"></span>
                  <span class="rdx-font-20">每日视频/传播趋势</span>
                </div>
                <div class="flex position-re w-100">
                  <div v-if="!show.dataShow" id="video" style="width: 100%; height: 300px;margin-left: -10px;"></div>
                  <no-data marginTop="0" class="flex flex-direction w-100 justify-center align-center"
                    style=" height: 300px;" v-if="show.dataShow"></no-data>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-70">
              <span class="tips"></span>
              <span class="rdx-font-20">抖音销量趋势</span>
            </div>
            <div class="flex">
              <div id="goodOrder" style="width: 100%; height: 350px;"></div>
            </div>
            <div class="order-box rdx-p-t-50 flex flex-direction rdx-content-color rdx-font-14">
              <ul class="flex rdx-line-height-34 rdx-m-b-8 " style="background-color: #f8f8f8;">
                <li class="width-16">日期</li>
                <li class="width-14">抖音销量</li>
                <li class="width-14">抖音商品浏览量</li>
                <li class="width-14">转化率(%)</li>
                <li class="width-14">视频个数</li>
                <li class="width-14">直播个数</li>
                <li class="width-14">热推达人数</li>
              </ul>

              <ul class="flex rdx-line-height-40 line-bottom" v-for="(item,i1) in dyTotalOrder" :key="i1">
                <li class="width-16">区间总计</li>
                <li class="width-14">{{item.order_count}}</li>
                <li class="width-14">{{item.pv_count}}</li>
                <li class="width-14">{{item.douyin_conversion_rate}}%</li>
                <li class="width-14">{{item.day_aweme_count}}</li>
                <li class="width-14">{{item.room_count}}</li>
                <li class="width-14">{{item.author_count}}</li>
              </ul>
              <no-data class="flex flex-direction w-100 justify-center align-center"
                v-if="dyOrderData == ''"></no-data>
              <ul class="flex rdx-line-height-40 line-bottom" v-for="(item,i2) in dyOrderData" :key="i2">
                <li class="width-16">{{item.date_time}}</li>
                <li class="width-14">{{item.order_count}}</li>
                <li class="width-14">{{item.pv_count}}</li>
                <li class="width-14">{{item.douyin_conversion_rate}}%</li>
                <li class="width-14">{{item.day_aweme_count}}</li>
                <li class="width-14">{{item.room_count}}</li>
                <li class="width-14">{{item.author_count}}</li>
              </ul>
              <div class="block" v-if="dyOrderTotal!=''">
                <el-pagination background :total="dyOrderTotal" :page-size="dyOrderParams.size"
                  :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleDyOrderSizeChange" @current-change="handleDyOrderCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">达人概览</span>
            </div>
            <div class="flex rdx-m-t-40">
              <div class="flex rdx-flex-5 position-re" style="padding-right: 160px;">
                <div class="rdx-font-14 position-ab" style="top: 0px;">销量Top3达人</div>
                <div id="sales" style="width: 100%; height: 290px;"></div>
              </div>
              <div class="flex rdx-flex-7 flex-direction">
                <span class="rdx-font-14">直播Top3达人</span>
                <div class="flex" style="min-height: 84px;">
                  <div class="new-top-tips rdx-font-14 rdx-m-t-20 rdx-line-height-32 rdx-p-lr-10 rdx-m-r-20" style="color: #6B3613; height: 32px;" v-for="(item,indexA) in livesales" :key="item.title">{{item.title}}<span class="rdx-p-l-20">{{item.rate}}%</span></div>
                  <span class="flex flex-direction w-100 justify-center align-center rdx-tips-color rdx-line-height-50"
                    v-if="livesales == ''">暂无数据</span>
                </div>
                <span class="rdx-font-14">视频Top3达人</span>
                <div class="flex">
                  <div class="new-top-tips rdx-font-14 rdx-m-t-20 rdx-line-height-32 rdx-p-lr-10 rdx-m-r-20" style="color: #6B3613; height: 32px;" v-for="(item,indexS) in videosales" :key="item.title">{{item.title}}<span class="rdx-p-l-20">{{item.rate}}%</span></div>
                  <span class="flex flex-direction w-100 justify-center align-center rdx-tips-color rdx-line-height-50"
                    v-if="videosales == ''">暂无数据</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-50">
              <span class="tips"></span>
              <span class="rdx-font-20">达人列表</span>
            </div>
            <div class="select-box">
              <span class="name" style="margin-top: 1px;">商品分类：</span>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="rdx-m-l-6" :key="category.name" v-for="category in telentCategory"
                  :class="['select-item', talentParams.category === category.name ? 'active' : '']"
                  @click="handleTalentCate(category.name)">
                  {{ category.name }}
                </div>
              </div>
            </div>
            <div class="select-box">
              <span class="name" style="margin-top: 1px;">粉丝：</span>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="rdx-m-r-10" :key="follow.key" v-for="(follow) in followCate"
                  :class="['select-item', talentParams.followerCount == follow.key ? 'active' : '']"
                  @click="handleFollowCate(follow.key)">
                  {{ follow.value }}
                </div>
              </div>
            </div>
            <div class="select-box">
              <span class="name">口碑：</span>
              <div class="select-item rdx-m-r-12" :class="talentParams.reputationLevel == '-1' ? 'active' : ''"
                @click="handleReputationCate('-1')">全部</div>
              <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
                <div class="select-item rdx-m-r-12" :class="talentParams.reputationLevel == index ? 'active' : ''"
                  v-for="(item,indexB) in reputationCate" :key="item.id" @click="handleReputationCate(indexB,item.id)">
                  {{item.name}} ({{ item.value }})
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <search-item @clickKey='clickTalentKey' searchType="4" searchWidth="365"></search-item>
            </div>
            <el-table :data="talentList" @sort-change="handlesortTalent">
              <template slot="empty">
                <no-data marginTop="0" class="rdx-p-t-30"></no-data>
              </template>
              <el-table-column prop="nickname" label="达人">
                <template slot-scope="{ row }">
                  <div style="padding: 10px 0 ;">{{row.nickname}}</div>
                </template>
              </el-table-column>
              <el-table-column sortable="custom" prop="following_count" label="粉丝数" width="120" align="center">
              </el-table-column>
              <el-table-column sortable="custom" prop="score" label="带货口碑" align="center" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="total_product_num" label="推广商品数" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="" label="关联人数" align="center" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="room_count" label="关联直播" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="volume" label="预估销量(件)" width="120" align="center">
              </el-table-column>
              <el-table-column sortable="custom" prop="amount" label="预估销售额" width="120" align="center">
              </el-table-column>
            </el-table>
            <div class="block flex justify-center rdx-p-tb-20" v-if="talentList!=''" style="margin-bottom: -20px;">
              <el-pagination background :total="talentTotal" :page-size="talentParams.size"
                :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleTalentSizeChange" @current-change="handleTalentCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 3">
          <div class="item-bg flex flex-direction">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
              <span class="tips"></span>
              <span class="rdx-font-20">直播销量趋势</span>
            </div>
            <div class="flex position-re">
              <div id="live" style="width: 100%; height: 350px;"></div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
              <span class="tips"></span>
              <span class="rdx-font-20">直播记录</span>
            </div>
            <div class="flex position-re justify-end">
              <search-item @clickKey='clickGoodsLiveKey' searchType="1" searchWidth="365" searchPlaceholder="请输入商品标题">
              </search-item>
            </div>
            <el-table :data="getData.liveRecord" @sort-change="handlesortGoodLive">
              <template slot="empty">
                <no-data marginTop="0" class="rdx-p-t-30"></no-data>
              </template>
              <el-table-column label="直播">
                <template slot-scope="scope">
                  <div class="info rdx-flex rdx-line-1">
                    <img :src="scope.row.live_cover"
                      style="width: 62px;height: 62px;border-radius: 4px;min-width: 62px;" />
                    <div class="flex flex-direction rdx-flex-col rdx-m-l-10 ">
                      <div class="rdx-flex rdx-flex-wrap">
                        <span class="rdx-m-r-4" style="">{{scope.row.room_title}}</span>
                      </div>
                      <span>{{scope.row.begin_time}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="达人">
                <template slot-scope="scope">
                  <div class="info rdx-flex rdx-line-1">
                    <img :src="scope.row.avatar" style="width: 62px;height: 62px;border-radius: 50%;" />
                    <div class="rdx-flex-col rdx-m-l-10">
                      <div class="rdx-flex rdx-flex-wrap">
                        <span class="name rdx-m-r-4">{{scope.row.nickname}}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="room_finish_time" label="讲解时长" width="120" align="center"></el-table-column>
              <el-table-column prop="live_price" label="直播间售价" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="volume" label="销量(件)" align="center" width="120"></el-table-column>
              <el-table-column sortable="custom" prop="amount" label="销售额(元)" align="center" width="120"></el-table-column>
              <el-table-column prop="click_percent" label="点击率" width="100" align="center"></el-table-column>
              <el-table-column prop="caozuo" label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <div class="flex w-100 justify-center">
                    <el-tooltip effect="dark" content="商品详情" placement="bottom">
                       <span class="tiktok-buttonA flex align-center justify-center">
                         <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
                       </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block flex justify-center rdx-p-tb-20" v-if="getData.liveRecord != ''">
              <el-pagination background :total="liveTotal" :page-size="liveParams.size" :page-sizes="[10, 20, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleLiveSizeChange"
                @current-change="handleLiveCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 4">
          <div class="item-bg flex flex-direction">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36 rdx-m-b-36">
              <span class="tips"></span>
              <span class="rdx-font-20">视频销量趋势</span>
            </div>
            <div class="flex position-re">
              <div id="videoOrder" style="width: 100%; height: 350px;"></div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <el-radio-group class="rdx-m-t-10" v-model="val.time" size="mini" @change="changeTime">
              <el-radio-button label="1">7天</el-radio-button>
              <el-radio-button label="2">15天</el-radio-button>
              <el-radio-button label="3">30天</el-radio-button>
              <el-radio-button label="4">90天</el-radio-button>
              <el-radio-button label="5">180天</el-radio-button>
            </el-radio-group>
            <div class="flex align-center rdx-m-t-36">
              <span class="tips"></span>
              <span class="rdx-font-20">视频记录</span>
            </div>
            <div class="flex justify-end">
              <search-item @clickKey='clickVideoKey' searchType="2" searchWidth="420" searchPlaceholder="请输入商品标题">
              </search-item>
            </div>
            <el-table :data="awemeList" @sort-change="handlesortVideo">
              <template slot="empty">
                <no-data marginTop="0" class="rdx-p-t-30"></no-data>
              </template>
              <el-table-column label="视频" min-width="220" width="300">
                <template slot-scope="scope">
                  <div class="info rdx-flex">
                    <div>
                      <img :src="scope.row.aweme_cover" class="rdx-radius-10"
                        onerror="javascript:this.src='http://douyin.guanxingshu.com/img/no_img.png'"
                        style="width: 60px;height: 60px;min-width: 60px;" @click="jumAweme(scope.row.aweme_id)" />
                    </div>
                    <div class="rdx-line-2 rdx-m-l-10" style="width: 200px;" @click="jumAweme(scope.row.aweme_id)">
                      {{scope.row.aweme_title}}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="nickname" label="达人" min-width="240">
                <template slot-scope="scope">
                  <div class="info rdx-flex align-center">
                    <div>
                      <img :src="scope.row.avatar" class="round" style="width: 30px;height: 30px;min-width: 30px;"
                        @click="jumTal(scope.row.author_id)" />
                    </div>
                    <div class="rdx-line-1 rdx-m-l-10" style="width: 200px;" @click="jumTal(scope.row.author_id)">
                      {{scope.row.nickname}}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column sortable="custom" prop="aweme_create_time" label="发布时间" align="center" width="160">
              </el-table-column>
              <el-table-column sortable="custom" prop="amount" label="预估销量(件)" align="center" width="140">
              </el-table-column>
              <el-table-column sortable="custom" prop="volume" label="预估销售额(元)" width="140" align="center">
              </el-table-column>
              <el-table-column sortable="custom" prop="digg_count" label="点赞" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="comment_count" label="评论" align="center" width="120">
              </el-table-column>
              <el-table-column sortable="custom" prop="forward_count" label="转发" align="center" width="120">
              </el-table-column>
            </el-table>
            <div class="block flex rdx-p-tb-20 justify-center" v-if="videoTotal != 0">
              <el-pagination background :total="videoTotal" :page-size="videoParams.size" :page-sizes="[5, 10, 20]"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleVideoSizeChange"
                @current-change="handleVideoCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 5">
          <div class="item-bg flex flex-direction">
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
                    <div class="man position-re">
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
                    <map-chart :roomId="roomId"></map-chart>
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
          <div class="item-bg flex flex-direction rdx-m-t-20" style="padding: 20px 0px;">
            <div class="flex align-center rdx-p-lr-30">
              <span class="tips"></span>
              <span class="rdx-font-20">热门视频评论Top30</span>
            </div>
            <div class="flex rdx-p-lr-10 rdx-m-t-30 flex-wrap">
              <div class="flex w-50 rdx-p-l-10 rdx-p-b-20" v-for="(item,i6) in hotComments" :key="i6">
                <div class="flex w-100 rdx-m-l-20 rdx-m-b-20">
                  <img :src="item.aweme_cover" style="width: 57px; height: 70px;" onerror="javascript:this.src='http://douyin.guanxingshu.com/img/no_img_2.png'">
                  <div class="flex rdx-flex-1 justify-between rdx-p-l-10 align-center">
                    <div class="flex flex-direction justify-center rdx-flex-1">
                      <div class="flex rdx-font-12 rdx-p-r-10 rdx-tips-color rdx-line-1">{{item.aweme_title}}</div>
                      <div class="flex align-center rdx-p-b-8 rdx-p-t-4 rdx-p-lr-8 justify-between rdx-m-t-4" style="background-color: #FAFAFA;">
                        <div class="flex align-center">
                          <div class="flex color-old flex-direction align-center">
                            <i class="iconfont icon-e815 rdx-font-24"></i>
                            <span class="rdx-font-12">{{item.comment_digg_count}}</span>
                          </div>
                          <div class="flex rdx-font-12 rdx-line-1 rdx-p-l-20" style="width: 380px;">{{item.text}}</div>
                        </div>
                        <div class="copy-video2 button-a rdx-m-r-10" @click="copy(item.text)">复制</div>
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
    <top-up></top-up>
  </div>
</template>

<script>
  import topUp from '@/components/toUp.vue'
  import {
    goodsGeneralUrl,
    liveRoomUrl,
    hotCommentsUrl,
    fansDataUrl
  } from '@/api'
  import goodsClass from '../../components/goodsClass.vue'
  import searchItem from '@/components/searchItem.vue'
  import * as tools from '@/common/tools.js';
  import noData from '../../components/noData.vue'
  import top from '@/layout/components/Top.vue'
  import mapChart from './components/mapChart.vue'
  export default {
    components: {
      searchItem,
      goodsClass,
      noData,
      top,mapChart,topUp
    },
    data() {
      return {
        getData: {
          info: "", //商品信息
          general: "", //商品概况
          reputat: -1,
          follows: '',
          talent: '',
        },
        val: {
          time: "1", //时间段
          timeBengin: "", //开始时间
          timeEnd: "", //结束时间
          mapIndex:'1'
        },
        params: {
          productCategory: '',
        },
        hotComments: [], //商品热门评论数据
        fansage: [],
        territory: [],
        maxterr: [],
        male: '',
        faMale: '',
        drtotal: [], //达人销量
        videosales: [], //视频销量
        livesales: [], //直播销量
        talentList: [],
        telentCategory: [], //达人列表 商品分类
        endDate: '',
        startDate: '',
        cityVal: "1", //省市
        talentCate: [],
        followCate: [],
        reputationCate: [],
        liveTotal: 0,
        videoTotal: 0,
        dyOrderTotal: 0,
        talentTotal: 0,
        hotPush: [],
        dayVideo: [],
        liveCur: [],
        dyOrderCur: [],
        videoCur: [],
        promotionId: '', //商品Id,
        totalIncr: [],
        totalNum: [],
        show: {
          tabIndex: '',
          tabIndexs: '',
          dataShow: false, //图表是否显示
          dataShowS: false, //图表是否显示
          dataShowA: false, //图表是否显示
          dataShowB: false, //图表是否显示
          dataShowC: false, //图表是否显示
          favoriteYes: false, //收藏显示
          zsShow: false, //查看最低价状态
          tabIndex:'1'
        },
        liveParams: {
          page: 1,
          size: 10
        },
        dyOrderParams: {
          page: 1,
          size: 10
        },
        comParams: {
          page: 1,
          size: 10
        },
        talentParams: {
          page: 1,
          size: 10,
          reputationLevel: '-1',
          followerCount: '',
          category: '全部',
          keyword: '',
        },
        videoParams: {
          page: 1,
          size: 5,
          sort: '',
          order: '',
        },
        awemeList: [],
        comTotal: 0,
        dyOrderData: [],
        goodsLabel: [],
        talentKeyWord: '',
        videoKeyWord: '',
        dyTotalOrder: [], //抖音订单总计数据
        genders: [],
        citys: [],
        proCity: [],
        fansAnaly: [] ,//年龄图标数据
        roomId:''
      }
    },
    mounted() {
      this.promotionId = this.$route.query.id,
      this.roomId = this.$route.query.id
        this.getInfo()
      this.initialTime()
      this.getTalent()
      this.getVideo()
      this.getSales()
      this.getLive()
      this.getVideoOrder()
      this.getGeneral()
      this.getLiveRoom()
      this.getHotComments()
      this.getFansData()
      this.getAwemeLive()
      this.getDaren()
      this.getAwemeList()
      this.getDyOrder()
      this.getOrderChart()
      this.getFollow()
      this.isFavorite()
      // this.drawregionCharts()

    },
    methods: {
      //复制网址
      copyUrl(){
        var url = window.location.href
        tools.copy(url)
      },
      //跳转链接
      linkGo(type){
        if(type == 1){
          this.$router.push({path:'/promotion/index'})
        }else{
          this.$router.push({path:'/goods/goods_search'})
        }
      },
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
        // document.documentElement.scrollTop = 0
        this.getAll()
      },
      //跳转视频详情
      jumAweme(id) {
        this.$router.push({
          path: "/video/video_detail",
          query: {
            id: id
          }
        })
      },
      //跳转达人详情
      jumTal(id) {
        this.$router.push({
          path: "/talent/talent_detail",
          query: {
            id: id
          }
        })
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
      //最低价查看切换
      clickCk() {
        this.show.zsShow = true
      },
      //判断是否已收藏
      async isFavorite() {
        var favorite = {
          collectId: this.promotionId,
          collectType: 2
        }
        const data = await this.$get('/api/user/user_collection/query_is_collect', favorite)
        if (data.data > 0) {
          this.show.favoriteYes = true
        } else {
          this.show.favoriteYes = false
        }
      },
      //取消收藏
      async onFavoriteNot(id) {
        if (this.show.favoriteYes = true) {
          var favoriteParam = {
            collectId: this.promotionId,
            collectType: 2 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
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
      async onFavorite(id) {
        var favoriteParam = {
          dataId: this.promotionId,
          collectType: 2 //收藏类型(1 达人 ， 2 商品 ， 3 视频 ，4 小店)
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
      //获取商品信息
      async getInfo() {
        var param = {
          "promotionId": this.promotionId
        }
        const {
          data
        } = await this.$get('/api/detail/product/info', param)
        if (data != undefined) {
          this.getData.info = data.product
          //this.goodsLabel = data.product.v2_category
          if (this.getData.info.crawl_time != 0) {
            this.getData.info.crawl_time = tools.time_cycle(1, this.getData.info.crawl_time)
          } else {
            this.getData.info.crawl_time = '--'
          }
          this.getData.info.month_conversion_rate = this.getData.info.month_conversion_rate.toFixed(1) + '%' //30天转化率
          this.getData.info.pv_count = tools.numberVerify(this.getData.info.pv_count) //30天浏览量
          this.getData.info.order_count = tools.numberVerify(this.getData.info.order_count) //30天订单数
        }
      },
      //获取商品概况
      async getGeneral() {
        this.getData.general = []
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get(goodsGeneralUrl, param)
        if (data != undefined) {
          this.getData.general = data
          this.getData.general.total_volume = tools.numberVerify(this.getData.general.total_volume) // 预估总销量
          this.getData.general.live_volume = tools.numberVerify(this.getData.general.live_volume) // 预估直播销量
          this.getData.general.aweme_volume = tools.numberVerify(this.getData.general.aweme_volume) // 预估视频销量
          this.getData.general.total_amount = tools.numberVerify(this.getData.general.total_amount) // 预估销售额
          this.getData.general.live_amount = tools.numberVerify(this.getData.general.live_amount) // 预估直播销售额
          this.getData.general.aweme_amount = tools.numberVerify(this.getData.general.aweme_amount) // 预估视频销售额
        }
      },

      //获取商品直播记录
      async getLiveRoom() {
        this.getData.liveRecord = []
        this.show.dataShowA = false
        var param = {
          "promotionId": this.$route.query.id,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "page": this.liveParams.page,
          "size": this.liveParams.size,
          "keyword": this.liveParams.keyword,
          "sort": this.liveParams.sort,
          "order": this.liveParams.order,
        }
        const {
          data
        } = await this.$get(liveRoomUrl, param)
        if (data != undefined) {
          this.getData.liveRecord = data.list
          for (let i = 0; i < this.getData.liveRecord.length; i++) {
            this.getData.liveRecord[i].room_finish_time = this.calculateDiffTime(this.getData.liveRecord[i]
              .begin_time,
              this.getData.liveRecord[i].room_finish_time)
            let uniTimestamp = new Date(this.getData.liveRecord[i].begin_time * 1000)
            this.getData.liveRecord[i].begin_time = this.getYMDHMS(uniTimestamp)
          }
          this.liveTotal = data.page_info && data.page_info.total //分页
        } else {
          this.show.dataShowA = true
        }
      },

      //获取商品热门评论
      async getHotComments() {
        this.hotComments = []
        this.show.dataShowB = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "page": this.comParams.page,
          "size": this.comParams.size,
          "testData": 'T',
        }
        const {
          data
        } = await this.$get(hotCommentsUrl, param)
        console.log('d7sa89d79', data)
        if (data.list != undefined) {
          this.hotComments = data.list
          this.comTotal = data.page_info && data.page_info.total //分页
        } else {
          this.show.dataShowB = true
        }
      },
      //获取商品热门分页数据
      handleCommonSizeChange(val) {
        this.comParams.page = 1
        this.comParams.size = val
        this.getHotComments()
      },
      handleCommonCurrentChange(val) {
        this.comParams.page = val
        this.getHotComments()
      },
      //获取粉丝地域分布
      async getFansData() {
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get(fansDataUrl, param)
        console.log('粉丝分析sd', data)
        if (data != undefined) {
          this.territory = data.province
          this.citys = data.city
          this.genders = data.gender
          if (this.genders != null) {
            this.male = this.genders.male.toFixed(2)
            this.faMale = this.genders.female.toFixed(2)
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
          let Xdata = [];
          let Ydata = []
          this.fansAnaly.forEach((item) => {
            Xdata.push(item.title + '岁')
            Ydata.push(item.rate)
          })

          var chartDom = document.getElementById('age')
          var myChart = this.$echarts.init(chartDom)
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              formatter: '{a} <br/>{b} : {c}%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            grid: {
              top: 25,
              bottom: 3,
              left: 0,
              right: 0,
              containLabel: true,
            },
            xAxis: [{
              type: 'category',
              data: Xdata,
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '年龄占比',
              type: 'bar',
              itemStyle: {
                color: "#FF7612",
              },
              barWidth: '60%',
              data: Ydata
            }]
          })
        }

      },
      //获取视频和直播销量
      async getAwemeLive() {
        this.videosales = []
        this.livesales = []
        var param = {
          promotionId: this.promotionId,
          startDate: this.startDate,
          endDate: this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/author/pie/charts', param)
        if (data != undefined) {
          this.videosales = data.aweme
          this.videosales.forEach((item) => {
            if(item.rate == 'NaN'){
              item.rate = '0'
            }else{
              item.rate = item.rate.toFixed(2)
            }
          })
          this.livesales = data.live
          this.livesales.forEach((item) => {
            item.rate = item.rate.toFixed(2)
          })
        }
      },

      //获取达人列表
      async getDaren() {
        var param = {
          "promotionId": this.$route.query.id,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "page": this.talentParams.page,
          "size": this.talentParams.size,
          "followerCount": this.talentParams.followerCount,
          "reputationLevel": this.talentParams.reputationLevel,
          "category": this.talentParams.category,
          "keyword": this.talentParams.keyword,
          "sort": this.talentParams.sort,
          "order": this.talentParams.order,
        }
        const {
          data
        } = await this.$get('/api/detail/product/author/analysis', param)
        if (data != undefined) {
          this.talentList = data.list
          this.talentList.forEach((item) => {
            item.following_count = tools.numberVerify(item.following_count)
          })
          this.reputationCate = data.reputation_filter
          this.telentCategory = data.category
          this.telentCategory.unshift({
            id: '-1',
            name: "全部"
          })
          this.talentTotal = data.page_Info.total
        }
      },

      //达人关键词搜索
      clickTalentKey(val) {
        this.talentParams.keyword = val
        this.getDaren()
      },
      //商品直播记录关键词
      clickGoodsLiveKey(val) {
        this.liveParams.keyword = val
        this.getLiveRoom()
      },
      //视频搜索关键词搜索
      clickVideoKey(val) {
        this.videoParams.keyword = val
        this.getAwemeList()
      },
      //获取达人分页数据
      handleTalentSizeChange(val) {
        this.talentParams.page = 1
        this.talentParams.size = val
        this.getDaren()
      },
      handleTalentCurrentChange(val) {
        this.talentParams.page = val
        this.getDaren()
      },
      //达人列表升序和降序
      handlesortTalent(column) {
        if (column.order === "descending") {
          this.talentParams.order = 'desc'
          this.talentParams.sort = column.prop
        } else {
          this.talentParams.order = 'asc'
          this.talentParams.sort = column.prop
        }
        this.getDaren()
      },

      //获取视频分页数据
      handleVideoSizeChange(val) {
        this.videoParams.page = 1
        this.videoParams.size = val
        this.getAwemeList()
      },
      handleVideoCurrentChange(val) {
        this.videoParams = val
        this.getAwemeList()
      },
      //获取直播分页数据
      handleLiveSizeChange(val) {
        this.liveParams.page = 1
        this.liveParams.size = val
        this.getLiveRoom()
      },
      handleLiveCurrentChange(val) {
        this.liveParams.page = val
        this.getLiveRoom()
      },
      //商品直播记录升序和降序
      handlesortGoodLive(column) {
        if (column.order === "descending") {
          this.liveParams.order = 'desc'
          this.liveParams.sort = column.prop
        } else {
          this.liveParams.order = 'asc'
          this.liveParams.sort = column.prop
        }
        this.getLiveRoom()
      },

      //获取视频列表
      async getAwemeList() {
        this.awemeList = []
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "keyword": this.videoParams.keyword,
          "endDate": this.endDate,
          "page": this.videoParams.page,
          "size": this.videoParams.size,
          "sort": this.videoParams.sort,
          "order": this.videoParams.order,
        }
        const {
          data
        } = await this.$get('/api/detail/product/awemeList', param)
        console.log('paramSSS', data)
        if (data != undefined) {
          this.awemeList = data.list
          this.awemeList.forEach((item) => {
            item.aweme_create_time = tools.time_cycle(1, item.aweme_create_time) //发布时间
            item.volume = tools.numberVerify(item.volume) //预估销量
            item.amount = tools.numberVerify(item.amount) //预估销售额
            item.digg_count = tools.numberVerify(item.digg_count) //点赞
            item.comment_count = tools.numberVerify(item.comment_count) //评论
            item.forward_count = tools.numberVerify(item.forward_count) //转发
          })
          this.videoTotal = data.page_info && data.page_info.total //分页
        }
      },
      //视频列表升序和降序
      handlesortVideo(column) {
        if (column.order === "descending") {
          this.videoParams.order = 'desc'
          this.videoParams.sort = column.prop
        } else {
          this.videoParams.order = 'asc'
          this.videoParams.sort = column.prop
        }
        this.getAwemeList()
      },

      //获取抖音订单数
      async getDyOrder() {
        var param = {
          "promotionId": this.$route.query.id,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "page": this.dyOrderParams.page,
          "size": this.dyOrderParams.size
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        if (data.total != '') {
          this.dyTotalOrder = data.total
          console.log('测试222', this.dyTotalOrder)
        }
        if (data.add != '') {
          this.dyOrderData = data.add
          console.log('测试111', this.dyOrderData)
          this.dyOrderData.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
          })
        }

        // if (data.page_info != null) {
        //   this.dyOrderTotal = data.page_info && data.page_info.totalCount //分页
        // }
      },
      //获取抖音订单分页数据
      //控制条数
      handleDyOrderSizeChange(val) {
        this.dyOrderParams.page = 1
        this.dyOrderParams.size = val
        this.getDyOrder()
      },
      //控制页数
      handleDyOrderCurrentChange(val) {
        this.dyOrderParams.page = val
        this.getDyOrder()
      },

      //获取粉丝分类数据
      async getFollow() {
        const {
          data
        } = await this.$get('/api/common/searchConditions', this.params)
        if (data != undefined) {
          this.followCate = data.followers
          this.followCate.forEach((item) => {
            if (item.key == '') {
              item.value = '全部'
            }
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
        this.val.timeBengin = this.fun_date(-6).split('_')[0]
        this.val.timeEnd = this.fun_date(-6).split('_')[1]
        this.startDate = this.val.timeBengin.replace(/-/g, '')
        this.endDate = this.val.timeEnd.replace(/-/g, '')
        console.log('startDate', this.startDate, this.endDate)
      },
      //点击时间段
      changeTime(val) {
        console.log("1", val)
        if (val == 1) {
          this.val.timeBengin = this.fun_date(-7).split('_')[0]
          this.val.timeEnd = this.fun_date(-7).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 2) {
          this.val.timeBengin = this.fun_date(-15).split('_')[0]
          this.val.timeEnd = this.fun_date(-15).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 3) {
          this.val.timeBengin = this.fun_date(-30).split('_')[0]
          this.val.timeEnd = this.fun_date(-30).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 4) {
          this.val.timeBengin = this.fun_date(-90).split('_')[0]
          this.val.timeEnd = this.fun_date(-90).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        } else if (val == 5) {
          this.val.timeBengin = this.fun_date(-180).split('_')[0]
          this.val.timeEnd = this.fun_date(-180).split('_')[1]
          this.startDate = this.val.timeBengin.replace(/-/g, '')
          this.endDate = this.val.timeEnd.replace(/-/g, '')
          this.getAll()
        }
      },
      //时间戳转日期格式
      getYMDHMS(timestamp) {
        let time = new Date(timestamp)
        let month = time.getMonth() + 1
        let date = time.getDate()
        let hours = time.getHours()
        let minute = time.getMinutes()

        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minute < 10) {
          minute = '0' + minute
        }
        return month + '-' + date + ' ' + hours + ':' + minute
      },
      //获取讲解时长（时间戳相减得到时分秒）
      calculateDiffTime(startTime, endTime) {
        let timeDiff = endTime - startTime
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

      //重新加载数据
      getAll() {
        this.getTalent()
        this.getVideo()
        this.getSales()
        this.getLive()
        this.getVideoOrder()
        this.getGeneral()
        this.getLiveRoom()
        this.getHotComments()
        this.getFansData()
        this.getAwemeLive()
        this.getDaren()
        this.getOrderChart()
        this.getAwemeList()
        this.getDyOrder()
        this.getFollow()
      },

      //获取热推达人分析数据
      async getTalent() {
        this.hotPush = []
        this.totalIncr = []
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add
        this.totalNum = data.total
        if (this.totalIncr != '') {
          this.hotPush = this.totalIncr
          let list1 = [];
          let list2 = [];
          this.hotPush.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.author_count)
          })

          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('talent'));

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
              top: 30,
              bottom: 0,
              right: 20,
              left:15,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,189,118,1)'
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,1)'
                }])
              },
              name:'达人数',
              data: list2,
              symbol: "none",
              type: 'line',
              smooth: true
            }]
          });
        } else {
          this.show.dataShow = true
        }
      },
      //获取每日视频传播趋势
      async getVideo() {
        this.dayVideo = []
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add

        if (this.totalIncr != '') {
          this.dayVideo = this.totalIncr
          let list1 = [];
          let list2 = [];
          let list3 = [];
          this.dayVideo.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.room_count)
            list3.push(item.day_aweme_count)
          })

          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('video'));

          myChart.setOption({
            color: ['#FFBD76', '#51d1cb'],
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
              icon: 'roundRect',
              itemWidth: 18,
              itemHeight: 4,
              itemGap:26,
              textStyle: {
              fontSize: 12,
              color: '#999999',
              }
            },
            grid: {
              top: 30,
              bottom: 0,
              right: 20,
              left:12,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255,189,118,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                name: "直播数",
                symbol: "none",
                data: list2,
                type: 'line',
                smooth: true
              },
              {
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128,255,249,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                name: "视频数",
                symbol: "none",
                data: list3,
                type: 'line',
                smooth: true
              }
            ]
          })
        } else {
          this.show.dataShow = true
        }
      },
      //获取订单数
      async getOrderChart() {
        this.dyOrderCur = [];
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add
        if (this.totalIncr != '') {
          this.dyOrderCur = this.totalIncr
          let list1 = [];
          let list2 = [];
          let list3 = [];
          this.dyOrderCur.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.pv_count)
            list3.push(item.order_count)
          })
          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('goodOrder'))
          myChart.setOption({
            color: ['#FFBD76', '#51d1cb'],
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
              icon: 'roundRect',
              itemWidth: 18,
              itemHeight: 4,
              itemGap:26,
              textStyle: {
              fontSize: 12,
              color: '#999999',
              }
            },
            grid: {
              top: 30,
              bottom: 0,
              right: 20,
              left:0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255,189,118,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                name: '浏览量',
                symbol: "none",
                //data: [110, 180, 80, 90, 160, 180, 290],
                data: list2,
                type: 'line',
                smooth: true
              },
              {
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128,255,249,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  }])
                },
                name: '订单数',
                symbol: "none",
                //data: [130, 220, 90, 120, 200, 230, 190],
                data: list3,
                type: 'line',
                smooth: true
              }
            ]
          })
        } else {
          this.show.dataShow = true
        }

      },
      //获取销量达人
      async getSales() {
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/author/pie/charts', param)
        if (data != undefined && data != '') {
          this.drtotal = data.total
          let lists = [];
          this.drtotal.forEach((item) => {
            lists.push({
              name: item.title,
              value: item.rate.toFixed(2)
            })
          })
          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('sales'));

          myChart.setOption({
            color:['#FF0000','#FF7612','#FFB093'],
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#ffffff'
              },
              borderColor: 'rgba(0,0,0,0.7)'
            },
            legend: {
              show: true,
              top:0,
              right: 10,
              icon: 'roundRect',
              itemWidth: 18,
              itemHeight: 4,
              itemGap:26,
              textStyle: {
              fontSize: 12,
              }
            },
            series: [{
              name: '观众来源',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ["45%", "58%"],
              avoidLabelOverlap: false,
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: '#fff',
              //   borderWidth: 2
              // },
              data: lists
            }]
          })
        }
      },
      //获取直播销售量
      async getLive() {
        this.liveCur = []
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add
        if (this.totalIncr != '') {
          this.liveCur = this.totalIncr
          let list1 = [];
          let list2 = [];
          this.liveCur.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.live_volume)
          })
          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('live'));


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
            legend: {
              show: true,
              right: 10,
              top: 0,
              icon: 'roundRect',
              itemWidth: 20,
              itemHeight: 4
            },
            grid: {
              top: 40,
              bottom: 0,
              right: 20,
              left: 0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,189,118,1)'
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,1)'
                }])
              },
              data: list2,
              name: '直播销量',
              symbol: "none",
              type: 'line',
              smooth: true
            }]
          })
        } else {
          this.show.dataShow = true
        }
      },
      //粉丝分类
      handleFollowCate(id) {
        this.talentParams.followerCount = id
        this.getDaren()
      },
      //达人分类
      handleTalentCate(id) {
        this.talentParams.category = id
        this.getDaren()
      },
      //口碑
      handleReputationCate(id) {
        this.talentParams.reputationLevel = id
        this.getDaren()
      },
      //获取视频数据
      async getVideoOrder() {
        this.videoCur = []
        this.show.dataShow = false
        var param = {
          "promotionId": this.promotionId,
          "startDate": this.startDate,
          "endDate": this.endDate,
        }
        const {
          data
        } = await this.$get('/api/detail/product/dataChart', param)
        this.totalIncr = data.add
        if (this.totalIncr != '') {
          this.videoCur = this.totalIncr
          let list1 = [];
          let list2 = [];
          this.videoCur.forEach((item) => {
            item.date_time = tools.time_cycle(5, item.date_time)
            item.date_time = item.date_time.replace('-', '/')
            list1.push(item.date_time)
            list2.push(item.aweme_volume)
          })
          var echarts = require('echarts');
          let myChart = echarts.init(document.getElementById('videoOrder'));
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
            legend: {
              show: true,
              right: 10,
              top: 0,
              icon: 'roundRect',
              itemWidth: 20,
              itemHeight: 4
            },
            grid: {
              top: 40,
              bottom: 0,
              right: 20,
              left:0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list1
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,189,118,1)'
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,1)'
                }])
              },
              data: list2,
              name:'视频销量',
              symbol: "none",
              type: 'line',
              smooth: true
            }]
          })
        } else {
          this.show.dataShow = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./goodsShow.scss";

  .btn_hover:hover {
    cursor: pointer;
  }
</style>
