
1. Clone the project


```
docker run --rm -v "$PWD":/app node:latest /bin/bash -c "npm init vite@latest -- --template react"
```

```
docker-compose up --build -d
```

visit localhost:8080 and the app should be running
