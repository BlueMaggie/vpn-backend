const router=require('koa-router')()
const {auth,role}=require('../middleware/auth.middleware')
const {getUsers,deleteUser,register,login}=require('../controller/admin.controller')
const {rigisterParamValid,loginParamValid,loginVertify,}=require('../middleware/user.middleware')
const fs =require('fs')
router.prefix('/SuperAdmin')
router.get('/',async (ctx,next)=>{
    var data=fs.readFileSync(__dirname.replace(/routes/g,'')+'/public/admin.html')
    console.log(data)
    ctx.body=data
    ctx.set('content-type','text/html; charset=UTF-8')
    await next()
})
router.post('/login',loginParamValid,loginVertify,login)
router.get('/getUsers',auth,role,getUsers)
router.post('/deleteUser',auth,role,deleteUser)
router.post('/addUser',auth,role,rigisterParamValid,register)
module.exports=router