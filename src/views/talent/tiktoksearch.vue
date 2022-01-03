<template>
  <div class="box">
    <div class="select-box2">
      <search-item @clickKey='clickKey' :keywordInit="params.keyword" searchType="4"></search-item>
      <goods-class @onTalent="handleStar" @onProduct="handleProductCate" classShow='3' class="rdx-p-t-5" ></goods-class>
    </div>
    <div class="select-box">
      <span class="name" style="margin-top: 3px;">筛选条件：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <div class="rdx-m-r-20 ">
          <span class="select_title">性别：</span>
          <el-select @change="clickGender" v-model="gender" size="mini" placeholder="请选择" >
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in advancedData.genders" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="rdx-m-r-20 ">
          <span class="select_title">年龄：</span>
          <el-select @change="clickAges" v-model="age" size="mini" placeholder="请选择">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in advancedData.ages" :key="item.key" :label="item.value" :value="item.key"> </el-option>
          </el-select>
        </div>
        <div class="rdx-m-r-20 ">
          <span class="select_title">地区：</span>
          <el-cascader clearable v-model="reg" :options="advancedData.regions" :props="optionProps" size="mini" @change="handleChange" ></el-cascader>
          <span class="select_title rdx-m-l-20">粉丝数：</span>
          <el-select @change="clickFollowCount" v-model="follower_count" size="mini" placeholder="请选择" >
            <el-option v-for="item in advancedData.followerCount" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="rdx-m-r-20 ">
          <span class="select_title">认证类型：</span>
          <el-select @change="clickVerType" v-model="verification_type" size="mini" placeholder="请选择" >
            <el-option v-for="item in advancedData.verificatType" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="rdx-m-r-20 ">
          <span class="select_title">带货口碑：</span>
          <el-select @change="clickRepLevel" v-model="reputation_level" size="mini" placeholder="请选择"
            style=" margin-right: 20px">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in advancedData.repLevel" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="select-box">
      <span class="name">高级筛选：</span>
      <div class="rdx-flex rdx-flex-1 rdx-flex-wrap">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="有联系方式" class="rdx-m-b-10" @change="clickContact"></el-checkbox>
          <el-checkbox label="商品橱窗达人" @change="clickOpenShow"></el-checkbox>
          <el-checkbox label="直播达人" @change="clickLiveTalent"></el-checkbox>
          <el-checkbox label="带货直播达人" @change="clickDHLiveTalent"></el-checkbox>
          <el-checkbox label="星图达人" @change="clickMapTalent"></el-checkbox>
          <el-checkbox label="低粉爆款达人" @change="clickLFHGTalent"></el-checkbox>
          <el-checkbox label="品牌自播" @change="clickBrand"></el-checkbox>
          <el-checkbox label="店播达人" @change="clickShopAuthorTalent"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="rdx-p-16 " style="position: fixed; bottom: 30px; left: 10px; background-color: #FFFFFF; width: 260px;border: 1px solid red; z-index: 99;" v-if="arrList!=''">
      <div class="flex justify-between rdx-m-b-20">
        <div class="rdx-font-14 rdx-main-color">抖音号对比{{arrList.length}}/5</div>
        <div class="rdx-font-12 rdx-tips-color button-a" @click="clickClean">清空</div>
      </div>
      <div class="flex align-center rdx-m-t-20 rdx-m-b-10 position-re">
        <div style="width: 112px;" class="flex position-ab" :style="index == 0 ? 'z-index:10; left:0px' : index == 1 ? 'z-index:11; left:15px;' : index == 2 ? 'z-index:11; left:30px;' : index == 3 ? 'z-index:11; left:45px;' : 'z-index:11; left:60px;'" v-for="(item,index) in arrList" :key="index">
          <div>
            <img :src="item.avatar" class="round" style="width: 30px;height: 30px;"/>
          </div>
        </div>
        <div class="rdx-p-l-18 rdx-p-r-12 button-a position-ab" style="left: 100px;"> > </div>
        <div style="width: 90px;height: 36px;line-height: 36px;left: 140px;" class="position-ab" >
          <el-button type="danger" :disabled="show.checkOk" class="rdx-primary-bg flex justify-center" style="width: 90px;"  @click="clickPktc">
            <span>对比</span>
          </el-button>
        </div>
      </div>
    </div>

    <el-table v-loading="loading" :data="tableData" class="sticky-head table-margin talent-one" @sort-change="handlesortChange">
      <template slot="empty" id="tableRef">
        <no-data marginTop="0" class="rdx-p-t-30"></no-data>
      </template>
      <el-table-column label="达人">
        <template slot-scope="{ row }">
          <div class="info rdx-flex info-three">
            <img :src="row.avatar" alt class="circularHead" @click="jumpurl(row.author_id)" />
            <div class="rdx-flex-col rdx-m-l-10">
              <div class="rdx-flex rdx-flex-wrap">
                <span class="name rdx-m-r-4" @click="jumpurl(row.author_id)">{{ row.nickname }}</span>
                <span class="iconfont icon-e951 rdx-font-14" style="margin-left: 10px;margin-right: 8px;"></span>
                <span class="iconfont icon-e610 rdx-primary rdx-font-14 flex-direction"></span>
              </div>
              <div class="dyids">
                <span>抖音号:</span>
                <span>{{row.unique_id}}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" align="center" prop="follower_count" label="粉丝数" width="120"></el-table-column>
      <el-table-column sortable="custom" align="center" prop="follower_incr" label="粉丝增量" width="120"></el-table-column>
      <el-table-column sortable="custom" align="center" prop="aweme_digg_medium" label="视频预期点赞" width="140">
      </el-table-column>
      <el-table-column sortable="custom" align="center" prop="aweme_digg_follower_ration" label="平均赞粉比" width="130">
      </el-table-column>
      <el-table-column sortable="custom" align="center" prop="live_pv_medium" label="直播预期观看人数" width="160">
      </el-table-column>
      <el-table-column sortable="custom" align="center" prop="live_average_interact_30" label="直播互动率" width="130">
      </el-table-column>
      <el-table-column sortable="custom" align="center" prop="live_average_amount_30" label="近30日直播场均销售额" width="190">
      </el-table-column>
      <el-table-column align="center" prop="operation" label="操作" width="130" >
        <template slot-scope="scope" class="w-100 flex align-center justify-center">
          <div class="w-100 flex align-center justify-center">
