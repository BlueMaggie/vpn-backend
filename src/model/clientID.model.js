const {DataTypes}=require('sequelize')
const User=require('./user.model')
const seq = require("../db/seq")
const ClientID=seq.define('ClientIDs',{
    clientMD5:{
        type:DataTypes.STRING(32),//md5 32个16进制数/128位
        allowNull:false,
        unique:true,
        comment:'客户端MD5'
    },
    
},
{
    tableName:'clients',
    createdAt:false
}
)
User.hasMany(ClientID,{
    foreignKey: {
        name: 'userID', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        //type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        //defaultValue: 2,
        comment: '客户端MD5',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
ClientID.belongsTo(User,{
        foreignKey: {
            name: 'userID', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
            //type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
            //allowNull: false, //默认为ture
            //defaultValue: 2,
            comment: '客户端MD5',
        },
        targetKey: 'id', //外键关联Role的字段，默认为Role主键
        onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
module.exports=ClientID