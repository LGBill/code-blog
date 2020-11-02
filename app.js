// 引入express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session')

// 导入art-template模板引擎
const template = require('art-template')
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan第三方模块
const morgan = require('morgan');
// 导入config第三方模块
const config = require('config');

// 创建网站服务器
const app = express();
// 设置端口
const port = 80;
// 数据库连接
require('./model/connect');

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({secret: 'secret key', saveUninitialized: false}))
app.use(bodyParser.json())

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀
app.set('view engine', 'art')
// 当渲染后缀为art的模板时，所使用的模板引擎
app.engine('art', require('express-art-template'));
// 向模板内部导入dataformat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))

//  测试config
console.log(config.get('title'));

// 判断当前环境
if(process.env.NODE_ENV == 'development'){
    //console.log('当前是开发环境')

    //在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));
}else{
    console.log('当前是生成环境')
}

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err)
    let params = []
    for (let attr in result) {
        if (attr != 'path') {
        params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

// 监听端口
app.listen(port, () => {
    console.log('网站服务器创建成功，可以前往访问localhost:' + port);
});