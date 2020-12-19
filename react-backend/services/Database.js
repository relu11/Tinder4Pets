const Cloudant = require("@cloudant/cloudant");
const { connect } = require("../app");

const vcap = require("../config/vcap-local.json");
require("dotenv").config();
var async = require("async");

var cloudant = Cloudant({
  // eslint-disable-line
  url: vcap.services.cloudantNoSQLDB.credentials.url,
  plugins: {
    iamauth: {
      iamApiKey: vcap.services.cloudantNoSQLDB.credentials.apikey,
    },
  },
  // username: vcap.services.cloudantNoSQLDB.credentials.username,
  // vcapInstanceName:vcap.services.cloudantNoSQLDB.label,
});
db = cloudant.db.use(process.env.DATABASE_NAME);

var createDocument = function (callback) {
  console.log("Creating document 'mydoc'");
  // we are specifying the id of the document so we can update and delete it later
  db.insert({ _id: "mydoc", a: 1, b: "two" }, function (err, data) {
    console.log("Error:", err);
    console.log("Data:", data);
    callback(err, data);
  });
};
var readDocument = function (callback) {
  console.log("Reading document 'mydoc'");
  db.get("mydoc", function (err, data) {
    console.log("Error:", err);
    console.log("Data:", data);
    // keep a copy of the doc so we know its revision token
    doc = data;
    callback(err, data);
  });
};
var updateDocument = function (callback) {
  console.log("Updating document 'mydoc'");
  // make a change to the document, using the copy we kept from reading it back
  doc.c = true;
  db.insert(doc, function (err, data) {
    console.log("Error:", err);
    console.log("Data:", data);
    // keep the revision of the update so we can delete it
    doc._rev = data.rev;
    callback(err, data);
  });
};
var deleteDocument = function (callback) {
  console.log("Deleting document 'mydoc'");
  // supply the id and revision to be deleted
  db.destroy(doc._id, doc._rev, function (err, data) {
    console.log("Error:", err);
    console.log("Data:", data);
    callback(err, data);
  });
};
async.series([createDocument, readDocument, updateDocument, deleteDocument]);
