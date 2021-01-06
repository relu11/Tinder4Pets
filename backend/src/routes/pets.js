import { Router } from "express";
import { getAll } from "../services/Database";

const router = Router();

// get all pets
router.get("/", async (req, res) => {
  const pets = await getAll("pets");
  res.send({ success: true, pets });
});

export default router;
