import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDocWithId, insertDoc } from "./Database";
import { TOKEN_SECRET } from "../config/config";

const generateUserToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    TOKEN_SECRET
  );
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
