var express = require('express')
var router = express.Router()

var articleClass = require('../model/article')
var comment = require('../model/comment')

var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var articleSql = require('../db/articleSql')
var userSql = require('../db/userSql')
var commentSql = require('../db/commentSql')
var randomStr = require('../tools/randomString')

var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    let regExp = new RegExp(/\..+/, 'g')
    var ext = file.originalname.match(regExp)[0]
    cb(null, randomStr() + ext);
  }
})

var upload = multer({ storage: storage })

var pool = mysql.createPool(dbConfig.mysql)

var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '0',
      msg: 'fail'
    })
  } else {
    res.json(ret)
  }
}

var validToken = function (req, res, next) {
  let param = []
  param.push(req.body.token)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(userSql.validToken, param, function (err, result) {
        if (err) {
          console.log(err.toString())
          responseJSON(res)
        }
        if (result.length > 0) {
          console.log('right token')
          next()
        } else {
          responseJSON(res)
        }
      })
    }
  })
}

/* post api. */
router.post('/login', function (req, res, next) {
  let param = []
  param.push(req.body.name)
  let password = req.body.password

  pool.getConnection(function (err, connection) {
    if (err) {
      responseJSON(res)
      console.log(err.toString())
    } else {
      connection.query(userSql.getUserByName, param, function (err, result) {
        if (err) {
          responseJSON(res)
          console.log(err.toString())
        }
        if (result) {
          if (password === result[0].password) {
            let token = randomStr()
            connection.query(userSql.updateToken, [token], function (err, result) {
              if (err) {
                console.log(err.toString());
              }
              if (result) {
                result = {
                  code: 1,
                  msg: 'success',
                  data: {
                    token: token
                  }
                }
              }
              responseJSON(res, result)

              connection.release()
            })
          } else {
            responseJSON(res)
          }
        }
      })
    }
  })
})

router.post('/insertImg', upload.single('img'), function (req, res, next) {
  console.log(req.file)
  if (req.file) {
    res.json({
      code: 1,
      msg: 'success',
      data: {
        imgLink: 'http://www.jiangfeather.com/images/' + req.file.filename
      }
    })
  } else {
    res.json({
      code: 0,
      msg: 'fail'
    })
  }
})

router.post('/addArticle', upload.single('img'), validToken, function (req, res, next) {
  let param = []
  let img = ''
  console.log(req.body.article)
  let article = JSON.parse(req.body.article)
  if (req.file) {
    img = 'http://www.jiangfeather.com/images/' + req.file.filename
  }
  param.push(article.title)
  param.push(article.tags)
  param.push(img)
  param.push(article.overview)
  param.push(article.content)
  param.push(article.date)
  param.push(0)
  param.push(0)
  param.push(0)
  param.push(article.type)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.insert, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          result = {
            code: 1,
            msg: 'success'
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/updateArticle', validToken, function (req, res, next) {
  var param = []
  for (let attr in req.body) {
    param.push(req.body[attr])
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.update, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          result = {
            code: 1,
            msg: 'success'
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/deleteArticle', validToken, function (req, res, next) {
  var param = []
  param.push(req.query.id)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.delete, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          result = {
            code: 1,
            msg: 'success'
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/getArticleList', function (req, res, next) {
  var param = []

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.queryAll, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          var articleList = []

          for (let i = 0; i < result.length; i++) {
            articleList.push(articleClass(result[i].title, result[i].tags, result[i].img, result[i].overview, result[i].content, result[i].date, result[i].view, result[i].comment, result[i].like, result[i].type, result[i].id, []))
          }

          result = {
            code: 1,
            msg: 'success',
            data: {
              articleList
            }
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/getArticleListByType', function (req, res, next) {
  var param = []
  param.push(req.query.type)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.queryListByType, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          var articleList = []

          for (let i = 0; i < result.length; i++) {
            articleList.push(articleClass(result[i].title, result[i].tags, result[i].img, result[i].overview, result[i].content, result[i].date, result[i].view, result[i].comment, result[i].like, result[i].type, result[i].id, []))
          }

          result = {
            code: 1,
            msg: 'success',
            data: {
              articleList
            }
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/getArticleListByTag', function (req, res, next) {
  var param = []
  param.push(req.query.tag)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.queryListByTag, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          var articleList = []

          for (let i = 0; i < result.length; i++) {
            articleList.push(articleClass(result[i].title, result[i].tags, result[i].img, result[i].overview, result[i].content, result[i].date, result[i].view, result[i].comment, result[i].like, result[i].type, result[i].id, []))
          }

          result = {
            code: 1,
            msg: 'success',
            data: {
              articleList
            }
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/getArticleById', function (req, res, next) {
  var param = []
  param.push(req.body.id)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.getArticleById, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          let article = articleClass(result[0].title, result[0].tags, result[0].img, result[0].overview, result[0].content, result[0].date, result[0].view, result[0].comment, result[0].like, result[0].type, result[0].id, [])
          connection.query(commentSql.getCommentListById, [result[0].id], function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result > 0) {
              for (let i = 0; i < result.length; i++) {
                article.commentList.push(comment(result[i].articleId, result[i].avatar, result[i].name, result[i].email, result[i].comment, result[i].date, result[i].id))
              }
            }
            connection.query(articleSql.addView, article.id, function (err, result) {
              if (err) {
                console.log(err.toString())
              }
              if (result) {
                result = {
                  code: 1,
                  msg: 'success',
                  data: {
                    article
                  }
                }
              }

              responseJSON(res, result)

              connection.release()
            })
          })
        }
      })
    }
  })
})

router.post('/addComment', function (req, res, next) {
  var param = []
  for(let attr in req.body) {
    param.push(req.body[attr])
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(commentSql.insert, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }

        if (result) {
          connection.query(articleSql.addComment, [param[param.length-1]]), function (err, result) {
            if (err) {
              console.log(err.toString())
            }

            if (result) {
              result = {
                code: 1,
                msg: 'success'
              }
            }

            responseJSON(res, result)

            connection.release()
          }
        }
      })
    }
  })
})

router.post('/addLike', function (req, res, next) {
  var param = []
  param.push(req.query.id)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
    } else {
      connection.query(articleSql.addLike, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          result = {
            code: 1,
            msg: 'success'
          }
        }

        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

module.exports = router
