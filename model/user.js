// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 引入bcrypt模块
const bcrypt = require('bcrypt');
// 引入Joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    // 保证邮箱唯一
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // admin 超级管理员
  // normal 普通用户
  role: {
    type: String,
    required: true
  },
  // 0 启用
  // 1 禁用
  state: {
    type: Number,
    default: 0
  }
})

// 创建用户集合
const User = mongoose.model("User", userSchema)

async function createUser() {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash('123456', salt)
  const user = await User.create({
    username: '罗国标',
    email: 'lgbill@163.com',
    password: pass,
    role: 'admin',
    state: 0
  })
}
//createUser()

// 验证用户信息
const validateUser = (user) => {
  // 定义对象规则
  const schema = {
    username: Joi.string().min(2).max(30).required().error(new Error('username 没有通过')),
    email: Joi.string().email().required().error(new Error('email 没有通过')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('password 没有通过')),
    role: Joi.string().valid('admin','normal').required().error(new Error('role 没有通过')),
    state: Joi.number().valid('0','1').required().error(new Error('state 没有通过'))
  }
  return Joi.validate(user, schema)
}

// 将用户集合作为模块成员导出
module.exports = {
  User,
  validateUser
}