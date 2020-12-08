console.log('starting function');
exports.handler = (event, context) => {
  console.log('event:', event);
  context.done(null, { msg: 'hello world' });
};

exports.gmHandler = async (event, context) => {
  const gm = require('gm');
  const size = function () {
    return new Promise((resolve, reject) => {
      gm('image.png')
        .size((err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
    });
  };
  context.done(null, { msg: await size() });
};
/*
context.succeed(object result)
결과가 성공했을때 리턴해주는 함수.
object는 json형태

context.fail(Error error)
결과가 실패했을때 리턴해주는 함수.
여기서 발생한 에러는 CloudWatch에 로그가 남겨짐

context.done(Error error, Object result)
결과가 성공이든 실패든 어떤 경우에도 쓰일 수 있는 함수.
첫번째 파라미터인 error가 null이면 성공, 그렇지 않으면 실패로 판단
 */
