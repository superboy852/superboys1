<template>
  <div style="margin: 0px auto;">
    <div class="rdx-bg-color w-100">
      <top></top>
    </div>
    <div class="flex flex-direction living-show">
      <div class="flex rdx-font-14 rdx-p-t-12 rdx-p-b-12 aligin-center rdx-line-height-30">
        <i class="iconfont icon-e614 rdx-m-r-4"></i>
        <span><a href="/living/living_search">直播</a></span>
        <i class="iconfont icon-e616"></i>
        <span class="color-content">直播详情</span>
      </div>
      <div class="flex justify-between w-100">
        <div class="living-top-left flex">
          <img :src="getData.livingRoomData.live_cover" class="img">
          <div class="rdx-p-l-36 flex flex-direction rdx-flex-1 position-re">
            <strong class="rdx-font-20 link-primary"
              @click="linkAuthor(getData.livingAuthorData.author_id)">{{getData.livingRoomData.room_title}}</strong>
            <div class="flex rdx-font-14 justify-between rdx-p-t-14">
              <div class="flex">
                <img src="../../assets/imgs/living_time.png" style="width: 23px; height: 23px;">
                <span class="rdx-content-color">开播时间：{{getData.livingRoomData.begin_time}}</span>
              </div>
              <span class="rdx-content-color">下播时间：{{getData.livingRoomData.room_finish_time}}
                {{getData.livingRoomData.total_times}}</span>
              <span class="tag">总时长：{{val.timeAll}}</span>
            </div>
            <div class="position-ab flex flex-direction w-100" style="bottom: 0px; padding-right: 35px;">
              <div class="flex w-100 justify-between">
                <div class="flex flex-direction">
                  <span class="rdx-font-20">{{getData.livingRoomData.total_user}}人</span>
                  <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">观看人次</span>
                  <span class="rdx-font-14">超过当日<i
                      class="color-content">{{getData.livingRoomData.total_user_rate}}%</i>的直播</span>
                </div>
                <div class="flex flex-direction">
                  <span class="rdx-font-20">{{getData.livingRoomData.amount }}元</span>
                  <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">本场销售额</span>
                  <span class="rdx-font-14">超过当日<i
                      class="color-content">{{getData.livingRoomData.sales_rate}}%</i>的直播</span>
                </div>
                <div class="flex flex-direction">
                  <span class="rdx-font-20">{{getData.livingRoomData.user_value}}</span>
                  <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">UV价值</span>
                  <span class="rdx-font-14">超过当日<i
                      class="color-content">{{getData.livingRoomData.user_value_rate}}%</i>的直播</span>
                </div>
                <div class="flex flex-direction">
                  <span class="rdx-font-20">{{getData.livingRoomData.average_residence_time}}</span>
                  <span class="rdx-tips-color rdx-p-t-5 rdx-p-b-10 rdx-font-14">停留时长</span>
                  <span class="time rdx-light-color rdx-font-12 button-a">刷新</span>
                </div>
              </div>
              <div class="flex justify-between align-center rdx-m-t-40">
                <div class="living rdx-light-color flex align-center justify-center button-all-all"
                  @click="linkLive(getData.livingRoomData.room_id)">
                  <img src="../../assets/imgs/living_top_1.png" style="width: 15px; height: 14px;">
                  <span class="rdx-p-l-10">数据大屏</span>
                </div>
                <span class="rdx-font-12 color-hui">{{getData.livingRoomData.crawl_time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex living-top-right flex-direction">
          <div class="flex">
            <div class="img-border flex align-center justify-center position-re">
              <img :src="getData.livingAuthorData.avatar" class="round"
                style="width: 85px; height: 85px; border: 6px solid #FFFFFF;">
              <div class="position-ab tag rdx-light-color rdx-font-12" style="bottom: -6px;">综合评分:
              <!-- {{getData.livingDiagnose.overall_score}} -->
              </div>
            </div>
            <div class="flex flex-direction justify-between rdx-flex-1 rdx-p-l-22">
              <div class="flex rdx-p-t-10 align-center">
                <span class="rdx-font-22">{{getData.livingAuthorData.nickname}}</span>
                <span class="color-content rdx-font-14">当日带货口碑：{{getData.livingAuthorData.overall_score}}</span>
              </div>
              <div class="flex rdx-content-color rdx-font-14">抖音号： {{getData.livingAuthorData.unique_id}}</div>
              <div class="flex rdx-font-14">
                <div>
                  <span class="rdx-content-color">点赞数：</span>
                  <span class="rdx-font-16">{{getData.livingAuthorData.total_favorited}}</span>
                </div>
                <div class="rdx-p-l-58">
                  <span class="rdx-content-color">粉丝数：</span>
                  <span class="rdx-font-16">{{getData.livingAuthorData.follower_count}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-direction rdx-m-t-38">
            <div class="tab-width position-re rdx-font-14">
              <div :class="val.userIndex == 1 ? 'active' : 'active-out'" style="bottom: -1px; left: 0px;"
                @click="tapUser('1')">人气数据</div>
              <div :class="val.userIndex == 2 ? 'active' : 'active-out'" style="bottom: -1px; right: 0px;"
                @click="tapUser('2')">带货数据</div>
            </div>
            <div class="flex flex-direction rdx-p-lr-30" v-show="val.userIndex == 1">
              <div class="flex w-100 rdx-p-t-26">
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.total_user}}</span>
                  <span class="rdx-font-14 rdx-tips-color">观看人次</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.user_peak}}</span>
                  <span class="rdx-font-14 rdx-tips-color">人气峰值</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.average_user_count}}</span>
                  <span class="rdx-font-14 rdx-tips-color">平均在线</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.barrage_count}}</span>
                  <span class="rdx-font-14 rdx-tips-color">发送弹幕</span>
                </div>
              </div>
              <div class="flex w-100 rdx-p-t-26">
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.like_count}}</span>
                  <span class="rdx-font-14 rdx-tips-color">累计点赞</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.increment_follower_count}}</span>
                  <span class="rdx-font-14 rdx-tips-color">涨粉人数</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.fans_num_rate}}%</span>
                  <span class="rdx-font-14 rdx-tips-color">转粉率</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.gift_uv_count}}</span>
                  <span class="rdx-font-14 rdx-tips-color">送礼人数</span>
                </div>
              </div>
            </div>
            <div class="flex flex-direction rdx-p-lr-30" v-show="val.userIndex == 2">
              <div class="flex w-100 rdx-p-t-26">
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.amount }}</span>
                  <span class="rdx-font-14 rdx-tips-color">本场销售额</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.volume}}</span>
                  <span class="rdx-font-14 rdx-tips-color">销量（件）</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.average_price}}</span>
                  <span class="rdx-font-14 rdx-tips-color">客单价</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.product_size}}</span>
                  <span class="rdx-font-14 rdx-tips-color">上架商品</span>
                </div>
              </div>
              <div class="flex w-100 rdx-p-t-26">
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.conversion_rate_percent}}%</span>
                  <span class="rdx-font-14 rdx-tips-color">带货转化率</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction">
                  <span>{{getData.livingRoomData.user_value}}</span>
                  <span class="rdx-font-14 rdx-tips-color">UV价值</span>
                </div>
                <div class="flex rdx-flex-1 flex-direction"></div>
                <div class="flex rdx-flex-1 flex-direction"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-100 justify-between">
        <div class="flex conten-box-left flex-direction color-7" style="position: sticky;top: 0px; height: 183px;">
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('1')">
            <i class="iconfont icon-e64a rdx-m-r-8 rdx-font-20" :class="show.tabIndex == '1' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '1' ? 'rdx-primary' : ''">流量分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('2')">
            <i class="iconfont icon-e603 rdx-m-r-8" :class="show.tabIndex == '2' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '2' ? 'rdx-primary' : ''">商品详情</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('3')">
            <i class="iconfont icon-e6de rdx-m-r-8" :class="show.tabIndex == '3' ? 'rdx-primary' : ''"></i>
            <span :class="show.tabIndex == '3' ? 'rdx-primary' : ''">观众分析</span>
          </ul>
          <ul class="flex align-center rdx-m-t-20 button-a" @click="onTab('4')">
            <i class="iconfont icon-e61b rdx-m-r-8"
              :class="show.tabIndex == '4' ? 'rdx-primary' : 'rdx-content-color'"></i>
            <span :class="show.tabIndex == '4' ? 'rdx-primary' : ''">直播诊断</span>
          </ul>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 1">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">在线流量分析</span>
            </div>
            <line-gmv :livingParams="inforParams.roomId" :roomInfo='getData.livingRoomData' style="margin-top: 46px;"></line-gmv>
          </div>
          <div class="flex rdx-m-t-20 justify-between">
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-r-10">
              <div class="flex justify-between">
                <div class="flex align-center">
                  <span class="tips"></span>
                  <span class="rdx-font-20">互动分析</span>
                </div>
                <div class="flex">
                  <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">累计点赞数</span>
                  <span class="rdx-font-22">{{val.likeAll}}</span>
                  <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 50px;">累计评论数</span>
                  <span class="rdx-font-22">{{val.commentAll}}</span>
                </div>
              </div>
              <div class="flex justify-center">
                <interact-chart :explainParams="roomId" style="margin-top: 46px;"></interact-chart>
              </div>
            </div>
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">带货小时榜</span>
              </div>
              <div class="flex rdx-m-t-46 justify-end">
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">累计销售额</span>
                <span class="rdx-font-22">{{val.likeAll}}</span>
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 50px;">累计销售量</span>
                <span class="rdx-font-22">{{val.commentAll}}</span>
              </div>
              <div class="rdx-font-14">带货排名</div>
              <hour-Line :roomId="roomId" style="width: 100%;"></hour-Line>
            </div>
          </div>
          <div class="flex rdx-m-t-20 justify-between">
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">观众来源</span>
              </div>
              <source-pie :roomId="roomId"></source-pie>
            </div>
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">转化漏斗</span>
              </div>
              <funnel-chart :roomId="roomId"></funnel-chart>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 2">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">商品分析</span>
            </div>
            <div class="flex justify-end">
              <search-item @clickKey='clickGoodKeyWord' searchType="7" searchWidth="420" searchPlaceholder="请输入商品标题">
              </search-item>
            </div>
            <dl class="flex rdx-p-b-20 justify-end align-center">
              <dd class="rdx-p-l-6 rdx-p-r-40 rdx-font-14 rdx-main-color">共{{total}}个商品</dd>
              <dd class="rdx-p-l-6 rdx-p-r-40 rdx-font-14 rdx-main-color">累计销售 {{goodsVolume}}</dd>
              <dd class="rdx-p-l-6 rdx-p-r-40 rdx-font-14 rdx-main-color">累计销售额 {{goodsAmount}}</dd>
              <!-- <dd class="rdx-font-14 rdx-primary font-strong rdx-p-t-6 rdx-p-b-6 rdx-p-l-14 rdx-p-r-14 rdx-radius-15 button-a rdx-m-r-16" style="border: 1px solid #DD001B;">导出</dd> -->
            </dl>
            <el-table :data="getData.talentList" @sort-change="handlesortChange" @row-click="linkGoods"
              class="goods-analyse">
              <template slot="empty">
                <no-data></no-data>
              </template>
              <el-table-column label="商品" width="300">
                <template slot-scope="{ row }">
                  <div class="info rdx-flex info-three">
                    <img :src="row.image" style="width: 60px; height: 60px;min-width: 60px;" />
                    <div class="rdx-m-l-10 title link-primary">{{row.product_title}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable="custom" prop="final_price" label="价格"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="volume" label="销量(件)"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="amount" label="销售额"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="conversion_percent" label="转化率"></el-table-column>
              <el-table-column align="center" prop="introduce_duration" label="累计讲解时长" width="120"></el-table-column>
              <el-table-column align="center" sortable="custom" prop="stop_time" label="上/下架时间" width="140">
                <template slot-scope="scope">
                  <div>{{scope.row.start_time}}</div>
                  <div>{{scope.row.stop_time}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="volume1" label="操作" width="100">
                <template slot-scope="scope">
                  <!-- <img src="@/assets/imgs/line.png" style="width: 26px; height: 26px;" @click="jumProduct(scope.row.dy_promotion_id)" /> -->
                  <div class="flex w-100 justify-center">
                    <el-tooltip effect="dark" content="商品详情" placement="bottom">
                      <span class="tiktok-buttonA flex align-center justify-center button-a">
                        <img src="../../assets/imgs/fun_1.png" style="width: 13px; height: 13px;">
                      </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block flex justify-center rdx-m-t-20" v-if="getData.talentList!=''">
              <el-pagination background :total="total" :page-size="goodsParams.size" :page-sizes="[10, 20, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-if="show.tabIndex == 3">
          <div class="flex justify-between w-100">
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">粉丝团分析</span>
              </div>
              <div class="flex rdx-m-t-46 justify-end">
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">本场新增粉丝团</span>
                <span class="rdx-font-22">{{fansTrend.total_new_fans_count}}</span>
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 50px;">粉丝团增量峰值</span>
                <span class="rdx-font-22">{{fansTrend.total_fans_count}}</span>
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 50px;">峰值时间</span>
                <span class="rdx-font-22">{{fansTrend.user_peak_time}}</span>
              </div>
              <div class="rdx-font-14">粉丝团表现</div>
              <fans-data-line :roomId="roomId"></fans-data-line>
            </div>
            <div class="item-bg flex flex-direction item-bg rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">涨粉分析</span>
              </div>
              <div class="flex rdx-m-t-46 justify-end">
                <span class="rdx-tips-color rdx-font-14" style="margin: 3px 5px 0px 0px;">本场涨粉数</span>
                <span class="rdx-font-22">{{fansTrend.total_new_fans_count}}</span>
              </div>
              <div class="rdx-font-14">涨粉表现</div>
              <fans-up-data-line :roomId="roomId"></fans-up-data-line>
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
                  <age-pie :roomId="roomId"></age-pie>
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
                  <div class="flex rdx-flex-8">
                    <map-chart :roomId="roomId"></map-chart>
                  </div>
                  <div class="flex rdx-flex-4 flex-direction rdx-p-l-30 rdx-p-t-30">
                    <div class="rdx-font-14 rdx-p-b-10" v-if="proCity!=''" v-for="(item,index) in proCity" :key="index">
                      {{item.title}} {{item.rate}}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-direction rdx-m-t-80">
              <hot-text :roomId="roomId"></hot-text>
            </div>
          </div>
          <div class="flex justify-between rdx-m-t-20">
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-r-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">礼物分析</span>
              </div>
              <span class="rdx-font-14 rdx-m-t-30 rdx-m-b-20">本场榜TOP20音浪</span>
              <el-table :data="getData.giftTop">
                <template slot="empty">
                  <no-data></no-data>
                </template>
                <el-table-column align="center" prop="rank" label="排行" width="80" type="index">
                  <template slot-scope="{$index}">
                    <img v-if="$index === 0" class="rank-img" src="@/assets/imgs/first.png" alt />
                    <img v-if="$index === 1" class="rank-img" src="@/assets/imgs/second.png" alt />
                    <img v-if="$index === 2" class="rank-img" src="@/assets/imgs/third.png" alt />
                    <i class="rank-text" v-if="$index > 2 && $index < 9">0{{ $index + 1 }}</i>
                    <i class="rank-text" v-if="$index > 2 && $index >= 9">{{ $index + 1 }}</i>
                  </template>
                </el-table-column>
                <el-table-column prop="nickname" label="土豪昵称"></el-table-column>
                <el-table-column align="center" prop="score_percent" label="打赏占比" width="120">
                  <template slot-scope="scope">
                    <div>{{scope.row.score_percent}}%</div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="flex justify-center rdx-p-t-20" v-if="getData.giftTop!=''">
                <el-pagination background :total="giftTotal" :page-size="giftParams.size"
                  layout="total,prev, pager, next" @size-change="handleGiftSizeChange"
                  @current-change="handleGiftCurrentChange">
                </el-pagination>
              </div>
            </div>
            <div class="item-bg flex flex-direction rdx-flex-1 rdx-m-l-10">
              <div class="flex align-center">
                <span class="tips"></span>
                <span class="rdx-font-20">连麦分析</span>
              </div>
              <div class="flex rdx-m-t-30 rdx-m-b-20">
                <span class="rdx-font-14 rdx-p-r-14">连麦涨粉</span>
                <i style="color: #FF7612;">--</i>
              </div>
              <el-table :data="getData.connMicro">
                <template slot="empty">
                  <no-data></no-data>
                </template>
                <el-table-column prop="nickname" label="达人"></el-table-column>
                <el-table-column align="center" prop="other_view" label="对方场观" width="120"></el-table-column>
                <el-table-column align="center" prop="crawl_time" label="开始时间" width="120"></el-table-column>
                <el-table-column align="center" prop="conn_duration" label="连麦时长" width="120"></el-table-column>
              </el-table>
              <div class="flex justify-around rdx-p-t-10" v-if="getData.connMicro!=''">
                <el-pagination background :total="connMicroTotal" :page-size="connParams.size"
                  layout="total, prev, pager, next" @size-change="handleMicroSizeChange"
                  @current-change="handleMicroCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="flex conten-box-right flex-direction" v-show="show.tabIndex == 4">
          <div class="item-bg flex flex-direction">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">与同行业平均水平对比</span>
            </div>
            <div class="flex justify-between rdx-m-t-30 rdx-m-b-40 rdx-font-14">
              <dl class="flex align-center">
                <dd class="button-a" :class="val.averageIndex == 1 ? 'tag-comn-active' : 'tag-comn'"
                  @click="onAverage('1')">7天
                </dd>
                <dd class="button-a" :class="val.averageIndex == 2 ? 'tag-comn-active' : 'tag-comn'"
                  @click="onAverage('2')">15天
                </dd>
                <dd class="button-a" :class="val.averageIndex == 3 ? 'tag-comn-active' : 'tag-comn'"
                  @click="onAverage('3')">30天
                </dd>
              </dl>
              <dl class="flex align-center">
                <dd class="button-a" :class="val.classifyIndex == 1 ? 'tag-comn-active' : 'tag-comn'"
                  @click="onClassify('1')">
                  行业大类</dd>
                <dd class="button-a" :class="val.classifyIndex == 2 ? 'tag-comn-active' : 'tag-comn'"
                  @click="onClassify('2')">
                  细分类目</dd>
                <div class="flex rdx-p-l-10">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">仅2021-06-16后开播的直播间<br/>才可查询细分类目的数据</div>
                    <i class="iconfont icon-e679 rdx-content-color rdx-font-22"></i>
                  </el-tooltip>

                </div>
              </dl>
            </div>

            <strong class="font-strong rdx-p-t-16">直播诊断结果</strong>
            <div class="flex">
              <div ref="livingResult" style="width: 200px; height: 200px;"></div>
              <div class="flex flex-direction rdx-p-t-60">
                <div class="rdx-content-color rdx-font-13">根据本场带货商品情况，系统自动将本场直播的行业大类归为：
<!--                    <spanclass="font-strong rdx-main-color">{{getData.livingDiagnose.category}}</span> -->
                </div>
                <div class="rdx-tips-color rdx-font-14 rdx-p-t-8 rdx-line-height-26">本场直播 <span
                    class="rdx-main-color">{{totalSum}}</span> 个关键指标中，
                  <span class="rdx-primary">{{ltAvg}}</span> 个指标低于行业平均水平， <span class="rdx-primary">{{eqAvg}}</span>
                  个指标等于行业平均水平， <br /><span style="color: #96D2BF;">{{gtAvg}}</span> 个指标高于行业平均水平
                </div>
              </div>
            </div>
            <div class="flex justify-between rdx-m-t-30" style="border-top: 1px solid #EBEBEB;">
              <div class="flex rdx-flex-1 flex-direction rdx-p-t-50" style="border-right: 1px solid #EBEBEB;">
                <span class="rdx-font-14">人气指标诊断</span>
                <div class="flex rdx-p-l-30 rdx-p-t-38 flex-direction">
                  <div class="flex w-100 flex-wrap">
                    <div class="flex w-30 flex-direction rdx-p-b-30" v-for="(item,index) in moodTargetData"
                      :key="index">
                      <div class="flex align-center">
                        <span class="rdx-font-20 rdx-p-r-6">{{item.avg}}</span>
                        <i class="iconfont icon-e8fe color-old rdx-font-14" v-if="item.count > item.avg"></i>
                        <i class="iconfont icon-e82d color-old rdx-font-14" v-if="item.count < item.avg"></i>
                        <i class="iconfont icon-e82d rdx-tips-color rdx-font-14" v-if="item.count == item.avg"></i>
                      </div>
                      <span class="rdx-font-13 rdx-content-color rdx-p-t-6">{{moods[index]}}</span>
                      <span class="self-tag2 rdx-m-t-6">行业平均水平{{item.count}}</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <div ref="popularity" style="width: 400px; height: 300px;"></div>
                </div>
              </div>
              <div class="flex rdx-flex-1 flex-direction rdx-p-t-50">
                <span class="rdx-font-14 rdx-p-l-20">带货指标诊断</span>
                <div class="flex rdx-p-l-30 rdx-p-t-38 flex-direction">
                  <div class="flex w-100 flex-wrap">
                    <div class="flex w-30 flex-direction rdx-p-b-30" v-for="(item,index2) in productTargetDataA"
                      :key="index2">
                      <div class="flex align-center">
                        <span class="rdx-font-20 rdx-p-r-6">{{item.avg}}</span>
                        <i class="iconfont icon-e8fe color-old rdx-font-14" v-if="item.count > item.avg"></i>
                        <i class="iconfont icon-e82d color-old rdx-font-14" v-if="item.count < item.avg"></i>
                        <i class="iconfont icon-e82d rdx-tips-color rdx-font-14" v-if="item.count == item.avg"></i>
                      </div>
                      <span class="rdx-font-13 rdx-content-color rdx-p-t-6">{{uvTar[index2]}}</span>
                      <span class="self-tag2 rdx-m-t-6">行业平均水平{{item.count}}</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <div ref="indicator" style="width: 400px; height: 300px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg flex flex-direction rdx-m-t-20">
            <div class="flex align-center">
              <span class="tips"></span>
              <span class="rdx-font-20">自助分析</span>
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">纵轴:按数据表现，由S-D排序。S最高，D最低<br />横轴:按数据表现。由1-5排序。5最高，1最低<br />本场直播未带货时，横铀指标默认锁定为”UV”价值
                </div>
                <span class="iconfont icon-e679 rdx-font-20 button-a" style="color: #969696;"></span>
              </el-tooltip>
            </div>
            <div class="flex justify-between rdx-p-t-46">
              <div class="flex flex-direction w-70">
                <div class="flex">
                  <span class="rdx-p-r-50">纵轴坐标</span>
                  <el-radio-group v-model="val.selfServiceY" @change="clickSelY">
                    <el-radio :label="1">观看人数</el-radio>
                    <el-radio :label="2">人气峰值</el-radio>
                    <el-radio :label="3">转粉率</el-radio>
                    <el-radio :label="4">平均在线</el-radio>
                    <el-radio :label="5">平均停留时间</el-radio>
                  </el-radio-group>
                </div>
                <div class="flex rdx-p-t-20">
                  <span class="rdx-p-r-50">横轴坐标</span>
                  <el-radio-group v-model="val.selfServiceX" @change="clickSelX">
                    <el-radio :label="6">销售额</el-radio>
                    <el-radio :label="7">商品销量</el-radio>
                    <el-radio :label="8">UV价值</el-radio>
                    <el-radio :label="9">带货转换率</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div class="flex rdx-tips-color align-center rdx-line-height-30 rdx-p-t-48">本场直播位置：<span
                class="font-strong rdx-main-color">S2</span>
            </div>
            <div class="flex self-service rdx-m-t-20 position-re " style="min-width: 1000px;">
              <div class="flex flex-direction align-center">
                <strong class="rdx-p-t-30">观看人数</strong>
                <span class="flex align-center justify-center rdx-font-10 rdx-m-t-38">
                  <i class="self-tag self-active flex align-center justify-center">S</i>
                </span>
                <span class="flex align-center justify-center rdx-m-t-50">
                  <i class="self-tag flex align-center justify-center">A</i>
                </span>
                <span class="flex align-center justify-center rdx-m-t-50">
                  <i class="self-tag flex align-center justify-center">B</i>
                </span>
                <span class="flex align-center justify-center rdx-m-t-50">
                  <i class="self-tag flex align-center justify-center">C</i>
                </span>
                <span class="flex align-center justify-center rdx-m-t-50">
                  <i class="self-tag flex align-center justify-center">D</i>
                </span>
              </div>
              <div class="flex self-con flex-wrap align-start">

                <div class="flex self-item align-center rdx-line-height-26 rdx-p-l-12"
                  v-for="(item,index) in getData.autoanalysisData" :key="index"
                  :style="val.selfIndex == index ? 'background-color: #FF7612; color: #FFFFFF; opacity: 1;' : ''">
                  <img :src="item.avatar"
                    style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #FF7612;">
                  <div class="flex flex-direction rdx-p-l-20">
                    <span class="rdx-line-1" style="width: 140px;">{{item.name}}</span>
                    <span>等{{item.author_count}}位达人</span>
                  </div>
                </div>
              </div>
              <div class="position-ab flex align-center w-100" style="bottom: 0px; padding-left: 110px;">
                <div class="self-bottom flex justify-center">
                  <i class="self-tag flex align-center justify-center">1</i>
                </div>
                <div class="self-bottom flex justify-center">
                  <i class="self-tag flex align-center justify-center">2</i>
                </div>
                <div class="self-bottom flex justify-center">
                  <i class="self-tag flex align-center justify-center self-active">3</i>
                </div>
                <div class="self-bottom flex justify-center">
                  <i class="self-tag flex align-center justify-center">4</i>
                </div>
                <div class="self-bottom flex justify-center">
                  <i class="self-tag flex align-center justify-center">5</i>
                </div>
                <div>销售额</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- <div class="flex rdx-m-t-20">
          <div class="searchWh-right rdx-m-l-20">
            <div class=" flex justify-between rdx-m-t-20 ">
              <div class="flex rdx-flex-1 flex-direction rdx-p-r-10  box-shadow" style="width: 48%;">
                <div class="flex rdx-p-b-20 align-center" id="lw">
                  <span class="tips"></span>
                  <h2 class="font-strong rdx-p-l-10">礼物分析</h2>
                </div>
                <div class="rdx-tips-color rdx-p-b-20">本场榜TOP20音浪</div>
                <el-table :data="getData.giftTop">
                  <template slot="empty">
                    <no-data></no-data>
                  </template>
                  <el-table-column align="center" prop="rank" label="排行"></el-table-column>
                  <el-table-column align="center" prop="nickname" label="土豪昵称"></el-table-column>
                  <el-table-column align="center" prop="score_percent" label="打赏占比">
                    <template slot-scope="scope">
                      <div style="padding: 10px 0px;">{{scope.row.score_percent}}%</div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="flex justify-around rdx-p-t-10" v-if="getData.giftTop!=''">
                  <el-pagination background :total="giftTotal" :page-size="giftParams.size"
                    layout="total,prev, pager, next" @size-change="handleGiftSizeChange"
                    @current-change="handleGiftCurrentChange">
                  </el-pagination>
                </div>
              </div>
              <div class="flex flex-direction rdx-p-l-10 rdx-m-l-20 box-shadow" style="width: 48%;">
                <div class="flex rdx-p-b-20 align-center" id="lmfx">
                  <span class="tips"></span>
                  <h2 class="font-strong rdx-p-l-10">连麦分析</h2>
                </div>
                <div class="rdx-tips-color rdx-p-b-20">连麦涨粉 <i class="rdx-main-color">--</i></div>
                <el-table :data="getData.connMicro" style=" font-size: 16px;"
                  :header-cell-style="{background:'#E7ECF1',color:'#333333'}">
                  <template slot="empty">
                    <no-data></no-data>
                  </template>
                  <el-table-column align="center" prop="nickname" label="达人" width="150"></el-table-column>
                  <el-table-column align="center" prop="other_view" label="对方场观"></el-table-column>
                  <el-table-column align="center" prop="crawl_time" label="开始时间"></el-table-column>
                  <el-table-column align="center" prop="conn_duration" label="连麦时长"></el-table-column>
                </el-table>
                <div class="flex justify-around rdx-p-t-10" v-if="getData.connMicro!=''">
                  <el-pagination background :total="connMicroTotal" :page-size="connParams.size"
                    layout="total, prev, pager, next" @size-change="handleMicroSizeChange"
                    @current-change="handleMicroCurrentChange">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class=" rdx-m-t-20 box-shadow flex flex-direction" style="overflow: hidden;">
              <div class="flex rdx-p-b-20 align-center" id="thdb">
                <span class="tips"></span>
                <h2 class="font-strong rdx-p-l-10">与同行业平均水平对比</h2>
              </div>
            </div> -->
      <!--上架弹窗-->
      <el-dialog :title="val.putawayDate[val.putawayIndex]" :visible.sync="show.putawayShow" width="30%"
        :before-close="closeDialog" v-if="val.productPoint != '' && val.putawayArr != ''">
        <div class="flex flex-direction rdx-p-b-10" v-for="(item,index) in val.putawayArr" :key="index">
          <div class="font-strong">上架产品({{index}})</div>
          <div class="flex rdx-font-14 rdx-p-t-10">
            <img :src="item.image" style="width: 60px; height: 60px;">
            <div class="flex flex-direction justify-between rdx-p-l-10 rdx-flex-1">
              <div>{{item.title}}</div>
              <div class="flex justify-between">
                <div class="font-strong">¥{{item.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="flex flex-direction rdx-p-b-10">
            <div class="font-strong">上架产品({{val.putawayIndex}})</div>
            <div class="flex rdx-font-14 rdx-p-t-10">
              <img :src="val.putawayArr[val.putawayIndex].image" style="width: 60px; height: 60px;">
              <div class="flex flex-direction justify-between rdx-p-l-10 rdx-flex-1">
                <div>{{val.putawayArr[val.putawayIndex].title}}</div>
                <div class="flex justify-between">
                  <div class="font-strong">¥{{val.putawayArr[val.putawayIndex].price}}</div>
                </div>
              </div>
            </div>
          </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </span>
      </el-dialog>
      <!--讲解弹窗-->
      <el-dialog :title="val.explainDate[val.explainIndex]" :visible.sync="show.explainShow" width="30%"
        :before-close="closeDialog" v-if="getData.explainOld != '' && show.explainShow">
        <div class="flex flex-direction rdx-p-b-10">
          <div class="font-strong">讲解产品({{val.explainIndex}})</div>
          <div class="flex rdx-font-14 rdx-p-t-10">
            <img :src="getData.explainOld[val.explainIndex].products[0].image" style="width: 60px; height: 60px;">
            <div class="flex flex-direction justify-between rdx-p-l-10 rdx-flex-1">
              <div>{{getData.explainOld[val.explainIndex].products[0].title}}</div>
              <div class="flex justify-between">
                <div class="font-strong">¥{{getData.explainOld[val.explainIndex].products[0].price}}</div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <top-up></top-up>
  </div>
</template>

<script>
  import lineChart from "@/components/lineChart.vue";
  import pieChart from "@/components/pieChart.vue";
  import noData from "@/components/noData.vue"
  import * as tools from '@/common/tools.js';
  import interactChart from "./components/interactChart.vue";
  import goodsClass from '../../components/goodsClass.vue'
  import searchItem from '@/components/searchItem.vue'
  import agePie from './components/agePie.vue'
  import sourcePie from './components/sourcePie.vue'
  import fansDataLine from './components/fansDataLine.vue'
  import fansUpDataLine from './components/fansUpDataLine.vue'
  import lineGmv from './components/lineGmv.vue'
  import hourLine from './components/hourLine.vue'
  import top from '@/layout/components/Top.vue'
  import funnelChart from './components/funnelChart.vue'
  import mapChart from './components/mapChart.vue'
  import hotText from './components/hotText.vue'
  import topUp from '@/components/toUp.vue'
  export default {
    components: {
      lineChart,
      pieChart,
      noData,
      interactChart,
      searchItem,
      goodsClass,
      agePie,
      sourcePie,
      fansDataLine,
      fansUpDataLine,
      lineGmv,
      hourLine,
      top,
      funnelChart,
      mapChart,
      hotText,
      topUp
    },
    data() {
      return {
        getData: {
          livingAuthorData: {
            overall_score:'0'
          },
          livingRoomData: {},
          livingDiagnose: {
            overall_score:'0'
          },
          autoanalysisData: [],
          talentList: [],
          hotTexts: [],
          giftTop: [],
          connMicro: [],
          onLineList: [], //流量
          focusList: [], //关注
          productPoint: [], //上架
          explainOld: [], //讲解
          commentData: [], //相关评论
        },

        uvTar: ["商品销量", "销售额", "UV价值", "带货转化率", "客单价", "带货口碑分"],
        moods: ["互动率", "观看人数", "人气峰值", "平均停留时间", "平均在线", "转粉率"],
        val: {
          explainIndex: "0", //讲解下标
          lineCheck: ['1', '2', '3'],
          selfServiceY: 1, //资助分析纵轴坐标值
          selfServiceX: 1, //资助分析横轴坐标值
          selfIndex: "1", //自助分析图表下标
          likeAll: 0, //累计点赞数
          commentAll: 0, //累计评论数
          putawayList: [], //上架数组
          putawayArr: [], //上架展示数据
          putawayDate: [], //上架时间
          putawayIndex: "0", //上架下标
          explainDate: [], //讲解时间
          explainList: [], //讲解数组
          averageIndex: "1", //同行业平均水平对比
          classifyIndex: "1", //行业精度
          timeAll: 0, //总时长
          userIndex: '1', //tab 人气数据
          conIndex: '1', //内容tab
          mapIndex: '1', //省市
        },
        show: {
          tabIndex: '1',
          dataShowE: false,
          selShow: false, //查看状态
          avgTimeShow: false, //平均时长显示状态
        },
        chartData: {
          interactData: { //互动情况分析
          },
          scoretData: { //综合评分
          },
          hourData: { //带货小时榜
          },
          sourceData: { //观众来源
          },
          fansData: {}, //粉丝团分析
          fansUpData: {}, //涨粉分析
          ageData: {}, //年龄分布
          chartWidth: {
            width: "100%",
            height: "350px"
          },
          scoreWidth: {
            width: "100%",
            height: "210px"
          },
          hourWidth: {
            width: "100%",
            height: "420px"
          },
          labelShow: true,
          sourceWidth: {
            width: "100%",
            height: "420px"
          },
          ageWidth: {
            width: "100%",
            height: "300px"
          }
        },
        trafficAnalysis: [],
        fansAnaly: [],
        male: '0',
        faMale: '100',
        territory: [],
        brandData: [],
        categoryData: [],
        status: false, //相关评论表头隐藏状态
        moodTargetData: [], //平均停留时长（诊断）
        productTargetDataA: [], //UV价值 (诊断)
        productAllShow: false,
        gifts: [],
        totalSum: 0, //总指标数
        gtAvg: 0, //大于行业水平数
        eqAvg: 0, //等于行业水平数
        ltAvg: 0, //小于行业水平数
        barrage: {},
        lineParams: {}, //在线 进场 离场
        explainParams: {}, //讲解
        inforParams: {}, //直播间信息参数
        connMicroTotal: 0, //连麦涨粉总页数，
        dhHour: [],
        genders: [],
        connParams: {
          page: 1,
          size: 5,
        },
        giftTotal: 0, //礼物分析总页数
        giftParams: {
          page: 1,
          size: 5,
        },
        total: 0,
        goodsParams: {
          page: 1,
          size: 10,
          sort: '',
          order: '',
          keyword: '',
        },

        bigCategory: '', //商品分类
        brandCode: '', //品牌分类
        productAllShow: false,
        starAllShow: false,
        brand: '',
        cityVal: "1", //省市
        proCity: [],
        citys: [],
        goodsAmount: 0,
        goodsVolume: 0,
        audienceSource: {},
        fansTrend: {},
        commenTotal: 0, //相关评论总条数
        roomId: '', // 直播间ID,
        horizontal: '销售额', //横坐标
        vertical: '观看人数', //纵坐标
      }
    },
    created() {
      this.inforParams.roomId = this.$route.query.id
      this.roomId = this.$route.query.id
      this.getTalent()

    },
    mounted() {
      this.getOnlineTraffic()
      this.getLivingResult() //直播诊断结果
      this.getLivingResults() //诊断评分
      this.getIndicator() //带货指标
      this.getPopularity() //人气指标诊断
      this.getAutoanalysisData()
      this.getGoodsInfo()
      this.getFansData()
      this.getGoodsCate()
      this.getListGift()
      this.getConnMicro()
      this.getFans() //粉丝团分析
    },
    methods: {
      //点击省市
      tapMap(index) {
        this.val.mapIndex = index
        if (index == 1) {
          this.proCity = this.territory
        } else {
          this.proCity = this.citys
        }
      },
      //点击左侧导航
      onTab(index) {
        this.show.tabIndex = index
        // document.documentElement.scrollTop = 0
      },
      //点击人气数据 带货数据
      tapTab(index) {
        this.val.conIndex = index
      },
      //点击人气数据
      tapUser(index) {
        this.val.userIndex = index
      },
      //点击Y轴坐标
      clickSelY(val) {
        if (val == 1) {
          this.vertical = '观看人数'
          this.getAutoanalysisData()
          this.val.selfIndex = 10
        } else if (val == 2) {
          this.vertical = '人气峰值'
          this.val.selfIndex = 7
          this.getAutoanalysisData()
        } else if (val == 3) {
          this.vertical = '转粉率'
          this.val.selfIndex = 13
          this.getAutoanalysisData()
        } else if (val == 4) {
          this.vertical = '平均在线'
          this.val.selfIndex = 23
          this.getAutoanalysisData()
        } else if (val == 5) {
          this.vertical = '平均停留时长'
          this.val.selfIndex = 19
          this.getAutoanalysisData()
        }
      },
      //点击X轴坐标
      clickSelX(val) {
        if (val == 6) {
          this.horizontal = '销售额'
          this.val.selfIndex = 11
          this.getAutoanalysisData()
        } else if (val == 7) {
          this.horizontal = '商品销量'
          this.val.selfIndex = 15
          this.getAutoanalysisData()
        } else if (val == 8) {
          this.horizontal = 'UV价值'
          this.val.selfIndex = 20
          this.getAutoanalysisData()
        } else if (val == 9) {
          this.horizontal = '带货转化率'
          this.val.selfIndex = 9
          this.getAutoanalysisData()
        }

      },
      //粉丝团分析
      async getFans() {
        var param = {
          "roomId": this.roomId,
          "testData": 'T'
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansClubAnalysis', param)
        if (data.fans_club_analysis != '') {
          this.fansTrend = data
          this.fansTrend.user_peak_time = tools.time_cycle(4, this.fansTrend.user_peak_time)
        } else {
          this.show.dataShow = true
        }
      },
      //跳转到达人详情
      linkAuthor(id) {
        this.$router.push({
          path: "/talent/talent_detail",
          query: {
            id: id
          }
        })
      },
      //跳转到实时大屏
      linkLive(id) {
		var url = this.$router.resolve({path: '/data_large',query: {id: id}})
		window.open(url.href, '_blank')
      },
      //平均时长查看
      clickCk() {
        this.show.selShow = true
        this.show.avgTimeShow = true
      },
      //与同行业平均水平对比 tab 种类
      onClassify(index) {
        this.val.classifyIndex = index
        this.getLivingResult()
      },
      //与同行业平均水平对比 tab 选择时间
      onAverage(index) {
        this.val.averageIndex = index
        this.getLivingResult()
      },
      //获取打赏礼物
      async getListGift() {
        var param = {
          "roomId": this.roomId,
          "page": this.giftParams.page,
          "size": '5'
        }
        const {
          data
        } = await this.$get('/api/live/detail/listGift', param)
        if (data != undefined && data != '') {
          this.getData.giftTop = data.list
          this.getData.giftTop.forEach((item) => {
            item.score_percent = item.score_percent.toFixed(2)
          })
          this.giftTotal = data.page_info && data.page_info.total //分页
        }
      },
      //礼物分析分页（获取条数）
      handleGiftSizeChange(val) {
        this.giftParams.page = 1
        this.giftParams.size = val
        this.getListGift()
      },
      //礼物分析分页（获取当前页数）
      handleGiftCurrentChange(val) {
        this.giftParams.page = val
        this.getListGift()
      },
      // 获取直播间在线情况（）
      async getOnlineTraffic() {
        const {
          data
        } = await this.$get('/api/live/detail/summary', this.inforParams)
        this.getData.livingRoomData = data.live
        this.getData.livingAuthorData = data.author
        if (this.getData.livingRoomData.room_finish_time != 0) {
          this.val.timeAll = tools.time_minus(this.getData.livingRoomData.begin_time, this.getData.livingRoomData
            .room_finish_time)
        } else {
          this.val.timeAll = '--'
        }
        this.getData.livingRoomData.total_user_more_than_percent = (this.getData.livingRoomData
          .total_user_more_than_percent * 100).toFixed(2)
        this.getData.livingRoomData.amount_percent = (this.getData.livingRoomData.amount_percent * 100).toFixed(2)
        this.getData.livingRoomData.uv_cost_more_than_percent = (this.getData.livingRoomData
          .uv_cost_more_than_percent * 100).toFixed(2)
        if (this.getData.livingRoomData.crawl_time != 0) {
          this.getData.livingRoomData.crawl_time = tools.time_cycle(3, this.getData.livingRoomData.crawl_time)
        } else {
          this.getData.livingRoomData.crawl_time = '--'
        }
        if (this.getData.livingRoomData.begin_time != 0) {
          this.getData.livingRoomData.begin_time = tools.time_cycle(1, this.getData.livingRoomData.begin_time)
        } else {
          this.getData.livingRoomData.begin_time = '--'
        }
        if (this.getData.livingRoomData.room_finish_time != 0) {
          this.getData.livingRoomData.room_finish_time = tools.time_cycle(1, this.getData.livingRoomData
            .room_finish_time)
        } else {
          this.getData.livingRoomData.room_finish_time = '--'
        }

        // this.getData.livingRoomData.total_times = tools.time_minus(this.getData.livingRoomData.begin_time, this
        //   .getData.livingRoomData.room_finish_time)
        this.getData.livingRoomData.amount = this.getData.livingRoomData.amount.toFixed(2)
        this.getData.livingRoomData.user_value = this.getData.livingRoomData.user_value.toFixed(2)
        this.explainParams.roomId = this.getData.livingRoomData.room_id
        this.explainParamsAAAA = this.getData.livingRoomData.room_id

        this.getData.livingRoomData.total_user = this.getData.livingRoomData.total_user >= 10000 ? (this.getData
          .livingRoomData.total_user / 10000).toFixed(1) + 'w' : this.getData.livingRoomData.total_user
        this.getData.livingRoomData.amount = this.getData.livingRoomData.amount >= 10000 ? (this.getData
          .livingRoomData.amount / 10000).toFixed(1) + 'w' : this.getData.livingRoomData.amount
        this.getData.livingAuthorData.follower_count = tools.numberVerify(this.getData.livingAuthorData
          .follower_count)
        this.getData.livingAuthorData.total_favorited = tools.numberVerify(this.getData.livingAuthorData
          .total_favorited)
        this.getData.livingRoomData.average_residence_time = this.time_minus(this.getData.livingRoomData
          .average_residence_time)
        this.getData.livingRoomData.volume = tools.numberVerify(this.getData.livingRoomData.volume) //销量
        this.getData.livingRoomData.conversion_rate_percent = this.getData.livingRoomData.conversion_rate_percent
          .toFixed(2) //客单价
      },
      //商品分类
      async getGoodsCate() {
        var param = {
          "roomId": this.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/detail/queryProductFilter', param)
        if (data != undefined) {
          this.categoryData = data.category
          this.brandData = data.brand
        }

      },
      //商品列表
      async getTalent() {
        var param = {
          "roomId": this.roomId,
          "keyWord": this.goodsParams.keyWord,
          //"bigCategory": this.goodsParams.bigCategory,
          "orderBy": this.goodsParams.order,
          "sort": this.goodsParams.sort,
          //"brandCode": this.goodsParams.brandCode,
          "page": this.goodsParams.page,
          "size": this.goodsParams.size
        }
        const {
          data
        } = await this.$get('/api/live/detail/listProduct', param)
        if (data != undefined && data != '') {
          this.getData.talentList = data.list
          if (this.goodsVolume != 0 || this.goodsAmount != 0) {
            this.goodsVolume = 0
            this.goodsAmount = 0
          }
          this.getData.talentList.forEach((item) => {
            // this.goodsVolume += item.volume
            // this.goodsAmount += item.amount

            item.start_time = tools.time_cycle(6, item.start_time)
            item.stop_time = tools.time_cycle(6, item.stop_time)
            item.introduce_duration = this.time_minus(item.introduce_duration)
          })
          this.total = data.page_info && data.page_info.total
        }
      },
      //商品分析升序和降序
      handlesortChange(column) {
        if (column.order === "descending") {
          this.goodsParams.order = 'desc'
          this.goodsParams.sort = column.prop
        } else {
          this.goodsParams.order = 'asc'
          this.goodsParams.sort = column.prop
        }
        this.getTalent()
      },


      //连麦涨粉
      async getConnMicro() {
        var param = {
          "roomId": this.roomId,
          "testData": 'T',
          "page": this.connParams.page,
          "size": this.connParams.size,
        }
        const {
          data
        } = await this.$get('/api/live/detail/connMicro', param)
        if (data != undefined && data != '') {
          this.getData.connMicro = data.list
          this.connMicroTotal = data.page_info && data.page_info.total //分页
          this.getData.connMicro.forEach((item) => {
            item.crawl_time = tools.time_cycle(2, item.crawl_time)
            item.conn_duration = this.time_minus(item.conn_duration)
          })
        }
      },
      //连麦涨粉分页（获取条数）
      handleMicroSizeChange(val) {
        this.connParams.page = 1
        this.connParams.size = val
        this.getConnMicro()
      },
      //连麦涨粉分页（获取当前页数）
      handleMicroCurrentChange(val) {
        this.connParams.page = val
        this.getConnMicro()
      },
      //商品分类点击事件
      handleCategoryCate(id) {
        this.goodsParams.bigCategory = id
        this.getTalent()
      },
      //商品列表关键字
      clickGoodKeyWord(val) {
        this.goodsParams.keyWord = val
        this.getTalent()
      },
      //品牌分类点击事件
      handleBrandCate(id) {
        this.goodsParams.brandCode = id
        // this.goodsAmount =0
        // this.goodsVolume=0
        this.getTalent()
      },
      //商品分析分页数据
      handleSizeChange(val) {
        this.goodsParams.page = 1
        this.goodsParams.size = val
        this.getTalent()
      },
      handleCurrentChange(val) {
        this.goodsParams.page = val
        this.getTalent()
      },
      //获取商品详情
      async getGoodsInfo() {
        var param = {
          "roomId": this.roomId
        }
        const {
          data
        } = await this.$get('/api/live/detail/queryLiveProductDetail', param)
        if (data != undefined) {
          this.getData.goodDetails = data.detail
          this.lineParams.roomId = data.detail.room_id
        }
      },
      //自助分析
      async getAutoanalysisData() {
        var param = {
          "roomId": this.roomId,
          "horizontal": this.horizontal,
          "vertical": this.vertical,
          "compareType": '',
          "labelType": '',
        }
        const {
          data
        } = await this.$get('/api/live/detail/queryLiveDiagnosticSelf', param)
        if (data != undefined) {
          this.getData.autoanalysisData = data.list
        }
      },
      //获取粉丝地域分布
      async getFansData() {
        var param = {
          "roomId": this.roomId
        }
        const {
          data
        } = await this.$get('/api/live/detail/fansAnalysis', param)
        if (data != undefined) {
          this.territory = data.province
          this.citys = data.city
          this.genders = data.gender
          if (this.genders != null) {
            this.male = this.genders.male.toFixed(2)
            this.faMale = this.genders.female.toFixed(2)
          }

          this.territory = this.territory.slice(0, 30)
          for (let i = 0; i < this.territory.length; i++) {
            this.territory[i].rate = this.territory[i].rate.toFixed(2)
          }
          this.proCity = this.territory
          this.citys = this.citys.slice(0, 30)
          for (let i = 0; i < this.citys.length; i++) {
            this.citys[i].rate = this.citys[i].rate.toFixed(2)
          }
        }
      },
      //时间差转换
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
      //带货指标
      getIndicator() {
        var list = [85, 0, 90, 0, 95, 45];
        var i = -1;
        var my = this
        var myChart = this.$echarts.init(this.$refs.indicator)
        myChart.setOption({
          color: ['#ffc49a'],
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          textStyle: {
            fontSize: 14,
            color: '#666666'
          },

          radar: [{
            indicator: [{
                text: '商品销量',
                max: 100
              },
              {
                text: '销售额',
                max: 100
              },
              {
                text: 'UV价值',
                max: 100
              },
              {
                text: '带货转化率',
                max: 100
              },
              {
                text: '客单价',
                max: 100
              },
              {
                text: '带货口碑分',
                max: 100
              }
            ],
            center: ['50%', '50%'],
            radius: 100
          }],
          series: [{
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [{
              value: list,
              name: '带货指标'
            }]
          }]
        })
      },
      //人气指标诊断
      getPopularity() {
        var my = this
        var myChart = this.$echarts.init(this.$refs.popularity)
        myChart.setOption({
          color: ['#ffc49a'],
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          textStyle: {
            fontSize: 14,
            color: '#666666'
          },
          radar: [{
            indicator: [{
                text: '观看人数',
                max: 100
              },
              {
                text: '人气分值',
                max: 100
              },
              {
                text: '平均停留时长',
                max: 100
              },
              {
                text: '平均在线',
                max: 100
              }
            ],
            center: ['50%', '50%'],
            radius: 100
          }],
          series: [{
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [{
              value: [60, 73, 85, 40],
              name: '人气指标'
            }]
          }]
        })
      },
      //直播诊断结果
      async getLivingResult() {
        var my = this
        var myChart = this.$echarts.init(this.$refs.livingResult)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff',
              align: 'left'
            },
          },
          series: [{
            name: '综合得分',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              color: '#666666',
              fontSize: 16,
              lineHeight: 26,
              formatter: '{c} \n {a}'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              }
            },
            labelLine: {
              show: false
            },
            data: [{
                value: 50,
                name: '综合得分',
                itemStyle: {
                  color: '#FF7612'
                }
              },
              {
                value: 90,
                name: '综合得分',
                itemStyle: {
                  color: '#dddddd'
                }
              }
            ]
          }]
        })
        var param = {
          "roomId": this.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/detail/queryLiveDiagnostic', param)
        this.getData.livingDiagnose = data
        this.moodTargetData = data.moods_target
        this.productTargetDataA = data.product_target
        var A = 0;
        var B = 0;
        var C = 0;
        var A1 = 0;
        var B1 = 0;
        var C1 = 0;

        this.totalSum = this.moodTargetData.length + this.productTargetData.length;
        this.productTargetData.forEach((item) => {
          if (item.count > item.avg) {
            A += 1
          } else if (item.count = item.avg) {
            B += 1
          } else if (item.count < item.avg) {
            C += 1
          }
        })
        this.productTargetData.forEach((item) => {



          if (item.count > item.avg) {
            A1 += 1
          } else if (item.count = item.avg) {
            B1 += 1
          } else if (item.count < item.avg) {
            C1 += 1
          }
        })
        this.gtAvg = A + A1;
        this.eqAvg = B + B1;
        this.ltAvg = C + C1;
      },
      //诊断评分(顶部仪表盘展示)
      async getLivingResults() {
        var param = {
          "roomId": this.roomId,
        }
        const {
          data
        } = await this.$get('/api/live/detail/queryLiveDiagnostic', param)
        this.getData.livingDiagnose = data
        var my = this
        var myChart = this.$echarts.init(this.$refs.livingResults)
        myChart.setOption({
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
              color: '#ffffff'
            },
            borderColor: 'rgba(0,0,0,0.7)'
          },
          series: [{
            //name: 'Pressure',
            max: 5, //刻度最大值
            type: 'gauge',
            itemStyle: {
              color: '#DD001B',
              shadowColor: '#DD001B',
            },
            progress: {
              show: true,
            },
            detail: {
              formatter: '{value}',
              fontSize: 30,
              offsetCenter: [0, 30],
            },
            title: { //标题文字控制
              fontSize: 12,
              offsetCenter: [0, 65]
            },
            axisTick: { //刻度样式
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: [{
              value: ovrScore,
              name: '综合得分'
            }]
          }]
        })
      },
      //带货小时榜
      async getHour() {
        var param = {
          "roomId": this.roomId
        }
        const {
          data
        } = await this.$get('/api/live/detail/chart', param)
        if (data != undefined) {
          this.dhHour = data
          let dhDate = [];
          this.dhHour.forEach((item) => {
            //item.crawl_time = tools.time_cycle(4, item.crawl_time)
            dhDate.push(item.crawl_time)
            dhData.push(item.efficiency_gmv)
          })
          this.chartData.hourData.date = dhDate
          this.chartData.hourData.data = [{
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,189,118,1)'
              }, {
                offset: 1,
                color: 'rgba(255,255,255,1)'
              }])
            },
            data: dhData,
            type: 'line',
            smooth: true
          }]
        }
      },

      //关闭弹窗
      closeDialog() {
        this.show.putawayShow = false
        this.show.explainShow = false
      },
      //跳转到商品详情
      linkGoods(e) {
        this.$router.push({
          path: "/goods/goods_detail",
          query: {
            id: e.dy_promotion_id
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "./livingShow.scss";

  .boxcard {
    height: 37px;
    width: 460px;
  }

  .boxcard2 {
    height: 37px;
    width: 300px;
  }

  .btn_hover:hover {
    cursor: pointer;
  }

  .living-show .self-con[data-v-972d187c] {
    width: 900px;
    height: 442px;
    align-items: flex-start;
    background-image: linear-gradient(#ffdede, #ffffff);
    margin-top: 50px;
    margin-left: 42px;
  }

  .comtotal {
    /deep/.el-table--small td {
      padding: 15px 4px !important;
    }
  }
</style>
