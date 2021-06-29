const db = require("../models");
const User = db.users;
const { v4: uuidv4 } = require('uuid');
const {validate: uuidValidate} = require('uuid');
// import { validate as uuidValidate } from 'uuid';

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
   const email = req.params.email;

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
/////

exports.findOneValid = (req, res) => {
  const email = req.params.email;
  const api_key = req.params.api_key;
  if(uuidValidate(api_key)){

  User.findOne({"email": email, "api_key": api_key})


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
  }
  else{
    res.status(403).send({ message: "API KEY / Email ID invalid for this user: " + email });
  }
};

exports.printData= (req, res) => {
  // Validate request
  if (!req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newdata = { data: req.body.data}

  console.log(newdata.data)
  res.send(newdata);

   

};



