const jwt = require('jsonwebtoken')
const { createUser, updateByMail,getUserInfoByOr, deleteUser,getUsersNotAdmin} = require('../service/user.service')
const { userRegisterError, userUpdateError,deleteUserFail,userIsNotExist } = require('../constant/err.type')
const {deleteAllVFcode} =require('../service/verificationcode.service')
const { JWT_SECRET } = process.env

class AdminController {
    
    //用户登录[state.userInfo]
    async login(ctx, next) {
        // 获取用户信息（在token的playload中，记录除了password以外的全部用户信息）
        const { vfcode,...args } = ctx.state.userInfo
        ctx.body = {
            code: 0,
            message: '欢迎您，超级管理员',
            result: {
                user: args
            }
        }
        ctx.cookies.set("token",jwt.sign(args, JWT_SECRET, { //token令牌
            expiresIn: '30d', //token有效期7天
        }),{
            maxAge:60*60*1000*24*30
        })
    }
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
    //删除用户
    async deleteUser(ctx, next) {
        // 1.获取客户端请求的数据
        var  mail  = ctx.request.body.mail
        let user=await getUserInfoByOr({mail})
        if(user==null)
        {
            ctx.app.emit('error',userIsNotExist , ctx)
            return 
        }
        let res= await deleteAllVFcode(user.id)
        try {
            // 2.数据库操作
            const { res } = await deleteUser(mail)
            // 3.返回结果
            ctx.body = {
                code: 200,
                message: '删除成功',
                result: res,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error',deleteUserFail , ctx)
        }
    }
    //查询所有用户信息
    async getUsers(ctx,next)
    {
        var users = await getUsersNotAdmin()
        if(users==null)
        {
            ctx.app.emit('error',userIsNotExist , ctx)
            return
        }else{
            ctx.body={
                code:200,
                message:'获取成功',
                result:users,
            }
        }
    }

}

module.exports = new AdminController()