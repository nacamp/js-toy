const p1 = Promise.resolve(3);
const p2 = 1337;
const p5Resolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p5Resolve finished');
    resolve('p5Resolve finished');
  }, 5000);
});
const p1Resolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p1Resolve finished');
    resolve('p1Resolve finished');
  }, 1000);
});
const p1Reject = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('sorry');
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
    console.log(e);
  }
  console.log('end...');
}());
/*
out:
p1Resolve finished
catch>>
sorry
end...
p5Resolve finished
*/
