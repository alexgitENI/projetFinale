import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import route from "./routes/routes.js";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from 'connect-mongo';

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)
app.use(express.urlencoded({ extended: false })); 
// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl:"mongodb://root:root@localhost:27017/counter?authSource=admin" }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_success = req.flash("success"); 
  res.locals.flash_error = req.flash("error")
  next();
});



await mongoose.connect('mongodb://root:root@localhost:27017/user?authSource=admin')


// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
