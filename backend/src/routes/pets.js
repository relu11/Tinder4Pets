import { Router } from "express";
import { authVaildator } from "../services/auth";
import { getAll } from "../services/Database";
import { addAdoptionPet, adoptPet, getAdoptionPets } from "../services/pets";

const router = Router();

// get all pets
router.get("/", async (req, res) => {
  const pets = await getAll("pets");
  res.send({ success: true, pets });
});

router.get("/adoption", async (req, res) => {
  try {
    const adoptionPets = await getAdoptionPets();
    res.send({ success: true, adoptionPets });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/adoption", authVaildator, async (req, res) => {
  try {
    const { pet } = req.body;
    const userId = req.user._id;
    const petDoc = await addAdoptionPet(pet, userId);
    res.send({ success: true, pet: petDoc });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/adoption/:petId/adopt", authVaildator, async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user._id;
    const pet = await adoptPet(userId, petId);
    return res.send({ success: true, pet });
  } catch (err) {
    if (err.message === "not-available") {
      return res
        .status(403)
        .send({ success: false, message: "Pet already adopted" });
    }
    return res.status(500).send({ success: false, message: err.message });
  }
});

export default router;
