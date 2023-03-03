const {getNewLink}=require("../service/GetNewLink")
const generateCfgFile=require('../util/generateCfgFile.util')
const axios =require('axios')
const GetNewLink =async function(ctx,next)
{
    let linkobj=getNewLink()
    var data={
        state:404,
        message:"获取失败，请稍后再试！"
    }
    if(linkobj!=null)
    {
        data={
            state :200, 
            message:"获取成功!您的链接为:",
            link:linkobj.link,
            token:linkobj.token
        }
    }
    
    ctx.body=data      
    await next()
} 
const getSubFile =async function(ctx,next)
{
    var data
    await axios.get("https://www.dgydgy.com/api/v1/client/subscribe?token="+ctx.params.token)
    .then((res)=>{
        data=res.data
    })
    .catch((e)=>{
        ctx.body={
            code:0,
            message:'失败'
        }
        return
    })
    var file=generateCfgFile(data)
    if(file!=null)
    {
        ctx.body=file
        ctx.set('Content-disposition', 'attachment; filename= ikun.yaml')
    }
    await next()
}
const getVipLink=async function(ctx,next)
{
    let linkobj=getNewLink()

    if (link!=null) 
    {
        ctx.state=302
        ctx.redirect(linkobj.link)
    }
    await next()
}
module.exports={
    GetNewLink,
    getSubFile,
    getVipLink
}