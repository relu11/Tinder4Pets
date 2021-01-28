import { Router } from "express";
import { authVaildator } from "../services/auth";
import {
  addPet,
  deletePet,
  editPet,
  getUserAdoptedPets,
  getUserEvents,
  getUserPets,
} from "../services/users";

const router = Router();

router.get("/me/pets", authVaildator, async (req, res) => {
  const id = req.user.id;
  try {
    const pets = await getUserPets(id);
    return res.send({ success: true, pets });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/me/pets", authVaildator, async (req, res) => {
  const id = req.user.id;
  const { newPet } = req.body;
  try {
    const result = await addPet(id, newPet);
    console.log(result);
    res.send({ pet: result });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.put("/me/pets/:petId", authVaildator, async (req, res) => {
  const { pet } = req.body;
  const { petId } = req.params;
  try {
    const result = await editPet(req.user.id, petId, pet);
    res.send({ success: true, result });
  } catch (err) {
    if (err.message === "unauthorized") {
      res.status(401).send({ success: false, message: "not the owner" });
    } else if (err.message === "not found") {
      res.status(404).send({ success: false, message: "pet not found" });
    } else {
      res.status(500).send({ success: false, message: err.message });
    }
  }
});

router.delete("/me/pets/:petId", authVaildator, async (req, res) => {
  const { petId } = req.params;
  try {
    const result = await deletePet(req.user.id, petId);
    res.send({ success: true, result });
  } catch (err) {
    if (err.message === "unauthorized") {
      res.status(401).send({ success: false, message: "not the owner" });
    } else if (err.message === "not found") {
      res.status(404).send({ success: false, message: "pet not found" });
    } else {
      res.status(500).send({ success: false, message: err.message });
    }
  }
});

router.get("/me/events", authVaildator, async (req, res) => {
  try {
    const events = await getUserEvents(req.user);
    res.send({ success: true, events });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/me/adopted", authVaildator, async (req, res) => {
  try {
    const adoptedPets = await getUserAdoptedPets(req.user.id);
    res.send({ success: true, adoptedPets });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/profile", authVaildator, async (req, res) => {
  try {
    const pets = await getUserPets(req.user.id);
    const events = await getUserEvents(req.user);
    const adoptedPets = await getUserAdoptedPets(req.user.id);
    res.send({ success: true, pets, events, adoptedPets });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
