const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const { hasNotAdminPermission, authTokenError } = require('../constant/err.type')
const {createClientID,deleteClientID,getAllClientID}=require('../service/clientID.service')
const calcMD5Str=require('../util/calcMD5Str.util')
// 验证用户是否登录[ctx.state.user]
const auth = async (ctx, next) => {
    const token = ctx.cookies.get("token")
    const uid=ctx.cookies.get("id")
    if(uid==null)
    {
        return ctx.app.emit('error', authTokenError, ctx)
    }
    var clients= await getAllClientID(uid)
        console.log(uid)
        for(let i=0;i<clients.length;i++)
        {
            try {
                const user = jwt.verify(token, clients[i].clientMD5) //验证token并且返回jwt中playload的内容
                ctx.state.user = user
                break
            } catch (error) {
                if(i<clients.length-1)
                {
                    continue
                }else{
                    return ctx.app.emit('error', authTokenError, ctx)
                }
                
            }
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