<!-- <template>
  <HelloWorld />
</template> -->

<!-- <template>
  <div id="app">
    <PieChart />
  </div>
</template> -->

<!-- <template>
  <div id="app">
    <LineChart />
  </div>
</template> -->
<!-- <template>
  <div id="app">
    <RoseChart />
  </div>
</template> -->
<template>
  <div id="app">
    <Mixed />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PieChart  from './components/PieChart.vue'
import LineChart from './components/LineChart.vue'
import RoseChart from './components/RoseChart.vue'
import Mixed from './components/Mixed.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // PieChart
    // LineChart,
    // RoseChart,
    Mixed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
