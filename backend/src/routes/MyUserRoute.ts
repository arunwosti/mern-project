import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// if we get a request to /api/my/user then the handler is called
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck,  jwtParse, validateMyUserRequest,  MyUserController.updateCurrentUser);

export default router;