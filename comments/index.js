/** Express router providing user related routes
 * @module routers/:id/comments
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * randomBytes module
 * @const
 */
const { randomBytes } = require("crypto");

/**
 * bodyParser module
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
 * @namespace CommentApiRequest
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * comments object
 * @const
 */
const commentsByPostId = {};
/**
 * Fetch all comments associated with the given post ID
 * @name get/posts:id/comment
 * @function
 * @memberof module:routers/:id/comments~CommentApiRequest
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

/**
 * Create a comment assiociated with the given post ID
 * @name post/posts/:id/comment
 * @function
 * @memberof module:routers/:id/comments~CommentApiRequest
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post("/posts/:id/comments", (req, res) => {
  // create a comment assiociated with the given post ID
  // Generate random id
  const id = randomBytes(4).toString("hex");
  // Create comment object
  const comment = {
    id,
    ...req.body,
  };
  // Add comment to comments object
  const comments = commentsByPostId[req.params.id] || [];
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;

  // Send comment to event bus
  axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id,
        ...comment,
        postId: req.params.id,
      },
    })
    .catch((err) => console.log(err));
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
