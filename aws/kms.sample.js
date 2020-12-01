// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
// https://docs.aws.amazon.com/kms/latest/developerguide/overview.html
// https://docs.aws.amazon.com/kms/latest/developerguide/programming-top.html
const AWS = require('aws-sdk');
const crypto = require('crypto');
const assert = require('assert');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const kmsClient = new AWS.KMS();
const KeyId = `arn:aws:kms:ap-northeast-2:${process.env.AWS_ID}:key/${process.env.AWS_KMS_KEY_ID}`;
const KeySpec = 'AES_256';

function encrypt(text, key, iv) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc', key, iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
}

function decrypt(text, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(Buffer.from(text, 'hex'));

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

(async () => {
  // 1단계: CiphertextBlob, Plaintext 중 CiphertextBlob 값만 저장
  // const dataKey = await kmsClient.generateDataKey({ KeyId, KeySpec }).promise();
  // console.log(JSON.stringify(dataKey));

  // 2단계: CiphertextBlob를 Plaintext 값을 요청.
  const dataKey = { CiphertextBlob: { type: 'Buffer', data: [1, 2, 3, 0, 120, 222, 71, 123, 241, 39, 95, 105, 240, 153, 6, 156, 125, 40, 33, 163, 78, 115, 240, 53, 248, 192, 25, 99, 120, 47, 158, 167, 101, 105, 180, 61, 160, 1, 69, 105, 234, 173, 68, 44, 141, 128, 62, 224, 176, 217, 93, 213, 208, 234, 0, 0, 0, 126, 48, 124, 6, 9, 42, 134, 72, 134, 247, 13, 1, 7, 6, 160, 111, 48, 109, 2, 1, 0, 48, 104, 6, 9, 42, 134, 72, 134, 247, 13, 1, 7, 1, 48, 30, 6, 9, 96, 134, 72, 1, 101, 3, 4, 1, 46, 48, 17, 4, 12, 174, 154, 143, 143, 154, 104, 157, 22, 223, 201, 223, 253, 2, 1, 16, 128, 59, 132, 70, 27, 139, 111, 242, 249, 132, 206, 175, 141, 24, 235, 57, 214, 195, 77, 90, 75, 7, 237, 178, 49, 246, 146, 112, 62, 154, 255, 133, 28, 197, 236, 173, 26, 244, 106, 124, 230, 254, 173, 249, 191, 182, 222, 16, 79, 147, 33, 65, 241, 246, 89, 252, 239, 26, 249, 80, 171] }, Plaintext: { type: 'Buffer', data: [3, 177, 7, 86, 133, 134, 232, 34, 101, 19, 185, 28, 155, 26, 92, 233, 205, 175, 94, 115, 188, 45, 91, 237, 226, 2, 198, 82, 54, 205, 210, 2] }, KeyId: 'arn:aws:kms:ap-northeast-2:...:key/keyId' };
  const decryptedDataKey = await kmsClient.decrypt({ CiphertextBlob: Buffer.from(dataKey.CiphertextBlob.data), KeyId }).promise();
  assert.notStrictEqual(decryptedDataKey.Plaintext.data, dataKey.Plaintext.data);

  // 3단계: Plaintext를 key로  필요한 자료 암호화, 복호화
  const iv = crypto.randomBytes(16);
  const encryptedData = encrypt('This is plain text', decryptedDataKey.Plaintext, iv);
  console.log(decrypt(encryptedData.encryptedData, decryptedDataKey.Plaintext, iv));

  // 1~2단계를 한번에
  // const Plaintext = Buffer.from('jimmy');
  // let data = await kmsClient.encrypt({ KeyId, Plaintext }).promise();
  // console.log(data.CiphertextBlob);
  // data = await kmsClient.decrypt({ CiphertextBlob: data.CiphertextBlob, KeyId }).promise();
  // console.log(data.Plaintext.toString());
})();
