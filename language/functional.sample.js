// https://www.toptal.com/javascript/functional-programming-javascript
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// https://velog.io/@grinding_hannah/JavaScript-Functional-Programming%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D
let result;
const add = (a, b) => a + b;
console.log(add(1, 2));

let idCount = 0;
const getId = () => ++idCount;
console.log(getId());

const filterEven = (x) => x % 2 === 0;
result = [1, 2, 3].filter(filterEven);
console.log(result);

const double = (x) => 2 * x;
result = [1, 2, 3].map(double);
console.log(result);

const sum = (accumulatedSum, arrayItem) => accumulatedSum + arrayItem;
result = [1, 2, 3].reduce(sum);
console.log(result);

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
result = names.reduce((allNames, name) => {
  if (name in allNames) {
    allNames[name]++;
    console.log(1, allNames);
  } else {
    allNames[name] = 1;
    console.log(2, allNames);
  }
  return allNames;
}, {});
console.log(result);

result = [1, 2].concat([3, 4]);
console.log(result);

const obj = { a: 2 };
result = Object.assign({}, obj);
console.log(result);
console.log({ ...obj });

// Higher-order Functions
const withLog = (fn) => {
  return (...args) => {
    console.log(`calling ${fn.name}`);
    return fn(...args);
  };
};
const addWithLogging = withLog(add);
result = addWithLogging(3, 4);
console.log(result);
result = withLog(add)(3, 4);
console.log(result);
