# https://hub.docker.com/r/lambci/lambda
## layer 구성
```
/opt로 복사될 native code
/opt/nodejs로 복사될 node_moules
ex)
/bin
/include
/lib
/share
/nodejs/node_modules
```
## lambda실행
```docker run --rm \
  -v <code_dir>:/var/task:ro,delegated \
  [-v <layer_dir>:/opt:ro,delegated] \
  lambci/lambda:<runtime> \
  [<handler>] [<event>]
docker run --rm -v "$PWD"/gm:/var/task:ro,delegated -v "$PWD"/layers/gm:/opt:ro,delegated lambci/lambda:nodejs12.x gm.handler
docker run --rm -v "$PWD/index":/var/task:ro,delegated   lambci/lambda:nodejs12.x index.handler
```


