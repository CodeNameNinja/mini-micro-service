![adding-more-services](/doc_assets/screenshots/Docker/adding-more-services.png)

Firstly we want to go through each of our services, and update all the API requests to event bus, and update localhost to `event-bus-srv`

Once that is done, we are going to go into each of our services, build an image, push it to docker hub, and then create a Deployment and ClusterIP for each one.

Once that is done, update the event bus service, with our newly created services, and then rebuild the image, push to Docker Hub, and restart rollout of our event-bus deployment.