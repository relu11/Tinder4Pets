import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send('response from iam');
});

export default router;
