// https://www.sitepoint.com/currying-in-functional-javascript/
// https://sujinlee.me/currying-in-functional-javascript/
// https://ko.javascript.info/currying-partials
const greetCurried = function (greeting) {
  console.log(greeting);
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};
const greetHello = greetCurried('Hello');
greetHello('Heidi'); // "Hello, Heidi"
greetHello('Eddie'); // "Hello, Eddie"
greetCurried('hi')('jimmy');

// arrow
const greetArrowCurried = (greeting) => (name) => {
  console.log(`${greeting}, ${name}`);
};
// const greetArrowCurried = (greeting) => {
//   console.log(greeting);
//   return (name) => {
//     console.log(`${greeting}, ${name}`);
//   };
// };
const greetArrowHello = greetArrowCurried('Hello');
greetArrowHello('Heidi'); // "Hello, Heidi"
greetArrowHello('Eddie'); // "Hello, Eddie"

function curry(f) { // 커링 변환을 하는 curry(f) 함수
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3
