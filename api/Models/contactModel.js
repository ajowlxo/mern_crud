import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
});

const contactModel = mongoose.model("Contacts", contactSchema);

export default contactModel;
