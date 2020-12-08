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
docker run --rm -v "$PWD":/var/task:ro,delegated -v "$PWD"/opt:/opt:ro,delegated lambci/lambda:nodejs12.x index.gmHandler
```


