const router=require('koa-router')()
router.prefix('/SuperAdmin')
router.post('/Login',async (ctx,next)=>{
    await next()
})
module.exports=router