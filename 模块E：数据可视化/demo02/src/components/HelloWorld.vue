<template>
  <div id="main"></div>
</template>

<script>
import axios from "axios"
import * as echarts from 'echarts'
export default {
  data(){
    this.myChart = null
    return {}
  },
  name: 'HelloWorld',
  mounted(){
    this.myChart = echarts.init(document.getElementById('main'))
    var province = [],finalTotalAmount=[]
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios({
      method:'POST',
      url:"/dataVisualization/selectOrderInfo",
      data:JSON.stringify({
        "startTime":"2020-01-01 00:00:00",
        "endTime":"2020-12-30 00:00:00"
      })
    }).then(res =>{
      let data = res.data.data;
      let provinceData = {};

      data.forEach(item => {
        if (provinceData[item.provinceName]) {
          provinceData[item.provinceName] += item.finalTotalAmount;
        } else {
          provinceData[item.provinceName] = item.finalTotalAmount;
        }
      });

      let sortedData = Object.entries(provinceData).sort((a, b) => b[1] - a[1]);
      console.log(sortedData);
      // 获取消费额最高的5个省份
      let top5Data = sortedData.slice(0, 5);

      // 提取省份和消费额数据
      province = top5Data.map(item => item[0]);
      finalTotalAmount = top5Data.map(item => item[1]);

      console.log("---------------------------")

      console.log(province);
      console.log(finalTotalAmount);

      console.log("---------------------------")


      let option = {
        title: {
          text: '任务一'
        },
        xAxis: {
          data: province
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: finalTotalAmount,
            markLine: {
              data: [
                {
                  xAxis: province
                },
              ],
            }
          }
        ]
      };
      this.myChart.setOption(option);
    });
  }
}


</script>

<style>
  #main{
    width: 1000px;
    height: 600px;
  }
</style>
