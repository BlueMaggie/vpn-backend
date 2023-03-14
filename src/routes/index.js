const router = require('koa-router')()
const fs = require('fs')
loadRouter(__dirname)

// 载入dirname文件夹下及其所有子孙文件夹下的所有路由
function loadRouter(dirname) {
    fs.readdirSync(dirname).forEach(file => {
        if (!/^.+(\.js)$/.test(file)) {
            loadRouter(dirname + '/' + file)
        } else if (file !== 'index.js') {
            let r = require(dirname + '/' + file)
            router.use(r.routes())
        }
    })
}
router.redirect('/','/index.html',302)//重定向到静态页面
router.redirect('/GetNewLink','/',302)//兼容以前的链接
router.redirect('/SuperAdmin/Manage','/SuperAdmin',302)
router.redirect('/SuperAdmin/login','/SuperAdmin',302)
module.exports = router
