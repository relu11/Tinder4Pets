import { Router } from "express";

const router = Router();

router.get("/me/pets", (req, res) => {
  res.send("response from api");
});

export default router;
