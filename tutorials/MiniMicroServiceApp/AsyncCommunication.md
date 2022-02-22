### Issues with Sync Communication 

![Sync Issues](/doc_assets/screenshots/sync-comm/Sync-comm-problems.png)

### Async Concept

![Async Concept](/doc_assets/screenshots/sync-comm/Async-Concept.png)

We are going to introduce the idea of a query service down here.
The goal to query service is to listen to any time that a post is created or a comment is created.

So any time a post is created or a column is created, we're going to have these services, Imit, an
event.

The service will then listen for those events and it's going to take all the different posts and comes
to get created and assemble them all into a very efficient data structure that can essentially solve
our root problem right now, which is to make sure that we reduce all these number of requests down
to just one single request.

So, again, the goal of this query service is to take all the different posts, all the different comments,
and just serve them up to the browser in one very simple and easy request.

Let's take a look at how this would actually work in practice, so here's where everything would start.

Whenever someone makes a post request to the post service, we're going to have our post feature Imit,
an event, and it might look something like this.

Maybe it's an event that has some type of post created and it has some data associated with it as well.

And that data might be the actual post that was generated that would have an ID and a title.

The Postal Service would throw that event off to the event plus.

And then the event bus would automatically route that event or send the event off all of our different
services that express some interest in it, we might send that event off to our query service.

Then it would be up to the crews service to somehow process this event and store some data from it.