const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const { hasNotAdminPermission, authTokenError } = require('../constant/err.type')

// 验证用户是否登录[ctx.state.user]
const auth = async (ctx, next) => {
    const token = ctx.cookies.get("token")
    try {
        const user = jwt.verify(token, JWT_SECRET) //验证token并且返回jwt中playload的内容
        ctx.state.user = user
    } catch (error) {
        // console.error(error.message)
        return ctx.app.emit('error', authTokenError, ctx)
    }
    await next()
}

// 友好验证用户是否登录，没登录也会放行[ctx.state.user]
const kindAuth = async (ctx, next) => {
    const token = ctx.cookies.get("token")
    try {
        const user = jwt.verify(token, JWT_SECRET) //验证token并且返回jwt中playload的内容
        ctx.state.user = user
    } catch (error) {
        // console.error(error.message)
    }
    await next()
}

// 判断用户的角色权限[state.user]
const role = async (ctx, next) => {
    const { role } = ctx.state.user
    if (role == 2) {
        console.error(hasNotAdminPermission.message, ctx.state.user)
        return ctx.app.emit('error', hasNotAdminPermission, ctx)
    }

    await next()
}

module.exports = {
    auth,
    kindAuth,
    role,
}