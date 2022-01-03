<template>
  <div :style="show.dataShow ? '' : 'display:none'" style="background-color: #fff;" class="w-100 rdx-radius-20" align="center">
    <!--头部 -->
    <div class="flex" style="border-bottom: 1px solid #e5e5e5;">
      <div class="w-50 flex flex-direction rdx-p-t-20 rdx-p-b-20 button-a " @click="tiqu('1')" :class="tool == 1?'active-tools':''">
        <span class="rdx-font-24">查询商品</span>
        <span class="rdx-line-height-30">能够添加到抖音商品库</span>
      </div>
      <div class="w-50 flex flex-direction rdx-p-t-20 rdx-p-b-20 button-a" @click="tiqu('2')" :class="tool == 2?'active-tools2':''">
        <span class="rdx-font-24">提取视频</span>
        <span class="rdx-line-height-30 ">提取淘宝主图视频</span>
      </div>
    </div>


    <search-item class="rdx-m-t-50" @clickKey='onSearchProduct' searchPlaceholder = "请粘贴商品链接或商品ID" searchType="7"  searchWidth='498' v-if="tool == 1" style="height: 44px;"></search-item>

    <search-item class="rdx-m-t-50" @clickKey='onSearchVideo' searchPlaceholder = "请输入淘宝宝贝分享地址" searchType="3"  searchWidth='498' v-if="tool == 2" style="height: 44px;"></search-item>

    <!--主体 -->
    <div class=" rdx-m-t-38 rdx-m-b-38  box flex justify-center w-100" v-if="videoMakeData != ''" style="margin-left: 5%;margin-right: 10%;">
      <div class="w-20 rdx-m-r-30" style="vertical-align: top;" align="left">
        <div>
          <span class="tips" style="width: 4px;height: 20px;">&nbsp;</span>
          <span class="gjtipTitle">{{videoMakeData.name}}</span>
        </div>

        <div class="rdx-m-t-30 flex align-center tool" v-for=" (videoMake,index) in videoMakeData.list" :key="index">
          <img :src="videoMake.img" class="img" />
          <div class="rdx-m-l-32">
            <p class="title">{{videoMake.title}}</p>
            <p class="rdx-m-t-14">{{videoMake.describe}}</p>
          </div>
        </div>
      </div>
      <div class="w-20 rdx-m-r-30" style="vertical-align: top;" align="left">
        <div>
          <span class="tips" style="width: 4px;height: 20px;">&nbsp;</span>
          <span class="gjtipTitle">{{videoMakeData.name}}</span>
        </div>
        <div class="rdx-m-t-30 flex align-center tool" v-for=" (editTools,index) in editToolsData.list" :key="index">
          <img :src="editTools.img" class="img" />
          <div class="rdx-m-l-32">
            <p class="title">{{editTools.title}}</p>
            <p class="rdx-m-t-14">{{editTools.describe}}</p>
          </div>
        </div>
      </div>

      <div class="w-20 rdx-m-r-30" style="vertical-align: top;" align="left">
        <div>
          <span class="tips" style="width: 4px;height: 20px;">&nbsp;</span>
          <span class="gjtipTitle">{{videoMakeData.name}}</span>
        </div>

        <div class="rdx-m-t-22 flex align-center tool" v-for=" (editMaterial,index) in editMaterialData.list" :key="index">
          <img :src="editMaterial.img" class="img" />
          <div class="rdx-m-l-22">
            <p class="title">{{editMaterial.title}}</p>
            <p class="rdx-m-t-14">{{editMaterial.describe}}</p>
          </div>
        </div>

      </div>

      <div class="w-20 rdx-m-r-30" style="vertical-align: top;" align="left">
        <div>
          <span class="tips" style="width: 4px;height: 20px;">&nbsp;</span>
          <span class="gjtipTitle">{{videoMakeData.name}}</span>
        </div>

        <div class="rdx-m-t-22 flex align-center tool" v-for=" (dataAnalyse,index) in dataAnalyseData.list" :key="index">
          <img :src="dataAnalyse.img" class="img" />
          <div class="rdx-m-l-22">
            <p class="title">{{dataAnalyse.title}}</p>
            <p class="rdx-m-t-14">{{dataAnalyse.describe}}</p>
          </div>
        </div>
      </div>

    </div>

    <div style="height: 50px;">

    </div>


  </div>
</template>
<script>
  import noData from "@/components/noData.vue"
  import searchItem from '@/components/searchItem.vue'
  export default {
    components: {
      noData,searchItem
    },
    data() {
      return {
		  tool:'1',
        show: {
          tabShow: '2',
          dataShow:false
        },
        videoMakeData: [], //视频制作
        editToolsData: [], //剪辑工具
        editMaterialData: [], //剪辑素材
        dataAnalyseData: [], //数据分析
      }
    },
    mounted() {
      this.getTools()
    },
    methods: {
      //获取工具列表
      async getTools() {
        const {
          data
        } = await this.$get('/api/user/getTools')
       if(data != '' || data != null){
         this.videoMakeData = data.videoMake //视频制作
         this.editToolsData = data.editTools //剪辑工具
         this.editMaterialData = data.editMaterial // 剪辑素材
         this.dataAnalyseData = data.dataAnalyse //数据分析
         this.show.dataShow = true
       }
      },

      tiqu(e) {
        this.tool = e
      },
      async onSearchProduct(){
        var par = {
          url:e
        }
        const {
          data
        } = await this.$get('/api/user/getProductInfo',par)
      },
      async onSearchVideo(e){
        var par = {
          url:e
        }
        const {
          data
        } = await this.$get('/api/user/getProductVideo',par)

      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/listNews.scss";

  .active-tools {
    background: #dd001b;
    border-radius: 20px 0px 0px 0px;
    color: #FFFFFF;
  }
  .active-tools2 {
    background: #dd001b;
    border-radius: 0px 20px 0px 0px;
    color: #FFFFFF;
  }
</style>
