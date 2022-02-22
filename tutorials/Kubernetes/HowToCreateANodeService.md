### Configuration

Services, Deployments, Pods are all **Objects** in Kubernetes, everytime we need to create or modify an Object, we need to create or update a **config** file

So let's start by creating a config file for our Node Service.

![posts-srv](/doc_assets/screenshots/Docker/posts-srv.png)

```yml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
  labels:
    app: posts-srv
spec:
  type: NodePort
  selector:
    app: posts
  ports:  # List of ports to be exposed
    - name: posts 
      protocol: TCP
      port: 4000
      targetPort: 4000
```

let's take a look at the ports section where we list out all the different ports that we want to expose on a target pod.

Well, let me give you a quick reminder on the Post Service really quickly, or our Post application inside of our post application directory.

I'm going to open up the index file.

At the very bottom, you'll recall that we had said, listen, on port **4000*.

So our application application is listening for traffic on port **4000**

Inside of our service, we need to make sure that we specifically expose Port 4000 on our part.

So that's what this ports section is all about.

We're going to list out all the different ports that we want to expose on the port.

We specify a protocal of **TCP**

A **port of 4000** and a **target port of 4000**.

I got some bad news, these poor properties right here are pretty darn confusing, I'm not going to lie to you.

So what are these all about?

Well, again, if we think about our post application, it is listening for traffic on Port 4000.

So this 4000 right here is essentially saying we want to open up access on port for thousands.

But real quick question.

Why are we listing this out twice?

What is the difference between port and target ports?

Let me show you a diagram.

I'm going to tell you right away.

This diagram is probably going to make things a little bit more confusing.

![port-targetPort](/doc_assets/screenshots/Docker/post-targetPort.png)

These objects on the left hand side is our browser.

On a far right hand side is the actual pod that is running our post container now on that container,

we've got some application that is listing for traffic on port 4000.

We refer to that port that is attached to the container.

So the ultimate port that we want to direct traffic to as the target ports.

So target port back over here.

This is the actual port that our application is listening for traffic on.

That's where we ultimately want to send traffic to.

We are creating a node port service the node port service is going to have a port of its own, so that is referred to as simply at the port and that is what this property is right here.

So we are sending traffic to Port 4000 on a node port service, and that service internally is going to redirect that traffic over to Port 4000 on the container itself.

The port and the target port do not have to be identical, so this could be 5000 on the port.

And if we make a request to Port 5000 on the node port service, the service will redirect

that traffic to Port 4000 on the container.