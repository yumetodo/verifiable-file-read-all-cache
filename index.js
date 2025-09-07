const shajs = require('sha.js');
const Mutex = require('await-mutex').default;
const fs = require('promise-fs');
const TextCacheCore = require('./src/TextCache.js');

class TextCache extends TextCacheCore {
  constructor(path, sha256hash) {
    super(path, sha256hash, {
      shajs,
      Mutex,
      fs
    });
  }
}

module.exports = TextCache;
