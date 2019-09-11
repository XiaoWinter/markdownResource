# 1. 在线文档

[yarn的命令](https://yarnpkg.com/zh-Hans/docs/cli/)

	yarn: https://yarnpkg.com/zh-Hans/docs/cli
	npm: https://www.npmjs.cn/

# 2. 常用命令
## 初始化项目: 
	yarn init -y
	npm init -y

## 下载项目的所有声明的依赖: 
	yarn
	npm install

## 下载指定的运行时依赖包: 
	yarn add webpack@3.2.1
	npm install webpack@3.2.1 --save

## 下载指定的开发时依赖: 
	yarn add webpack@3.2.1 -D
	npm install webpack@3.2.1 -D

## 全局下载指定包: 
	yarn global add webpack
	npm install webpack -g

## 删除依赖包: 
	yarn remove webpack
	npm remove webpack -S
	yarn global remove webpack
	npm remove webpack -g

## 运行项目中配置的script: 
	yarn run xxx
	npm run xxx

## 查看某个包的信息: 
	yarn info xxx
	npm info xxx

## 设置淘宝镜像: 
	yarn config set registry https://registry.npm.taobao.org
	npm config set registry https://registry.npm.taobao.org

## 查看全局下载目录
	yarn global bin
	npm root -g

