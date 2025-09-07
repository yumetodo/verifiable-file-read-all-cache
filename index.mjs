import shajs from 'sha.js';
import awaitMutex from 'await-mutex';
import fs from 'promise-fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const TextCacheCore = require('./src/TextCache.js');
const Mutex = awaitMutex.default;

class TextCache extends TextCacheCore {
  constructor(path, sha256hash) {
    super(path, sha256hash, {
      shajs,
      Mutex,
      fs
    });
  }
}

export default TextCache;
