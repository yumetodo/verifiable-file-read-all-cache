// Test CommonJS import
const TextCache = require('./index.js');

async function testCJS() {
  console.log('Testing CommonJS import...');
  
  const textCache = new TextCache(
    './test/input.txt',
    '63f2475d01ced8a4a8728baf0ecfad7c4abf461065ed00dbaa7f5dd684ca109c'
  );
  
  const text = await textCache.get();
  console.log('CJS: Text loaded successfully, length:', text.length);
  
  let verified = false;
  await textCache.verify((actual, expected) => {
    verified = actual === expected;
    console.log('CJS: Hash verification:', verified ? 'PASSED' : 'FAILED');
  });
  
  console.log('CommonJS test completed successfully!');
}

testCJS().catch(console.error);
