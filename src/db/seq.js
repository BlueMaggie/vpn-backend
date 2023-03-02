const { Sequelize } = require('sequelize')

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = process.env
//const dbInit=require('./dbSync')
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST, //ip
    dialect: 'mysql', //数据库类型
    port: MYSQL_PORT, //数据库端口
})

//测试数据库是否连接成功
seq.authenticate().then(() => {
    //dbInit();
    console.log('数据库连接成功');
}).catch((err => {
    console.log(MYSQL_HOST)
    console.log('数据库连接失败：'+err);
}))

module.exports = seq