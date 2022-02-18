### Apply Config

So firstly to get our service up and running, we need to apply our configuration

```bash
> kubectl apply -f posts-srv.yml

service/posts-srv created
```

Now let's list our services 

```bash
> kubectl get services

NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP          42h
posts-srv    NodePort    10.111.116.230   <none>        4000:30290/TCP   82s
```

You can ignore the default **kubernetes** service, and you can see that our service is running on port 4000 and a Node port of **30290**

let's see some more details about our service 

```bash

> kubectl describe service posts

Name:                     posts-srv
Namespace:                default
Labels:                   app=posts-srv
Annotations:              <none>
Selector:                 app=posts
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.111.116.230
IPs:                      10.111.116.230
LoadBalancer Ingress:     localhost
Port:                     posts  4000/TCP
TargetPort:               4000/TCP
NodePort:                 posts  30290/TCP
Endpoints:                10.1.0.17:4000
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

```

now if we navigate in our browser to NodePort 

```bash
http://localhost:30290/posts

```

you should see an empty pair of brackets - cause ours posts are empty

```bash
{}
```