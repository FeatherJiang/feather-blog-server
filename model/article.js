/**
 * Created by feather on 2017/3/15.
 */
class article {
  constructor (title, tags, img, overview, content, date, view, comment, like, type, id, commentList) {
    this.title = title
    this.tags = tags
    this.img = img
    this.overview = overview
    this.content = content
    this.date = date
    this.view = view
    this.comment = comment
    this.like = like
    this.type = type
    this.id = id
    this.commentList = commentList
  }
}

module.exports = function (title, tags, img, overview, content, date, view, comment, like, type, id, commentList) {
  return new article(title, tags,img, overview, content, date, view, comment, like, type, id, commentList)
}