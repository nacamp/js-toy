/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// util.promisify()
// https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
// https://flaviocopes.com/node-promisify/
const fs = require('fs');
const util = require('util');

// case1: util.promisify
fs.readFile('./index.js', 'utf8', (err, text) => {
  if (err) {
    console.log('Error1>>', err);
  } else {
    console.log(text);
  }
});
const readFile = util.promisify(fs.readFile);

async function doFile() {
  try {
    const text = await readFile('./index.js', 'utf8');
    console.log(text);
  } catch (err) {
    console.log('Error2>>', err);
  }
}
doFile();

// case2: promise.all
const p1 = Promise.resolve(3);
const p2 = 1337;
const p5Resolve = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p5Resolve finished');
    resolve('p5Resolve finished');
  }, 5000);
});
const p1Resolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p1Resolve finished');
    resolve('p1Resolve finished');
    // reject(new Error('sorry222'));
  }, 2000);
});
const p1Reject = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('sorry'));
  }, 1000);
});

(async function () {
  let r;
  try {
    r = await Promise.all([p1, p2, p1Resolve, p1Reject, p5Resolve]);
    console.log('then>>');
    console.log(r);
  } catch (e) {
    console.log('catch>>');
  }
  console.log('end...');
}());
// 에러는 캐치후 end지만, 나머지 all안에 있는 작업도 비동기로 모두 실행됨
/*
catch>>
Error: sorry
    at Timeout._onTimeout (/Users/jimmy/WebstormProjects/js-toy/asyncs/promise_sample.js:45:12)
    at listOnTimeout (internal/timers.js:554:17)
    at processTimers (internal/timers.js:497:7)
end.2222..
end...
p1Resolve finished
p5Resolve finished
*/
