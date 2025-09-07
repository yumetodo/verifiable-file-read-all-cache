/**
 * TextCache class implementation
 * This file contains the core logic that can be used by both CJS and ESM modules
 */

class TextCache {
  constructor(path, sha256hash, dependencies) {
    this.text_ = '';
    this.textPromise_ = dependencies.fs.readFile(path, 'utf8');
    this.sha256hash_ = sha256hash;
    this.isVerified_ = false;
    this.mutex_ = new dependencies.Mutex();
    this.shajs = dependencies.shajs;
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
    const sha256 = new this.shajs.sha256();
    await this.get().then(text => tester(sha256.update(text).digest('hex'), this.sha256hash_));
    this.isVerified_ = true;
  }
}

module.exports = TextCache;
