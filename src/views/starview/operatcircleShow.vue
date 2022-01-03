<template>
  <div class="box">
    <div class="rdx-m-b-20 xb-sty">
      <div class="rdx-p-10 flex align-center">
        <div>
          <img src="../../assets/imgs/logoB.png" style="width: 113px;height: 37px;" />
        </div>
        <div class="rdx-font-14 rdx-main-color rdx-m-l-54">问答</div>
        <div class="rdx-font-14 rdx-main-color rdx-m-l-20">文章</div>
        <div class="position-re rdx-m-l-20" style="top: 10px;">
          <search-item @clickKey='clickKey' searchType="3" searchWidth="360"></search-item>
        </div>
        <el-button type="primary" class="rdx-m-l-20" @click="clickBtn">提问</el-button>
      </div>
    </div>
    <div class="flex">
      <div class="rdx-p-10 w-70">
        <div class="rdx-font-26 rdx-main-color rdx-m-b-12">抖音9.1万粉的品牌自播新号，推了什么商品日销3万单？</div>
        <div class="flex rdx-m-b-18">
          <div class="rdx-p-6 rdx-primary bq-sty rdx-m-r-14">
            抖音运营
          </div>
          <div class="rdx-p-6 rdx-primary bq-sty rdx-m-r-14">
            我想直播带货去哪里找货源
          </div>
          <div class="rdx-p-6 rdx-primary bq-sty rdx-m-r-14">
            我想直播带货去哪里找货源
          </div>
        </div>
        <div class="rdx-font-14 rdx-content-color rdx-m-b-18">
          我想直播带货去哪里找货源？除了抖音官方的小店精选联盟外，达人直播带货零食哪里找厂家供应商或直播卖衣服货源哪里找？
        </div>
        <div class="flex align-center rdx-font-14 rdx-content-color rdx-m-b-12">
          <div class="flex align-center">
            <img src="../../assets/imgs/common.png" />
          </div>
          <div class="rdx-m-l-10">0条评论</div>
          <div class="rdx-m-l-24">分类：直播电商</div>
        </div>

        <div>
          <div class="flex justify-between rdx-p-20 xb-sty">
            <div class="rdx-font-20 rdx-main-color">2个回答</div>
            <div class="flex">
              <div class="rdx-p-t-6 rdx-p-b-6 rdx-p-l-10 rdx-p-r-10 rdx-font-12 rdx-primary bq-sty button-a">
                默认排序
              </div>
              <div class="rdx-p-t-6 rdx-p-b-6 rdx-p-l-10 rdx-p-r-10 rdx-font-12 button-a rdx-m-l-10">时间排序</div>
            </div>
          </div>
          <div class="xb-sty rdx-p-t-20">
            <div class="flex">
              <div>
                <img src="../../assets/imgs/1.png" class="round" style="width: 40px;height: 40px;min-width: 40px;" />
              </div>
              <div style="width: 720px;" class="rdx-m-l-10">
                <div class="flex justify-between rdx-p-t-4">
                  <div class="rdx-font-14">
                    <span class="rdx-primary">百宝抖音小店运营老师</span>
                    <span class="rdx-m-l-4 rdx-m-r-4">-</span>
                    <span class="rdx-tips-color">抖音小店开店运营老师</span>
                  </div>
                  <div class="rdx-font-12 rdx-content-color">2021-09-28 11:32</div>
                </div>
                <div class="rdx-font-14 rdx-main-color rdx-m-t-30">
                  <div>货源有很多地方可以寻找</div>
                  <div class="rdx-m-b-18">1.蝉妈妈的选品库</div>
                  <div class="rdx-m-b-18">2.拼多多平台用多多参谋，可以分析拼多多目前火热，热门的商品</div>
                  <div class="rdx-m-b-18">3.淘宝平台生意参谋，可以分析淘宝目前火热，热门的商品</div>
                  <div class="rdx-m-b-18">4.抖音商城下拉框（免费，但是比较局限</div>
                  <div class="rdx-m-b-18">如果具体操作方法不会，可以私信我</div>
                </div>
              </div>
            </div>
            <div class="flex justify-between align-center rdx-m-b-20">
              <div class="flex">
                <div>
                  <img src="../../assets/imgs/common.png" style="width: 15px;height: 15px;" />
                </div>
                <div class="rdx-font-14 rdx-content-color rdx-m-l-10">
                  0 条评论
                </div>
              </div>
              <div class="button-a flex align-center rdx-p-l-10 rdx-p-r-10 rdx-p-t-4 rdx-p-b-4"
                style="border: 1px solid #e5e5e5;border-radius: 5px;">
                <img src="../../assets/imgs/diggs.png" style="width: 15px;height: 15px;" />
                <div class="rdx-m-l-6 rdx-font-12 rdx-content-color">点赞</div>
              </div>
            </div>
          </div>

          <div class="xb-sty rdx-p-t-20">
            <div class="flex">
              <div>
                <img src="../../assets/imgs/1.png" class="round" style="width: 40px;height: 40px;min-width: 40px;" />
              </div>
              <div style="width: 720px;" class="rdx-m-l-10">
                <div class="flex justify-between rdx-p-t-4">
                  <div class="rdx-font-14">
                    <span class="rdx-primary">百宝抖音小店运营老师</span>
                    <span class="rdx-m-l-4 rdx-m-r-4">-</span>
                    <span class="rdx-tips-color">抖音小店开店运营老师</span>
                  </div>
                  <div class="rdx-font-12 rdx-content-color">2021-09-28 11:32</div>
                </div>
                <div class="rdx-font-14 rdx-main-color rdx-m-t-30">
                  <div>货源有很多地方可以寻找</div>
                  <div class="rdx-m-b-18">1.蝉妈妈的选品库</div>
                  <div class="rdx-m-b-18">2.拼多多平台用多多参谋，可以分析拼多多目前火热，热门的商品</div>
                  <div class="rdx-m-b-18">3.淘宝平台生意参谋，可以分析淘宝目前火热，热门的商品</div>
                  <div class="rdx-m-b-18">4.抖音商城下拉框（免费，但是比较局限</div>
                  <div class="rdx-m-b-18">如果具体操作方法不会，可以私信我</div>
                </div>
              </div>
            </div>
            <div class="flex justify-between align-center rdx-m-b-20 rdx-m-t-20">
              <div class="flex">
                <div>
                  <img src="../../assets/imgs/common.png" style="width: 15px;height: 15px;" />
                </div>
                <div class="rdx-font-14 rdx-content-color rdx-m-l-10">
                  0 条评论
                </div>
              </div>
              <div class="button-a flex align-center rdx-p-l-10 rdx-p-r-10 rdx-p-t-4 rdx-p-b-4 rdx-primary-bg"
                style="border: 1px solid #e5e5e5;border-radius: 5px;">
                <img src="../../assets/imgs/diggs.png" style="width: 15px;height: 15px;" />
                <div class="rdx-m-l-6 rdx-font-12 rdx-content-color rdx-light-color">45</div>
              </div>
            </div>
          </div>

          <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor>
          <div class="flex justify-between align-center rdx-m-t-20">
            <div class="flex align-center">
              <div class="flex align-center">
                <el-checkbox></el-checkbox>
              </div>
              <div class="rdx-font-12 rdx-main-color">关注该问题</div>
            </div>
            <div>
              <el-button type="primary">提交问题</el-button>
            </div>
          </div>
        </div>

      </div>
      <div class="rdx-p-l-50 w-30">
        <div class="flex rdx-m-b-10">
          <div>
            <el-button type="success">关注</el-button>
          </div>
          <div class="rdx-font-14 rdx-main-color rdx-m-l-10">8</div>
          <div class="rdx-font-14 $rdx-tips-color">关注</div>
        </div>
        <div class="flex">
          <div>
            <el-button class="rdx-tips-color">收藏</el-button>
          </div>
          <div class="rdx-font-14 rdx-main-color rdx-m-l-10">8</div>
          <div class="rdx-font-14 $rdx-tips-color">收藏</div>
          <div class="rdx-font-14 rdx-main-color rdx-m-l-10">4664</div>
          <div class="rdx-font-14 $rdx-tips-color">浏览</div>
        </div>
        <div class="flex rdx-p-t-20 rdx-p-b-16 rdx-m-b-16 xb-sty">
          <div class="flex align-center">
            <img src="../../assets/imgs/xqyygl.png" style="width: 15px;height: 15px;" />
          </div>
          <div class="rdx-primary rdx-font-14 rdx-m-l-10">朱晓涵</div>
          <div class="rdx-font-14 $rdx-tips-color">提出于 2021-08-16 15:03</div>
        </div>
        <div class="rdx-font-18 rdx-main-color rdx-m-b-16">
          相似问题
        </div>
        <div class="rdx-m-b-16">
          <span class="rdx-font-14 rdx-main-color">
            怎么才能升级成精选联盟正式版？评价数量总是超不过20个
          </span>
          <span class="rdx-font-14 rdx-tips-color rdx-m-l-10">0回答</span>
        </div>
        <div class="rdx-m-b-16">
          <span class="rdx-font-14 rdx-main-color">
            小店商家自主入驻精选联盟流程？
          </span>
          <span class="rdx-font-14 rdx-tips-color rdx-m-l-10">2回答</span>
        </div>
        <div class="rdx-m-b-16">
          <span class="rdx-font-14 rdx-main-color">
            抖音小店商家如何入驻精选联盟？
          </span>
          <span class="rdx-font-14 rdx-tips-color rdx-m-l-10">1回答</span>
        </div>
        <div class="rdx-m-b-16">
          <span class="rdx-font-14 rdx-main-color">
            什么是抖音精选联盟？
          </span>
          <span class="rdx-font-14 rdx-tips-color rdx-m-l-10">1回答</span>
        </div>
      </div>
    </div>

    <div class="rdx-font-12 rdx-content-color flex justify-center" style="margin-top: 100px;">©2019
      创客互联(chanmama.com),All Rights Reserved.闽ICP备 18007321号-5</div>
  </div>
