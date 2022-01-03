<template>
  <div class="flex top-search2 align-center justify-center position-re" :style="'width:' + searchWidth + 'px'">
    <el-input clearable :style="'width:' + searchWidth + 'px'" v-model="val.keyword" @input="getSearchData" @focus="getSearchData" @blur="changeSeach" :placeholder="searchPlaceholder"></el-input>
    <div class="button-search flex align-center justify-center button-a" @click="clickKeyWord">
      <i class="iconfont icon-e636 rdx-light-color rdx-font-18"></i>
    </div>
    <div class="search-top-box flex rdx-font-14 flex-direction w-90" :class="show.searchTop ? 'search-open' : 'search-close'" v-if="show.searchBox">
      <div class="flex justify-between rdx-tips-color" v-if="val.keywordStorage != ''">
        <div class="rdx-p-b-6">历史搜索</div>
        <div class="link-primary" @click="clearStorage">清空历史搜索</div>
      </div>
      <div v-if="val.keywordStorage != ''" class="flex flex-direction rdx-p-l-10" v-for="(keywordS,index2) in val.keywordStorage" :key="keywordS">
        <span class="rdx-line-1 rdx-line-height-36 link-primary" @click="onSearchText(index2,'1')">{{keywordS}}</span>
      </div>
      <div class="rdx-tips-color rdx-p-b-6" v-if="searchType != '3'">热门搜索</div>
      <div class="flex flex-direction rdx-p-l-10" v-for="(searchDataS,index) in getData.searchData" :key="index">
        <span class="rdx-line-1 rdx-line-height-36 link-primary" @click="onSearchText(index,'2')">{{searchDataS.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      keywordInit:{
        type:String,
        default:""
      },
      searchType:{
        type:String,
        default:'1', //判断从哪个栏目点入 1直播 2视频  3评论 4达人 5品牌 6小店 7商品
      },
      searchWidth:{
        type:String,
        default:'498', //搜索框宽度
      },
      searchPlaceholder:{
        type:String,
        default:'请输入达人名称、抖音号',
      },
    },
    data() {
      return {
        getData:{
          searchData:'',//搜索内容
        },
        show:{
          searchBox:false,//浮窗
          searchTop:false,//动画
        },
        val: {
          keyword: '',
          text:''   ,//搜索框显示内容
          keywordStorage:[],//本地保存
        }
      }
    },
    mounted() {
      setTimeout((item)=>{
        this.val.keyword = this.keywordInit
      },200)
      this.val.keywordStorage = JSON.parse(localStorage.getItem('keywordStorage'))
      if(this.val.keywordStorage != null){
        this.val.keywordStorage = this.removeDuplicatedItem(this.val.keywordStorage)
      }else{
        this.val.keywordStorage = []
        localStorage.setItem('keywordStorage', JSON.stringify(this.val.keywordStorage))
      }
    },
    methods: {
      //清除本地缓存
      clearStorage(){
        localStorage.removeItem('keywordStorage')
        this.val.keywordStorage = []
        localStorage.setItem('keywordStorage', JSON.stringify(this.val.keywordStorage))
      },
      //本地保存数组去重复
      removeDuplicatedItem(ar) {
          var ret = [];
          for (var i = 0, j = ar.length; i < j; i++) {
              if (ret.indexOf(ar[i]) === -1) {
                  ret.push(ar[i]);
              }
          }
          return ret;
      },
      //点击浮窗文字
      onSearchText(index,type){
        if(type == 1){
          this.val.keyword = this.val.keywordStorage[index]
        }else{
          this.val.keyword = this.getData.searchData[index].content
        }
        this.val.keywordStorage.unshift(this.val.keyword)
        this.val.keywordStorage = this.removeDuplicatedItem(this.val.keywordStorage)
        this.val.keywordStorage = this.val.keywordStorage.slice(0,4)
        localStorage.setItem('keywordStorage', JSON.stringify(this.val.keywordStorage))
        console.log("11")
        this.$emit("clickKey", this.val.keyword)
      },
      //关闭浮窗
      changeSeach(){
        setTimeout(()=>{
          this.show.searchTop = false
        },200)
      },
      //获取数据
      async getSearchData() {
        this.getData.searchData = []
        var params = {
          type:this.searchType
        }
        const {
          data
        } = await this.$get('/api/hot/search/hotSearch',params)
        console.log("data",data)
        this.getData.searchData = data
        this.show.searchTop = true
        this.show.searchBox = true
        // if(this.searchType == 1 && data.live != ''){
        //   this.getData.searchData = data.live
        //   this.show.searchTop = true
        //   this.show.searchBox = true
        // }else if(this.searchType == 2 && data.product != ''){
        //   this.getData.searchData = data.product
        //   this.show.searchTop = true
        //   this.show.searchBox = true
        // }else if(this.searchType == 3 && data.shop != ''){
        //   this.getData.searchData = data.shop
        //   this.show.searchTop = true
        //   this.show.searchBox = true
        // }else if(this.searchType == 4 && data.user != ''){
        //   this.getData.searchData = data.user
        //   this.show.searchTop = true
        //   this.show.searchBox = true
        // }else{
        //   this.getData.searchData = data.product
        //   this.show.searchTop = true
        //   this.show.searchBox = true
        // }
      },
      //获取关键字
      clickKeyWord() {
        this.show.searchTop = false
        this.val.keywordStorage.unshift(this.val.keyword)
        this.val.keywordStorage = this.removeDuplicatedItem(this.val.keywordStorage)
        this.val.keywordStorage = this.val.keywordStorage.slice(0,4)
        localStorage.setItem('keywordStorage', JSON.stringify(this.val.keywordStorage))
        this.$emit("clickKey", this.val.keyword)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-search2 {
    margin-bottom: 20px;
    /deep/.el-input__inner {
      -webkit-appearance: none;
      background-color: $rdx-light-color;
      background-image: none;
      border-radius: 8px 0px 0px 8px;
      border: 1px solid #FF4C62;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: 16px;
      height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;

    }
    /deep/.el-input__inner:hover{border-color:$rdx-primary}
    /deep/.el-input__inner:focus{border-color:$rdx-primary; box-shadow: 0px 0px 2px 0px $rdx-primary;}
    .button-search {
      width: 70px;
      height: 40px;
      background: #FF4C62;
      border: 1px solid #FF4C62;
      border-radius: 0px 8px 8px 0px;
    }
    .button-search:hover{animation: buttonOver 1s forwards;}
    @keyframes buttonOver{
    		0%{box-shadow:inset 0 0px 6px 0px #F13232;}
    		100%{box-shadow:inset 0 0px 6px 4px #F13232;}
    }
    .search-carousel{top: 8px; left:15px;color: #999999;}
    //浮动框
    .search-top-box {
        position: absolute;
        z-index: 3;
        top: 50px;
        left: 0px;
        background: #FFFFFF;
        min-width: 150px;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
        padding: 16px;
        z-index: 2000;
        color: #606266;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 #CCCCCC;
        word-break: break-all;
    }
    .search-top-box-ico{top: 34px; left:60px; z-index: 9999; color:#d9dee8}
    .search-close {
      animation: closeS 0.2s forwards
    }

    @keyframes closeS {
      0% {
        left: 0px;
        opacity: 1;
        width: 90%;
        overflow: hidden;
      }

      100% {
        left: 50%;
        top: 120px;
        opacity: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    }
    .search-open {
      animation: open 0.2s forwards
    }

    @keyframes open {
      0% {
        width: 10px;
        height: 10px;
        left:50%;
        top:120px;
        opacity: 0;
        overflow: hidden;
      }

      100% {
        width: 90%;
        left: 0px;
        top: 40px;
        opacity: 1;
      }
    }
  }
</style>
