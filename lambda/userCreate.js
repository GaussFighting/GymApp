const connectDb = require("../db/connectDb");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);

  const firstname = data.firstname;
  const lastname = data.lastname;
  const password = data.password;
  const email = data.email;
  const userType = data.userType;
  const users = await User.find({
    firstname: firstname,
    lastname: lastname,
    password: password,
    email: email,
    user: userType,
  });
  const response1 = {
    msg: "User successfully found",
    data: {
      users,
    },
  };

  if (response1)
    try {
      const oldUser = await User.findOne({ email });
      console.log(oldUser);
      if (oldUser) {
        console.log("This User exists in database!");
        const response = {
          msg: "This User exists in database!",
        };
        return { statusCode: 409, body: JSON.stringify(response) };
      }
      let encryptedPassword = await bcrypt.hash(data.password, 10);

      const user = {
        _id: mongoose.Types.ObjectId(),
        firstname: data.firstname,
        lastname: data.lastname,
        password: encryptedPassword,
        email: data.email,
        userType: data.userType,
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
