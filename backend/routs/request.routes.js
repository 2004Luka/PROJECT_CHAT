import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {requestController} from '../controllers/request.controller.js'
import { respondController } from "../controllers/respond.controller.js";
import { getFriendRequestsController } from "../controllers/getFriendRequests.controller.js"; 
import { getFriendsController } from "../controllers/GetFriendsController.js";

const router = express.Router();

router.post("/requests", protectRoute, requestController);
router.post("/respond", protectRoute, respondController);
router.get("/requests/:userId", protectRoute, getFriendRequestsController);
router.get('/:userId/friends', protectRoute, getFriendsController);

export default router;