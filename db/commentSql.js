/**
 * Created by feather on 2017/3/15.
 */
var commentSql = {
  insert: 'INSERT INTO comment VALUES(null,?,?,?,?,?,?)',
  delete: 'DELETE FROM comment WHERE id = ?',
  getCommentListById: 'SELECT * FROM comment WHERE articleId = ?'
}

module.exports = commentSql