</template>
<script>
  import * as tools from '@/common/tools.js';
  import noData from '@/components/noData.vue'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.snow.css'
  import searchItem from '@/components/searchItem.vue'
  export default {
    components: {
      noData,
      searchItem
    },
    data() {
      return {
        params: {
          page: 1,
          size: 10
        },
        val: {

        },
        content: null,
        editorOption: {
          modules: {
            toolbar: [
              [{ 'font': [] }],
              ['bold', 'italic', 'underline','image','link','code-block','clean'],   // toggled buttons 富文本编辑器
              [{ 'list': 'ordered'}]
            ]
          },
          placeholder: '撰写答案',
        },
      }
    },
    mounted() {
      //this.tableList()
    },
    methods: {
      onEditorBlur() { //失去焦点事件
      },
      onEditorFocus() { //获得焦点事件
      },
      onEditorChange() { //内容改变事件
      },
      //点击搜索
      clickKey(e) {
        this.params.keyword = e
        this.brandrankData()
      },
      //跳转到问答
      clickBtn(){
        this.$router.push({
          path: "/starview/quiz",
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";
  .bq-sty {
    background: #F4D0D0;
  }

  .xb-sty {
    border-bottom: 1px solid #e5e5e5;
  }
  /deep/.ql-editor{
    height: 160px;
  }
  /deep/.button-search{
    height: 30px !important;
  }
  /deep/.el-input__inner{
    font-size: 12px !important;
    height: 30px !important;
  }
</style>
