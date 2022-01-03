<template>
  <div class="func-box">
    <div class="flex position-re align-center justify-center">
      <img src="../assets/imgs/not_head.png" class="round button-a" style="width: 46px; height: 46px; border: 1px solid #FF4C62;" >
      <div class="position-ab" style="bottom: -8px; right: 8px;">
        <img src="../assets/imgs/right_a5.png" style="width: 16px; height: 16px;">
      </div>
    </div>
    <div class="flex position-re justify-center rdx-p-t-30 button-a">
      <el-popover placement="left" width="110" trigger="hover">
        <img src="../assets/imgs/gzh.jpg" style="width: 120px; height: 120px;" >
        <div class="flex justify-center" style="width: 40px;" slot="reference">
          <img src="../assets/imgs/right_a1.png" style="width: 29px; height: 29px;">
        </div>
      </el-popover>
    </div>
    <div class="flex position-re justify-center rdx-p-t-30 button-a">
      <el-popover placement="left" width="110" trigger="hover">
        <img src="../assets/imgs/APP.png" style="width: 120px; height: 120px;" >
        <div class="flex justify-center" style="width: 40px;" slot="reference">
          <img src="../assets/imgs/right_a2.png" style="width: 23px; height: 27px;">
        </div>
      </el-popover>
    </div>
    <div class="flex position-re justify-center rdx-p-t-30 button-a">
      <el-popover placement="left" width="110" trigger="hover">
        <img src="../assets/imgs/wx_xcx.png" style="width: 120px; height: 120px;" >
        <div class="flex justify-center" style="width: 40px;" slot="reference">
          <img src="../assets/imgs/right_a3.png" style="width: 29px; height: 29px;">
        </div>
      </el-popover>
    </div>
    <div class="flex position-re justify-center rdx-p-t-30 button-a">
      <el-popover placement="left" width="110" trigger="hover">
        <img src="../assets/imgs/gzh.jpg" style="width: 120px; height: 120px;" >
        <div class="flex justify-center" style="width: 40px;" slot="reference">
          <img src="../assets/imgs/right_a4.png" style="width: 31px; height: 27px;">
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      //点击返回头部
      goTop(){
        console.log("112")
      }
    }
  }
</script>

<style scoped>
  .func-box {
    position: fixed;
    bottom: 56px;
    right: 2px;
    box-sizing: border-box;
    padding-top: 6px;
    z-index: 10;
    width: 60px;
    padding: 16px 0px 25px 0px;
    background: #2C2C2C;
    border-radius: 30px;
  }
</style>
