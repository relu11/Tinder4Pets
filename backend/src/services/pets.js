import { getAll, getDocWithId } from "./Database";
import { getUserPets } from "./users";

const isMatch = (petA, petB) =>
  petA.lookingForMatch &&
  petA.ownerId !== petB.ownerId &&
  petA.type === petB.type &&
  petA.city === petB.city &&
  Math.abs(petA.ageMonths - petB.ageMonths) <= 3;

export const getALlPets = async (userId) => {
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

export const findPetMatches = async (petId) => {
  const targetPet = await getDocWithId("pets", petId);
  let pets = await getAll("pets");
  pets = pets.filter((p) => isMatch(p, targetPet));
  return pets;
};
