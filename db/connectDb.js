const mongoose = require("mongoose");
const connectDb = async (url) => {
  //Here you can observe that url of mongo atlas will show once
  //Check this in netlify functions panel after you deploy your page
  //Observe it when you send form using url netlify function
  console.log(url, "url to mongo atlas, connectDb");

  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
  return mongoose;
};

module.exports = connectDb;
