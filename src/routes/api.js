const router=require('koa-router')()
const getVerification =require('../controller/verificationcode.controller')
const {GetNewLink,getSubFile,getVipLink} =require('../controller/getlink.controller')
const {auth,role}=require('../middleware/auth.middleware')
router.prefix("/api")
//获取新链接
router.get('/GetNewLink',auth,GetNewLink)
//特权访问，直接重定向到链接
router.get('/VipLink',getVipLink)
router.post('/getVerification' ,getVerification)

router.get('/sub/:token',getSubFile)
module.exports=router