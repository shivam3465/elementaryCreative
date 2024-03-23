import express from "express";
import { login, register, logout, getMyProfile } from "../controllers/user.js";
import { checkAuthentication } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/me", checkAuthentication, getMyProfile);

export default router;
