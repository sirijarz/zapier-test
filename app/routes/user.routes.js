const { users } = require("../models/index.js");

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User for zapier with api key
  router.post("/apikey", users.create);
   // get that api key for that email
  router.get("/getapikey", users.findOne);

  
  app.use("/integrations/zapier", router);
};
