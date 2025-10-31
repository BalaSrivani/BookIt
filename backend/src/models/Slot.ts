import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
  date:{type:String,required:true},
  time:{type:String,required:true},
  capacity:{type:Number,required:true},
  remaining: Number,
});

export const Slot = mongoose.model("Slot", slotSchema);
