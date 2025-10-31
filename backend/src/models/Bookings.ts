import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String },
  status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.model("Booking", bookingSchema);