<!--            <span class="tiktok-buttonA flex align-center justify-center" slot="reference" @click="clickPk(scope.row)">
              <img src="../../assets/imgs/talent_fun_1.png" style="width: 14px; height: 10px;">
            </span> -->
            <el-tooltip class="item" effect="dark" content="PK" placement="bottom">
              <span class="flex align-center justify-center tiktok-buttonA round rdx-light-color">
                <img src="../../assets/imgs/talent_fun_1.png" style="width: 14px; height: 10px;">
              </span>
            </el-tooltip>
            <el-tooltip class="rdx-m-l-10" effect="dark" content="收藏" placement="bottom">
              <span class="flex align-center justify-center round" :class="scope.row.is_collect ? 'tiktok-buttonA' : 'tiktok-buttonB'" @click="clickCollect(scope.row,scope.$index)">
               <i class="iconfont icon-e629 rdx-light-color rdx-font-14"></i>
              </span>
            </el-tooltip>
            <el-tooltip class="rdx-m-l-10" effect="dark" content="相似" placement="bottom">
              <span class="flex align-center justify-center tiktok-buttonC round rdx-light-color">
                <img src="../../assets/imgs/talent_fun_3.png" style="width: 15px; height: 12px;">
              </span>
            </el-tooltip>
<!--            <span class="tiktok-buttonB flex align-center justify-center"  @click="clickCollect(scope.row,scope.$index)">
              <img src="../../assets/imgs/talent_fun_2.png" style="width: 12px; height: 10px;">
            </span> -->
