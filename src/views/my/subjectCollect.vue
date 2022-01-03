<template>
  <div class="box">
    <div class="flex">
      <span class="tips" style=" width: 6px; height: 24px; " >&ensp;</span>
      <span class="tipTitle">抖音版&emsp;话题收藏</span>
    </div>

    <div class="flex rdx-m-t-28 active-tab">
        <el-table :data="tableData" stripe class=" w-100 " :header-cell-style="{background:'#E7ECF1',color:'#666'}" style="font-weight: 800;">
          <el-table-column prop="text" label="话题" width="600px">
          </el-table-column>
          <el-table-column  prop="newVideoNum" label="新增视频数"  class="bold" align="center">
          </el-table-column>
          <el-table-column prop="newInteraction" label="新增互动量" class="bold" align="center">
          </el-table-column>
          <el-table-column prop="totalAmount" label="总播放量"  class="bold" align="center"  >
          </el-table-column>
          <el-table-column  prop="participation" label="参与人数"  class="bold" align="center">
          </el-table-column>
          <el-table-column label="操作"  align="center" width="200">
             <template slot-scope="scope">
                <el-button @click="checkDetails(scope.row)"  style="font-size: 16px;" type="text">话题详情</el-button>
                <el-button type="text" style="font-size: 16px;" v-model="collect" @click="clickCollect(scope.row)">{{collect}}</el-button>
             </template>
          </el-table-column>
        </el-table>
    </div>

    <div class="rdx-font-16 rdx-m-t-26" style="color: #999;" align="center">
      没有更多了~
    </div>

    <div style="height: 250px;">
    </div>
  </div>
</template>

<script>
  
   export default {
      data() {
        return {
          collect:'收藏',
          tableData: [{
            text: '#'+'2016-05-02',
            newVideoNum: '1',
            newInteraction: '1 1518 弄',
            totalAmount:'1',
            participation:'1'
          },{
            text: '#'+'2016-05-02',
            newVideoNum: '1',
            newInteraction: '1',
            totalAmount:'1',
            participation:'1'
          },{
            text: '#'+'2016-05-02',
            newVideoNum: '1',
            newInteraction: '1 1518 弄',
            totalAmount:'1',
            participation:'1'
          }]
        }
      },
       methods: {
            checkDetails(e) {
              console.log(e.text);
            },
            clickCollect(e){

                // this.collect="取消收藏";
                // this.collect="收藏";

            }
          }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/listNew.scss";

</style>
