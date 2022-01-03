<template>
  <div class="box flex flex-direction" style="padding: 20px;">
    <div class="rdx-m-l-6 flex align-center">
      <div class="tips"></div>
      <div class="rdx-m-l-16 rdx-font-20 font-strong">数据报告</div>
    </div>
    <div class="flex flex-wrap rdx-p-l-10">
      <div class="flex content_wh flex-direction position-re rdx-m-t-20 rdx-m-r-14" v-for="items in tableData" :key="items.id" >
        <img :src="items.cover_img" style="width: 100%; height: 174px;" class="button-a" @click="showClick(items.id)">
        <div class="flex rdx-p-20 flex-direction" @click="showClick(items.id)">
          <span class="rdx-m-b-12">{{items.title}}</span>
          <span class="rdx-tips-color rdx-font-14 rdx-line-2">{{items.sketch}}</span>
        </div>
        <div class="position-ab w-100 flex justify-between" style="bottom: 20px; padding: 0px 20px;">
          <span class="rdx-font-13 rdx-tips-color">{{items.create_time}}</span>
          <img src="../../assets/imgs/download.png" class="button-a" style="width: 14px; height: 14px;" @click="download(items.download_url)"/>
        </div>
      </div>
      <no-data marginTop="0" class="flex justify-center w-100" v-if="tableData == ''"></no-data>
    </div>
  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components:{
      noData
    },
    data() {
      return {
        params: {
          page: 1,
          size: 10
        },
        tableData: [],
        total: 0,
        showImg: [],
      }
    },
    mounted() {
      this.tableList()
    },
    methods: {
      download(url){
        window.open(url, '_blank')
      },

      showClick(id){  //跳转详情页
        this.$router.push({path:'/starview/starview_detail',query:{id:id}});
      },
      linkNews(id){ //跳转到资讯详情页
        // this.$router.push({path:'http://121.40.151.218:9090/rmxwShow',query:{articleId:id}})
      },
      //获取数据
      async tableList() {
        const {
          data
        } = await this.$get('/api/xgSchool/data/reportList')
        this.tableData = data.list
        //this.show_img=this.tableData.show_img_array
        this.tableData.forEach((item)=>{
          this.showImg.push(item.show_img_array)
          //this.show_img.push(item.show_img_array[1])
          console.log('3',item)
        })
        this.tableData.forEach((item)=>{
          item.create_time = (tools.time_cycle(3,(item.create_time/1000))).replace(/-/g,'.')
        })
        console.log('12',this.tableData)
        console.log('1',this.showImg)
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

  .starview {
    height: auto;
  }

  .img_wh {
    width: 101px;
    height: 128px;
  }

  .line_h {
    background: $rdx-border-color;
    height: 1px;
  }

  .content_wh {
    width: 332px;
    height: 320px;
    //border: 1px solid skyblue;
    border-radius: 4px;
    box-shadow: 0 0 1px 2px #f8f8f8;
  }

  .titleStyle {
    width: 6px;
    height: 24px;
    border-radius: 2px;
  }

	  .move:hover{color: $rdx-primary;}  //鼠标移动到字体变色
</style>
