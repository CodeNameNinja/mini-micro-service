/** Express router providing user related routes
 * @module routers/query
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");
/**
 * body parser module
 * @const
 */
const bodyParser = require("body-parser");
/**
 * cors module
 * @const
 */
const cors = require("cors");

/**
 * application
 * @type {object}
 * @const
 * @namespace QueryApiRequest
 */

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * posts object
 * @const
 */
const posts = {};

/**
 * Route fetching posts.
 * @name get/posts
 * @function
 * @memberof module:routers/query~QueryApiRequest
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get("/posts", (req, res) => {
  res.send(posts)
});

/**
 * Route for handling posts and comments
 * @name post/events
 * @function
 * @memberof module:routers/query~QueryApiRequest
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }
  console.log(posts)
  res.send({});
});

app.listen(4002, () => console.log("Listening on 4002"));
