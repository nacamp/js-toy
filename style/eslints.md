```
https://eslint.org
https://www.npmjs.com/package/eslint-config-airbnb
https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/
https://velog.io/@kyusung/eslint-config-2
```
#package.json
```
  "devDependencies": {
    "eslint": "^7.12.0",
    "eslint-config-airbnb-base": "^14.2.0",
    "eslint-plugin-import": "^2.22.1"
  }
```
#.eslintrc.json
```
globals: 해당 keyword가 없다고 나오면 이곳에 추가
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [ "eslint:recommended", "airbnb-base"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
    },
    "globals": {
        "describe": true,
        "before": true,
        "after": true,
        "afterEach": true,
        "it": true
    }
}
```
