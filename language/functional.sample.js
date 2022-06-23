// https://www.toptal.com/javascript/functional-programming-javascript
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// https://velog.io/@grinding_hannah/JavaScript-Functional-Programming%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// let result;
// const filterEven = (x) => x % 2 === 0;
// result = [1, 2, 3].filter(filterEven);
// console.log(result);
//
// const double = (x) => 2 * x;
// result = [1, 2, 3].map(double);
// console.log(result);
//
function arrayFrom() {
  const range = (n) => Array.from(Array(n).keys());
  console.log(range(3));
  const rangeWithStep = (start, stop, step) => (
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
  );
  console.log(rangeWithStep(0, 2, 1));
}

function arrayReduce() {
  console.log('reduce...');
  let result;

  // case default
  const sum = (accumulatedSum, arrayItem) => accumulatedSum + arrayItem;
  result = [1, 2, 3].reduce(sum);
  console.log(result);

  // case array 변경
  const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
  result = names.reduce((allNames, name) => {
    allNames[name] = 1;
    console.log(`allNames=${JSON.stringify(allNames)} name=${name}`);
    return allNames;
  }, {});
  console.log(result);

  // case break
  const array = ['12', '34', '56', '78', '99'];
  const x = array.reduce((acc, curr, i, arr) => {
    if (i === 2) arr.splice(1); // eject early
    // eslint-disable-next-line no-return-assign
    return acc += curr;
  }, '');
  console.log('x: ', x); // x:  123456

  // case break
  const array2 = [12, 34, 56, 78, 99];
  const x2 = array2.reduce((acc, curr, i, arr) => {
    if (i === 2) arr.splice(1); // eject early
    // eslint-disable-next-line no-return-assign
    console.log(i, acc, curr);
    acc.push(curr);
    return acc;
  }, []);
  console.log('x2: ', x2); // x:  123456
}

function concat() {
  // array, copy
  let result;
  result = [1, 2].concat([3, 4]);
  console.log(result);

  // object
  const obj = { a: 2 };
  result = { ...obj };
  console.log(result);
  console.log({ ...obj });
}

function higherOrderFunction() {
  let result;
  const add = (a, b) => a + b;
  console.log(add(1, 2));

  // Higher-order Functions
  const withLog = (fn) => (...args) => {
    console.log(`calling ${fn.name}`);
    return fn(...args);
  };
  const addWithLogging = withLog(add);
  result = addWithLogging(3, 4);
  console.log(result);
  result = withLog(add)(3, 4);
  console.log(result);
}
higherOrderFunction();
