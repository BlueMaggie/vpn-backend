const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//const koaBody=require('koa-body')

let dotenv =  require('dotenv');
dotenv.config('./env');
const dbInit =require("./db/dbSync")
const index = require('./routes/index')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(koaBody({
//   multipart: true
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
//app.use(KoaBody)
dbInit()

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  ctx.body=err
  console.error('server error', err, ctx)
});

module.exports = app
