const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// 打包配置
const addCustomize = () => (config) => {  
  // 修改path目录  
  const path = require('path');  
  const paths = require('react-scripts/config/paths');  
  paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');  
  config.output.path = path.join(path.dirname(config.output.path), 'dist'); 

  return config;
};

module.exports = override(
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, //自动打包相关的样式 默认为 style:'css'
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  }),
  addCustomize()
);
