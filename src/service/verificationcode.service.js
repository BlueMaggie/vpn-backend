const { Op } = require("sequelize")
const Code = require('../model/verificationcode.model')
deleteCode= async function(userID,code) {
    const result = await Code.destroy({
        where: {
            code,
            userID
        }
    });
    return result
}

class CodeService {
    // 【增】创建验证码
    async createVFCode(userID,code) {
        const result = await Code.create({
            code,
            userID
        })
        // 
        setTimeout(()=>{
            deleteCode(userID,code)
        },1000*60*5)//验证码将在5分钟之后删除
    }

    // 【查】查询id对应的验证码是否存在，存在就返回true
    async isCodeExist(userID,code) {
        const result = await Code.findOne({
            where: {
                [Op.and]: [
                    { code },
                    {userID}
                ]
            }
        })
        return result ? true : false
    }

    //查询验证码表是否有一分钟以内创建的，如果有的话，就返回true
    async getCodeInOneMin(userID) {
        const result = await Code.findAll({
            where: { 
                userID
            }
        })
        var res=false
        var now=Math.floor(new Date().getTime()/1000)
        for(let i=0;i<result.length;i++)
        {
            let updateTime=Math.floor( Date.parse(result[i].updatedAt)/1000)
            if(now<updateTime+60)
            {
                res=true
                break
            }
        }
        return res
    }


    //删除该用户的某验证码
    
}

module.exports = new CodeService()