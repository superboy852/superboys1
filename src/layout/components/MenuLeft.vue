<template>
  <div class="menu-left" :class="val.menuIndex != '/work/index' ? 'rdx-radius-12' : '' ">
    <el-menu router :default-active="currentPath" :unique-opened='true' class="menu"
      @select="onMenu">
      <template v-for="(menu,index2) in menuList" v-if="val.menuIndex == menu.path || val.menuIndex === '/work/index'">
        <el-submenu :key="menu.id" :index="menu.id" v-if="menu.children">
          <template slot="title">
            <i class="tag-ico round flex align-center justify-center">
              <img :src="menu.img" style="width: 12px; height: 12px; ">
            </i>
            <span class="rdx-p-l-8">{{menu.title}}</span>
          </template>
          <el-menu-item :index="child.path" v-for="child in menu.children" :key="child.path"
            :class="['el-submenu__title', currentPath === child.path ? 'is-active': '']">
            <span>{{child.title}}
            </span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.path" :key="menu.id" class="menu-one"
          :class="['el-submenu__title', currentPath === menu.path ? 'is-active': '']">
          <i class="tag-ico round flex align-center justify-center">
            <img :src="menu.img" style="width: 12px; height: 12px; ">
          </i>
          <span slot="title" class="rdx-m-l-8">{{menu.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {
    menuShrinkWidth,
    menuEunfoldWidth
  } from '@/config'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import * as tools from '@/common/tools.js';

  export default {
    components:{tools},
    data() {
      return {
        val: {
          menuIndex: '/work/index', //导航下标
        },
        show:{
          menuShow:false,//导航重新加载
        },
        menuList: [{
            id: '0',
            title: '工作台',
            path: '/work/index',
            icon: 'el-icon-video-camera',
            img: "http://121.40.149.42:8086/img/menu_0.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
          },
          {
            id: '1',
            title: '直播',
            path: '/living',
            icon: 'el-icon-video-camera',
            img: "http://121.40.149.42:8086/img/menu_1.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '1-1',
                title: '直播搜索',
                path: '/living/living_search'
              },
              {
                id: '1-2',
                title: '红人看板',
                path: '/living/redboard'
              },
              {
                id: '1-4',
                title: '直播小时榜',
                path: '/living/living_hour'
              },
              {
                id: '1-5',
                title: '带货达人榜',
                path: '/living/living_delivery'
              },
              {
                id: '1-6',
                title: '今日直播带货量',
                path: '/living/living_today'
              },
              {
                id: '1-7',
                title: '直播商品榜',
                path: '/living/living_goods'
              },
              {
                id: '1-8',
                title: '直播分享榜',
                path: '/living/living_share'
              }
            ]
          },
          // {
          //   id: '12',
          //   title: '数据大盘',
          //   path: '/market',
          //   icon: 'el-icon-video-camera',
          //   img: "http://121.40.149.42:8086/img/menu_1.png",
          //   imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
          //   children: [{
          //       id: '12-1',
          //       title: '流量大盘',
          //       path: '/market/flow'
          //     }
          //   ]
          // },
          {
            id: '2',
            title: '商品',
            path: '/goods',
            icon: 'el-icon-goods',
            img: "http://121.40.149.42:8086/img/menu_2.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '2-1',
                title: '商品搜索',
                path: '/goods/goods_search'
              },
              {
                id: '2-2',
                title: '抖音销量榜',
                path: '/goods/goods_sales'
              },
              {
                id: '2-3',
                title: '抖音热推榜',
                path: '/goods/goods_hot'
              },
              {
                id: '2-4',
                title: '实时销量榜',
                path: '/goods/goods_realsales'
              },
              { id: '2-5', title: '全天销量榜', path: '/goods/goods_allday' },
              // { id: '2-6', title: '抖音小店榜', path: '/goods/goods_rank' },
              // { id: '2-7', title: '商品品牌榜', path: '/goods/goods_brand' },
            ]
          },
          {
            id: '3',
            title: '小店&品牌',
            path: '/shop',
            icon: 'el-icon-s-shop',
            img: "http://121.40.149.42:8086/img/menu_3.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '3-1',
                title: '品牌库',
                path: '/shop/brands_search'
              },
              {
                id: '3-2',
                title: '商品品牌榜',
                path: '/shop/brands_rank'
              },
              {
                id: '3-3',
                title: '抖音小店榜',
                path: '/shop/shop_rank'
              },
              // { id: '3-4', title: '品牌详情', path: '/shopbrand/brand' }
            ]
          },
          {
            id: '4',
            title: '达人',
            path: '/talent',
            icon: 'el-icon-user',
            img: "http://121.40.149.42:8086/img/menu_4.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '4-1',
                title: '抖音号搜索',
                path: '/talent/talent_search'
              },
              {
                id: '4-2',
                title: '涨粉达人排行榜',
                path: '/talent/talent_rise'
              },
              {
                id: '4-3',
                title: '点赞达人排行榜',
                path: '/talent/talent_like'
              },
              {
                id: '4-4',
                title: '评论达人排行榜',
                path: '/talent/talent_comment'
              },
              {
                id: '4-5',
                title: '分享达人排行榜',
                path: '/talent/talent_share'
              },
              {
                id: '4-6',
                title: '下载达人排行榜',
                path: '/talent/talent_download'
              },
              {
                id: '4-7',
                title: '指数达人排行榜',
                path: '/talent/talent_index'
              }
            ]
          },
          {
            id: '5',
            title: '视频&素材',
            path: '/video',
            icon: 'el-icon-video-play',
            img: "http://121.40.149.42:8086/img/menu_5.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '5-1',
                title: '视频搜索',
                path: '/video/video_search'
              },
              // { id: '5-2', title: '带货视频排行', path: '/video//video/comvideolist' },
              {
                id: '5-2',
                title: '带货视频榜',
                path: '/video/video_commoditysearch'
              },
              {
                id: '5-3',
                title: '热门视频榜',
                path: '/video/video_hot'
              }
            ]
          },
          {
            id: '6',
            title: '数据监测',
            path: '/data',
            icon: 'el-icon-s-data',
            img: "http://121.40.149.42:8086/img/menu_6.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [
              // { id: '6-1', title: '商品监测', path: '/data/goods' },
              {
                id: '6-1',
                title: '视频监测',
                path: '/data/data_video'
              },
              {
                id: '6-2',
                title: '直播监测',
                path: '/data/data_living'
              }
            ]
          },
          {
            id: '7',
            title: '工具',
            path: '/tool',
            icon: 'el-icon-s-tools',
            img: "http://121.40.149.42:8086/img/menu_7.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '7-1',
                title: '达人智能',
                path: '/tool/tool_mind'
              },

              // {
              //   id: '7-3',
              //   title: '查询商品',
              //   path: '/tool/tool_goods'
              // }
            ]
          },
          {
            id: '8',
            title: '星观学院',
            path: '/starview',
            icon: 'el-icon-school',
            img: "http://121.40.149.42:8086/img/menu_8.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '8-1',
                title: '数据报告',
                path: '/starview/starview_data'
              },
              {
                id: '8-2',
                title: '新手指南',
                path: '/starview/starview_guide'
              },
              {
                id: '8-3',
                title: '运营圈',
                path: '/starview/starview_operator'
              },
              {
                id: '8-4',
                title: '线上公开课',
                path: '/starview/starview_online'
              },
              {
                id: '8-4',
                title: '投诉建议',
                path: '/starview/complaint'
              },
            ]
          },
          {
            id: '9',
            title: '购买续费',
            path: '/renew',
            icon: 'el-icon-money',
            img: "http://121.40.149.42:8086/img/menu_9.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
              id: '9-1',
              title: '购买续费',
              path: '/renew/index'
            }]
          },
          {
            id: '10',
            title: '个人中心',
            path: '/my',
            icon: 'el-icon-s-custom',
            img: "http://121.40.149.42:8086/img/menu_10.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [{
                id: '10-1',
                title: '个人资料',
                path: '/my/my_user'
              },
              {
                id: '10-4',
                title: '消息通知',
                path: '/my/my_alerts'
              },
              {
                id: '10-2',
                title: '积分商城',
                path: '/my/my_score'
              },
              {
                id: '10-3',
                title: '我的订单',
                path: '/my/my_order'
              },
              // { id: '10-4', title: '子账号管理', path: '/my/my_account' },
              // { id: '10-5', title: '话题收藏', path: '/my/my_topic' },
              {
                id: '10-4',
                title: '商品收藏',
                path: '/my/my_goods'
              }
            ]
          },
          {
            id: '11',
            title: '推广返利',
            path: '/promotion',
            icon: 'el-icon-money',
            img: "http://121.40.149.42:8086/img/menu_11.png",
            imgActive: "http://121.40.149.42:8086/img/menu_1_1.gif",
            children: [
              {
              id: '11-1',
              title: '推广素材',
              path: '/promotion/index'
            },
            {
              id: '11-2',
              title: '推广分销',
              path: '/promotion/promotion_sales'
            },
            {
              id: '11-3',
              title: '业绩奖励',
              path: '/promotion/promotion_award'
            },
            {
              id: '11-4',
              title: '提现',
              path: '/promotion/promotion_deposit'
            }
            ]
          },
        ]
      }
    },
    watch: {
      localurl(val){
        this.val.menuIndex = val
      }
    },
    computed: {
      currentPath() {
        // return this.$route.path
        return this.$route.meta.detailShow ? this.$route.meta.detailPath : this.$route.path
      },
      // menusWidth() {
      //   return this.collapsed ? menuShrinkWidth : menuEunfoldWidth
      // },
      ...mapGetters(['collapsed','localurl'])
    },
    mounted() {
      //第一次进来读取网址匹配导航
      if(window.location.href.split('/')[3] != 'work'){
        this.val.menuIndex = '/' + window.location.href.split('/')[3]
      }else{
        this.val.menuIndex = '/work/index'
      }
      this.saveLocalurl(this.val.menuIndex)
      // setTimeout(()=>{
      //   this.val.menuIndex = this.localurl
      //   console.log("left2",this.val.menuIndex)
      // },100)
    },
    methods: {
      //点击导航
      onMenu(path,arr) {
        var index = arr[0]
        if(this.menuList[index].path == '/work'){
          this.val.menuIndex = '-1'
        }else{
          this.val.menuIndex = '1'
          this.val.menuIndex = this.menuList[index].path
        }
        this.saveLocalurl(this.menuList[index].path)
      },
      ...mapActions(['saveLocalurl']),
    }
  }
