<template>
  <div class="flex align-center flex-direction rdx-m-t-20" :style="show.noDataShow ? '' : 'display: none;'">
    <img src="@/assets/imgs/no-data.png" style="opacity: 60%;">
    <span style="color: #b4b4b4; margin-bottom: 20px; line-height: 30px; font-size: 14px;" :style="'margin-top:' + marginTop + 'px;'" v-if="isSlot==1">{{noText}}</span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props:{
    	"noImg":{
    		type:String,
    		default:"assets/imgs/no-data.png"
    	},
    	"noText":{
    		type:String,
    		default:"暂无内容"
    	},
      "marginTop":{
      	type:String,
      	default:"0"
      },
      "isSlot":{
        type:String,
        default:"1"
      }
    },
    data() {
      return {
        show:{
          noDataShow:false
        }
      }
    },
    mounted() {
      setTimeout(()=>{
        this.show.noDataShow = true
      },10)
    },
    methods: {

    }
  }
</script>

<style>
</style>
