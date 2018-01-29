/**
 * Created by feather on 2017/3/21.
 */

var tagSql = {
  queryTag: 'SELECT * FROM tag WHERE type = 0',
  queryTopic: 'SELECT * FROM tag WHERE type = 2',
  queryTagType: 'SELECT * FROM tag WHERE text = ?'
}

module.exports = tagSql