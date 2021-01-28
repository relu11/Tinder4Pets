import { deleteDoc, getDocs, getDocWithId, insertDoc } from "./Database";

/**
 * Gets all the pets of a user
 * @param {String} id User ID
 */
export const getUserPets = async (id) => {
  const pets = await getDocs("pets", { ownerId: id });
  console.log(pets);
  return pets;
};

/**
 * Adds new pet to the user
 * @param {String} ownerId Owner ID
 * @param {Object} newPetData New pet data
 */
export const addPet = async (ownerId, newPetData) => {
  const newPet = { ...newPetData, ownerId };
  const result = await insertDoc("pets", newPet);
  const petDoc = await getDocWithId("pets", result.id);
  return petDoc;
};

/**
 * Edit a pet
 * @param {String} userId User ID
 * @param {String} petId Pet ID
 * @param {Object} newPetData New pet data
 */
export const editPet = async (userId, petId, newPetData) => {
  let petDoc = await getDocWithId("pets", petId);
  if (!petDoc) {
    throw new Error("not found");
  }
  if (petDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }
  const newPetDoc = { ...petDoc, ...newPetData };
  delete newPetDoc._rev;
  const result = await insertDoc("pets", newPetDoc);
  petDoc = await getDocWithId("pets", result.id);
  return petDoc;
};

/**
 * Delete a pet
 * @param {String} userId User ID
 * @param {String} petId Pet ID
 */
export const deletePet = async (userId, petId) => {
  const petDoc = await getDocWithId("pets", petId);
  if (!petDoc) {
    throw new Error("not found");
  }
  if (petDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }
  const result = await deleteDoc("pets", petId);
  return result;
};

/**
 * Get the attended events of a user
 * @param {Object} user User Dsata
 */
export const getUserEvents = async (user) => {
  const eventsIds = user.attendedEvents;
  if (!eventsIds) {
    return [];
  }
  const events = await getDocs("events", { id: { $in: eventsIds } });
  return events;
};

/**
 * Get user's adopted pets
 * @param {String} userId User ID
 */
export const getUserAdoptedPets = async (userId) => {
  const adoptedPets = await getDocs("pets", { adopteeId: userId });
  return adoptedPets;
};
