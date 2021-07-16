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
      variables[exp.name].calledCount = 0;
      variables[exp.name].solvedValue = r.value;
      variables[exp.name].handler(`${exp.name}-changed`);
      return r;
    }
    throw new Error(`not supported ${variables[exp.name].type}`);
  } else if (exp.type === 'BinaryExpression' || exp.type === 'CallExpression') {
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

const pow = (exp) => {
  const base = op(exp.arguments[0]);
  const e = op(exp.arguments[1]);
  return { type: 'Literal', value: base.value ** e.value };
};

const funcs = {
  pow,
};

operate = (exp) => {
  if (exp.type === 'BinaryExpression') {
    return operator[exp.operator](exp);
  } if (exp.type === 'CallExpression') {
    return funcs[exp.callee.name](exp);
  }
  throw new Error('not supported');
};

console.log('case1: a2 = a5*a3 = (a1+a4)*a3 = (1+4)*3 = 15');
// a2 = a5*a3 = (a1+a4)*a3 = (1+4)*3 = 15
// a5.solvedValue = 5로 변경및, a5의 handler 호출
let result = operate(jsep(variables.a2.value));
variables.a2.solvedValue = result.value;
assert.strictEqual(variables.a5.solvedValue, 5);
// console.log(JSON.stringify(variables, null, ' '));

console.log('case2: pow(a3,a4) = 3**4');
variables.a5.value = 'pow(a3,a4)';
result = operate(jsep(variables.a5.value));
variables.a5.solvedValue = result.value;
assert.strictEqual(variables.a5.solvedValue, 81);

console.log('case3: Circular Reference Error a5=a2+a3+1, a2=a5*a3');
variables.a5.value = 'a2+a3+1';
try {
  operate(jsep(variables.a5.value));
} catch (e) {
  for (const value of Object.values(variables)) {
    value.calledCount = 0;
  }
  // console.log(e);
}
