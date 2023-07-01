import User from "../models/User.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    userId,
    activities,
    workingHours,
    role,
    projects,
    team,
    timeTrackingStatus,
    position,
  } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!phoneNumber) {
    emptyFields.push("phoneNumber");
  }
  if (!userId) {
    emptyFields.push("userId");
  }
  if (!workingHours) {
    emptyFields.push("workingHours");
  }
  if (!team) {
    emptyFields.push("team");
  }
  if (!timeTrackingStatus) {
    emptyFields.push("timeTrackingStatus");
  }
  if (!position) {
    emptyFields.push("position");
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill all the fields", emptyFields})
  }

  try {
    const user_id = req.user_id
    const user = await User.create({name, email, phoneNumber, userId, activities, workingHours, role, projects, team, timeTrackingStatus, position, user_id});
    res.status(200).json(user);
  } catch (error) {
    res.status(4004).json({ message: error.message });
  }
};

export const deleteUser = async (req, res)  => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such user"})
        }

        const user = await User.findOneAndDelete({_id: id})

        if(!user){
            return res.status(404).json({error: "No such user"})
        }

        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message });        
    }
}
