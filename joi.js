// 引入Joi模块
const Joi = require('joi')

// 定义对象的验证规则
const schema = {
  username: Joi.string().min(2).max(5).error(new Error('username 没有通过')),

}

//Joi.validate({username: 'ab'}, schema)

async function run () {
  try {
    await Joi.validate({username: 'a'}, schema)
  } catch (error) {
    console.log(error.message);
    return
  }
  console.log('111');
}

run ()