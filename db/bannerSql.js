/**
 * Created by feather on 2017/3/20.
 */
var bannerSql = {
  update: 'UPDATE banner SET img = ?, link = ? WHERE id = ?',
  queryAll: 'SELECT * FROM banner',
}

module.exports = bannerSql