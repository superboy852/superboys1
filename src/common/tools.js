import Vue from 'vue'; //引入vue
let my = new Vue()
//前几天
function fun_date(aa) {
  var date1 = new Date(),
    time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
  var date2 = new Date(date1);
  date2.setDate(date1.getDate() + aa);
  var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  return [time1, time2];
}
//复制
function copy(text) {
  var input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  my.$message({
    message: '复制成功:' + text,
    type: 'success'
  })
}
//秒转换成正常时间格式  type:1 2021-09-02 15:00    2 09-02 15:00     3 2021-09-02  4 15:00  5 09-02   6  09-02 15:00:15 timestamp:时间戳
function time_cycle(type, timestamp) {
  let time = new Date(timestamp * 1000)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hours = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  if (type == 1) {
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
  } else if (type == 2) {
    return month + '-' + date + ' ' + hours + ':' + minute
  } else if (type == 3) {
    return year + '-' + month + '-' + date
  } else if (type == 4) {
    return hours + ':' + minute
  } else if (type == 5) {
    return month + '-' + date
  } else {
    return month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  }
}
//结束距离开始时间
function time_minus(startTime, endTime) {
  let timeDiff = endTime - startTime
  let day = parseInt(timeDiff / 86400)
  let hour = parseInt((timeDiff % 86400) / 3600)
  let minute = parseInt((timeDiff % 86400 % 3600) / 60)
  let second = parseInt((timeDiff % 86400 % 3600) % 60 % 60)
  day = day ? (day + '天') : ''
  hour = hour ? (hour + '时') : ''
  minute = minute ? (minute + '分') : ''
  second = second ? (second + '秒') : ''
  return day + hour + minute + second
}
//前几小时  dateTimeStamp==秒
function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - (dateTimeStamp * 1000); //毫秒转换成秒
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      result = "" + parseInt(monthC) + "月前";
    else {
      result = "" + parseInt(monthC / 12) + "年前";
    }
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
//点击下载图片到本地
function downloadImg(imgsrc, name) {
  let image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function() {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    let event = new MouseEvent("click");
    a.download = name || "code";
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = imgsrc;
}
//获取网址参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  } else {
    return null;
  }
}
//数据格式化 转万 转亿
function numberVerify(number) {
  if (number >= 100000000) {
    number = (number / 100000000).toFixed(2) + "亿"
  } else if (number < 100000000 && number >= 10000) {
    number = (number / 10000).toFixed(2) + "w"
  } else {
    number = number
  }
  return number
}
//判断图片是否存在
function is_img_url() {
  var imgList = document.getElementsByTagName('img')
  for (var i = 0; i < imgList.length; i++) {
    imgList[i].onerror = function() {
      var imgUrl = event.srcElement
      imgUrl.src = "http://douyin.guanxingshu.com/img/no_img.png";
      imgUrl.onerror = null;
    }
  }
}

export {
  fun_date,
  copy,
  time_cycle,
  time_minus,
  getDateDiff,
  downloadImg,
  getQueryString,
  numberVerify,
  is_img_url
}
