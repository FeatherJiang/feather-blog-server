/*
 * @Introduce: 状态码配置文件
 * @Author: feather
 * @Date: 2018-02-05 17:21:02
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-23 16:47:53
 */

import Confidence from 'confidence';

const status = {
  200: 'OK - [GET]：服务器成功返回用户请求的数据',
  201: 'CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功',
  202: 'Accepted - [*]：请求已经进入后台排队(异步任务)',
  204: 'NO CONTENT - [DELETE]：用户删除数据成功',
  301: 'Moved Permanently - 请求的资源已经永久性地移动到另外一个地方,后续所有的请求都应该直接访问新地址.服务端会把新地址写在 Location 头部字段,方便客户端使用.允许客户端把 POST 请求修改为 GET',
  304: 'Not Modified - 请求的资源和之前的版本一样,没有发生改变.用来缓存资源,和条件性请求(conditional request)一起出现',
  307: 'Temporary Redirect - 目标资源暂时性地移动到新的地址,客户端需要去新地址进行操作,但是不能修改请求的方法',
  308: 'Permanent Redirect - 请求的资源已经永久性地移动到另外一个地方,后续所有的请求都应该直接访问新地址.服务端会把新地址写在 Location 头部字段,方便客户端使用',
  400: 'INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误,服务器没有进行新建或修改数据的操作',
  401: 'Unauthorized - [*]：用户没有权限(令牌、用户名、密码错误)',
  403: 'Forbidden - [*] 用户得到授权(与401错误相对)，但是访问是被禁止的',
  404: 'NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作',
  405: 'Method Not Allowed - 服务端接收到了请求，而且要访问的资源也存在,但是不支持对应的方法.服务端必须返回 Allow 头部,告诉客户端哪些方法是允许的',
  406: 'Not Acceptable - [GET]：用户请求的格式不可得(比如用户请求JSON格式，但是只有XML格式)',
  410: 'Gone -[GET]：用户请求的资源被永久删除，且不会再得到的',
  415: 'Unsupported Media Type - 服务端不支持客户端请求的资源格式,一般是因为客户端在 Content-Type 或者 Content-Encoding 中申明了希望的返回格式,但是服务端没有实现.比如，客户端希望收到 xml返回,但是服务端支持 Json',
  422: 'Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误',
  429: 'Too Many Requests - 客户端在规定的时间里发送了太多请求,在进行限流的时候会用到',
  500: 'INTERNAL SERVER ERROR - [*]：服务器发生错误',
  503: 'Service Unavailable - 服务器因为负载过高或者维护,暂时无法提供服务.服务器端应该返回 Retry-After 头部，告诉客户端过一段时间再来重试',
};

const store = new Confidence.Store(status);

export default store;
