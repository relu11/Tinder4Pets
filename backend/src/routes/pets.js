import { Router } from "express";
import { authVaildator, optionalAuth } from "../services/auth";
import {
  findPetMatches,
  getAllPets,
  nearbyServices,
  addServices,
  editServices,
  deleteService,
  addAdoptionPet,
  adoptPet,
  getAdoptionPets,
} from "../services/pets";

const router = Router();

router.get("/", optionalAuth, async (req, res) => {
  try {
    const pets = req.user ? await getAllPets(req.user.id) : await getAllPets();
    res.send({ success: true, pets });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.get("/:petId/match", authVaildator, async (req, res) => {
  try {
    const { petId } = req.params;
    const pets = await findPetMatches(petId);
    return res.send({ success: true, pets });
  } catch (err) {
    if (err.message === "not found") {
      return res.status(404).send({ success: false, message: "Pet not found" });
    }
    return res.status(500).send({ success: false, message: err.message });
  }
});

router.get("/services/nearby", authVaildator, async (req, res) => {
  try {
    const result = await nearbyServices(req.user.city);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ sucess: false, message: err.message });
  }
});

router.post("/services", authVaildator, async (req, res) => {
  const id = req.user.id;
  const { newService } = req.body;
  try {
    const result = await addServices(id, newService);
    res.send({ success: result });
  } catch (err) {
    res.status(500).send({ sucess: false, message: err.message });
  }
});

router.put("/services/:serviceId", authVaildator, async (req, res) => {
  const { newServicesData } = req.body;
  const { serviceId } = req.params;
  try {
    const result = await editServices(req.user.id, serviceId, newServicesData);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.delete("/services/:serviceId", authVaildator, async (req, res) => {
  const { serviceId } = req.params;
  try {
    const result = await deleteService(req.user.id, serviceId);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
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
    const userId = req.user.id;
    const petDoc = await addAdoptionPet(pet, userId);
    res.send({ success: true, pet: petDoc });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/adoption/:petId/adopt", authVaildator, async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;
    const pet = await adoptPet(userId, petId);
    return res.send({ success: true, pet });
  } catch (err) {
    if (err.message === "not-available") {
      return res
        .status(403)
        .send({ success: false, message: "Pet already adopted" });
    }
    if (err.message === "not found") {
      return res.status(404).send({ success: false, message: "Not found!" });
    }
    console.log(err);
    return res.status(500).send({ success: false, message: err.message });
  }
});

export default router;
