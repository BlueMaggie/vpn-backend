const { Op } = require("sequelize")
const User = require('../model/user.model')

class UserService {
    // 【增】创建用户
    async createUser(mail) {
        const result = await User.create({
            mail
        })
        // 
        return result.dataValues
    }

    // 【查】查询用户是否存在
    async getUserInfoByOr( {mail} ) {
        const result = await User.findOne({
            where: {
                [Op.or]: [
                    { mail }
                ]
            }
        })
        return result ? result.dataValues : null
    }
    //【查】 查出所有非管理员用户信息
    async getUsersNotAdmin()
    {
        const result =await User.findAll({
            where:{
                [Op.not]:[
                    {
                        role:1
                    }
                ]
            }
        })
        return result ? result :null
    }
    // 【查】根据条件和 查询用户
    async getUserByAnd({ ...args }) {
        const result = await User.findOne({
            where: { ...args },
        })
        return result ? result.dataValues : null
    }

    // 【改】根据id更改用户信息
    async updateByMail({ ...args }) {
        const { mail, ...updateOpt } = args
        const result = await User.update(
            { ...updateOpt },
            {
                where: {
                    mail,
                }
            }
        )
        return result[0] == 1 ? true : false
    }

    //删除用户
    async deleteUser(mail) {
        const result = await User.destroy({
            where: {
                mail
            }
        });
        return result
    }
}

module.exports = new UserService()