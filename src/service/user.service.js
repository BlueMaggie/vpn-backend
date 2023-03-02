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
    async getUserInfoByOr({ mail }) {
        const result = await User.findOne({
            where: {
                [Op.or]: [
                    { mail }
                ]
            }
        })
        return result ? result.dataValues : null
    }

    // 【查】根据条件和 查询用户
    async getUserByAnd({ ...args }) {
        const result = await User.findOne({
            where: { ...args },
        })
        return result ? result.dataValues : null
    }

    // 【改】根据id更改用户信息
    async updateById({ ...args }) {
        const { id, ...updateOpt } = args
        const result = await User.update(
            { ...updateOpt },
            {
                where: {
                    id,
                }
            }
        )
        return result[0] == 1 ? true : false
    }

    // 删除用户
    // async deleteUser(name) {
    //     const result = await User.destroy({
    //         where: {
    //             name
    //         }
    //     });
    //     return result
    // }
}

module.exports = new UserService()