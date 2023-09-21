import express from "express";
import {
  createContact,
  deleteContact,
  readAllContacts,
  updateContact,
} from "../Controllers/contactController.js";

const router = express.Router();

router.post("/createcontact", createContact);
router.get("/getcontacts", readAllContacts);
router.delete("/deletecontact/:id", deleteContact);
router.put("/updatecontact/:id", updateContact);

export default router;
