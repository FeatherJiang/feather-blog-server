/**
 * Created by feather on 2017/3/15.
 */
class article {
  constructor (title, tags, overview, content, date, view, comment, like, type) {
    this.title = title
    this.tags = tags
    this.overview = overview
    this.content = content
    this.date = date
    this.view = view
    this.comment = comment
    this.like = like
    this.type = type
  }
}

exports.article = article