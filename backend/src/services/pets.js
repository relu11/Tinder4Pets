import { getAll, getDocWithId, insertDoc } from "./Database";

export const getAdoptionPets = async () => {
  const pets = await getAll("adoption_pets");
  return pets;
};

export const addAdoptionPet = async (petData, userId) => {
  const updatedPetdata = {
    ...petData,
    ownerId: userId,
    adopted: false,
  };
  const result = await insertDoc("adoption_pets", updatedPetdata);
  const petDoc = await getDocWithId("adoption_pets", result.id);
  return petDoc;
};

export const adoptPet = async (userId, petId) => {
  let petDoc = await getDocWithId("adoption_pets", petId);
  if (petDoc.adopted) {
    throw new Error("not-available");
  }
  petDoc.adopteeId = userId;
  petDoc.adopted = true;
  const result = await insertDoc("adoption_pets", petDoc);
  console.log(result);
  petDoc = await getDocWithId("adoption_pets", petId);
  return petDoc;
};
