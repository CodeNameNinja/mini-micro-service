/** Express router providing user related routes
 * @module routers/posts
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
 * @namespace PostApiRequests
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

/**
 * Route posting posts.
 * @name post/posts/create
 * @function
 * @memberof module:routers/posts~PostApiRequests
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post("/posts/create", async (req, res) => {
  // Generate random id
  const id = randomBytes(4).toString("hex");
  // Create post object
  const post = {
    id,
    ...req.body,
  };
  // Add post to posts object
  posts[id] = post;

  // Send post request to /events
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, ...post },
  });
  // Send response
  res.status(201).send(posts[id]);
})

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type)
  res.send({})
})
app.listen(4000, () => {
  console.log("v.0.2.5");
  console.log("Listening on 4000");
});
