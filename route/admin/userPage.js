// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // 标识当前访问user页面
  req.app.locals.currentLink = 'user'
  // 接收用户传过来的当前页数
  let page = req.query.page || 1
  // 每页显示的数
  let pagesize = 2
  // 数据总数
  let count = await User.countDocuments({})
  // 总页数
  let total = Math.ceil(count / pagesize)
  // 页码对应的数据查询开始的位置
  let start = (page - 1) * pagesize
  // 将用户信息从数据库中查询出来
  let users = await User.find({}).limit(pagesize).skip(start)

  res.render('admin/user', {
    users,
    page,
    total
  })
}
