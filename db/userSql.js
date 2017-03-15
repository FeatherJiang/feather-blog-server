/**
 * Created by feather on 2017/3/15.
 */
var userSql = {
  updateToken: 'UPDATE user SET token = ?',
  queryAll: 'SELECT * FROM user',
  getUserByName: 'SELECT * FROM user WHERE name = ?',
  validToken: 'SELECT * FROM user WHERE token = ?'
}

module.exports = userSql