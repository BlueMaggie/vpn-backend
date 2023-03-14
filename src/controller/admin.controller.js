const jwt = require('jsonwebtoken')
const { createUser,getUserInfoByOr, deleteUser,getUsersNotAdmin} = require('../service/user.service')
const { userRegisterError,deleteUserFail,userIsNotExist } = require('../constant/err.type')
const {deleteAllVFcode} =require('../service/verificationcode.service')
const {deleteAllclientID,isClientIDExist}=require('../service/clientID.service')
const { JWT_SECRET } = process.env
const calcMD5Str = require('../util/calcMD5Str.util')
class AdminController {
    
    //用户注册
    async register(ctx, next) {
        // 1.获取客户端请求的数据
        const  mail  = ctx.request.body.mail
        try {
            // 2.数据库操作
            const  res  = await createUser(mail)
            // 3.返回结果
            console.log(res)
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
         await deleteAllclientID(user.id)
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