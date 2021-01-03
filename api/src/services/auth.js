import fetch from "node-fetch";
import { IAM_API } from "../../config";

export const authVaildator = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log({ token });
    try {
      const serviceRes = await fetch(`${IAM_API}/validate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonRes = await serviceRes.json();
      const { user } = jsonRes;
      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  return res.status(403).send({ success: false, message: "forbidden" });
};
