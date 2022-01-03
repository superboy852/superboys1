<template>
  <div class="box" style="height: 100%;">
    <no-data marginTop="0" class="rdx-p-t-30"></no-data>
  </div>
</template>
<script>
  import noData from "@/components/noData.vue"
  export default{
    components: {
      noData
    },
    data(){
      return{

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/list.scss";
</style>