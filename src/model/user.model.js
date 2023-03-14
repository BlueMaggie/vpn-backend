const { DataTypes } = require('sequelize')
const seq = require("../db/seq")
const Role = require('./role.model')

// 创建User模型（会自动创建id字段并设其为自增主键）
const User = seq.define('User', {
    mail: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: '邮箱地址',
    },
    
}, {
    tableName: 'user', //表名
    timestamps: true, //启用时间戳（默认为true）
})

// hasMany和belongsTo经常成对出现。第二个参数对象写在hasMany和belongsTo上需一致，否则会出现两个外键。
// 外键在User上，对Role模型没有影响
Role.hasMany(User, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 2,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
User.belongsTo(Role, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 2,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})

module.exports = User