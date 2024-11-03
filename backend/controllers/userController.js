import User from "../models/user.js";
import Event from "../models/event.js";
import Club from "../models/club.js";
import jwt from "jsonwebtoken";

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.decode(token);
    const id = decoded.id;
    const user = await User.findById(id)
      .populate("clubs", "name logo events_attended")
      .populate("events", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let users;
    if (req.body) {
      users = await User.find(req.query);
    } else {
      users = await User.find({ db_role: "user" || "club_admin" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  let file = req.file;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error changing password", error: err.message });
  }
};

// Attend an Event
export const attendEvent = async (req, res) => {
  try {
    const { eventId, points } = req.body;
    const user = await User.findById(req.params.id);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "User or Event not found" });
    }

    user.events_attended.push(eventId);
    user.rewards.push({ event: eventId, points });
    await user.save();
    res.json({ message: "Event attended and reward added", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error attending event", error: err.message });
  }
};

// Join a Club
export const joinClub = async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(501)
      .json({ message: "You must be logged in to join a club" });
  }
  try {
    const { clubId } = req.body;
    const user = await User.findById(req.params.token);
    const club = await Club.findById(clubId);

    if (!user || !club) {
      return res.status(404).json({ message: "User or Club not found" });
    }

    const currentClub = Club.findById(clubId);
    if (currentClub.members === null || currentClub.members === undefined) {
      currentClub.members = [];
    }
    if (currentClub.members && !currentClub.members.includes(user._id)) {
      currentClub.members.push(user._id);
      currentClub.save();
    }

    if (!user.clubs.includes(clubId)) {
      user.clubs.push(clubId);
      await user.save();
      res.json({ message: "Joined club successfully", user });
    } else {
      res.json({ message: "Already joined club" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error joining club", error: err.message });
  }
};