<!--            <span class="tiktok-buttonC flex align-center justify-center rdx-m-l-20" @click="clickSimila(scope.row)">
              <img src="../../assets/imgs/talent_fun_3.png" style="width: 14px; height: 10px;">
            </span> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- PK页面 -->


    <!-- pk弹窗-->
    <div>
      <el-dialog :visible.sync="pkPage" @close="closeDialog" width="1000px">
          <div class="pk_tab" style="overflow-y: scroll;height: 600px;">
            <table class="w-100" >

              <tbody>
                <tr class="flex" >
                  <th style="width: 146px;"></th>
                  <th class="rdx-flex-1" v-for="(items,index) in pkData" :key="index">
                    <div style="padding: 8px 5px;" >
                      <div class="flex justify-center">
                        <img :src="items.avatar" class="round" style="width: 44px;height: 44px;"/>
                      </div>
                      <div class="rdx-font-14 rdx-main-color font-strong flex justify-center" >
                        <span class="rdx-line-1" style="width: 75px;">
                          {{items.nickname}}
                        </span>
                        <span class="rdx-m-l-6">
                          <img src="../../assets/imgs/work_left_5.png" style="width: 16px;16px"/>
                        </span>
                        <span class="rdx-m-l-6">
                          <img src="../../assets/imgs/work_left_6.png" style="width: 18px;height: 16px;"/>
                        </span>
                      </div>
                      <div class="rdx-font-12 rdx-tips-color flex justify-center">
                        {{items.unique_id}}
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-font-14 font-strong rdx-main-color">基础信息</div>
                  </td>
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class=" rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">所属机构</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">{{items.mcn_id == null?'暂无':''}}</div>
                  </td>
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">分类</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">剧情搞笑</div>
                  </td>
                  <!-- <td class="rdx rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-main-color">带货</div>
                  </td> -->
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">粉丝数</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">{{items.follower_count}}</div>
                  </td>
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">粉丝团</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">{{items.fans_club_total}}</div>
                  </td>
                </tr>

                <tr>
                  <td class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-font-14 font-strong rdx-main-color">视频数据</div>
                  </td>
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">视频个数</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">平均视频点赞数</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">平均视频时长</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">平均赞粉比</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">{{items.aweme_digg_follower_ration == null? '暂无': items.aweme_digg_follower_ration}}</div>
                  </td>

                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">周均视频个数</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">月均视频个数</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天预估销售额</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-20 rdx-p-b-30">
                    <div class="rdx-tips-color">
                      <div>近30天销售额</div>
                      <div>TOP5商品</div>
                    </div>
                  </td>
                  <td class="flex align-center rdx-flex-1 rdx-p-t-4 rdx-p-b-4" v-for="(items,index) in pkData" :key="index">
                    <pk-Amount-Pie></pk-Amount-Pie>
                  </td>
                </tr>

                <tr>
                  <td class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-font-14 font-strong rdx-main-color">直播数据</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">累计直播场次</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">暂无</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天场均销量</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">468.2w</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天场均销售额</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">{{items.month_avg_live_amount}}</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天场均UV价值</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">468.2w</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天场均停留时长</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">暂无</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-20 rdx-p-b-30">
                    <div class="rdx-tips-color">
                      <div>近30天销售额</div>
                      <div>TOP5商品</div>
                    </div>
                  </td>
                  <td class="flex align-center rdx-flex-1 rdx-p-t-4 rdx-p-b-4" v-for="(items,index) in pkData" :key="index">
                    <pk-Amount-Pie></pk-Amount-Pie>
                  </td>
                  <!-- <td class="rdx-text-center rdx-flex-1">
                    <pk-Amount-Pie></pk-Amount-Pie>
                  </td> -->
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天带货转化率</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">462.2w</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">平均开播时长</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">3时50分</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">本周场次</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">6</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">周均开播场次</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">8</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">本月场次</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">30</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">月均开播场次</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">25</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天场均UV</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">暂无</div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-tips-color">近30天观众互动率</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="rdx-main-color">15</div>
                  </td>
                </tr>

                <tr>
                  <td class="rdx-text-center rdx-p-t-10 rdx-p-b-10">
                    <div class="rdx-font-14 font-strong rdx-main-color">粉丝数据</div>
                  </td>
                </tr>

                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-30 rdx-p-b-30">
                    <div class="rdx-tips-color">粉丝性别</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-26 rdx-p-b-10 position-re" v-for="(items,index) in pkData" :key="index">
                    <div class="flex align-center justify-center">
                      <i class="iconfont icon-e8f7 rdx-font-20" style="color: #4a96fa;"></i>
                      <div class="man-pk position-re">
                        <div class="position-ab man-item-pk" style="width: 30%;"></div>
                      </div>
                      <i class="iconfont icon-e654 rdx-font-24" style="color: #FF6968;"></i>
                    </div>
                    <div class="flex justify-between">
                      <div style="margin-left: 36px;">30%</div>
                      <div style="margin-right: 36px;">70%</div>
                    </div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-30 rdx-p-b-30">
                    <div class="rdx-tips-color">年龄TOP3</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="flex justify-center rdx-font-12">
                      <div>41-50</div>
                      <div class="rdx-m-l-80">25.24%</div>
                    </div>
                    <div class="flex justify-center rdx-font-12">
                      <div>31-40</div>
                      <div class="rdx-m-l-80">24.53%</div>
                    </div>
                    <div class="flex justify-center rdx-font-12">
                      <div>21-30</div>
                      <div class="rdx-m-l-80">25.24%</div>
                    </div>
                  </td>
                </tr>
                <tr class="flex align-center rdx-font-14">
                  <td style="width: 146px;" class="rdx-text-center rdx-p-t-30 rdx-p-b-30">
                    <div class="rdx-tips-color">地域TOP3</div>
                  </td>
                  <td class="rdx-text-center rdx-flex-1 rdx-p-t-10 rdx-p-b-10" v-for="(items,index) in pkData" :key="index">
                    <div class="flex justify-center rdx-font-12">
                      <div>山东</div>
                      <div class="rdx-m-l-80">25.24%</div>
                    </div>
                    <div class="flex justify-center rdx-font-12">
                      <div>河南</div>
                      <div class="rdx-m-l-80">24.52%</div>
                    </div>
                    <div class="flex justify-center rdx-font-12">
                      <div>江苏</div>
                      <div class="rdx-m-l-80">25.24%</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </el-dialog>
    </div>

    <div class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10"
      v-if="show.tableFoot=='-1' && tableData !='' ">
      <img src="../../assets/imgs/loading.gif" style="width: 20px; height: 20px;">
      <span class="rdx-p-l-20">加载更多</span>
    </div>
    <p class="flex justify-center align-center rdx-p-t-10 rdx-p-b-10 rdx-tips-color" v-if="show.tableFoot == '0'">
      --我是有底线的---</p>
    <div class="flex flex-direction justify-center align-center rdx-p-t-20"
      v-if="show.tableFoot == '1'">
      <span class="rdx-tips-color">您当前是 游客 权限不足，请先登录</span>
      <div class="button-all rdx-line-height-40 rdx-radius-20 rdx-m-t-10" style="width: 160px; text-align: center;"
        @click="onLongin">立即登录</div>
    </div>
    <div class="footer flex justify-center align-center"
      v-if="show.tableFoot == '2'">
      <div class="search-vip">当前可查看{{tableData.length}}个示例，<span style="color: #FFC11E;">请购买或升级会员，</span>可查看更多数据
      </div>
      <div class="search-vip-but flex justify-center align-center font-strong rdx-primary rdx-m-l-40 button-a"
        @click="jumpurlVip()">立即开通</div>
    </div>

  </div>
