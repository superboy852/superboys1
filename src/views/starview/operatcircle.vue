<template>
  <div class="box flex flex-direction rdx-p-20">
    <div class="flex line-bottom justify-between position-re">
      <div class="flex">
        <div class="flex position-re flex-direction align-center" @click="onTab('1')">
          <span class="rdx-font-18 titleCut" :class="show.tabIndex == '1' ? 'color-old font-strong' : ''">最新的</span>
          <span class="line rdx-m-t-10" v-if="show.tabIndex == '1'"></span>
        </div>
        <div class="flex position-re flex-direction align-center rdx-m-l-80" @click="onTab('2')">
          <span class="rdx-font-18 titleCut" :class="show.tabIndex == '2' ? 'color-old font-strong' : ''">热门的</span>
          <span class="line rdx-m-t-10" v-if="show.tabIndex == '2'"></span>
        </div>
        <div class="flex position-re flex-direction align-center rdx-m-l-80" @click="onTab('3')">
          <span class="rdx-font-18 titleCut" :class="show.tabIndex == '3' ? 'color-old font-strong' : ''">未回答的</span>
          <span class="line rdx-m-t-10" v-if="show.tabIndex == '3'"></span>
        </div>
      </div>
      <search-item @clickKey='onSearch' searchPlaceholder="请输入标题关键词" searchType="3" searchWidth="470" class="position-ab" style="right: 6px; top: -10px;" ></search-item>
    </div>
    <div class="rdx-p-t-30">


      <no-data marginTop="20" v-if="tableData == ''" class="w-100" style="padding:100px 0;"></no-data>
      <div class="rdx-m-b-12 flex flex-wrap line-bottom rdx-p-b-12" v-for="item in tableData" :key="item.id" @click="linkShow(item.id)">
        <div class="flex flex-direction">
          <div class="flex flex-direction justify-center article"
            :class="item.answer_number>0 ? 'bg_color':'rdx-primary-bg'">
            <div class="rdx-light-color font-strong">{{item.answer_number == null ? '0': item.answer_number}}</div>
            <div class="rdx-light-color font-strong">回答</div>
          </div>

        </div>
        <div class="rdx-p-l-16 flex flex-direction align-start">
          <div class="rdx-font-16 flex flex-direction">
            <div class="titleCut rdx-p-b-4 link-primary">
              {{item.title}}
            </div>
            <div class="rdx-tips-color rdx-font-14 rdx-line-height-30 w-100 flex align-center">
              <span>{{item.article_keyword == null? '游客':item.article_keyword}}</span>
              <span class="rdx-m-l-15 rdx-m-r-15">{{item.release_time}}</span>
              <div class="flex align-center rdx-tips-color rdx-font-14">浏览:{{item.view_number == null?'0':item.view_number}}</div>
            </div>

          </div>
          <div class="flex align-center labels rdx-font-14 rdx-p-l-15 rdx-p-r-15 rdx-primary">{{item.article_type_name}}</div>

        </div>
      </div>


    </div>

  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import searchItem from '@/components/searchItem.vue'
  import noData from '@/components/noData.vue'
  export default {
    components: {
      searchItem,
      noData
    },
    data() {
      return {
        show: {
          tabIndex: "1"
        },
        params: {
          type: '',
          keyword: ''
          // page: 1,
          // size: 10
        },
        tableData: [],
        total: 0,
        search: '',

      }
    },
    mounted() {
      this.tableList()
    },
    methods: {
      //跳转到问答页
      linkShow(id){
        this.$router.push({path:'/starview/operatcircle_detail',query:{id:id}})
      },
      //点击切换
      onTab(index) {
        this.show.tabIndex = index
        if (this.show.tabIndex == 1) {
          this.params.type = ""
          this.search = ""
          this.params.keyword = ""
        } else if (this.show.tabIndex == 2) {
          this.params.type = 4
          this.search = ""
          this.params.keyword = ""
        } else {
          this.params.type = 5
          this.search = ""
          this.params.keyword = ""
        }
        this.tableList()
      },
      onSearch(e) {
        if (this.show.tabIndex == 1) {
          this.params.keyword = e
        } else if (this.show.tabIndex == 2) {
          this.params.keyword = e
        } else {
          this.params.keyword = e
        }
        this.tableList()
        //console.log('2',this.params.keyword)
      },
      async tableList() {
        const {
          data
        } = await this.$get('/api/article/operaCirclList', this.params, true)

        if (data != undefined) {
          this.tableData = data.list
          // console.log("-----------",data)
          this.tableData.forEach((item) => {
            item.release_time = tools.time_cycle(1, (item.release_time / 1000))
            item.view_number = item.view_number >= 10000 ? (item.view_number / 10000).toFixed(1) + 'w' : item
              .view_number
          })
          this.total = data.page_info.total
        }

        console.log('2345', this.params)
      },
      giveClick() {
        if (this.give == true) {
          this.give = false;
          this.guideNewbie.like_count -= 1
        } else {
          this.give = true
          this.guideNewbie.like_count += 1
        }
      },
      //分页
      // handleSizeChange(val) {
      //   this.params.page = 1
      //   this.params.size = val
      //   this.tableList()
      // },
      // handleCurrentChange(val) {
      //   this.params.page = val
      //   this.tableList()
      // }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

  .starview {
    height: auto;
  }

  .bg_color {
    background: #009a61;
  }

  .labels {
    background: #fdefef;
    height: 23px;
    line-height: 23px;
    border-radius: 3px;
  }

  .article {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    text-align: center;
  }

  .active-tools2 {
    background: $rdx-primary;
    border-radius: 0px 20px 0px 0px;
    color: #FFFFFF;
  }
</style>
