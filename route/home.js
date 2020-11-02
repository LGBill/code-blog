// 引入express框架
const express = require('express');

// 创建展示页面的路由
const home = express.Router();

home.get('/', require('./home/index'))

// 前台文章详情页面
home.get('/article', require('./home/article'))

// 评论
home.post('/comment', require('./home/comment'))

// 将路由对象当做模块成员进行导出
module.exports = home;