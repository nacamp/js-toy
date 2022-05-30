// import aa from './es.child.mjs';
import aa, {fb} from './es.child1.mjs';
// import {fa, fb} from './es.child.mjs'; // error
/*
SyntaxError: Cannot use import statement outside a module
https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module
*/

// case1: export default,  받는쪽에서 다른 이름을 사용할 수 있다.
// https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
console.log(aa(2));
// console.log(fa(3));
console.log(fb(4));

// case2:  module.exports at commonjs
// https://2ality.com/2015/07/es6-module-exports.html
import * as aa2  from './es.child2.mjs';
console.log(aa2.fb2(5));
import {fa2, fb2}  from './es.child2.mjs';
console.log(fa2(6), fb2(7));
