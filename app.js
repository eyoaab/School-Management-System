const connectDB = require("./Configurations/db-config");
const exppress = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const app = express();
dotEnv.config();
