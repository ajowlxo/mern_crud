import contactModel from "../Models/contactModel.js";

export const createContact = async (req, res) => {
  const { name, email } = req.body;
  const newContact = new contactModel({ name, email });
  try {
    await newContact.save();
    res.status(200).json("Contact created");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const readAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    await contactModel.findByIdAndDelete(id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    await contactModel.findByIdAndUpdate(id, { name, email });
    res.json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating contact" });
  }
};
