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
  * axios module
  * @const
  */
 const axios = require("axios");
 
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
 app.post("/events", async (req, res) => {
    const {type,data} = req.body;
    if(type === 'CommentCreated'){
      const status = data.content.includes('orange') ? 'rejected' : 'approved';

      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content
        }
      })
    }

    res.send({})
 });
 
 
 app.listen(4003, () => console.log("Listening on 4003"));
 