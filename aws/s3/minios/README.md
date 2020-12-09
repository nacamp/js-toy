# https://github.com/minio/minio
# https://docs.min.io
## create container
```
docker run -p 9000:9000 --name minio \
  -e "MINIO_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE" \
  -e "MINIO_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
  -v /tmp/data:/data \
  minio/minio server /data
```
## stop/start container
```
docker stop minio
docker start minio
```


