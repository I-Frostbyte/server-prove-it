import express from "express"
import { getUser, getUsers, createUser, deleteUser } from "../controllers/general.js"

const router = express.Router();

// GET  a single user
router.get("/user/:id", getUser);

// GET all users
router.get("/users", getUsers);

// CREATE a new user
router.post("/users", createUser);

// DELETE a user
router.delete("/user/:id", deleteUser);

export default router;