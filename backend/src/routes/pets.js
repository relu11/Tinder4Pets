import { Router } from "express";
import { getAll } from "../services/Database";
import { authVaildator } from "../services/auth";
import {
  nearbyServices,
  addServices,
  editServices,
  deleteService,
} from "../services/pets";

const router = Router();

// get all pets
router.get("/", async (req, res) => {
  const pets = await getAll("pets");
  res.send({ success: true, pets });
});

router.get("/nearbyServices", authVaildator, async (req, res) => {
  try {
    const result = await nearbyServices(req.user.city);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ sucess: false, message: err.message });
  }
});
router.post("/addServices", authVaildator, async (req, res) => {
  const id = req.user._id;
  const { newService } = req.body;
  try {
    const result = await addServices(id, newService);
    res.send({ success: result });
  } catch (err) {
    res.status(500).send({ sucess: false, message: err.message });
  }
});
router.put("/editServices/:serviceId", authVaildator, async (req, res) => {
  const { newServicesData } = req.body;
  const { serviceId } = req.params;
  try {
    const result = await editServices(req.user._id, serviceId, newServicesData);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});
router.delete("/deleteService/:serviceId", authVaildator, async (req, res) => {
  const { serviceId } = req.params;
  try {
    const result = await deleteService(req.user._id, serviceId);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

export default router;
