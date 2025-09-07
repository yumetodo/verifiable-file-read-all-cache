import test from 'ava';
import TextCache from '../index.mjs';
test('get', async t => {
  const textCache = new TextCache(
    './test/input.txt',
    '63f2475d01ced8a4a8728baf0ecfad7c4abf461065ed00dbaa7f5dd684ca109c'
  );
  t.true(textCache.text_ === '');
  const text = await textCache.get();
  t.true(text === textCache.text_);
});
test('verify', async t => {
  const textCache = new TextCache(
    './test/input.txt',
    '63f2475d01ced8a4a8728baf0ecfad7c4abf461065ed00dbaa7f5dd684ca109c'
  );
  let counter = 0;
  const tester = (actual, expected) => {
    t.true(actual === expected);
    counter++;
  };
  await Promise.all([textCache.verify(tester), textCache.verify(tester)]);
  t.true(1 === counter || 2 === counter);
  const pre = counter;
  textCache.verify(tester);
  t.true(pre === counter);
});
