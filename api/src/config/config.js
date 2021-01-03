const dotenv = require("dotenv");

dotenv.config();

const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
export const CLIENTS = process.env.CLIENTS.split(",");
