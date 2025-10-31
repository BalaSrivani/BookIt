import express from "express";
import { Experience } from "../models/Experince";
import { Slot } from "../models/Slot";
const router = express.Router();

router.get("/", async (_, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

router.get("/:id", async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  const slots = await Slot.find({ experienceId: req.params.id });
  res.json({ experience: exp, slots });
});

export default router;
