import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb'
import {
  get,
  post
} from '@/utils/request'
import '@/utils/error'
import '@/assets/styles/index.scss'
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})
Vue.component('Breadcrumb', Breadcrumb)

import * as echarts from 'echarts'; //引入echarts
import 'echarts-wordcloud';
Vue.prototype.$echarts = echarts //引入组件
import china from '@/assets/json/china.json'   //引入地图json文件
echarts.registerMap('china', china) // 在echarts中注册使用这个文件


Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (store.state.token == '') {
      // next(console.log("ok3"));
      store.dispatch('saveTokenOk', "51000")
    }else{
      next();
    }
  } else {
    next();
  }
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