</template>
<script>
  import { mapGetters, mapActions} from 'vuex'
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '../../components/noData.vue'
  import goodsClass from '../../components/goodsClass.vue'
  import pkAmountPie from './components/pkAmountPie.vue'
  export default {
    components:{
      searchItem,noData,goodsClass,pkAmountPie
    },
    data() {
      return {
        indexMethod:0,
        productAllShow: false,
        starAllShow: false,
        searchConditions: {},
        isCategoryAll: false,
        params: {
          page: 1,
          size: 10,
          starCategory: '',
          productCategory: '',
        },
        gender: '全部',
        age: '不限',
        follower_count: '不限',
        verification_type: '全部',
        reputation_level: '不限',
        categoriesArr: [],
        checkList: [],
        tableData: [],
        similarData: [],
        starCategory: [],
        productCategory: [],
        advancedData: {
          genders: [],
          ages: [],
          followerCount: [],
          repLevel: [],
          verificatType: [],
          regions: [],
        },
        optionProps: {
          label: 'key',
          value: 'key',
          children: 'value'
        },
        reg: [],
        total: 0,
        keyword:'',
        loading:false,
        show: {
          tableFoot: '-2', //表格底部滚动显示  -1加载中 0 到底  1登录 2权限不足
          scrollStop:false,
          similaShow:true,
          checkOk:true,//检查pk是否有2个以上
        },
        pkPage:false,     //pk弹窗
        pkWindow: false,  //pk窗口
        arrList: [],
        authorId: '',
        // arrss: ["1664992598","ztt1885888"],
        pkData: [], //pk数据
        arrays: [], //pk参数
      }
    },
    computed: {...mapGetters(['tokenOk', 'token'])},
    created() {
      window.addEventListener('scroll', this.getScroll, false)
      this.getCategoryData()
      if(tools.getQueryString('keyword')){
        this.params.keyword = tools.getQueryString('keyword')
        this.loadData()
      }else{
        this.loadData()
      }
    },
	destroyed(){
	  window.removeEventListener('scroll', this.getScroll)
	},
    mounted() {
      setTimeout(()=>{
        console.log("tokenOkSearch",this.tokenOk)
      },1000)
    },
    methods: {
      //关闭弹窗
      closeDialog(){
        this.pkPage =false
        this.arrList = []
      },
      //清空
      clickClean(){
        this.arrList =[]
      },
      //取消收藏
      async getCancelCollection() {
        var param ={
          "collectId": this.authorId,
          "collectType":1,
        }
        const {
          data
        } = await this.$get('/api/user/user_collection/cancel_collection', param)

      },
      //添加收藏
      async getAddCollection() {
        var param ={
          "dataId": this.authorId,
          "collectType":1,
        }
        const {
          data
        } = await this.$post('/api/user/user_collection/add_collection', param)
        console.log('data',data)

      },
      //点击收藏
      clickCollect(row,index){
        this.authorId = row.author_id
        if(row.is_collect){
          this.tableData[index].is_collect = false
          this.getCancelCollection()
        }else{
          this.tableData[index].is_collect = true;
          this.getAddCollection()
          this.$forceUpdate()
        }
        this.$set(this.tableData,index,row)
      },
      //相似按钮点击
      clickSimila(row){
        console.log("ref",document.getElementsByClassName('el-table'))
        var tableNew = document.getElementsByClassName('el-table')
        console.log("tableNew.rows.length",document.getElementsByClassName('el-table-column'))

        if(row.check == false){
          row.check = true
          window.removeEventListener('scroll', this.getScroll)
          //this.tableData =[],
          localStorage.setItem('talentS', JSON.stringify(row))
          this.loadData()

          setTimeout(()=>{
            var listOne = JSON.parse(localStorage.getItem('talentS'))
            this.tableData.splice(0,0,listOne)
            //var text = "<tr><td>黄圣依相似达人</td></tr>"
            //console.log('本人',text)
            //this.tableData.push(text)
          },1000)
        }else{
          window.addEventListener('scroll', this.getScroll, false)
          row.check = false
          this.loadData()
        }

      },
      //达人pk数据
      async getAuthorPk() {
        var param ={
          "uniqueId": this.arrays,
        }
        const {
          data
        } = await this.$post('/api/user/authorPk', param)
        console.log('pk结果',param,data)
        this.pkData = data.data
        console.log('pk结果111',this.pkData)


      },
      //pk弹窗展示
      clickPktc(){
        this.arrays =[];
        for (var i = 0; i < this.arrList.length; i++) {
          this.arrays.push(this.arrList[i].unique_id)
        }
        //console.log('111',this.arrays)
        this.pkPage=true
        this.getAuthorPk()
      },
      //pk页面点击
      clickPk(row){

        var f = true;
        // var arrs = JSON.parse(localStorage.getItem('comparePanels'));
        if(this.arrList.length != 0){
          for (var i = 0; i < this.arrList.length; i++) {
            // console.log("aaaa"+ this.arrList[i].author_id)
            if(row.author_id == this.arrList[i].author_id){
               this.arrList.splice(i,1)
               f = false;
                //console.log('测试23232',this.arrList);
                 break;
            }
          }

          if(f){
            if(this.arrList.length<5){
              this.arrList.push(row)
            }else{
              this.$message.error('抖音号对比已达上限')
            }

            //console.log('测试1',this.arrList);
          }

        }else{
          this.arrList.push(row)
          //console.log('rowfdfs',this.arrList);
        }
        this.pkWindow=true
        console.log("this.pkPage",this.pkPage)
        if(this.arrList.length > 1){
          this.show.checkOk = false
        }else{
          this.show.checkOk = true
        }

        // localStorage.setItem('comparePanels', JSON.stringify(this.arr))
        // console.log(JSON.parse(localStorage.getItem('talentS')))
      },
      //升降序控制
      // headercellstyle({columnIndex}){
      //       console.log('11111sa',columnIndex)
      //       if(columnIndex==2){
      //         console.log('1111qqq')
      //         return "color:#DD001B;"
      //       }
      // },
      //获取地区信息
      handleChange(e) {
        this.params.province=e[0]
        this.params.city=e[1]
        this.loadData()
      },
      //获取详细数据
      async loadData() {
        this.params.page = 1
        this.loading = true
        const {
          data
        } = await this.$get('/api/author/search', this.params)
        console.log('111',data)
        this.tableData = []
        if(data!=undefined){
          this.loading = false
          this.params.page = 2
          this.tableData = data.list
          this.tableData.forEach((item)=>{
            item.aweme_digg_follower_ration = item.aweme_digg_follower_ration+'%';
            item.live_average_interact_30 = item.live_average_interact_30+'%';
            item.is_collect = false;
          })
          console.log("tableData",this.tableData)
          this.params.size = data.page_info.pageSize
          if (this.tokenOk == '51000') {
            this.show.tableFoot = '1' //需要登录
            return;
          } else if (this.tokenOk == '52000') {
            this.show.tableFoot = '2' //权限不足
            return;
          }
        }

      },
      //获取筛选条件信息
      async getCategoryData() {
        const {
          data
        } = await this.$get('/api/common/searchConditions')
        this.productCategory = data.productCategory
        this.starCategory = data.starCategory
        //获取筛选条件信息
        this.advancedData.ages = data.ages
        this.advancedData.genders = data.genders
        this.advancedData.genders.forEach((item) => {
          item.value = (item.value).slice(0, 1)
        })
        this.advancedData.followerCount = data.followers
        this.advancedData.repLevel = data.reputationLevel
        this.advancedData.verificatType = data.verificationType
        // 地区遍历
        var arrList = []
        data.regions.forEach((item) => {
          var p = {
            key: item.key,
            value: []
          }
          item.value.forEach((itemS) => {
            if(itemS == ''){
              p.value.push({
                'key': '全部'
              })
            }else{
              p.value.push({
                'key': itemS
              })
            }
          })
          arrList.push(p)
        })
        this.advancedData.regions = arrList
        //console.log("arrList", arrList)
      },
      //商品升序和降序
      handlesortChange(column) {
        if (column.order === "descending") {
          this.params.order = 'desc'
          this.params.sort = column.prop
        } else {
          this.params.order = 'asc'
          this.params.sort = column.prop
        }
        this.loadData()
      },
      //跳转页面
      jumpurl(id) {
         var url = this.$router.resolve({path: '/talent/talent_detail',query: {id: id}})
         window.open(url.href, '_blank')
      },
      //跳转会员付费页面
      jumpurlVip(){
        this.$router.push({
          path: "/renew/index",

        })
      },
      //点击达人分类
      handleStar(name) {
        this.params.starCategory = name
        this.loadData()
      },
      //获取带货商品数据
      handleProductCate(id) {
        this.params.productCategory = id
        this.loadData()
      },
      //获取联系方式
      clickContact(e) {
        if (e === true) {
          this.params.contact = 1
        } else {
          this.params.contact = 0
        }
        this.loadData()
      },
      //获取商品橱窗达人
      clickOpenShow(e) {
        if (e === true) {
          this.params.isCommerce = 1
        } else {
          this.params.isCommerce = 0
        }
        this.loadData()
      },
      //直播达人
      clickLiveTalent(e) {
        if (e === true) {
          this.params.isLive = 1
        } else {
          this.params.isLive = 0
        }
        this.loadData()
      },
      //带货直播达人
      clickDHLiveTalent(e) {
        if (e === true) {
          this.params.isSellLive = 1
        } else {
          this.params.isSellLive = 0
        }
        this.loadData()
      },
      //星图达人
      clickMapTalent(e) {
        if (e === true) {
          this.params.isStarAuthor = 1
        } else {
          this.params.isStarAuthor = 0
        }
        this.loadData()
      },
      //低粉爆款
      clickLFHGTalent(e) {
        if (e === true) {
          this.params.isLowFansHighGmv = 1
        } else {
          this.params.isLowFansHighGmv = 0
        }
        this.loadData()
      },
      //品牌自播
      clickBrand(e) {
        if (e === true) {
          this.params.isBrandSelfAuthor = 1
        } else {
          this.params.isBrandSelfAuthor = 0
        }
        this.loadData()
      },
      //店播达人
      clickShopAuthorTalent(e) {
        if (e === true) {
          this.params.isShopAuthor = 1
        } else {
          this.params.isShopAuthor = 0
        }
        this.loadData()
      },

      //筛选条件：性别
      clickGender(e) {
        this.params.gender = e
        this.loadData()
      },
      //筛选条件：年龄
      clickAges(e) {
        this.params.age = e
        this.loadData()
      },
      //筛选条件：粉丝性别
      clickFansGenders(e) {
        this.params.fansGender = e
        this.loadData()
      },
      //筛选条件：粉丝年龄
      clickFansAges(e) {
        this.params.fansAge = e
        this.loadData()
      },
      //筛选条件：粉丝数
      clickFollowCount(e) {
        this.params.followerCount = e
        this.loadData()
      },
      //筛选条件：地区
      clickPlatfoms(e) {
        //this.params.gender=e
        this.loadData()
      },
      //筛选条件：口碑
      clickRepLevel(e) {
        this.params.reputationLevel = e
        this.loadData()
      },
      //筛选条件：认证
      clickVerType(e) {
        this.params.verificationType = e
        this.loadData()
      },
      //获取分页数据
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.loadData()
      },
      //点击登录
      onLongin() {
        this.saveTokenOk("51000")
      },
      //点击搜索
      clickKey(val) {
        this.params.keyword = val
        this.loadData()
      },
      //获取滚动条
      getScroll() {
        if(!this.show.scrollStop){
          var scrollHeight = document.documentElement.scrollHeight;
          var scrollTop = document.documentElement.scrollTop;
          var objHeight = document.documentElement.offsetHeight;
          if (scrollHeight <= (scrollTop + objHeight + 200) && !this.show.scrollStop) {
            this.show.scrollStop = true
            setTimeout(() => {
              this.getMore()
            }, 100)
          }
        }
      },
      async getMore() {
        const {
          data
        } = await this.$get('/api/author/search', this.params)
        if (this.tokenOk == '51000') {
          this.show.tableFoot = '1' //需要登录
          return;
        } else if (this.tokenOk == '52000') {
          this.show.tableFoot = '2' //权限不足
          return;
        }
        if (data == undefined) {
          this.show.tableFoot = '0' //到底
          return;
        }
        data.list.forEach((item)=>{
          item.aweme_digg_follower_ration = item.aweme_digg_follower_ration+'%';
          item.live_average_interact_30 = item.live_average_interact_30+'%';
          item.is_collect = false;
        })
        this.show.tableFoot = '-1' //加载中
        this.params.page++; //每触底一次
        // this.tableData =this.tableData.concat(data.list)
		document.documentElement.scrollTop = document.documentElement.scrollTop - 100
        this.tableData = [...this.tableData, ...data.list]
        this.show.scrollStop = false
        console.log("this.tableData", this.tableData,this.tokenOk)
      },
      ...mapActions(['saveTokenOk']),
    },

  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
  .pk_tab{
    table{border-collapse:collapse;border-spacing:0;border-left:1px solid #e5e5;border-top:1px solid #e5e5e5;}
    th,td{border-right:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;}
    th{font-weight:bold;}

    .tr-bg{
      background: #fafafa;
    }
  }
</style>
