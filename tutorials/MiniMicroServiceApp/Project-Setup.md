![Project setup](/doc_assets/screenshots/project-setup/06.png)

### Create Client
Create a Directory called `Blog` and inside it create a react-app with `create-react-app` and call it `client`.
<br />

```bash
mkdir blog
cd blog
npx create-react-app client
```

### Create Post Service
and then also make a `post` service in the `blog` directory. 
<br />

```bash
cd..
mkdir posts
cd posts
npm init -y
npm i express cors axios nodemon
```
### Create Comment Service
```bash
cd..
mkdir comments
cd comments
npm init -y
npm i express cors axios nodemon
```
