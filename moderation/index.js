/** Express router providing user related routes
 * @module routers/moderation
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
  * application
  * @type {object}
  * @const
  * @namespace ModerationApiRequest
  */
 
 const app = express();
 app.use(bodyParser.json());
 
 
 /**
  * Route handling comment moderation
  * @name post/events
  * @function
  * @memberof module:routers/query~QueryApiRequest
  * @inner
  * @param {string} path - Express path
  * @param {callback} middleware - Express middleware.
  */
 app.post("/events", (req, res) => {

 });
 
 
 app.listen(4003, () => console.log("Listening on 4003"));
 