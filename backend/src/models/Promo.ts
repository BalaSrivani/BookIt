import mongoose from "mongoose";
const Schema=mongoose.Schema;

const promoSchema=new Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percentage", "flat"], required: true },
  value: { type: Number, required: true },
  expiryDate: { type: Date },
  isActive: { type: Boolean, default: true },
});

const Promo=mongoose.model("Promo",promoSchema);
export default Promo;