import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDocWithId, insertDoc } from "./Database";
import { TOKEN_SECRET } from "../config/config";

const generateUserToken = (user) => {
  const token = jwt.sign(user, TOKEN_SECRET);
  return token;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const createUser = async (userData) => {
  const { email, name, password, city } = userData;
  if (!(email && name && password && city)) {
    throw new Error("missing-data");
  }
  const hashedPassword = await hashPassword(password);
  let userDoc = {
    _id: email,
    email,
    name,
    password: hashedPassword,
    city,
    timeCreated: new Date(),
  };
  const userCreated = await insertDoc("users", userDoc);
  userDoc = await getDocWithId("users", userCreated.id);
  const token = generateUserToken(userDoc);
  delete userDoc.password;
  return {
    token,
    userDoc,
  };
};

const validatePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

export const login = async (userData) => {
  const { email, password } = userData;
  if (!(email && password)) {
    throw new Error("missing-data");
  }
  try {
    const userDoc = await getDocWithId("users", email);
    const passwordValidation = await validatePassword(
      password,
      userDoc.password
    );
    if (passwordValidation) {
      delete userDoc.password;
      const token = await generateUserToken(userDoc);
      return { token, userDoc };
    }
    throw Error("invalid-data");
  } catch (err) {
    if (err.error === "not_found" || err.message === "invalid-data") {
      throw Error("invalid-data");
    }
    throw Error("unkown-error");
  }
};

export const getUserFromToken = async (token) => {
  const { email } = jwt.decode(token);
  if (!email) {
    throw new Error("invalid-token");
  }
  try {
    const userDoc = await getDocWithId("users", email);
    return userDoc;
  } catch (err) {
    if (err.error === "not_found") {
      throw Error("not-found");
    }
    throw Error("unkown-error");
  }
};

export const authVaildator = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).send({ success: false, message: "forbidden" });
    }
    console.log({ token, TOKEN_SECRET });
    return jwt.verify(token, TOKEN_SECRET, (err, result) => {
      if (err) {
        console.log(err);
        res.status(403).send({ success: false, message: "forbidden" });
      }
      getUserFromToken(token).then((user) => {
        req.user = user;
        next();
      });
    });
  }
  return res.status(403).send({ success: false, message: "forbidden" });
};
