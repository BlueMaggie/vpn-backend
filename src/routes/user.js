const Router = require('koa-router')
const { register, login, changePassword } = require('../controller/user.controller')
const { rigisterParamValid, loginParamValid, loginVertify } = require('../middleware/user.middleware')
const { auth,role } = require('../middleware/auth.middleware')

const router = new Router({
    prefix: '/user', //给所有api前加上/user
})

// 登录接口
router.post('/login', loginParamValid, loginVertify, login)

module.exports = router