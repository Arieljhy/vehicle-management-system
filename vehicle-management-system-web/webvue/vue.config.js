//vue.config.js
module.exports  = {
    lintOnSave:false,
    //基本路径
    publicPath:'',

    //构建时输出目录
    outputDir:'dist',

    //放置静态资源的目录
    assetsDir: "static",

    //html 输出路径
    indexPath: 'index.html',

    //文件名hash
    filenameHashing:true,

    pages:{
        index:{
            //page 的入口
            entry:'src/main.js',
            template: 'public/index.html',
            filename:'index.html',
            title:"车辆信息管控平台",
            chunks:['chunk-vendors','chunk-common','index']
        }
    },
    runtimeCompiler:false,
    // css:{
    //     extract:true,
    //     sourceMap:false,
    //     loaderOptions:{
    //         css:{

    //         }
    //     },
    //     modules:false
    // }
    // webpack-dev-server 相关配置
  devServer: {
    // 设置主机地址
    host: '127.0.0.1',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        // 开发环境
        target: 'http://121.4.245.39/api',
 
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL(设置跨域)
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
}



}