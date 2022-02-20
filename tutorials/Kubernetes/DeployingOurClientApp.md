### Changes!

Due to an issue in `create-react-app` we can't use our DockerFile as is, please update the DockerFile with the following:

```DockerFile
FROM node:alpine

# Add the following line
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
```

Firstly we are going to want to update our client application, so that all our api endpoints that are point to localhost, are changed from `localhost` to `posts.com`.

> later we will configure routing rules, to determine which api request goes where.

once done with all that, we are going to rebuild our image for the clients app.

```bash
cd clients
docker build -t codenameninja/client .
docker push codenameninja/client
```

once that has been pushed, we are going to create another deployment with a ClusterIP service

> client-depl.yml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: client-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: client
  template:
    metadata:
      labels:
        app: client
    spec:
      containers:
        - name: client
          image: codenameninja/client
---
apiVersion: v1
kind: Service
metadata:
  name: client-srv
  labels:
    app: client-srv
spec:
  type: ClusterIP #Optional
  selector:
    app: client
  ports: # List of ports to be exposed
    - name: client
      protocol: TCP
      port: 3000
      targetPort: 3000
```

and then apply our deployment and service

```bash
> k apply -f client-depl.yml
deployment.apps/client-depl created
service/client-srv created
```