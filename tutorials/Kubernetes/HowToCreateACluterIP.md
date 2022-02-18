Remember that the goal of a cluster IP service is to expose a pod to other pods inside the cluster.

To better explore a cluster IP, I want to give you a quick reminder on how parts of our application

are working right now, but present we've got that post project.

Any time someone tries to create a post, we are sending a request over to the event bus and the event

bus hopefully is going to emit that event or kind of broadcast that event to everything else inside of app, including back over to post.

So let's try to create a new pod that is going to run event bus, we're then going to set up some services

to allow posts and event bus to communicate with each other.

Let me show you a diagram to help you understand what we're really going to do here.

![posts-to-event-bus](../../doc_assets/screenshots/Docker/posts-to-event-bus.png)

### Goals Moving Forward   

![Goals-Moving-Forward](../../doc_assets/screenshots/Docker/Goals-Moving-Forward.png)