</script>

<style lang="scss" scoped>
  .menu-left {
    width: 158px;
    height: 100%;
    overflow-y: auto;
    background-color: #FFFFFF;

    // box-shadow: 3px 0 10px -5px #cccccc;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .menu-title {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 16px 0px 30px 0px;

    .logo {
      width: 118px;
      height: 39px;
    }

    .logo2 {
      width: 40px;
      height: 40px;
    }
  }

  .menu {
    border: none;
    background: transparent;
    padding-top: 20px;
    /deep/.el-menu--collapse {
      width: 90px !important;
    }

    /deep/.el-submenu__title {
      display: flex;
      align-items: baseline;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #45474d;
      padding: 0px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color .3s, background-color .3s, color .3s;
      box-sizing: border-box;
      white-space: nowrap;
      margin-bottom: 7px;
      border-radius: 0px;
      padding-left: 13px!important;
    }
    /deep/.el-submenu__title i {
      color: $rdx-main-color;
      font-weight: bold;
    }

    .el-submenu .el-submenu__title {
      min-width: initial;
      padding: 0 0 0 46px!important;
    }

    /deep/ .el-menu {
      background: transparent;
    }

    .el-submenu__title .status {
      padding-left: 12px;
    }
    .el-menu-item span{color: #737680;}
    .menu-one.el-menu-item span{color: #45474d;}
    /deep/ .el-submenu__title {
      &.is-active {
        color: $rdx-primary;
        background-color: #FDEFEF !important;
        font-weight: bold;
        .tag-ico {
          background-color: $rdx-primary;
        }
        span{color: $rdx-primary;}
      }
    }

    /deep/ .el-submenu__title:hover {
      color: $rdx-primary;
      background: transparent;
      span{color: $rdx-primary;}
    }

    /deep/.el-submenu__title:hover .tag-ico {
      background-color: $rdx-primary;
    }

    /deep/.el-submenu__title:hover .el-icon-arrow-down {
      color: $rdx-primary;
    }
    .tag-ico {
      position: relative;
      top: -1px;
      background-color: $rdx-tips-color;
      width: 24px;
      height: 24px;
    }
    .el-submenu.is-opened .tag-ico {
      background-color: $rdx-primary;
      width: 24px;
      height: 24px;
    }

    .el-submenu.is-opened div span {
      color: $rdx-primary;
      font-weight: bold;
    }

    // /deep/.el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow{color: #000000;}
    /deep/.el-submenu__icon-arrow {
      font-size: 10px;
      margin-right: -8px!important;
    }

    /deep/.is-opened .el-submenu__icon-arrow {
      color: $rdx-primary;
    }
  }
</style>
