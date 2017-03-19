/**
 * Created by feather on 2017/3/15.
 */
var articleSql = {
  insert: 'INSERT INTO article VALUES(null,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE article SET title = ?, tags = ?, img = ?, overview = ?, content = ?, type = ? WHERE id = ?',
  delete: 'DELETE FROM article WHERE id = ?',
  queryAll: 'SELECT * FROM article ORDER BY article.id DESC LIMIT ?, ?',
  queryListByType: 'SELECT * FROM article WHERE type = ?',
  queryListByTag: 'SELECT * FROM article WHERE tags like ?',
  getArticleById: 'SELECT * FROM article WHERE id = ?',
  addView: 'UPDATE article SET view = view + 1 WHERE id = ?',
  addComment: 'UPDATE article SET comment = comment + 1 WHERE id = ?',
  addLike: 'UPDATE article SET like = like + 1 WHERE id = ?'
}

module.exports = articleSql