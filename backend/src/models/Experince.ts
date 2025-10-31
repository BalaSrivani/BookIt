import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: {type: String,required:true},
  description: {type: String,required:true},
  place: {type: String,required:true},
  price: {type: Number,required:true},
  image: {type:String,required:true},
  about:{type:String,required:true},
});

export const Experience = mongoose.model("Experience", experienceSchema);
