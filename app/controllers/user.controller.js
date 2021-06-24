const db = require("../models");
const User = db.users;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new User with api key
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a new zapier user using api key
  const user = new User({
    email: req.body.email,
    api_key: uuidv4()
    
  });

  // Saving user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    });
};



// Find a single user with email
exports.findOne = (req, res) => {
   const email = req.body.email;

  User.find({"email": email})
     
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found api key with this email " + email });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving api key for this email" + email });
    });
};


