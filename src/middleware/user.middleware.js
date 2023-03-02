const bcrypt = require('bcryptjs')
const joi = require('joi')
const { getUserByAnd, getUserInfoByOr } = require('../service/user.service')
const { paramFormatError, userIsNotExist, userLoginError, userVerificationError } = require('../constant/err.type')
const {isCodeExist}=require('../service/verificationcode.service')

// register 参数验证
const rigisterParamValid = async (ctx, next) => {
    const  param  = ctx.request.body
    const schema = joi.object({
        mail:joi.string().max(128).pattern(/^\w+@(\w+\.)\w+$/).required()
    })
    try {
        // 如果验证成功，validateAsync()的返回值就是验证的参数对象
        await schema.validateAsync(param)
    }
    catch (err) {
        console.error(paramFormatError.message, err) //console.error(err.message)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

const loginParamValid = async (ctx, next) => {
    const param= ctx.request.body
    const schema = joi.object({
        mail: joi.string().required().pattern(/^\w+@(\w+\.)\w+$/).max(128),
        vfcode:joi.string().required().pattern(/^[0-9]{6}$/)
    })
    try {
        // 如果验证成功，validateAsync()的返回值就是验证的参数对象
        await schema.validateAsync(param)
    }
    catch (err) {
        console.error(paramFormatError.message, err) //console.error(err.message)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// login 用户登录验证[ctx.state.userInfo]
const loginVertify = async (ctx, next) => {
    const { mail,vfcode} = ctx.request.body
    try {
        const result = await getUserInfoByOr({mail})
        // 1.用户是否存在
        if (!result) {
            console.error(userIsNotExist.message, ctx.request.body)
            ctx.app.emit('error', userIsNotExist, ctx)
            return
        }
        // 2.验证码是否匹配
        if (! await isCodeExist(result.id,vfcode)) {
            console.error(userVerificationError.message, ctx.request.body)
            ctx.app.emit('error', userVerificationError, ctx)
            return
        }
        // 中间件传值,将登录用户的信息传递给下个中间件
        ctx.state.userInfo = result
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}

module.exports = {
    rigisterParamValid,
    loginParamValid,
    loginVertify,
}