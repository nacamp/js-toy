const dockerLambda = require('./dockerLambda');
require('dotenv').config();

const lambdaCallbackResult1 = dockerLambda({
  event: { key: 'value' }, taskDir: `${process.env.TASK_DIR}/index`, handler: 'index.handler', dockerArgs: ['-m', '1.5G'], dockerImage: 'lambci/lambda:nodejs12.x',
});
console.log('index:', lambdaCallbackResult1);
const lambdaCallbackResult2 = dockerLambda({
  event: { key: 'value' }, layerDir: `${process.env.LAYER_DIR}/gm`, taskDir: `${process.env.TASK_DIR}/gm`, handler: 'gm.handler', dockerArgs: ['-m', '1.5G'], dockerImage: 'lambci/lambda:nodejs12.x',
});
console.log('gm:', lambdaCallbackResult2);
