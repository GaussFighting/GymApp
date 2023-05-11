const connectDb = require("../db/connectDb");
const User = require("../models/userModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);

  const username = data.username;
  const password = data.password;
  const email = data.email;
  const users = await User.find({
    username: username,
    password: password,
    email: email,
  });
  const response1 = {
    msg: "User successfully found",
    data: {
      users,
    },
  };

  if (response1)
    try {
      if (users.length > 0) {
        console.log("This User exists in database!");
        const response = {
          msg: "This User exists in database!",
        };
        return { statusCode: 409, body: JSON.stringify(response) };
      }
      const user = {
        _id: mongoose.Types.ObjectId(),
        username: data.username,
        password: data.password,
        email: data.email,
      };
      const response = {
        msg: "Users successfully created",
        data: user,
      };

      await User.create(user);
      mongoose.connection.close();
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }),
      };
    }
};
