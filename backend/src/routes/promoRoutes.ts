// src/routes/promoRoutes.ts
import express from "express";
import Promo from "../models/Promo";


const router = express.Router();

// Validate promo code
router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Promo code required" });

    const promo = await Promo.findOne({ code: code.toUpperCase(), isActive: true });
    if (!promo)
      return res.status(404).json({ message: "Invalid or expired promo code" });

    // Optional: check expiry date
    if (promo.expiryDate && promo.expiryDate < new Date()) {
      promo.isActive = false;
      await promo.save();
      return res.status(400).json({ message: "Promo code expired" });
    }

    res.json({
      message: "Promo valid",
      discountType: promo.type,
      discountValue: promo.value,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
