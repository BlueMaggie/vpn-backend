const jwt = require('jsonwebtoken')
const { createUser, updateById } = require('../service/user.service')
const { userRegisterError, userUpdateError } = require('../constant/err.type')
const { JWT_SECRET } = process.env

class UserController {
    
    //用户登录[state.userInfo]
    async login(ctx, next) {
        // 获取用户信息（在token的playload中，记录除了vfcode以外的全部用户信息）
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
        }),{
            maxAge:60*60*1000*24*7
        })
    }
}

module.exports = new UserController()