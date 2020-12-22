import * as Cloudant from '@cloudant/cloudant';
import dotenv from 'dotenv';
const vcap = require("../config/vcap-local.json");

dotenv.config();

const cloudant = Cloudant({
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
const db = cloudant.db.use(process.env.DATABASE_NAME);

const createDocument = (callback) => {
  console.log("Creating document 'mydoc'");
  // we are specifying the id of the document so we can update and delete it later
  db.insert({ _id: "mydoc", a: 1, b: "two" }, (err, data) => {
    console.log("Error:", err);
    console.log("Data:", data);
    callback(err, data);
  });
};
const readDocument = (callback) => {
  console.log("Reading document 'mydoc'");
  db.get("mydoc", (err, data) => {
    console.log("Error:", err);
    console.log("Data:", data);
    // keep a copy of the doc so we know its revision token
    const doc = data;
    callback(err, data);
  });
};
const updateDocument = (callback) => {
  console.log("Updating document 'mydoc'");
  // make a change to the document, using the copy we kept from reading it back
  doc.c = true;
  db.insert(doc, (err, data) => {
    console.log("Error:", err);
    console.log("Data:", data);
    // keep the revision of the update so we can delete it
    doc._rev = data.rev;
    callback(err, data);
  });
};
const deleteDocument = (callback) => {
  console.log("Deleting document 'mydoc'");
  // supply the id and revision to be deleted
  db.destroy(doc._id, doc._rev, (err, data) => {
    console.log("Error:", err);
    console.log("Data:", data);
    callback(err, data);
  });
};
async.series([createDocument, readDocument, updateDocument, deleteDocument]);
