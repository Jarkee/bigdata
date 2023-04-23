<template>
  <div id="scatter-chart"></div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    this.scatterChart = null;
    return {};
  },
  name: "ScatterChart",
  mounted() {
    this.scatterChart = echarts.init(document.getElementById("scatter-chart"));
    axios({
      method: "POST",
      url: "/dataVisualization/selectGoodsInfo"
    }).then(res => {
      let data = res.data.data;
      let groupedData = {};
      console.log(data);

      data.forEach(item => {
        if (groupedData[item.year]) {
          groupedData[item.year]++;
        } else {
          groupedData[item.year] = 1;
        }
      });

      let years = Object.keys(groupedData);
      let productCounts = Object.values(groupedData);

      console.log(years);
      console.log(productCounts);

      let scatterData = years.map((year, index) => [year, productCounts[index]]);

      let option = {
        title: {
          text: "任务三"
        },
        xAxis: {
          // type: "category",
          data: years
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "scatter",
            data: scatterData
          }
        ]
      };
      this.scatterChart.setOption(option);
    });
  }
};
</script>

<style>
#scatter-chart {
  width: 1000px;
  height: 600px;
}
</style>
