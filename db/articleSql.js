/**
 * Created by feather on 2017/3/15.
 */
var articleSql = {
  insert: 'INSERT INTO article VALUES(null,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE article SET title = ?, tags = ?, img = ?, overview = ?, content = ?, type = ? WHERE id = ?',
  delete: 'DELETE FROM article WHERE id = ?',
  queryAll: 'SELECT * FROM article ORDER BY article.id DESC LIMIT ?, ?',
  queryListByType: 'SELECT * FROM article WHERE type = ? ORDER BY article.id DESC LIMIT ?, ?',
  queryListByTag: 'SELECT * FROM article WHERE tags like ? ORDER BY article.id DESC LIMIT ?, ?',
  getArticleById: 'SELECT * FROM article WHERE id = ?',
  addView: 'UPDATE article SET article.view = article.view + 1 WHERE id = ?',
  addComment: 'UPDATE article SET comment = comment + 1 WHERE id = ?',
  delComment: 'UPDATE article SET comment = comment - 1 WHERE id = ?',
  addLike: 'UPDATE article SET article.like = article.like + 1 WHERE id = ?'
}

module.exports = articleSql