const connectDb = require("../db/connectDb");
const Template = require("../models/templateModel");

exports.handler = async (event, context) => {
  const mongoose = await connectDb(process.env.REACT_APP_DB);

  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.queryStringParameters.id;
  const page = parseInt(event.queryStringParameters.page);
  const limit = parseInt(event.queryStringParameters.limit);
  console.log(event.queryStringParameters);
  try {
    const templates = id
      ? await Template.find({ _id: id })
      : await Template.find({});

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalTemplates = templates.length;
    results.pageCount = Math.ceil(templates.length / limit);
    console.log(limit);
    console.log("AAAAAAAAAAA", results.pageCount);

    if (lastIndex < templates.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }
    console.log("DDDDDDDDD", startIndex, lastIndex);

    results.result = templates.slice(startIndex, lastIndex);
    console.log("BBBBBBBBBBBB", results.pageCount);
    console.log("CCCCCCCCCC", templates.length, limit);
    const response = {
      msg: "Templates successfully found",
      data: {
        templates,
        results,
      },
    };

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
