const aws = require('./nonSdk');

const lambda = new aws.Lambda({
  region: 'ap-northeast-2',
});
// lambda.invoke({ test: 1 });

(async () => {
  lambda.invoke({ test: 1 }, (err, data) => {
    console.log('callback:', data);
  });
  const r = await lambda.invoke({ test: 1 }).promise();
  console.log(r);
})();
