/*
 * @Introduce: 文件控制器
 * @Author: feather
 * @Date: 2018-02-15 20:52:09
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-17 15:43:23
 */

import crypto from 'crypto';
import fs from 'fs';
import Path from 'path';
import statusCode from '../config/statusCode';

function saveFile(file) {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const dirName = date.getFullYear() + (date.getMonth >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`) + (date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`);
    const md5 = crypto.createHash('md5');
    const fileBuffer = [];
    const ext = Path.extname(file.hapi.filename);
    const dirPath = `${__dirname}/../../uploads/${dirName}`;
    let filename;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    file.on('data', (data) => {
      fileBuffer.push(data);
      md5.update(data);
    });
    file.on('end', () => {
      filename = md5.digest('hex');
      const path = `${__dirname}/../../uploads/${dirName}/${filename}${ext}`;
      fs.writeFile(path, Buffer.concat(fileBuffer), (error) => {
        if (error) reject(error);
        resolve({ url: `/api/v1/imgs/${dirName}/${filename}${ext}` });
      });
    });
  });
}

export default {
  async getFile(request, h) {
    const pathname = request.path;
    const path = `${__dirname}/../../public${pathname}`;
    if (!fs.existsSync(path) || pathname === '/') {
      return h.file(`${__dirname}/../../public/index.html`);
    }
    return h.file(path);
  },
  getImg(request, h) {
    const { date, name } = request.params;
    const path = `${__dirname}/../../uploads/${date}/${name}`;
    if (!fs.existsSync(path)) {
      return h.response({ statusCode: 404, error: 'Not Found', message: statusCode.get('/404') }).code(404);
    }
    return h.file(path, { confine: false });
  },
  async postImgs(request, h) {
    const data = request.payload;
    const saveList = [];
    Object.keys(data).forEach((item) => {
      if (data[item].hapi.headers['content-type'] !== 'image/jpeg' || data[item].hapi.headers['content-type'] !== 'image/jpg' || data[item].hapi.headers['content-type'] !== 'image/png' || data[item].hapi.headers['content-type'] !== 'image/gif') {
        return h.response({ statusCode: 400, error: 'Format Error 格式错误', message: statusCode.get('/400') }).code(400);
      }
      return undefined;
    });
    Object.keys(data).forEach((item) => {
      const file = data[item];
      if (Array.isArray(file)) {
        file.forEach((_file) => {
          saveList.push(saveFile(_file));
        });
      } else {
        saveList.push(saveFile(file));
      }
    });
    const response = await Promise.all(saveList);
    return h.response({ statusCode: 201, data: response, message: statusCode.get('/201') }).code(201);
  },
};
