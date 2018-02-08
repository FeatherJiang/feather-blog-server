/*
 * @Introduce: 文章控制器
 * @Author: feather
 * @Date: 2018-02-05 17:23:29
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 13:44:29
 */

import models from '../models';

export default {
  getArticles(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  postArticles(request, h, err) {
    if (err) {
      console.log(err);
    }
    return h.response({ code: 403 }).code(403);
  },
  getArticlesByTypes(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  getArticlesByTag(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  getArticle(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putArticle(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putArticleStar(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  delArticleStar(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  getArticleComments(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  postArticleComments(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  delArticleComment(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  getArchive(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  getArchiveArticles(request, h) {
    return h.response({ code: 403 }).code(403);
  },
};
