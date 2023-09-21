import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get(
      "http://localhost:5000/contact/getcontacts"
    );
    setContacts(response.data);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/contact/createcontact",
        {
          name,
          email,
        }
      );
      console.log(response.data);
      fetchContacts();
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/contact/deletecontact/${id}`);
    fetchContacts(); // Fetch contacts again after deleting
  };
  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/contact/updatecontact/${id}`, {
      name: newName,
      email: newEmail,
    });
    fetchContacts();
    setOpen(!open);
    setNewName("");
    setNewEmail("");
  };

  const handleId = (id) => setContactId(id);

  return (
    <div className="App">
      <h1 className="header">Email book</h1>

      <div className="userData">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreate}>Create contact</button>
      </div>
      <div className="contactList">
        <h2 className="contactTitle">Email List:</h2>
        <div className="contacts">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact">
              <div>{contact.name}</div>
              <div>{contact.email}</div>

              <button
                onClick={() => {
                  setOpen(!open);
                  handleId(contact._id);
                }}
                className="updateButton"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="deleteButton"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {open && (
          <div className="updateForm">
            <input
              type="text"
              placeholder="new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              onClick={() => handleUpdate(contactId)}
              className="updateButton"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
