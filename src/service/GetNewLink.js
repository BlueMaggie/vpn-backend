const axios=require('axios')
const Queue=require('../util/queue.util')
const queue=new Queue(9)//队列最大长度为9
const  generateRandomAccount=function(len) {
    var litters="123456789abcdefghijklmnopqrstuvwxyzQEERTYUIOPASDFGHJKLZXCVBNM"
    var account=""
    for(i=0;i<len;i++)
    {
        account+=litters[Math.floor(Math.random()*litters.length)]
    }
    account+="@qq.com"
    return account
}
const requestLink= async function()
{
    let account=generateRandomAccount(12)
    let data={
        'email':account,
        'password':'021114zz',
        'invite_code':'',
        'email_code':''
    }
    axios.post("https://www.dageyun1.com/api/v1/passport/auth/register",data)
            .then((res)=>{
                if(res.data.data.token!=null)
                {
                    queue.InQueue(res.data.data.token)
                }
            })
            .catch((e)=>{
                console.log(e)
            })
            
}
if(!process.env.VER_TEST)
{
  requestLink()
  setInterval(requestLink,1000*60*10)
}

const getNewLink =
     function () {
        if(queue.isEmpty())
        {
            requestLink()
            return null
        }else{
            var token=queue.OutQueue()
            return {
               link : process.env.APP_HOST_PORT+"/api/sub/"+token,
               token
            }
        }
    }



module.exports = {getNewLink}