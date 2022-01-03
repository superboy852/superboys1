<template>
  <div class="data-show flex flex-direction">
    <div class="flex">
      <el-input v-model="val.searchKey" placeholder="抖音号搜索"></el-input><el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        val:{
          searchKey:"",//抖音号搜索
        }
      }
    },
    mounted() {

    },
    methods:{}
  }
</script>
