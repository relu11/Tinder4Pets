import { Router } from "express";
import fetch from "node-fetch";
import { IAM_API } from "../../config";

const router = Router();

router.get("/", async (req, res) => {
  const serviceRes = await fetch(`${IAM_API}/`);
  const txt = await serviceRes.text();
  res.send(txt);
});

export default router;
