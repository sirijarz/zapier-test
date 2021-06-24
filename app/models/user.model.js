module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      email: String,
      api_key: String
      
    },
    // { timestamps: true }
  );
 // to send as an object JSON to the frontend 
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
