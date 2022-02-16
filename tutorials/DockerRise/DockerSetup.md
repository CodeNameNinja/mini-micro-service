## Setup

We are going to start by creating a `Dockerfile` in the root directory of our `Posts` Service.

![Dockerfile](../../doc_assets/screenshots/Docker/Dockerfile.png)

### Dockerfile

Specify Base Image


```Dockerfile
FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
```

Now, one other thing we're going to do really quickly, we usually don't want to include any install dependencies that are on our local machine.

So in our case, that would be the node modules folder in order to make sure that we don't send all
those dependencies over during the image building process.

We're going to create a file inside this post directory.
Called `.dockerignore`, and we're going to add the following line:
`node_modules`

