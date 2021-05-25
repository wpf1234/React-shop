const {
    addDecoratorsLegacy,
    override,
    fixBabelImports,
    addLessLoader
} = require("customize-cra");

module.exports = override(
    addDecoratorsLegacy(),
    // 针对 antd 实现按需打包，根据 import 打包（使用 babel-plugin-import）
    fixBabelImports( 'import' , {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true   // 自动打包相关样式
    }),
    // 使用 less-loader 对源码中 less 的变量进行重新制定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color' : '#1890ff'}
    })
)