import express from "express";
const router = express.Router();

import { home, formTreatement, connexion, connexionFormTreatement, dashboard } from "../controllers/home.js";
import { checkAuthenticated } from "../middlewares.js";


router.get("/", home);

router.get("/connexion", connexion);
router.get("/dasboard", checkAuthenticated,dashboard);

router.post("/register", formTreatement);
router.post("/connexionForm", connexionFormTreatement);


export default router;
