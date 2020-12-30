import { Router } from "express";
import fetch from "node-fetch";
import { IAM_API } from "../../config";

const router = Router();

router.get("/", async (req, res) => {
  const serviceRes = await fetch(`${IAM_API}/`);
  const txt = await serviceRes.text();
  res.send(txt);
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  if (!(body.email && body.name && body.password && body.city)) {
    return res.status(400).send({ message: "missing data" });
  }
  try {
    const serviceRes = await fetch(`${IAM_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonRes = await serviceRes.json();
    res.cookie("token", jsonRes.token);
    return res.send(jsonRes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;
  if (!(body.email && body.password)) {
    return res.status(400).send({ message: "missing data" });
  }
  try {
    const serviceRes = await fetch(`${IAM_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonRes = await serviceRes.json()
    return res.status(serviceRes.status).send(jsonRes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

export default router;
