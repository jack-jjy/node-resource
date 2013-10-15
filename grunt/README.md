#grunt Demo

##[环境安装](http://gruntjs.com/getting-started)
* 安装 cli(命令行工具) :npm install -g grunt-cli
* 安装依赖 
	* cd grunt/
	* npm install

## 运行 
* 启动默认任务：任务名为default 
	* cd grunt/
	* grunt 

* 启动某个任务 
	* cd grunt/
	* grunt 任务名

> ps:所有的任务均在 GruntFile.js中定义

## [grunt介绍](http://gruntjs.com/)
* 一个基于任务的 JavaScript 项目命令行构建工具
* 可以做很多任务：如脚本验证（grunt-contrib-jshint），脚本，样式压缩（grunt-contrib-uglify），脚本合并（grunt-contrib-concat），编译coffee（grunt-contrib-coffee），编译less，sass等

## 常见问题
* Fatal error: Unable to find local grunt....:Gruntfile.js没被找到或者grunt没被安装。若是前者，则需要在项目根目录下写Gruntfile.js;若是后者则在pageage.json所在目录执行npm install。