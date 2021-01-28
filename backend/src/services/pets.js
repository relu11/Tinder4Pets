import {
  getDocs,
  insertDoc,
  getDocWithId,
  deleteDoc,
  getAll,
} from "./Database";
import { getUserPets, addPet } from "./users";

/**
 * Checks if two pets are match for each other
 * @param {Object} petA
 * @param {Object} petB
 * @returns {Boolean}
 */
const isMatch = (petA, petB) =>
  petA.lookingForMatch &&
  petA.ownerId !== petB.ownerId &&
  petA.type === petB.type &&
  petA.city === petB.city &&
  petA.gender !== petB.gender &&
  Math.abs(petA.ageMonths - petB.ageMonths) <= 3;

/**
 * Gets all the pets of a user
 * @param {String} userId User ID
 * @returns {Array}
 */
export const getAllPets = async (userId) => {
  const allPets = await getAll("pets");
  if (userId) {
    const userPets = await getUserPets(userId);
    allPets.forEach((p) => {
      userPets.forEach((up) => {
        if (isMatch(p, up)) {
          allPets[allPets.indexOf(p)].isMatch = true;
          allPets[allPets.indexOf(p)].matchWith = up;
        }
      });
    });
  }
  return allPets;
};

/**
 * Gets the matches of a pet
 * @param {String} petId Pet ID
 * @returns {Array}
 */
export const findPetMatches = async (petId) => {
  const targetPet = await getDocWithId("pets", petId);
  if (!targetPet) {
    throw new Error("not found");
  }
  let pets = await getAll("pets");
  pets = pets.filter((p) => isMatch(p, targetPet));
  return pets;
};

/**
 * Gets neaarby services of the user
 * @param {String} userCity User City
 * @returns {Array}
 */
export const nearbyServices = async (userCity) => {
  const nearbyService = await getDocs("pets_services", { city: userCity });
  return nearbyService;
};

/**
 * Adds a new service
 * @param {String} serviceOwnerId Service owner ID
 * @param {Object} newServicesData New service data
 * @returns {Object} Inserted service data
 */
export const addServices = async (serviceOwnerId, newServicesData) => {
  const newService = { ...newServicesData, ownerId: serviceOwnerId };
  const result = await insertDoc("pets_services", newService);
  return result;
};

/**
 * Edits a service
 * @param {String} userId User ID
 * @param {String} serviceId User ID
 * @param {Object} newServicesData New Service data
 */
export const editServices = async (userId, serviceId, newServicesData) => {
  const serviceDoc = await getDocWithId("pets_services", serviceId);
  if (serviceDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }

  const newserviceDoc = { id: serviceId, ...newServicesData };
  const result = await insertDoc("pets_services", newserviceDoc);
  return result;
};

/**
 * Deletes a service
 * @param {String} userId User ID
 * @param {String} serviceId Service ID
 */
export const deleteService = async (userId, serviceId) => {
  const serviceDoc = await getDocWithId("pets_services", serviceId);
  if (serviceDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }

  const result = await deleteDoc("pets_services", serviceId);
  return result;
};

/**
 * Gets all pets listed for adoption
 */
export const getAdoptionPets = async () => {
  const pets = await getAll("adoption_pets");
  return pets;
};

/**
 * Add a pet for adoption
 * @param {Object} petData New pet data
 * @param {String} userId Owner ID
 */
export const addAdoptionPet = async (petData, userId) => {
  const updatedPetdata = {
    ...petData,
    ownerId: userId,
    adopted: false,
  };
  const result = await insertDoc("adoption_pets", updatedPetdata);
  return result;
};

/**
 * Edits adoption pet state to adopted by the user entered
 * @param {String} userId User iD
 * @param {String} petId Pet ID
 */
export const adoptPet = async (userId, petId) => {
  const petDoc = await getDocWithId("adoption_pets", petId);
  if (!petDoc) {
    throw new Error("not found");
  }
  if (petDoc.adopted) {
    throw new Error("not-available");
  }
  const updates = {
    id: petDoc.id,
    adopteeId: userId,
    adopted: true,
  };

  const result = await insertDoc("adoption_pets", updates);

  const updatedPetDoc = await getDocWithId("adoption_pets", petId);
  updatedPetDoc.ownerId = userId;

  await addPet(userId, updatedPetDoc);

  return result;
};
