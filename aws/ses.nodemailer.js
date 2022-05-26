// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ses/index.html
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/ses-examples-sending-email.html
// https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code/ses/src

// https://nodemailer.com/about/
/*
https://docs.aws.amazon.com/ko_kr/ses/latest/APIReference/API_SendEmail.html
제약사항:
보내는 이메일 주소의 도메인이 인증되어 있어야 한다.
동시수신:50명
메일사이즈:10MB
 */
const util = require('util');
const aws = require('@aws-sdk/client-ses');

const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');
require('dotenv').config();

console.log(JSON.stringify(process.env, null, ' '));

const ses = new aws.SES({
  region: process.env.AWS_REGION,
  credentials: { accessKeyId: process.env.AWS_ACCESSKEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESSKEY },
});

const demoOptions = {
  from: '"Fred Foo 👻" <support@x.com>', // sender address
  to: 'jimmy@x.com, jimmy@x.net', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>', // html body
  attachments: [
    { // use URL as an attachment
      filename: 'demo.pdf',
      path: 'https://x.com/prelancer2.pdf', // 'https://eformdev.s3.ap-northeast-2.amazonaws.com/upload/prelancer2.pdf'
    },
  ],
};

const send = async function (options) {
  const transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });
  return transporter.sendMail(options);
};

const buildRawMailBuffer = function (options, callback) {
  const mail = new MailComposer(options).compile();
  mail.keepBcc = true;
  mail.build((err, message) => {
    if (message === undefined) {
      callback(err, null);
    } else {
      callback(null, message);
    }
  });
};

const buildRawMailBufferPromise = util.promisify(buildRawMailBuffer);

const runSend = async function () {
  try {
    await send(demoOptions);
  } catch (e) {
    console.log(e);
  }
};
runSend();

const runBuildRawMailBufferPromise = async function () {
  const buff = await buildRawMailBufferPromise(demoOptions);
  console.log(buff.toString('utf-8'));
};
runBuildRawMailBufferPromise();
