//引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入config第三方模块
const config = require('config');
console.log(config.get('db.user'))


// mongoose.connect('mongodb://lgb:lgb11860@localhost:27017/blog', {useNewUrlParser: true,useUnifiedTopology:true})
//   .then(() => console.log('mongodb 连接成功!'))
//   .catch(() => console.log('mongodb 连接失败'))

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {useNewUrlParser: true,useUnifiedTopology:true})
  .then(() => console.log('mongodb 连接成功!'))
  .catch(() => console.log('mongodb 连接失败'))