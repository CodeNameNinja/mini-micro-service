How we are going to make a request to the event bus using the name of our cluster IP

![request-to-event-bus](/doc_assets/screenshots/Docker/request-to-event-bus.png)

The next thing we want to do, is update our Posts service to point to our event bus, rather than localhost 

and update our event bus service to point to our posts cluster IP. rather than localhost.

> posts/index.js
```js
 // Send post request to /events
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, ...post },
  });

```
> event-bus/index.js
```js

app.post('/events', (req, res) => {
  const event = req.body; 

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log(err));
```

now we just need to update both our posts and event-bus deployments by rebuilding the images and pushing it to docker hub and restart our deployments

```bash

docker build -t codenameninja/event-bus .
docker push codenameninja/event-bus
kubectl rollout restart deployment event-bus-depl

docker build -t codenameninja/posts .
docker push codenameninja/posts . 
kubectl rollout restart deployment posts-depl

```


### Verifying Communication

Open our postman client and then make a post request to our NodePort Port which for me is on `30290`

if you don't know, use `kubectl get services` and find the NodePort Service.

then make a post request to `http://localhost:30290/posts`

![posts-request-to-nodeport](/doc_assets/screenshots/Docker/posts-request-to-nodeport.png)

let's verify that we recieved the request in our Posts Pod, by viewing the logs with Kubectl.

```bash

> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
event-bus-depl-6764959bdb-nmb6j   1/1     Running   0          7m25s
posts-depl-6c6f8d97cb-m9hzw       1/1     Running   0          7m17s

> k logs posts-depl-6c6f8d97cb-m9hzw

> posts@1.0.0 start
> nodemon index.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
v.0.2.5
Listening on 4000
Event Recieved PostCreated

```

Great, we now can make a request to our Posts Service and see that we recieved the event.