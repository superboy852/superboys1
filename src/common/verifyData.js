function numberVerify(number) {
  if (number >= 100000000) {
    number = (number/100000000).toFixed(2) + "亿"
  }else if(number < 100000000 && number >= 10000){
    number = (number/10000).toFixed(2) + "w"
  }else{
    number = number
  }
  return number
}

function test(data) {
  if(data.errCode == 0 && data.data.list != undefined){
    data.data.list.forEach((item)=>{
      if(item.sales_amount != undefined){
        item.sales_amount = numberVerify(item.sales_amount)
      }
      if(item.sales_volume != undefined){
        item.sales_volume = numberVerify(item.sales_volume)
      }
      if(item.follower_count != undefined){
        item.follower_count = numberVerify(item.follower_count)
      }
      //总销量
      if(item.duration_volume != undefined){
        item.duration_volume = numberVerify(item.duration_volume)
      }
      //浏览量
      if(item.pv_count != undefined){
        item.pv_count = numberVerify(item.pv_count)
      }
      //直播销量
      if(item.duration_live_volume != undefined){
        item.duration_live_volume = numberVerify(item.duration_live_volume)
      }
      //视频销量
      if(item.duration_aweme_volume != undefined){
        item.duration_aweme_volume = numberVerify(item.duration_aweme_volume)
      }
      //昨日销量(件)
      if(item.day_order_count != undefined){
        item.day_order_count = numberVerify(item.day_order_count)
      }
      //销售额(元)
      if(item.amount != undefined){
        item.amount = numberVerify(item.amount)
      }
      //月销量(件)
      if(item.order_count != undefined){
        item.order_count = numberVerify(item.order_count)
      }
      //昨日销量(件)
      if(item.day_volume != undefined){
        item.day_volume = numberVerify(item.day_volume)
      }
      //昨日销售额(元)
      if(item.day_amount != undefined){
        item.day_amount = numberVerify(item.day_amount)
      }
      //昨日互动增量
      if(item.day_interaction_inc != undefined){
        item.day_interaction_inc = numberVerify(item.day_interaction_inc)
      }
      //昨日销量(件)
      if(item.month_order_count != undefined){
        item.month_order_count = numberVerify(item.month_order_count)
      }
      //粉丝增量
      if(item.follower_incr != undefined){
        item.follower_incr = numberVerify(item.follower_incr)
      }
      //直播预期观看人数
      if(item.live_pv_medium != undefined){
        item.live_pv_medium = numberVerify(item.live_pv_medium)
      }
      //近30日直播场均销售额
      if(item.live_average_amount_30 != undefined){
        item.live_average_amount_30 = numberVerify(item.live_average_amount_30)
      }
      //评论数
      if(item.comment_count != undefined){
        item.comment_count = numberVerify(item.comment_count)
      }
      //转发数
      if(item.forward_count != undefined){
        item.forward_count = numberVerify(item.forward_count)
      }
      //下载量
      if(item.download_count != undefined){
        item.download_count = numberVerify(item.download_count)
      }
      //销售量(件)
      if(item.volume != undefined){
        item.volume = numberVerify(item.volume)
      }
      //人气峰值
      if(item.total_user != undefined){
        item.total_user = numberVerify(item.total_user)
      }
      //销售额
      if(item.total_amount != undefined){
        item.total_amount = numberVerify(item.total_amount)
      }
      //关联视频数
      if(item.video_count != undefined){
        item.video_count = numberVerify(item.video_count)
      }
      //点赞数
      if(item.digg_count != undefined){
        item.digg_count = numberVerify(item.digg_count)
      }
      //转发数
      if(item.share_count != undefined){
        item.share_count = numberVerify(item.share_count)
      }
      //评论数
      if(item.comment_count != undefined){
        item.comment_count = numberVerify(item.comment_count)
      }
      //观看人次
      if(item.user_count != undefined){
        item.user_count = numberVerify(item.user_count)
      }
      //近两小时销量(件)
      if(item.sale_incr != undefined){
        item.sale_incr = numberVerify(item.sale_incr)
      }
      //月销量(件)
      if(item.sales != undefined){
        item.sales = numberVerify(item.sales)
      }
      //视频预期点赞
      if(item.aweme_digg_medium != undefined){
        item.aweme_digg_medium = numberVerify(item.aweme_digg_medium)
      }
      //近30日直播场均销售额
      if(item.live_average_amount_30 != undefined){
        item.live_average_amount_30 = numberVerify(item.live_average_amount_30)
      }
      //点赞增量
      if(item.digg_count_incr != undefined){
        item.digg_count_incr = numberVerify(item.digg_count_incr)
      }

      //直播小时榜(销量)
      if(item.sale_volume != undefined){
        item.sale_volume = numberVerify(item.sale_volume)
      }
      //关联直播（品牌库）
      if(item.live_sum_30 != undefined){
        item.live_sum_30 = numberVerify(item.live_sum_30)
      }


      if(item.author != undefined){
        item.author.follower_count = numberVerify(item.author.follower_count)
      }
    })
  }
  return data
}
export {
  test
}
