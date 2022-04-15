// https://www.npmjs.com/package/speakeasy
const speakeasy = require('speakeasy');

// secret
const secret = speakeasy.generate_key({ length: 20, google_auth_qr: true });
console.log(JSON.stringify(secret, null, 2));
/*
{
  "ascii": "!FC6xsgvvNk$BhP]cCly",
  "hex": "2146433678736776764e6b244268505d63436c79",
  "base32": "EFDEGNTYONTXM5SONMSEE2CQLVRUG3DZ",
  "otpauth_url": "otpauth://totp/SecretKey?secret=EFDEGNTYONTXM5SONMSEE2CQLVRUG3DZ",
  "google_auth_qr": "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth%3A%2F%2Ftotp%2FSecretKey%3Fsecret%3DIVDEIRKHJZKFST2OKRME2NKTJ5HE2U2FIUZEGUKMKZJFKRZTIRNA"
}
 */

// verify
const userToken = '133309';
const base32secret = 'EFDEGNTYONTXM5SONMSEE2CQLVRUG3DZ';
console.log(
  speakeasy.totp.verify({
    secret: base32secret,
    encoding: 'base32',
    token: userToken,
    algorithm: 'sha1',
  }),
);

// algorithm을 sha512로 하면 안드로이드폰이 다른 숫자를 만들어 낸다.
