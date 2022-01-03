<template>
  <div class="box">
    <div class="flex position-re">
      <div style="width: 900px;">
        <div class="rdx-p-20 flex align-center rdx-radius-10" style="border: 1px solid #e5e5e5;">
          <div class="rdx-font-16 rdx-content-color rdx-m-r-20 rdx-p-t-4 rdx-p-b-4 rdx-p-l-6 rdx-p-r-6 button-a"
            :class="params.type == ''? 'dh-ys':''" @click="handleCate('')">全部</div>
          <div class="rdx-font-16 rdx-content-color rdx-m-r-20 rdx-p-t-4 rdx-p-b-4 rdx-p-l-6 rdx-p-r-6 button-a"
            v-for="(item,index) in list" :key="index" :class="params.type == item.type_id ? 'dh-ys':''" @click="handleCate(item.type_id)">{{item.type_name}}</div>
        </div>
        <div class="flex rdx-p-t-20 rdx-p-b-20" style="border-bottom: 1px solid #e5e5e5;" v-for="(item,i) in tableData" :key="i" v-if="tableData!= ''">
          <div>
            <img :src="item.cover_image_addr" style="width: 180px;height: 120px;" class="rdx-radius-10" />
          </div>
          <div class="rdx-p-l-20 rdx-p-t-10" style="width: 710px;">
            <div class="rdx-font-16 rdx-main-color button-a" @click="jumNews(item.id)">{{item.title}}</div>
            <div class="rdx-font-14 rdx-main-color rdx-p-t-10 button-a" @click="jumNews(item.id)">
              {{item.article_content}}</div>
            <div class="flex justify-between rdx-font-14 rdx-p-t-10 rdx-tips-color">
              <div>大仙发布于{{item.release_time}} 阅读 ({{item.view_number}})</div>
              <div style="margin-right: 20px;" class="position-re flex align-center">
                <img src="../../assets/imgs/diggs.png" class="button-a position-ab" style="left: -30px;" />
                <span class="rdx-m-l-6">{{item.like_number}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tableData == ''">
          <no-data marginTop="10" class="rdx-p-t-30"></no-data>
        </div>

        <div class="block" v-if="tableData!= ''">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size" @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div style="width: 435px;margin-left: 180px;">
        <div class="rdx-p-b-20 rdx-font-20 rdx-main-color font-strong">推荐文章</div>
        <div class="rdx-m-b-40" v-for="(item,index) in rmData" :key="index">
          <div class="rdx-font-16 rdx-main-color button-a" @click="jumNews(item.id)">{{item.title}}</div>
          <div class="flex align-center rdx-p-t-20">
            <div class="rdx-primary rdx-font-16 rdx-p-l-16 rdx-p-r-16 rdx-p-t-6 rdx-p-b-6"
              style="background: #FBCCD1;border-radius: 15px 5px;">{{item.article_type_name}}</div>
            <div class="rdx-font-14 rdx-tips-color rdx-p-l-20">{{item.view_number}} 推荐</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  export default {
    components: {
      noData
    },
    data() {
      return {
        params: {
          page: 1,
          size: 5,
          type: '',
        },
        tableData: [],
        total: 0,
        showImg: [],
        list: [],
        aweCate: -1,
        rmData: [],
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      //文章数据
      async getList() {
        var param = {
          "type": this.params.type,
          "page": this.params.page,
          "size": this.params.size,
        }
        var {
          data
        } = await this.$get("/api/article/getList", param,true)
        if(data!= undefined){
          this.tableData = data.article_list_info_list.list

          this.tableData.forEach((item)=>{
            item.view_number = tools.numberVerify(item.view_number)    //观看人数
            item.like_number = tools.numberVerify(item.like_number)    //点赞数
          })
          this.rmData = data.article_list_info_right_list
          this.list = data.articles_type_list
          this.tableData.forEach((item)=>{
            item.release_time =tools.getDateDiff(item.release_time/1000)
          })
          this.total =data.article_list_info_list.page_info && data.article_list_info_list.page_info.total  //分页
        }

      },
      //点击菜单切换
      handleCate(val){
        this.params.type = val
        this.getList()
      },
      jumNews(id) { //跳转资讯详情页
        this.$router.push({
          path: '/starview/news_detail',
          query: {
            id: id
          }
        });
      },
      //分页数据
      handleSizeChange(val) {
        this.params.page = 1
        this.params.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.getList()
      },
    }
  }
</script>

<style lang="scss" >
  @import "../../assets/styles/listNew.scss";

  .dh-ys {
    background: #ff7f8f;
    color: $rdx-light-color;
    border-radius: 6px;
  }

</style>
