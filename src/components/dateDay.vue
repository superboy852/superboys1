<template>
  <div class="flex date-day align-center rdx-m-b-10">
    <el-radio-group v-model="chooseVal" @change="chooseDWMClick" size="mini" class="rdx-m-r-20">
      <el-radio-button label="0" v-if="timeType == 1">小时榜</el-radio-button>
      <el-radio-button label="1">日榜</el-radio-button>
      <el-radio-button label="2">周榜</el-radio-button>
      <el-radio-button label="3">月榜</el-radio-button>
    </el-radio-group>
    <div v-if="chooseVal == '0'">
      <!--      <el-date-picker v-model="hour" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
        @change="changeDate"> </el-date-picker> -->
      <el-select v-model="hour" placeholder="请选择" @change="changeHour">
        <el-option v-for="item in hourOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-if="chooseVal == '1'">
      <el-date-picker v-model="day" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="changeDate">
      </el-date-picker>
    </div>
    <div v-if="chooseVal == '2'">
      <el-date-picker v-model="week" type="week" format="yyyy 第 WW 周" placeholder="选择周" @change="changeWeek">
      </el-date-picker>
    </div>
    <div v-if="chooseVal == '3'">
      <el-date-picker v-model="month" type="month" value-format="yyyyMM" placeholder="选择月" @change="changeMonth">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  import * as tools from '@/common/tools.js';
  export default {
    props:{
      timeType:{
        type:String,
        default:"0"
      }
    },
    data() {
      return {
        chooseVal:"1",//选择时间 1日榜  2周榜  3月榜
        hour:"00:00-06:00",//小时值
        day: "", //日榜值
        week: "2021 第 WW 周", //周榜值
        month: "", //月榜值
        params: {},
        hourOptions: [{
            value: "0-6",
            label: "00:00-06:00"
          },
          {
            value: "6-12",
            label: "06:00-12:00"
          },
          {
            value: "12-18",
            label: "12:00-18:00"
          },
          {
            value: "18-24",
            label: "18:00-24:00"
          }
        ]
      }
    },
    mounted() {
      this.lastDay()
    },
    methods: {
      //默认获取上一天日期
      lastDay() {
        var day1 = new Date().getTime() - 24 * 60 * 60 * 1000;
        day1 = day1 / 1000;
        this.day = tools.time_cycle('3', day1);
        this.params.day = this.day.replace(/-/g, "");
        this.params.dayType = "day";
        this.$emit("dateVal", {
          day: this.params.day,
          dayType: this.params.dayType
        })
      },
      //点击日期
      chooseDWMClick(str) {
        if(str == 0){
          this.chooseVal = 0
          this.params.dayType = "hour"
          this.params.day = '0-6'
          this.$emit("dateVal", {
            day: this.params.day,
            dayType: this.params.dayType
          })
        }else if (str == '1') {
          this.chooseVal = 1
          this.lastDay()
        } else if (str == '2') {
          this.chooseVal = 2
          var myDate = new Date();
          var weekDate = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000); // 计算开始时间
          var weekDate2 = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000); // 计算结束时间
          var day = weekDate.getDay();
          var time = weekDate.getDate() - day + (day === 0 ? -6 : 1);
          var startDate = new Date(weekDate.setDate(time));
          var m1 = startDate.getMonth() + 1;
          var d1 = startDate.getDate();
          if (m1 < 10) {
            m1 = '0' + m1
          }
          if (d1 < 10) {
            d1 = '0' + d1
          }
          var beginTime = startDate.getFullYear() + '-' + m1 + '-' + d1;
          beginTime = beginTime.replace(/-/g, '')
          var endDate = new Date(weekDate2.setDate(time + 6));

          var m2 = endDate.getMonth() + 1;
          var d2 = endDate.getDate();
          if (m2 < 10) {
            m2 = '0' + m2
          }
          if (d2 < 10) {
            d2 = '0' + d2
          }
          var endTime = endDate.getFullYear() + '-' + m2 + '-' + d2;
          endTime = endTime.replace(/-/g, '')
          this.params.day = beginTime + '-' + endTime
          this.params.dayType = "week"
          this.$emit("dateVal", {
            day: this.params.day,
            dayType: this.params.dayType
          })
        } else {
          this.chooseVal = 3
          var years = new Date().getFullYear();
          var lastMonth = new Date().getMonth();
          lastMonth = ((lastMonth == 0) ? (12) : lastMonth);
          if (lastMonth < 10) {
            lastMonth = '0' + lastMonth
          }

          this.params.dayType = "month"
          this.month = years+""+ lastMonth
          this.params.day = years+""+ lastMonth
          this.$emit("dateVal", {
            day: this.params.day,
            dayType: this.params.dayType
          })
        }
      },
      //获取小时
      changeHour(val){
        this.params.dayType = "hour"
        this.params.day = val
        this.$emit("dateVal", {
          day: this.params.day,
          dayType: this.params.dayType
        })
      },
      //获取日期
      changeDate(val) {
        this.params.dayType = "day"
        this.params.day = val.replace(/-/g, "")
        this.$emit("dateVal", {
          day: this.params.day,
          dayType: this.params.dayType
        })
      },
      //获取周
      changeWeek(val) {
        this.params.dayType = "week"
        var date1 = new Date(val);
        var m1 = date1.getMonth() + 1;
        var d1 = date1.getDate();
        if (m1 < 10) {
          m1 = '0' + m1
        }
        if (d1 < 10) {
          d1 = '0' + d1
        }
        var time1 = date1.getFullYear() + "" + m1 + "" + d1;
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 6); //加7天
        var m2 = date2.getMonth() + 1;
        var d2 = date2.getDate();
        if (m2 < 10) {
          m2 = '0' + m2
        }
        if (d2 < 10) {
          d2 = '0' + d2
        }
        var time2 = date2.getFullYear() + "" + m2 + "" + d2;
        this.params.day = time1 + '-' + time2
        this.$emit("dateVal", {
          day: this.params.day,
          dayType: this.params.dayType
        })
      },
      //获取月
      changeMonth(val) {
        this.params.dayType = "month"
        this.params.day = val
        this.$emit("dateVal", {
          day: this.params.day,
          dayType: this.params.dayType
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .date-day {
    /deep/.el-radio-button--mini .el-radio-button__inner {
      padding: 5px 15px;
    }

    //高度
    /deep/.el-radio-button:first-child .el-radio-button__inner {
      border-radius: 10px 0 0 10px;
    }

    //第一个圆角
    /deep/.el-radio-button:last-child .el-radio-button__inner {
      border-radius: 0 10px 10px 0;
    }

    //最后一个圆角
    /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: $rdx-primary;
      background-color: #FCE5E8;
      border-color: #FCE5E8;
      box-shadow: -1px 0 0 0 #FCE5E8;
    }

    //选择后的颜色
    /deep/.el-input--small .el-input__inner {
      border-radius: 4px;
    }

    /deep/.el-date-editor.el-input {
      width: 170px;
    }
  }
</style>
