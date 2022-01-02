# verifiable-file-read-all-cache

[![CircleCI](https://circleci.com/gh/yumetodo/verifiable-file-read-all-cache.svg?style=svg)](https://circleci.com/gh/yumetodo/verifiable-file-read-all-cache) [![Known Vulnerabilities](https://snyk.io/test/github/yumetodo/verifiable-file-read-all-cache/badge.svg?targetFile=package.json)](https://snyk.io/test/github/yumetodo/verifiable-file-read-all-cache?targetFile=package.json)

Read file all and cache it. Also, you can verify sha-256 hash.

```js
import test from 'ava';
const TextCache = require('verifiable-file-read-all-cache');
const text = new TextCache(
  './path/to/file',
  //sha-256 hash
  'd270ba28b95e9f256ca2eb993fc0692b9d755c4b397f75ea2d5deb5cf39c49f1'
);
test('hoge', async t => {
  await text.verify((actual, expected) => t.true(actual === expected));
  foo(text.get());
});
```
