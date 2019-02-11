const shajs = require('sha.js');
const Mutex = require('await-mutex').default;
const fs = require('promise-fs');
class TextCache {
  constructor(path, sha256hash) {
    this.text_ = '';
    this.textPromise_ = fs.readFile(path, 'utf8');
    this.sha256hash_ = sha256hash;
    this.isVerified_ = false;
    this.mutex_ = new Mutex();
  }
  /**
   * get text
   * @returns {Promise<string>}
   */
  async get() {
    if ('' === this.text_) {
      const unlock = await this.mutex_.lock();
      if ('' === this.text_) {
        await this.textPromise_
          .then(text => {
            this.text_ = text;
            unlock();
          })
          .catch(e => {
            unlock();
            throw e;
          });
      } else {
        unlock();
      }
    }
    return this.text_;
  }
  /**
   * verify input text file hash
   * @param {(actual: string, expected: string) => any} tester
   */
  async verify(tester) {
    if (this.isVerified_) return;
    const sha256 = new shajs.sha256();
    await this.get().then(text => tester(sha256.update(text).digest('hex'), this.sha256hash_));
    this.isVerified_ = true;
  }
}
module.exports = TextCache;
