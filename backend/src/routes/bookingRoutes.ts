// src/routes/bookingRoutes.ts
import express from "express";
import { Slot } from "../models/Slot";
import { Booking } from "../models/Bookings";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { experienceId, slotId, name, email, totalPrice, promoCode } = req.body;

    if ( !experienceId || !slotId)
      return res.status(400).json({ message: "Missing required fields" });

    const slot = await Slot.findById(slotId);
    if (!slot || (slot.remaining ?? 0) <= 0)
      return res.status(400).json({ message: "Slot unavailable" });

    const booking = await Booking.create({         
      experienceId,
      slotId,
      name,
      email,
      totalPrice,
      promoCode,
      status: "confirmed",
    });

    slot.remaining = (slot.remaining ?? 0) - 1;
    await slot.save();

    res.json({ message: "Booking successful", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
