### What do they do?

![service-purpose](/doc_assets/screenshots/Docker/service-purpose.md.png)

### Different Types Of services

![service-types](/doc_assets/screenshots/Docker/service-types.png)

**Cluser IP** services are used any time that we want to set up communication between different pods inside
of our cluster.

**Node ports** are used any time they want to access a pod from outside of our cluster, but we only usually
only use a node port for development purposes.

**Load balancers** are the right way to access a pod from outside the cluster, so you can think of a Node Port and load balancer as being very similar, but the way that they actually work are very different.

And I'll be sure to tell you exactly how they're different over time.

So Node Port and load balancer are both going to expose a port to the outside world or expose a pod to the outside world.

And then finally, **External name** services finally put it in this diagram so that you are aware that this exists and it is another type of service, but it's not something that we are going to use.