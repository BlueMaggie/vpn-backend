const sendVerificationAsync = require('../util/sendverification.util')
const {  getUserInfoByOr } = require('../service/user.service')
const{userIsNotExist,sendVerificationError,getVerificationError}=require('../constant/err.type')
const {createVFCode,getCodeInOneMin}=require('../service/verificationcode.service')
const generatecvfCode=require('../util/generatevfCode.util')
const getVerification=  async function(ctx,next){
    const  mail = ctx.request.body.mail

    try {
        const result = await getUserInfoByOr({mail})
        console.log(result)
        // 1.用户是否存在
        if (!result) {
            console.error(userIsNotExist.message, ctx.request.body)
            ctx.app.emit('error', userIsNotExist, ctx)
            return
        }else{
            //用户在1分钟内没发过验证码，则发送验证码，并向数据库更新验证码
            if(! await getCodeInOneMin(result.id))
            {
                var code=generatecvfCode()
                createVFCode(result.id,code)
                sendVerificationAsync(mail,code.toString())
                ctx.body={
                    code:200,
                    message:'发送验证码成功!'
                }
            }else{
                ctx.app.emit('error',getVerificationError,ctx)
            }
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error',sendVerificationError,ctx)
    }
    await next()
}
module.exports=getVerification