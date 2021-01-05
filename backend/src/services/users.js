import { deleteDoc, getDocs, getDocWithId, insertDoc } from "./Database";

export const getUserPets = async (id) => {
  const pets = await getDocs("pets", { ownerId: id });
  console.log(pets);
  return pets;
};

export const addPet = async (ownerId, newPetData) => {
  const newPet = { ...newPetData, ownerId };
  const petDoc = await insertDoc("pets", newPet);
  return petDoc;
};

export const editPet = async (userId, petId, newPetData) => {
  const petDoc = await getDocWithId("pets", petId);
  if (petDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }
  const newPetDoc = { ...petDoc, ...newPetData };
  delete newPetDoc._rev;
  const result = await insertDoc("pets", newPetDoc);
  return result;
};

export const deletePet = async (userId, petId) => {
  const petDoc = await getDocWithId("pets", petId);
  if (petDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }
  const result = await deleteDoc("pets", petId);
  return result;
};

export const getUserEvents = async (user) => {
  const eventsIds = user.attendedEvents;
  if (!eventsIds) {
    return [];
  }
  const events = await getDocs("events", { _id: { $in: eventsIds } });
  return events;
};

export const getUserAdoptedPets = async (userId) => {
  const adoptedPets = await getDocs("pets", { adopteeId: userId });
  return adoptedPets;
};
