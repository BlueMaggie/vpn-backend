const { Op } = require("sequelize")
const ClientID = require('../model/clientID.model')


class ClientIDService {
    
    // 【增】创建ClientID
    async createClientID(userID,clientMD5) {
        
        const result = await ClientID.create({
            clientMD5,
            userID
        })
        return result? result.dataValues:null
    }

    // 【查】查询id对应的ClientID是否存在，存在就返回true
    async isClientIDExist(userID,clientMD5) {
        const result = await ClientID.findOne({
            where: {
                [Op.and]: [
                    { clientMD5 },
                    {userID}
                ]
            }
        })
        return result ? true : false
    }


    //【删】删除该用户的所有ClientID
    async deleteAllclientID(userID){
        const result =ClientID.destroy({
            where:{
                userID
            }
        })
        return result
    }
    async deleteClientID(userID,clientMD5) {
        const result = await ClientID.destroy({
            where: {
                clientMD5,
                userID
            }
        });
        return result
    }
    async getAllClientID(userID)
    {
        const result=ClientID.findAll({
            where:{
                userID
            }
        })
        return result
    }
}

module.exports = new ClientIDService()