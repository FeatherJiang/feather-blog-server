/**
 * Created by feather on 2017/3/15.
 */
// 生成随机字符串
function randomString() {
  let str = '0123456789abcdefghijklmnopqrstuvwxyz'
  let timestarmp = new Date().getTime()

  let randomString = ''

  for(let i = 0; i < 19; i++) {
    randomString  +=  str.charAt(Math.ceil(Math.random() * 100000000) % str.length);
  }

  return timestarmp + randomString
}

module.exports = randomString