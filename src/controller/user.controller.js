const jwt = require('jsonwebtoken')
const { createUser } = require('../service/user.service')
const { userRegisterError, useragentUnknow } = require('../constant/err.type')
const { JWT_SECRET } = process.env
const { createClientID, deleteClientID, getAllClientID, isClientIDExist } = require('../service/clientID.service')
const calcMD5Str = require('../util/calcMD5Str.util')
class UserController {

    //用户登录[state.userInfo]
    async login(ctx, next) {
        // 获取用户信息（在token的playload中，记录除了vfcode以外的全部用户信息）
        const { vfcode, ...args } = ctx.state.userInfo
        var uid = ctx.state.userInfo.id
        ctx.body = {
            code: 0,
            message: '登录成功',
            result: {
                user: args
            }
        }
        var useragent = ctx.request.header['user-agent']
        //若为空则禁止登陆
        if (useragent == null || useragent == '') {
            return ctx.app.emit('error', useragentUnknow, ctx)
        }
        var secret = calcMD5Str(useragent + JWT_SECRET)

        if (! await isClientIDExist(uid, secret))//如果该客户端未登录
        {
            var clients = await getAllClientID(uid)
            if (clients.length == process.env.MAX_CLIENT_NUM) {
                deleteClientID(uid, clients[0].clientMD5)
            }
            createClientID(uid, secret)
        }
        ctx.cookies.set("token", jwt.sign(args, secret, { //token令牌
            expiresIn: '7d', //token有效期7天
        }), {
            maxAge: 60 * 60 * 1000 * 24 * 7
        })
        ctx.cookies.set("id", uid, {
            maxAge: 60 * 60 * 1000 * 24 * 7
        })
    }
}

module.exports = new UserController()