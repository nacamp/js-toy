// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ses/index.html
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/ses-examples-sending-email.html
// https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code/ses/src
/*
https://docs.aws.amazon.com/ko_kr/ses/latest/APIReference/API_SendEmail.html
제약사항:
보내는 이메일 주소의 도메인이 인증되어 있어야 한다.
동시수신:50명
메일사이즈:10MB
 */
const { SendEmailCommand, SendRawEmailCommand, SESClient } = require('@aws-sdk/client-ses');
require('dotenv').config();

console.log(JSON.stringify(process.env, null, ' '));

const sesClientV3 = new SESClient({
  region: process.env.AWS_REGION,
  credentials: { accessKeyId: process.env.AWS_ACCESSKEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESSKEY },
});

const sendV3 = async function (ses, params) {
  return ses.send(new SendEmailCommand(params));
};

const sendRawV3 = async function (ses, input) {
  return ses.send(new SendRawEmailCommand(input));
};

const runSendV3 = async function () {
  const params = {
    Source: process.env.FROM_EMAIL, // 사전에 SES 페이지에서 발송 email 등록
    Destination: {
      // CcAddresses: [
      //   'EMAIL_ADDRESS',
      //   /* more items */
      // ],
      ToAddresses: [
        process.env.TO_EMAIL,
        /* more items */
      ],
    },
    Message: {
      Subject: {
        Data: 'hello ses',
      },
      Body: {
        Html: {
          Data: '<body><h2>hello ses body </h2></body>',
        },
      },
    },
  };
  try {
    await sendV3(sesClientV3, params);
  } catch (e) {
    console.log(e);
  }
};
runSendV3();

const runSendRawV3 = async function () {
  const rawData = `Content-Type: multipart/alternative;
 boundary="--_NmP-3b2d9b858811a396-Part_1"
From: =?UTF-8?Q?Fred_Foo_=F0=9F=91=BB?= <${process.env.FROM_EMAIL}>
To: ${process.env.TO_EMAIL}
Subject: =?UTF-8?Q?Hello_=E2=9C=94?=
Message-ID: <32cd4413-a7de-ef45-6f2d-0ca1845ceefd@x.com>
Date: Wed, 29 Sep 2021 06:53:29 +0000
MIME-Version: 1.0

----_NmP-3b2d9b858811a396-Part_1
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: 7bit

Hello world?
----_NmP-3b2d9b858811a396-Part_1
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: 7bit

<b>Hello world?</b>
----_NmP-3b2d9b858811a396-Part_1--`;

  const params = {
    Source: process.env.FROM_EMAIL, // 사전에 SES 페이지에서 발송 email 등록
    Destination: {
      // CcAddresses: [
      //   'EMAIL_ADDRESS',
      //   /* more items */
      // ],
      ToAddresses: [
        process.env.TO_EMAIL,
        /* more items */
      ],
    },
    RawMessage: { Data: Buffer.from(rawData) },
  };

  try {
    await sendRawV3(sesClientV3, params);
  } catch (e) {
    console.log(e);
  }
};
runSendRawV3();
