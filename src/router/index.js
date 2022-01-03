import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

const routes = [
  {
    path: '/work',
    component: Layout,
    meta: { title: '工作台' },
    children: [
      { path: 'index', component: () => import('@/views/work/index'), meta: { title: '工作台' } }
    ]
  },
  {
    path: '/living',
    component: Layout,
    meta: { title: '直播' },
    children: [
      { path: 'living_search', component: () => import('@/views/living/search'), meta: { title: '直播搜索' } },
      { path: 'redboard', component: () => import('@/views/living/redboard'), meta: { title: '红人看板' } },
      { path: 'living_hour', component: () => import('@/views/living/livinghour'), meta: { title: '直播小时榜' } },
      { path: 'living_delivery', component: () => import('@/views/living/livingdelivery'), meta: { title: '带货达人榜' } },
      { path: 'living_today', component: () => import('@/views/living/livingtoday'), meta: { title: '今日直播带货量' } },
      { path: 'living_goods', component: () => import('@/views/living/livingoods'), meta: { title: '直播商品榜' } },
      { path: 'living_share', component: () => import('@/views/living/livingshare'), meta: { title: '直播分享榜' } },
    ]
  },
  {
    path: '/market',
    component: Layout,
    meta: { title: '数据大盘' },
    children: [
      { path: 'flow', component: () => import('@/views/market/flow'), meta: { title: '流量大盘' } }

    ]
  },
  {
    path: '/goods',
    component: Layout,
    meta: { title: '商品' },
    children: [
      { path: 'goods_search', component: () => import('@/views/goods/goodsearch'), meta: { title: '商品搜索' } },
      { path: 'goods_sales', component: () => import('@/views/goods/tiktoksales'), meta: { title: '抖音销量榜' } },
      { path: 'goods_hot', component: () => import('@/views/goods/tiktokhot'), meta: { title: '抖音热推榜' } },
      { path: 'goods_realsales', component: () => import('@/views/goods/realsales'), meta: { title: '实时销量榜' } },
      { path: 'goods_allday', component: () => import('@/views/goods/alldaysales'), meta: { title: '全天销量榜' } },
      { path: 'goods_rank', component: () => import('@/views/goods/dyshop'), meta: { title: '抖音小店榜' } },
      { path: 'goods_brand', component: () => import('@/views/goods/goodsbrand'), meta: { title: '商品品牌榜' } },
    ]
  },
  {
    path: '/shop',
    component: Layout,
    meta: { title: '小店品牌' },
    children: [
      { path: 'brands_search', component: () => import('@/views/shopbrand/shopbrand'), meta: { title: '品牌库' } },
      { path: 'brands_rank', component: () => import('@/views/shopbrand/brandrank'), meta: { title: '商品品牌榜' } },
      { path: 'shop_rank', component: () => import('@/views/shopbrand/shoprank'), meta: { title: '抖音小店榜' } },
    ]
  },
  {
    path: '/talent',
    component: Layout,
    meta: { title: '达人' },
    children: [
      { path: 'talent_search', component: () => import('@/views/talent/tiktoksearch'), meta: { title: '抖音号搜索' } },
      { path: 'talent_rise', component: () => import('@/views/talent/powderlist'), meta: { title: '涨粉达人排行榜' } },
      { path: 'talent_like', component: () => import('@/views/talent/pointlist '), meta: { title: '点赞达人排行榜' } },
      { path: 'talent_comment', component: () => import('@/views/talent/commentlist'), meta: { title: '评论达人排行榜' } },
      { path: 'talent_share', component: () => import('@/views/talent/sharelist'), meta: { title: '分享达人排行榜' } },
      { path: 'talent_download', component: () => import('@/views/talent/downloadlist'), meta: { title: '下载达人排行榜' } },
      { path: 'talent_index', component: () => import('@/views/talent/indexlist'), meta: { title: '指数达人排行榜' } },
    ]
  },
  {
    path: '/video',
    component: Layout,
    meta: { title: '视频素材' },
    children: [
      { path: 'video_search', component: () => import('@/views/video/videosearch'), meta: { title: '视频搜索' } },
      { path: 'video_commodity', component: () => import('@/views/video/comvideolist'), meta: { title: '带货视频排行' } },
      { path: 'video_commoditysearch', component: () => import('@/views/video/comvideosearch'), meta: { title: '带货视频榜' } },
      { path: 'video_hot', component: () => import('@/views/video/hotvideo'), meta: { title: '热门视频榜' } }
    ]
  },
  {
    path: '/data',
    component: Layout,
    meta: { title: '数据监测' },
    children: [
      // { path: 'goods', component: () => import('@/views/data/goods'), meta: { title: '商品监测' } },
      { path: 'data_video', component: () => import('@/views/data/video'), meta: { title: '视频监测', requireAuth: true } },
      { path: 'data_living', component: () => import('@/views/data/living'), meta: { title: '直播监测', requireAuth: true } }
    ]
  },
  {
    path: '/tool',
    component: Layout,
    meta: { title: '工具' },
    children: [{ path: 'tool_mind', component: () => import('@/views/tool/obj-talentIntelligence'), meta: { title: '工具-达人智能' } },
      { path: 'tool_video', component: () => import('@/views/tool/obj-extractionVideo'), meta: { title: '工具-提取视频' } },
      { path: 'tool_goods', component: () => import('@/views/tool/obj-queryGoods'), meta: { title: '工具-查询商品' } }]
  },
  {
    path: '/starview',
    component: Layout,
    meta: { title: '星观学院' },
    children: [
      { path: 'starview_data', component: () => import('@/views/starview/datareport'), meta: { title: '数据报告' } },
      { path: 'starview_detail', component: () => import('@/views/starview/datareportShow'), meta: { title: '数据报告详情',detailShow:true, detailPath:'/starview/starview_data' } },
      { path: 'starview_guide', component: () => import('@/views/starview/greenhand'), meta: { title: '新手指南' } },
      { path: 'guide_detail', component: () => import('@/views/starview/greenhandShow'), meta: { title: '新手指南详情',detailShow:true, detailPath:'/starview/starview_guide' } },
      { path: 'starview_operator', component: () => import('@/views/starview/operatcircle'), meta: { title: '运营圈' } },
      { path: 'starview_online', component: () => import('@/views/starview/onlinecourses'), meta: { title: '线上公开课' } },
      { path: 'online_detail', component: () => import('@/views/starview/onlinecoursesShow'), meta: { title: '线上公开课详情页',detailShow:true, detailPath:'/starview/starview_online' } },
      { path: 'news_detail', component: () => import('@/views/starview/news_detail'), meta: { title: '资讯详情页',detailShow:true, detailPath:'/starview/starview_guide' } },
      { path: 'news_list', component: () => import('@/views/starview/news_list'), meta: { title: '咨讯列表页' } },
      { path: 'complaint', component: () => import('@/views/starview/complaint'), meta: { title: '投诉建议' } },
      { path: 'operatcircle_detail', component: () => import('@/views/starview/operatcircleShow'), meta: { title: '问答详情' } },
      { path: 'quiz', component: () => import('@/views/starview/quiz'), meta: { title: '提问' } }
    ]
  },
  // {
  //   path: '/renew',
  //   component: Layout,
  //   meta: { title: '购买续费' },
  //   children: [{ path: 'index', component: () => import('@/views/renew/index'), meta: { title: '购买续费', requireAuth: true } }]
  // },
  {
    path: '/my',
    component: Layout,
    meta: { title: '个人中心', requireAuth: true },
    children: [
      { path: 'my_user', component: () => import('@/views/my/center'), meta: { title: '个人中心' } },
      { path: 'my_alerts', component: () => import('@/views/my/alerts'), meta: { title: '消息通知' } },
      { path: 'my_qualification', component: () => import('@/views/my/qualification'), meta: { title: '商家资质验证' } },
      { path: 'my_talent', component: () => import('@/views/my/talentCertification'), meta: { title: '达人资质验证' } },
      { path: 'my_score', component: () => import('@/views/my/score'), meta: { title: '积分商城' } },
      { path: 'my_order', component: () => import('@/views/my/order'), meta: { title: '我的订单' } },
      // { path: 'my_invoice', component: () => import('@/views/my/invoice'), meta: { title: '我的订单发票' } },
      { path: 'my_invoice', component: () => import('@/views/my/invoice'), meta: { title: '我的订单发票',detailShow:true, detailPath:'/my/my_order' } },
      { path: 'my_account', component: () => import('@/views/my/child'), meta: { title: '子账号管理' } },
      { path: 'my_topic', component: () => import('@/views/my/subjectCollect'), meta: { title: '话题收藏' } },
      { path: 'my_goods', component: () => import('@/views/my/productCollect'), meta: { title: '商品收藏' } }
    ]
  },
  {
      path: '/promotion',
      component: Layout,
      meta: { title: '推广返利', requireAuth: true},
      children: [
        { path: 'index', component: () => import('@/views/promotion/index'), meta: { title: '推广素材'} },
        { path: 'promotion_sales', component: () => import('@/views/promotion/promotionSales'), meta: { title: '推广分销'} },
        { path: 'promotion_award', component: () => import('@/views/promotion/promotionAward'), meta: { title: '业绩奖励'} },
        { path: 'promotion_deposit', component: () => import('@/views/promotion/promotionDeposit'), meta: { title: '提现'} }
      ]
    },
  { path: '/login', component: () => import('@/views/login'), meta: { title: '登录' } },
  { path: '/test', component: () => import('@/views/login/test'), meta: { title: '登录' } },
  { path: '/data_large', component: () => import('@/views/data/dataLarge'), meta: { title: '数据大屏' } },
  { path: '/404', component: () => import('@/views/exception/404'), meta: { title: '404' } },
  { path: '/', redirect: '/work/index' },
  { path: '*', redirect: '/404' },
  { path: '/living/living_detail', component: () => import('@/views/living/living_detail'), meta: { title: '直播详情',detailShow:true, detailPath:'/living/living_search' }},
  { path: '/renew/index', component: () => import('@/views/renew/index'), meta: { title: '购买续费', requireAuth: true } },
  { path: '/goods/goods_detail', component: () => import('@/views/goods/goodsShow'), meta: { title: '商品详情',detailShow:true, detailPath:'/goods/goods_search' } },
  { path: '/shop/brand_detail', component: () => import('@/views/shopbrand/brandDetails'), meta: { title: '品牌详情',detailShow:true, detailPath:'/shop/brands_rank' }},
  { path: '/talent/talent_detail', component: () => import('@/views/talent/talentShow'), meta: { title: '达人详情',detailShow:true, detailPath:'/talent/talent_search' }},
  { path: '/shop/shop_detail', component: () => import('@/views/shopbrand/shopShow'), meta: { title: '小店详情',detailShow:true, detailPath:'/shop/shop_rank' } },
  { path: '/video/video_detail', component: () => import('@/views/video/videoShow'), meta: { title: '视频详情',detailShow:true, detailPath:'/video/video_search' } }
]

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  const { meta, query } = to
  const title = query.title || meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
