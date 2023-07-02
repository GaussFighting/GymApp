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
  const role = data.role;
  const roleKey = data.secretKey;
  const adminKey = process.env.REACT_APP_API_KEY;

  const users = await User.find({
    firstname: firstname,
    lastname: lastname,
    password: password,
    email: email,
    user: role,
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
      if (oldUser) {
        console.log("This User exists in database!");
        const response = {
          msg: "This User exists in database!",
        };
        return { statusCode: 409, body: JSON.stringify(response) };
      }

      if (role === "Admin" && roleKey !== adminKey) {
        console.log("This secret key is not correct for admin user!");
        const response = {
          msg: "This secret key is not correct for admin user!!",
        };
        return { statusCode: 401, body: JSON.stringify(response) };
      }

      let encryptedPassword = await bcrypt.hash(data.password, 10);
      if (role === "Admin" && roleKey === adminKey) {
        const user = {
          _id: mongoose.Types.ObjectId(),
          firstname: data.firstname,
          lastname: data.lastname,
          password: encryptedPassword,
          email: data.email,
          role: "Admin",
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
      } else {
        const user = {
          _id: mongoose.Types.ObjectId(),
          firstname: data.firstname,
          lastname: data.lastname,
          password: encryptedPassword,
          email: data.email,
          role: "User",
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
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }),
      };
    }
};
