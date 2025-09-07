// Test ESM import
import TextCache from './index.mjs';

async function testESM() {
  console.log('Testing ESM import...');
  
  const textCache = new TextCache(
    './test/input.txt',
    '63f2475d01ced8a4a8728baf0ecfad7c4abf461065ed00dbaa7f5dd684ca109c'
  );
  
  const text = await textCache.get();
  console.log('ESM: Text loaded successfully, length:', text.length);
  
  let verified = false;
  await textCache.verify((actual, expected) => {
    verified = actual === expected;
    console.log('ESM: Hash verification:', verified ? 'PASSED' : 'FAILED');
  });
  
  console.log('ESM test completed successfully!');
}

testESM().catch(console.error);
