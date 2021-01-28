import { db } from "../config/firebaseConfig";

/**
 * Convert firebase docs to objects contianing all the data
 * @param {FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]} docs
 * @returns {Array} data objects
 */
const docsToDataObjects = (docs) => {
  const result = [];
  docs.forEach((doc) => {
    const docData = doc.data();
    docData.id = doc.id;
    result.push(docData);
  });
  return result;
};

/**
 * Inserts a new document to database
 * @param {String} collection Collection name
 * @param {Object} doc Document Data
 * @returns {{id: String, ...}} Document data along with id
 */
export const insertDoc = async (collection, doc) => {
  const collectionRef = await db.collection(collection);
  let docRef;
  if (doc.id) {
    docRef = await collectionRef.doc(doc.id);
    await docRef.set(doc, { merge: true });
  } else {
    docRef = await collectionRef.add(doc);
  }
  const docData = (await docRef.get()).data();
  docData.id = docRef.id;
  return docData;
};

/**
 * Insert multiple documents (entries) to database
 * @param {String} collection Collection Name
 * @param {Object[]} docs Documents' data
 * @returns {boolean} Success status of the operation
 */
export const insertBulk = async (collection, docs) => {
  const batch = db.batch();
  docs.forEach((doc) => {
    const newDocRef = db.collection(collection).doc();
    batch.set(newDocRef, doc);
  });
  await batch.commit();
  return true;
};

/**
 * Get a specific docuement from database
 * @param {String} collection Collection Name
 * @param {String} docId Document ID
 * @returns {{id: String, ...}?} Document data
 */
export const getDocWithId = async (collection, docId) => {
  const docSnapshot = await db.collection(collection).doc(docId).get();
  if (docSnapshot.exists) {
    const docData = await docSnapshot.data();
    docData.id = docSnapshot.id;
    return docData;
  }
  return null;
};

/**
 * Get docs with a condition
 * @param {String} collection Collection Name
 * @param {Object} condition Condition
 * @returns {Array} Result data
 */
export const getDocs = async (collection, condition) => {
  let query = db.collection(collection);
  Object.keys(condition).forEach((c) => {
    query = query.where(c, "==", condition[c]);
  });
  const querySnapshot = await query.get();
  const result = docsToDataObjects(querySnapshot.docs);
  return result;
};

/**
 * Get all documents in a collection
 * @param {String} collection Collection Name
 * @returns {Array} Result documents' data
 */
export const getAll = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  const result = docsToDataObjects(querySnapshot.docs);
  return result;
};

/**
 * Delete a document from database
 * @param {String} collection Collection Name
 * @param {String} docId Document ID
 * @returns {Boolean} Success state of the operations
 */
export const deleteDoc = async (collection, docId) => {
  await db.collection(collection).doc(docId).delete();
  return true;
};
