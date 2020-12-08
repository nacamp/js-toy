// eslint-disable-next-line max-classes-per-file
class Response {
  constructor(params, fn) {
    this.params = params;
    this.fn = fn;
  }

  promise() {
    const { fn } = this;
    const { params } = this;
    return new Promise((resolve, reject) => {
      const callback = (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      };
      fn(params, callback);
    });
  }
}

class Lambda {
  constructor() {
    this.region = null;
  }

  invokeHandler(params, callback) {
    setTimeout(() => {
      callback(null, 'called');
    }, 2000);
  }

  // PersonType.prototype.sayName과 동일합니다.
  // eslint-disable-next-line consistent-return
  invoke(params, callback) {
    if (callback != null) {
      this.invokeHandler(params, callback);
    } else {
      return new Response(params, this.invokeHandler);
    }
  }
}

module.exports = {
  Lambda, Response,
};
