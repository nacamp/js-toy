/*
https://esprima.org/
https://github.com/EricSmekens/jsep
*/
const jsep = require('jsep');
const assert = require('assert');

const variables = {
  a5: {
    name: 'a5',
    value: 'a1+a4',
    solvedValue: 0,
    type: 'func',
    ref: [],
    calledCount: 0,
    handler: console.log,
  },
  a1: {
    name: 'a1',
    value: '1',
    type: 'val',
    solvedValue: 1,
    calledCount: 0,
    handler: console.log,
  },
  a2: {
    name: 'a2',
    value: 'a5*a3',
    type: 'func',
    solvedValue: 0,
    ref: [],
    calledCount: 0,
    handler: console.log,
  },
  a3: {
    name: 'a3',
    value: '3',
    type: 'val',
    solvedValue: 3,
    calledCount: 0,
    handler: console.log,
  },
  a4: {
    name: 'a4',
    value: '4',
    type: 'val',
    solvedValue: 4,
    ref: [],
    calledCount: 0,
    handler: console.log,
  },
};

let operate;

const op = (exp) => {
  if (exp.type === 'Literal') {
    return { type: 'Literal', value: exp.value };
  }
  if (exp.type === 'Identifier') {
    if (variables[exp.name].type === 'val') {
      return { type: 'Literal', value: Number(variables[exp.name].solvedValue) };
    }
    if (variables[exp.name].type === 'func') {
      // console.log(`${exp.name} -${variables[exp.name].calledCount}`);
      if (variables[exp.name].calledCount > 5) {
        // console.log(exp.name);
        throw new Error('Circular Reference');
      }
      variables[exp.name].calledCount += 1;
      const r = operate(jsep(variables[exp.name].value));
      variables[exp.name].solvedValue = r.value;
      variables[exp.name].handler(`${exp.name}-changed`);
      return r;
    }
    throw new Error(`not supported ${variables[exp.name].type}`);
  } else if (exp.type === 'BinaryExpression') {
    return operate(exp);
  }
  throw new Error('not supported');
};

const add = (exp) => {
  const left = op(exp.left);
  const right = op(exp.right);
  return { type: 'Literal', value: left.value + right.value };
};

const multiply = (exp) => {
  const left = op(exp.left);
  const right = op(exp.right);
  return { type: 'Literal', value: left.value * right.value };
};

const operator = {
  '+': add,
  '*': multiply,
};

operate = (exp) => operator[exp.operator](exp);

console.log('case1: a2 = a5*a3 = (a1+a4)*a3 = (1+4)*3 = 15');
// a2 = a5*a3 = (a1+a4)*a3 = (1+4)*3 = 15
// a5.solvedValue = 5로 변경및, a5의 handler 호출
const result = operate(jsep(variables.a2.value));
variables.a2.solvedValue = result.value;
console.log(result);
assert.strictEqual(variables.a5.solvedValue, 5);
// console.log(JSON.stringify(variables, null, ' '));

console.log('case2: Circular Reference Error a5=a2+a3+1, a2=a5*a3');
variables.a5.value = 'a2+a3+1';
for (const value of Object.values(variables)) {
  value.calledCount = 0;
}
try {
  operate(jsep(variables.a5.value));
} catch (e) {
  // console.log(e);
}
