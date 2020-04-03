# 一个适合 nodejs 初探者的全栈项目

## 项目简介

一个基于 `nodejs`、`express` 框架及 `mongoDB` 数据库搭建的简易博客系统

## 效果实现

主体分为前后页面，前台包括用户注册登录面板，文章内容的分页、分类展示；内容详情页有文章内容展示，底部有评论信息展示。后台管理页面包括管理首页、注册用户详细信息、文章分类管理页、文章分类添加页、所有文章信息页、添加文章页。实现对整站整站所有内容的增删改查。整站部分页面用 bootstrap 组件搭建，天然响应式，但是样式很一般。

## 技术栈

- nodeJs 搭建基本的后端环境
- express 实现页面路由设计、页面渲染、后端数据处理
- mongoose nodejs 后端与 MongoDB 数据库连接的桥梁，定义数据库表结构、构建表模型、通过操作表模型实现对数据库的增删改查。
- ajax 实现用户注册、登录相关逻辑判断与验证、无刷新提交平论、获取评论
- body-parser 用于处理前端 post 请求提交过来的数据
- cookies 保持用户登录状态，作为中间变量传递给模板实现逻辑上的渲染
- es6 模板字符串渲染评论，后端数据回馈的大面积 promise 操作
- swig 模板渲染引擎，实现页面的引用、继承、代码的复用从而提高页面性能

## 开发环境 webstorm、mongoDB

## 界面预览

### 前台

![image](https://github.com/formattedzzz/blogsystem/raw/master/blogpic/blog1.png)
![image](https://github.com/formattedzzz/blogsystem/raw/master/blogpic/blog2.png)

### 后台

![image](https://github.com/formattedzzz/blogsystem/raw/master/blogpic/blog5.png)

## 项目收获

初步熟悉了全栈项目的开发流程、了解服务端模版渲染的基本机制、加深前后端数据交互方面的概念、了解了一些中间件的特性、体会了 es6 语法特性的强大及严谨性。
