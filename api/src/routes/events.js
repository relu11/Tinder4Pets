import { Router } from "express";
import fetch from "node-fetch";
import { EVENTS_API } from "../../config";

const router = Router();

router.get("/", async (req, res) => {
  const serviceRes = await fetch(`${EVENTS_API}/`);
  const txt = await serviceRes.text();
  res.send(txt);
});

export default router;
