import { Router } from "express";
import { authVaildator } from "../services/auth";
import { addPet, deletePet, editPet, getUserPets } from "../services/user";

const router = Router();

router.get("/me/pets", authVaildator, async (req, res) => {
  const id = req.user._id;
  const pets = await getUserPets(id);
  res.send({ success: true, pets });
});

router.post("/me/pets", authVaildator, async (req, res) => {
  const id = req.user._id;
  const { newPet } = req.body;
  try {
    await addPet(id, newPet);
    res.send({ pet: newPet });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.put("/me/pets/:petId", authVaildator, async (req, res) => {
  const { pet } = req.body;
  const { petId } = req.params;
  try {
    const result = await editPet(req.user._id, petId, pet);
    res.send({ success: true, result });
  } catch (err) {
    if (err.message === "unauthorized") {
      res.status(401).send({ success: false, message: "not the owner" });
    } else if (err.error === "not_found") {
      res.status(404).send({ success: false, message: "pet not found" });
    } else {
      res.status(500).send({ success: false, message: err.message });
    }
  }
});

router.delete("/me/pets/:petId", authVaildator, async (req, res) => {
  const { petId } = req.params;
  try {
    const result = await deletePet(req.user._id, petId);
    res.send({ success: true, result });
  } catch (err) {
    if (err.message === "unauthorized") {
      res.status(401).send({ success: false, message: "not the owner" });
    } else if (err.error === "not_found") {
      res.status(404).send({ success: false, message: "pet not found" });
    } else {
      res.status(500).send({ success: false, message: err.message });
    }
  }
});

export default router;
