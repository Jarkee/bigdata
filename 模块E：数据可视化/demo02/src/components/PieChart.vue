<template>
  <div id="pie-chart"></div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    this.pieChart = null;
    return {};
  },
  name: "PieChart",
  mounted() {
    this.pieChart = echarts.init(document.getElementById("pie-chart"));
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios({
      method: "POST",
      url: "/dataVisualization/selectOrderInfo",
      data: JSON.stringify({
        startTime: "2020-01-01 00:00:00",
        endTime: "2020-12-30 00:00:00"
      })
    }).then(res => {
      let data = res.data.data;
      let regionData = {};

      data.forEach(item => {
        if (regionData[item.regionName]) {
          regionData[item.regionName] += item.finalTotalAmount;
        } else {
          regionData[item.regionName] = item.finalTotalAmount;
        }
      });

      let pieChartData = Object.entries(regionData).map(([name, value]) => ({
        name,
        value
      }));

      console.log(pieChartData);

      let option = {
        title: {
          text: "任务二"
        },
        series: [
          {
            type: "pie",
            data: pieChartData
          }
        ]
      };
      this.pieChart.setOption(option);
    });
  }
};
</script>

<style>
  #pie-chart {
    width: 1000px;
    height: 600px;
  }
</style>
