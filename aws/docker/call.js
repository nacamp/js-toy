const dockerLambda = require('./dockerLambda');

const lambdaCallbackResult = dockerLambda({
  layerDir: '/Users/jimmy/WebstormProjects/js-toy/aws/docker/opt', taskDir: '/Users/jimmy/WebstormProjects/js-toy/aws/docker', handler: 'index.gmHandler', dockerArgs: ['-m', '1.5G'], dockerImage: 'lambci/lambda:nodejs12.x',
});
console.log(lambdaCallbackResult);
