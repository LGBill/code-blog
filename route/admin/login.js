// 导入用户集合构造函数
const { User } = require('../../model/user')

// 引入bcrypt模块
const bcrypt = require('bcrypt');

module.exports  = async (req,res) => {
  // 接收请求参数
  const {email, password} = req.body
  if (email.trim().length == 0 || password.trim().length == 0) {
      return res.status(400).render('admin/error', {
      msg: '邮箱或密码有不合适'
      })
  }
  // 根据用户邮箱地址查询用户信息
  // 如果查询到，user变量的值为对象类型
  // 如果查询不到， user变量为空
  let user = await User.findOne({email});

  // 查询到用户
  if (user) {
      // 密码比对
      let isValid = await bcrypt.compare(password, user.password)
      if (isValid) {
            // 登录成功
            // 将用户名存储在请求的对象当中
            req.session.username = user.username
            // 将用户角色存储在请求的对象当中
            req.session.role = user.role

            req.app.locals.userInfo = user
            // 对角色进行判断
            if (user.role = 'admin') {
                res.redirect('/admin/user')
            } else {
                res.redirect('/home/')
            }
      } else {
          // 密码不匹配
          res.status(400).render('admin/error', {msg: '邮箱或密码错误'})
      }
  } else {
      // 没有查询到用户
      res.status(400).render('admin/error', {msg: '邮箱或密码错误'})
  }
}
