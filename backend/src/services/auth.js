import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDocWithId, insertDoc, getDocs } from "./Database";
import { TOKEN_SECRET } from "../config/config";

/**
 * Generate jwt token for the user
 * @param {Object} user User data
 * @returns {Stirng} jwt token
 */
const generateUserToken = (user) => {
  const token = jwt.sign(user, TOKEN_SECRET);
  return token;
};

/**
 * Generate bcrypt hash token
 * @param {String} password
 * @returns {String} Hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Create a new user
 * @param {Object} userData User data
 */
export const createUser = async (userData) => {
  const { email, name, password, city } = userData;
  if (!(email && name && password && city)) {
    throw new Error("missing-data");
  }
  const userExistsDoc = (await getDocs("users", { email }))[0];
  if (userExistsDoc) {
    throw new Error("user-exists");
  }
  const hashedPassword = await hashPassword(password);
  let userDoc = {
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

/**
 * Validate the entered password
 * @param {String} password Input password
 * @param {String} hashedPassword Hashed password from database
 * @returns {Boolean}
 */
const validatePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

/**
 * Logs in the user
 * @param {{email: String, password: String}} userData User data
 * @returns {{token: String, userDoc: Object}}
 */
export const login = async (userData) => {
  const { email, password } = userData;
  if (!(email && password)) {
    throw new Error("missing-data");
  }
  try {
    const userDoc = (await getDocs("users", { email }))[0];
    if (!userDoc) {
      throw new Error("not found");
    }
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
    console.log(err.message);
    throw Error("unkown-error");
  }
};

/**
 * Gets user data from the jwt token payload
 * @param {String} token jwt token
 * @returns {Object} User data from the payload
 */
export const getUserFromToken = async (token) => {
  const { id } = jwt.decode(token);
  if (!id) {
    throw new Error("invalid-token");
  }
  try {
    const userDoc = await getDocWithId("users", id);
    return userDoc;
  } catch (err) {
    if (err.error === "not_found") {
      throw Error("not-found");
    }
    throw Error("unkown-error");
  }
};

/**
 * Middleware to validate the logged in user and add to the request object
 */
export const authVaildator = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).send({ success: false, message: "forbidden" });
    }
    return jwt.verify(token, TOKEN_SECRET, (err) => {
      if (err) {
        console.log(err);
        res.status(403).send({ success: false, message: "forbidden" });
      }
      getUserFromToken(token)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((error) => {
          if (error.error === "not-found") {
            res.status(404).send({ success: false, message: "invalid token" });
          } else {
            res.status(403).send({ success: false, message: "forbidden" });
          }
        });
    });
  }
  return res.status(403).send({ success: false, message: "forbidden" });
};

/**
 * Auth middleware add the user data to the request if the user is logged in
 */
export const optionalAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, TOKEN_SECRET, (err) => {
        if (err) {
          console.log(err);
          res.status(403).send({ success: false, message: "forbidden" });
        }
        getUserFromToken(token)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((error) => {
            console.log(error.message);
            if (error.error === "not-found") {
              res
                .status(404)
                .send({ success: false, message: "invalid token" });
            } else {
              res.status(403).send({ success: false, message: "forbidden" });
            }
          });
      });
    }
  } else {
    next();
  }
};
