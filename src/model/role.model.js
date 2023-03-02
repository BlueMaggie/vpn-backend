const { DataTypes } = require('sequelize')
const seq =require("../db/seq")

const Role = seq.define('Role', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '角色名',
    },
}, {
    tableName: 'role',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
})

module.exports = Role