const {DataTypes}=require('sequelize')
const User=require('./user.model')
const seq = require("../db/seq")
const VerificationCode=seq.define('VerificationCode',{
    code:{
        type:DataTypes.INTEGER(6),
        allowNull:true,
        unique:true,
        comment:'验证码'
    },
    
},
{
    tableName:'vfcode',
    createdAt:false
}
)
User.hasMany(VerificationCode,{
    foreignKey: {
        name: 'userID', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        //type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        //defaultValue: 2,
        comment: '验证码',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
VerificationCode.belongsTo(User,{
        foreignKey: {
            name: 'userID', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
            //type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
            //allowNull: false, //默认为ture
            defaultValue: 2,
            comment: '验证码',
        },
        targetKey: 'id', //外键关联Role的字段，默认为Role主键
        onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
module.exports=VerificationCode