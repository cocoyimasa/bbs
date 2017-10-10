require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// apis---------------------
var bodyParser = require('body-parser')
//var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

var appData = require('../data.json')
var commentData = require('../all_comments.json')
var tags = appData.tags
var discussion = appData.discussionList
var articles = appData.articles // remember to add 'comment' attribute
var allComments = commentData.all_comments
var storage = {}

var apiRoutes = express.Router()
apiRoutes.get('/tags', function (req, res) {
    res.json({
        errno:0,
        data:tags
    })
})

apiRoutes.get('/discussion', function (req, res) {
    res.json({
        errno:0,
        data:discussion
    })
})

apiRoutes.get('/discussion/:id', function (req, res) {
    var params = req.url.split('/')
    var pageNum = parseInt(params[params.length-1])-1
    console.log(pageNum)
    if(isNaN(pageNum) || Object.prototype.toString.call(pageNum) != '[object Number]'){
        res.json({
            errno:1,
            data:discussion
        })
        return
    }
    var pages = Math.floor(discussion.length / 10)
    if(pageNum > pages){
        pageNum = pages
    }
    var st = pageNum*10
    var end = pageNum*10+20
    console.log('nums:',discussion.slice(st,end).length,discussion.length)
    res.json({
        errno:0,
        data:discussion.slice(st,end)
    })
})

apiRoutes.get('/discussion_length', function (req, res) {
    var pages = Math.floor(discussion.length / 10)+1
    res.json({
        errno:0,
        data:pages
    })
})

apiRoutes.get('/articles', function (req, res) {
    res.json({
        errno:0,
        data:articles
    })
})

apiRoutes.post('/new_discussion',function (req,resp) {
    console.log(req.body)
    discussion.push(req.body)
    resp.json({
        errno:0,
        data:discussion
    })
})

var storeUserInfo = function (user) {
    storage.user = storage.user || []
    storage.user.push(user)
    console.log('add 1 user')
}

var checkUser = function (user) {
    var stored = storage.user
    var res = false
    for(var u in stored){
        res = user.username == u.username &&
            user.pwd == u.pwd ? true:false
    }
    return res
}

apiRoutes.post('/signup',function (req,resp) {
    //check login data
    var username = req.body.username
    var email = req.body.email
    var pwd = req.body.password
    //parse()--事实上需要有parse过程，用于过滤用户输入，此处省略
    var user = {
        username:username,
        email:email,
        pwd:pwd,
    }
    console.log(user)
    //--模拟存储即可
    storeUserInfo(user)
    var data = 'success'
    resp.json({
        errno:0,
        data:data
    })
})

apiRoutes.post('/login',function (req,resp) {
    //check login data
    var username = req.body.username
    var email = req.body.email
    var pwd = req.body.password
    //parse()--事实上需要有parse过程，用于过滤用户输入，此处省略
    var user = {
        username:username,
        email:email,
        pwd:pwd,
    }
    console.log(user)
    //var data = checkUser(user)
    var data = 'success'
    resp.json({
        errno:0,
        data:data
    })
})

apiRoutes.get('/source_code',function (req,resp) {
    console.log('d')
    var filePath = path.resolve(__dirname, '../data.json')
    console.log(filePath)
    resp.download(filePath,'data.json',function (err) {
        if(err){
            console.log(err)
        }else{
            console.log('success')
        }
    })

})

apiRoutes.get('/comments/:id',function (req,resp) {
    var params = req.url.split('/')
    var pageNum = parseInt(params[params.length-1])
    resp.json({
        errno:0,
        data:allComments[pageNum]
    })
})

app.use('/api',apiRoutes)

//--------------------------

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
