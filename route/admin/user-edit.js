// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
    // 标识当前访问user页面
  req.app.locals.currentLink = 'user'
  const {message, id} = req.query
  // 如果有id，是修改操作
  if (id) {
    // 修改操作
    let user = await User.findOne({_id: id})
    res.render('admin/user-edit', {
      message,
      user,
      link: '/admin/user-modify?id=' + id,
      button: '修改'
    })
  } else {
    // 添加操作
    res.render('admin/user-edit', {
      message,
      link: '/admin/user-edit',
      button: '添加'
    })
  }
}
