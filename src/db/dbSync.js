const User = require('../model/user.model')
const Role = require('../model/role.model')
const VerificationCode=require("../model/verificationcode.model")
//dbInit()
//console.log("init");
async function dbInit() {
    // 模型同步。如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    await Role.sync()
    await User.sync()
    await VerificationCode.sync()
    console.log("init");
    // 初始化数据
    const roles=await Role.findAll()
    if(roles.length==0)
    {
        await Role.bulkCreate([
            { id: 1, name: '超级管理员' },
            { id: 2, name: '普通用户' },
        ])
    }
    
}

module.exports =  dbInit

