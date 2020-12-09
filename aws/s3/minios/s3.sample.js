// https://docs.min.io/docs/how-to-use-aws-sdk-for-javascript-with-minio-server.html
const AWS = require('aws-sdk');
require('dotenv').config();

console.log(JSON.stringify(process.env, null, ' '));

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: 'http://127.0.0.1:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

// putObject operation.

let params = { Bucket: 'demo1', Key: 'testobject', Body: 'Hello from MinIO!!' };

s3.putObject(params, (err, data) => {
  if (err) console.log(err);
  else console.log('Successfully uploaded data to testbucket/testobject');
});

// getObject operation.

params = { Bucket: 'demo1', Key: 'testobject' };

const file = require('fs').createWriteStream('/tmp/mykey');

s3.getObject(params)
  .on('httpData', (chunk) => { file.write(chunk); })
  .on('httpDone', () => { file.end(); })
  .send();

/*
먼저 http://127.0.0.1:9000/ 접속해서 버킷 demo1을 만든다.
 */
