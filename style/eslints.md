```
https://eslint.org
https://www.npmjs.com/package/eslint-config-airbnb
https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/
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
    }
}
```
