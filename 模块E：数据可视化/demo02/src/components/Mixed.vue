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
  name: 'Task5',
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'))
    // 初始化变量
    var province = [], region = [], avgAmount = [], regionAvgAmount = []
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
      // 初始化省份数据和地区数据
      let provinceData = {}, regionData = {}, provinceCount = {}, regionCount = {};

      // 遍历数据，累加各省份和地区的消费额和计数
      data.forEach(item => {
        if (provinceData[item.provinceName]) {
          provinceData[item.provinceName] += item.finalTotalAmount;
          provinceCount[item.provinceName] += 1;
        } else {
          provinceData[item.provinceName] = item.finalTotalAmount;
          provinceCount[item.provinceName] = 1;
        }
        if (regionData[item.regionName]) {
          regionData[item.regionName] += item.finalTotalAmount;
          regionCount[item.regionName] += 1;
        } else {
          regionData[item.regionName] = item.finalTotalAmount;
          regionCount[item.regionName] = 1;
        }
      });

      // 计算省份平均消费额
      let provinceAvgData = {};
      for (const key in provinceData) {
        provinceAvgData[key] = provinceData[key] / provinceCount[key];
      }

      let sortedProvinceData = Object.entries(provinceAvgData).sort((a, b) => b[1] - a[1]);

      // 获取平均消费额最高的5个省份
      let top5ProvinceData = sortedProvinceData.slice(0, 5);

      // 提取省份和平均消费额数据
      province = top5ProvinceData.map(item => item[0]);
      avgAmount = top5ProvinceData.map(item => item[1]);

      // 计算地区平均消费额
      let regionAvgData = {};
      for (const key in regionData) {
        regionAvgData[key] = regionData[key] / regionCount[key];
      }

      // 获取这5个省所在的地区的平均消费额
      region = [...new Set(top5ProvinceData.map(item => data.find(order => order.provinceName === item[0]).regionName))];
      regionAvgAmount = region.map(item => regionAvgData[item]);

      console.log("---------------------------")

      console.log(province);
      console.log(avgAmount);
      console.log(region);
      console.log(regionAvgAmount);

      console.log("---------------------------")

      let option = {
        title: {
          text: '任务五'
        },
        legend: {
          data: ['省份平均消费额', '地区平均消费额']
        },
        xAxis: {
          data: province
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '省份平均消费额',
            type: 'bar',
            data: avgAmount.map(val => parseFloat(val.toFixed(2))),
            markLine: {
              data: [
                {
                  xAxis: province
                },
              ],
            },
            // 显示柱状图上的数据，四舍五入保留两位小数
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
          },
          {
            name: '地区平均消费额',
            type: 'line',
            data: province.map(p => {
              const regionName = data.find(order => order.provinceName === p).regionName;
              return parseFloat(regionAvgAmount[region.indexOf(regionName)].toFixed(2));
            }),
            markLine: {
              data: [
                {
                  xAxis: province
                },
              ],
            },
            // 显示折线图上的数据，四舍五入保留两位小数
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
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
#main {
  width: 1000px;
  height: 600px;
}
</style>

