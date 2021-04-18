const mongoose = require('mongoose');

// Connect to the local MongoDB named "testdb_graphql-guide".
mongoose.connect('mongodb://localhost/testdb_graphql-guide');

// Create a User schema to be stored in the MongoDB database
const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  username: String,
});

// Turn that schema into a model that we can query
const User = mongoose.model('User', UserSchema);

module.exports = { User };
