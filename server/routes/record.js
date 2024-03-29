// const { isContentEditable } = require("@testing-library/user-event/dist/utils");
const express = require("express");

// const { default: Exercises } = require("../../src/components/Exercises");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("GYMAPP");
  db_connect
    .collection("Exercises")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the records.
recordRoutes.route("/templates").get(function (req, res) {
  let db_connect = dbo.getDb("GYMAPP");
  db_connect
    .collection("Templates")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the records.
recordRoutes.route("/results").get(function (req, res) {
  const startDate = req.query.startDate && new Date(req.query.startDate);
  const endDate = req.query.endDate && new Date(req.query.endDate);
  const isoStartDate = startDate && startDate.toISOString();
  const isoEndDate = endDate && endDate.toISOString();
  let db_connect = dbo.getDb("GYMAPP");
  db_connect
    .collection("Results")
    .find(
      isoStartDate && isoEndDate
        ? { date: { $gte: isoStartDate, $lte: isoEndDate } }
        : {}
    )
    .sort({ date: -1 })
    // .limit(20)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the records.
recordRoutes.route("/results_per_exercise").get(function (req, res) {
  const exerciseId = req.query.exerciseId;

  let db_connect = dbo.getDb("GYMAPP");
  db_connect
    .collection("Results")
    .find({
      templateExercises: { $elemMatch: { id: exerciseId } },
    })
    .sort({ date: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/exercise/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Exercises").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single record by id
recordRoutes.route("/template/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Templates").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single record by id
recordRoutes.route("/results/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Results").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/exercise").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    nameEn: req.body.exerciseName,
    bodyPart: req.body.selectedBodyPart,
    equipment: req.body.selectedEquipment,
  };
  db_connect.collection("Exercises").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new record for Templates
recordRoutes.route("/templates").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    templateName: req.body.templateName,
    description: req.body.description,
    templateExercises: req.body.templateExercises,
  };
  db_connect.collection("Templates").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new record for RESULTS
recordRoutes.route("/results").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    templateName: req.body.templateName,
    description: req.body.description,
    bodyWeight: req.body.bodyWeight,
    date: req.body.date,
    templateExercises: req.body.templateExercises,
  };
  db_connect.collection("Results").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/exercise/:id").put(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      nameEn: req.body.nameEn,
      bodyPart: req.body.bodyPart,
      equipment: req.body.equipment,
    },
  };
  db_connect
    .collection("Exercises")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/template/:id").put(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      templateName: req.body.templateName,
      description: req.body.description,
      templateExercises: req.body.templateExercises,
    },
  };
  db_connect
    .collection("Templates")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/results/:id").put(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      bodyWeight: req.body.bodyWeight,
      date: req.body.date,
      templateName: req.body.templateName,
      description: req.body.description,
      templateExercises: req.body.templateExercises,
    },
  };
  db_connect
    .collection("Results")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// // This section will help you delete a record
recordRoutes.route("/exercise/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Exercises").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// // This section will help you delete a record
recordRoutes.route("/template/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Templates").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// // This section will help you delete a record
recordRoutes.route("/results/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Results").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
