/**
 * Created by feather on 2017/3/15.
 */
class comment {
  constructor (articleId, avatar, name, email, comment, date, id) {
    this.articleId = articleId
    this.avatar = avatar
    this.name = name
    this.email = email
    this.comment = comment
    this.date = date
    this.id = id
  }
}

module.exports = comment