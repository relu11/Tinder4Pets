import { Router } from "express";
import {
  createUser,
  login,
  getUserFromToken,
  authVaildator,
} from "../services/Users";

const router = Router();

router.get("/", (req, res) => {
  res.send("response from iam");
});

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send({ success: true, user: user.userDoc, token: user.token });
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    return res.send({ success: true, user: user.userDoc, token: user.token });
  } catch (err) {
    switch (err.message) {
      case "invalid-data": {
        return res.status(401).send({ message: "invalid data" });
      }
      default: {
        console.log(err.message);
        return res.status(500).send();
      }
    }
  }
});

// add token validation
router.get("/validate", authVaildator, async (req, res) => {
  res.send({ success: true, user: req.user });
});

export default router;
