<template>
  <div id="main"></div>
</template>
<script>
import axios from "axios"
import * as echarts from 'echarts'
export default {
  data() {
    this.myChart = null
    return {}
  },
  name: 'HelloWorld',
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'))
    var area = [], totalAmount = []
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios({
      method: 'POST',
      url: "/dataVisualization/selectOrderInfo",
      data: JSON.stringify({
        "startTime": "2020-01-01 00:00:00",
        "endTime": "2020-12-30 00:00:00"
      })
    }).then(res => {
      let data = res.data.data;
      let areaData = {};

      data.forEach(item => {
        if (areaData[item.regionName]) {
          areaData[item.regionName] += item.finalTotalAmount;
        } else {
          areaData[item.regionName] = item.finalTotalAmount;
        }
      });

      let sortedData = Object.entries(areaData).sort((a, b) => b[1] - a[1]);
      console.log(sortedData);

      // 提取地区和消费额数据
      area = sortedData.map(item => item[0]);
      totalAmount = sortedData.map(item => item[1]);

      console.log("---------------------------")

      console.log(area);
      console.log(totalAmount);

      console.log("---------------------------")

      let option = {
        title: {
          text: '任务十二'
        },
        legend: {
          data: ['消费总额占比']
        },
        series: [
          {
            name: '消费总额占比',
            type: 'pie',
            radius: [0, '75%'],
            roseType: 'area',
            label: {
              show: true
            },
            data: area.map((value, index) => {
              return { name: value, value: totalAmount[index] }
            })
          }
        ]
      };
      this.myChart.setOption(option);
    });
  }
}

</script>
<style>
#main {
  width: 1000px;
  height: 600px;
}
</style>