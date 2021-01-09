import { Router } from "express";
import { authVaildator, optionalAuth } from "../services/auth";
import { findPetMatches, getALlPets } from "../services/pets";

const router = Router();

// get all pets
router.get("/", optionalAuth, async (req, res) => {
  try {
    const pets = req.user ? await getALlPets(req.user._id) : await getALlPets();
    res.send({ success: true, pets });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.get("/:petId/match", authVaildator, async (req, res) => {
  try {
    const { petId } = req.params;
    const pets = await findPetMatches(petId);
    res.send({ success: true, pets });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

export default router;
