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
 * axios module
 * @const
 */
const axios = require("axios");

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
 * @function
 * @name handleEvent
 * @description handles event
 * @param {string} type - event type
 * @param {object} data - event data
 * @returns {object} - response object
 * @memberof QueryApiRequest
 * @inner
 */

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if( type === "CommentUpdated"){
    const { id, content, postId, status } = data;
    // find comment
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);
    // update comment
    comment.content = content;
    comment.status = status;
  }
}

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
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  try {
    console.log("Listening on 4002");
    const res = await axios.get('http://localhost:4005/events');
    res.data.forEach(event => {
      console.log("Processing Event", event.type);
      handleEvent(event.type, event.data)
    });
    
  } catch (error) {
    console.log(error);
  }
});
