const jwt = require('jsonwebtoken')
const { createUser, updateById } = require('../service/user.service')
const { userRegisterError, userUpdateError } = require('../constant/err.type')
const { JWT_SECRET } = process.env

class UserController {
    //用户注册
    async register(ctx, next) {
        // 1.获取客户端请求的数据
        const  mail  = ctx.request.body.mail

        try {
            // 2.数据库操作
            const { res } = await createUser(mail)
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '注册成功',
                result: res,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    //用户登录[state.userInfo]
    async login(ctx, next) {
        // 获取用户信息（在token的playload中，记录除了password以外的全部用户信息）
        const { vfcode,...args } = ctx.state.userInfo
        ctx.body = {
            code: 0,
            message: '登录成功',
            result: {
                user: args
            }
        }
        ctx.cookies.set("token",jwt.sign(args, JWT_SECRET, { //token令牌
            expiresIn: '7d', //token有效期7天
        }))
    }
}

module.exports = new UserController()