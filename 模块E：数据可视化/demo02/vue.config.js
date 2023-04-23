const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/dataVisualization':{
        target:"http://192.168.45.5:48867",
        changeOrigin:true
      }
    }
  }
})
