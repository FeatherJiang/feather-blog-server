var express = require('express')
var async = require('async')
var router = express.Router()

var articleClass = require('../model/article')
var commentClass = require('../model/comment')

var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var articleSql = require('../db/articleSql')
var userSql = require('../db/userSql')
var commentSql = require('../db/commentSql')
var bannerSql = require('../db/bannerSql')
var tagSql = require('../db/tagSql')
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

const LIMIT = 10

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
          result = {
            code: 0,
            msg: 'token error'
          }
          responseJSON(res, result)
        }

        connection.release()
      })
    }
  })
}

/* post api. */
router.post('/login', function (req, res, next) {
  let param = []
  let password = ''
  if (req.body.name === undefined || req.body.password === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.name)
    password = req.body.password
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(userSql.getUserByName, param, function (err, result) {
        if (err) {
          console.log(err.toString())
          responseJSON(res)
        }
        if (result.length > 0) {
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
  if (req.body.article === undefined) {
    responseJSON(res)
  } else {
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
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
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

router.post('/updateArticle', upload.single('img'), validToken, function (req, res, next) {
  let param = []
  let img = ''
  if (req.body.article === undefined) {
    responseJSON(res)
  } else {
    let article = JSON.parse(req.body.article)

    param.push(article.title)
    param.push(article.tags)
    if (req.file) {
      img = 'http://www.jiangfeather.com/images/' + req.file.filename
      param.push(img)
    } else {
      param.push(req.body.img)
    }
    param.push(article.overview)
    param.push(article.content)
    param.push(article.type)
    param.push(article.id)
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
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
  let param = []
  if (req.body.id === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.id)
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
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
  let param = []

  if (req.body.page === undefined) {
    req.body.page = 1
  }
  param.push((req.body.page - 1) * LIMIT)
  param.push(req.body.page * LIMIT)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(articleSql.queryAll, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          var articleList = []

          for (let i = 0; i < result.length; i++) {
            articleList.push(articleClass(result[i].title, result[i].tags.split(','), result[i].img, result[i].overview, result[i].content, result[i].date, result[i].view, result[i].comment, result[i].like, result[i].type, result[i].id, []))
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
  let param = []
  if (req.body.type === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.type)
  }

  if (req.body.page === undefined) {
    req.body.page = 1
  }
  param.push((req.body.page - 1) * LIMIT)
  param.push(req.body.page * LIMIT)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
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
  let param = []

  if (req.body.tag === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.tag)
  }

  if (req.body.page === undefined) {
    req.body.page = 1
  }
  param.push((req.body.page - 1) * LIMIT)
  param.push(req.body.page * LIMIT)

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
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
  let param = []

  if (req.body.id === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.id)
  }

  async.waterfall([
    function (callback) {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
          connection.query(articleSql.getArticleById, param, function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result) {
              let article = articleClass(result[0].title, result[0].tags.split(','), result[0].img, result[0].overview, result[0].content, result[0].date, result[0].view, result[0].comment, result[0].like, result[0].type, result[0].id, [])
              callback(null, article)
            }
            connection.release()
          })
        }
      })
    },
    function (args, callback) {
      let article = args

      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
          connection.query(commentSql.getCommentListById, article.id, function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result.length >= 0) {
              for (let i = 0; i < result.length; i++) {
                article.commentList.push(commentClass(result[i].articleId, result[i].avatar, result[i].name, result[i].email, result[i].comment, result[i].date, result[i].id))
              }
              callback(null, article)
            }
            connection.release()
          })
        }
      })
    },
    function (args, callback) {
      let article = args
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
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
              callback(null, result)
            }
            connection.release()
          })
        }
      })
    }
  ],function (err, result) {
    if (err) {
      responseJSON(res)
    }
    if (result) {
      responseJSON(res, result)
    }
  })

})

router.post('/getBannerList', function (req, res, next) {
  let param = []
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(bannerSql.queryAll, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result.length > 0) {
          let bannerList = []

          for (let i = 0; i < result.length; i++) {
            bannerList.push({id: result[i].id, img: result[i].img, link: result[i].link})
          }

          result = {
            code: 1,
            msg: 'success',
            data: bannerList
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/getTagList', function (req, res, next) {
  async.parallel([
    function (callback) {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
          connection.query(tagSql.queryTopic, null, function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result) {
              let topicList = []
              for (let i = 0; i < result.length; i++) {
                topicList.push(result[i].text)
              }
              callback(null, topicList)
            }
            connection.release()
          })
        }
      })
    },
    function (callback) {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
          connection.query(tagSql.queryTag, null, function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result) {
              let tagList = []
              for (let i = 0; i < result.length; i++) {
                tagList.push(result[i].text)
              }
              callback(null, tagList)
            }

            connection.release()
          })
        }
      })
    }
  ],function (err, results) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    }

    if (results) {
      let result = {
        code: 1,
        msg: 'success',
        data: results
      }
      responseJSON(res, result)
    }
  })
})

router.post('/getTagType', function (req, res, next) {
  let param = []
  if (req.body.tag === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.tag)
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(tagSql.queryTagType, param, function (err, result) {
        if (err) {
          console.log(err.toString())
        }
        if (result) {
          result = {
            code: 1,
            msg: 'success',
            data: result[0].type
          }
        }
        responseJSON(res, result)

        connection.release()
      })
    }
  })
})

router.post('/updateBanner', upload.single('img'), validToken, function (req, res, next) {
  let param = []

  let img = ''
  if (req.body.link === undefined || req.body.id === undefined) {
    responseJSON(res)
  } else {
    if (req.file) {
      img = "http://www.jiangfeather.com/images/" + req.file.filename
      param.push(img)
    } else {
      param.push(req.body.img)
    }
    param.push(req.body.link)
    param.push(req.body.id)
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(bannerSql.update, param, function (err, result) {
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

router.post('/addComment', upload.single('img'), function (req, res, next) {
  let param = []
  let img = ''

  if (req.body.articleId === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.articleId)
    if (req.file) {
      img = "http://www.jiangfeather.com/images/" + req.file.filename
      param.push(img)
    } else {
      param.push(req.body.img)
    }
    param.push(req.body.name)
    param.push(req.body.email)
    param.push(req.body.comment)
    param.push(req.body.date)
  }

  async.waterfall([
    function (callback) {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err.toString())
        } else {
          connection.query(commentSql.insert, param, function (err, result) {
            if (err) {
              console.log(err.toString())
            }

            if (result) {
              callback(null, true);
            }
            connection.release()
          })
        }
      })
    },
    function (arg, callback) {
      if (arg === true) {
        pool.getConnection(function (err, connection) {
          connection.query(articleSql.addComment, param[0], function (err, result) {
            if (err) {
              console.log(err.toString())
            }
            if (result) {
              callback(null, true)
            }
            connection.release()
          })
        })
      }
    }
  ], function (err, result) {
    if (err) {
      responseJSON(res)
    }
    if (result === true) {
      result = {
        code: 1,
        msg: 'success'
      }
      responseJSON(res, result)
    }
  })

})

router.post('/addLike', function (req, res, next) {
  var param = []

  if (req.body.id === undefined) {
    responseJSON(res)
  } else {
    param.push(req.body.id)
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err.toString())
      responseJSON(res)
    } else {
      connection.query(articleSql.addLike, param, function (err, result) {
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
