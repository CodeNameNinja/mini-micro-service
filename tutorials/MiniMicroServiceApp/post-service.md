![Post Service](/doc_assets/screenshots/project-setup/post-service.png)

I think that we need to have a single route that's going to be in charge of retrieving all the different
posts that have ever been created.

I think we also need one distinct route that has me in charge of creating a brand new post.

So we're going to have one route of posts.
If we make a get request to it, we'll get all of our posts.
We'll have another one of the posts if we make it post to it with somebody that has a title that it
is a string, we're going to create a new post.

So that's what we're going to use as our guide for implementing our post service.
Let's open up our code editor inside the Post project directory.
Right now, we're going to start to build out a very small express application that's going to implement
these two routes.

[Link to docs](module-routers_posts.html)

### Testing Posts Services

#### Send A Post
![Send A Post](/doc_assets/screenshots/project-setup/POST_posts.png)

#### Fetch posts
![Fetch posts](/doc_assets/screenshots/project-setup/GET_posts.png)


> ! take note these posts are not persistant and are stored in memory