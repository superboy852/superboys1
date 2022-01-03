<template>
  <div style="background-color: #fff;height: 100%;" class="rdx-radius-20 box">
    <div class="flex align-center justify-between">
      <p class="flex align-center">
        <span style="background-color: #DD001B; width: 4px; height: 20px; border-radius: 4px;"></span>
        <span class="rdx-m-l-12"><b>消息通知</b></span>
      </p>

      <el-button class="tabbutton rdx-m-t-2" style="" @click="clickyd">全部标记已读</el-button>
    </div>

    <!-- 主体 -->

    <no-data v-if="show.dataShow" marginTop="10"></no-data>
    <div v-else v-loading="loading">

      <div style="border-bottom: 1px solid #eee;" class="flex justify-between"
        :style="item.state== '1' ? 'opacity:0.5;margin-left: 17px;':''" v-for="(item,index) in getData.tabalData"
        :key="index">
        <div class="flex">
          <img style="width: 9px;height: 9px;" class="rdx-m-t-18 rdx-m-r-8"
            :style="item.state=='1' ? ' display: none;':''" src="../../assets/imgs/dot.png" />
          <div class="flex align-center rdx-m-t-26 rdx-m-b-20">
            <el-popover placement="bottom-start" width="538" trigger="manual"
              v-model="show.imgIndex == index ? true : false ">
              <el-button slot="reference" type="text" class="flex">
                <h2 class="rdx-font-16" style="color: #000;" @click="onImg(index)">{{item.title}}
                </h2>
              </el-button>
              <p class="rdx-m-l-12 flex flex-direction ">
                <span class="rdx-font-14 rdx-tips-color ">
                  {{item.content}}位置：
                  <a class="rdx-primary button-a" slot="reference">点击作品打开详情页</a>
                </span>
              </p>
            </el-popover>

            <!-- <p class="rdx-m-l-12 flex" v-if="item.state == '1'" :style="show.imgIndex == index || activeClass =='1'?' display: none;':''"> -->
            <p class="rdx-m-l-12 flex" :style="item.state == '1'?' display: none;':''">
              <span class="rdx-font-14 rdx-tips-color rdx-line-1" style="width: 600px;">
                {{item.content}}
              </span>
              <span class="rdx-font-14 rdx-tips-color">
                <span>位置：</span>
                <a class="rdx-primary button-a" slot="reference">点击作品打开详情页</a>
              </span>
            </p>
          </div>
        </div>
        <div class="rdx-m-t-26">
          <a class="rdx-font-14 rdx-tips-color">{{item.publish_time}}</a>
        </div>
      </div>
    </div>

    <!-- <div class="rdx-m-t-14 rdx-content-color" style="opacity:0.5;"  align="center">
      没有更多了~
    </div> -->
  </div>

</template>

<script>
  import * as tools from '@/common/tools.js';
  import noData from "@/components/noData.vue"
  export default {
    components: {
      noData,
    },
    data() {
      return {
        getData: {
          tabalData: [],
        },
        show: {
          imgIndex: '-1',
          dataShow: false
        },
        loading: false,
      }
    },
    mounted() {
      this.getMessageList()
    },
    methods: {
      //点击全部已读
      async getMessageState() {
        const {
          data
        } = await this.$get('api/user/updateAllMessageState')
      },
      //获取消息列表
      async getMessageList() {
        this.loading = true
        const {
          data
        } = await this.$get('/api/user/queryMessageList')
        this.loading = false
        if (data.list == '') {
          this.show.dataShow = true
        } else {
          this.getData.tabalData = data.list
          this.getData.tabalData.forEach((item) => {
            item.publish_time = tools.time_cycle(1, (item.publish_time / 1000))
          })
        }

      },
      //点击显示浮窗
      onImg(index) {
        if (this.show.imgIndex == index) {
          this.show.imgIndex = '-1'
        } else {
          this.show.imgIndex = index
        }
      },
      clickyd() {
        this.getMessageState()
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getMessageList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/list.scss";
  /deep/.el-button--small{padding: 6px 15px;}
  .tabbutton {
    color: #DD001B;
    border: 1px solid #DD001B;
    border-radius: 5px;
    background-color: #fff;
  }

  .tabbutton:hover {
    box-shadow: 0px 0px 3px 0px #DD001B;
  }
</style>
