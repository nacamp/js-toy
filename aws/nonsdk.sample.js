const aws = require('./nonSdk');

const lambda = new aws.Lambda({
  region: 'ap-northeast-2',
});

// (async () => {
//   lambda.invokeMock({ test: 1 }, (err, data) => {
//     console.log('callback:', data);
//   });
//   const r = await lambda.invokeMock({ test: 1 }).promise();
//   console.log(r);
// })();

(async () => {
  const params = { FunctionName: 'index', Payload: '{"key":"value"}' };
  lambda.invoke(params, (err, data) => {
    console.log('callback:', data);
  });
  const r = await lambda.invoke(params).promise();
  console.log(r);
})();
