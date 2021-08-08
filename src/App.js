import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/Editablerow";
const App = () => {
  const [start, setStart] = useState(0)
  const [pagesize,setpagesize]= useState(2)
  const [contacts, setContacts] = useState(localStorage.getItem('data')?JSON.parse(localStorage.getItem("data")).slice(start,pagesize):[]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    homeaddress: "",
    officeaddress: "",

  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    homeaddress: "",
    officeaddress: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      email: addFormData.email,
      phoneNumber: addFormData.phoneNumber,
      homeaddress: addFormData.homeaddress,
      officeaddress: addFormData.officeaddress,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    localStorage.setItem("data",JSON.stringify(newContacts))
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      email: editFormData.email,
      phoneNumber: editFormData.phoneNumber,
      homeaddress: editFormData.homeaddress,
      officeaddress: editFormData.officeaddress,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      homeaddress: contact.homeaddress,
      officeaddress: contact.officeaddress,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };
  const handlePagination = (value)=> {
    console.log(value)
    console.log(start)
    console.log(pagesize)
    if (value==="next"){
      setStart(start+2)
      setpagesize(pagesize+2)
    }
    if (value==="previous"){
      setStart(start-2)
      setpagesize(pagesize-2)
    }
    setContacts(localStorage.getItem('data')?JSON.parse(localStorage.getItem("data")).slice(start,pagesize):[])
  }

  return (
     
    <div className="app-container">
      <h2>EMPLOYEE DETAILS</h2>
      <form onSubmit={handleEditFormSubmit}>
       
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Phone Number</th>
              <th>Home Address</th>
              <th>Office Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <div>
      <button onClick = {()=> handlePagination("previous")}>
            previous
          </button>
          <button onClick = {()=> handlePagination("next")}>
            next 
          </button>
        </div>
      <h2>Add a Employee Detail</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="homeaddress"
          required="required"
          placeholder="Enter an homeaddress..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="officeaddress"
          required="required"
          placeholder="Enter an officeaddress..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      <div className="App">
      <div className="App-header">
      </div>
    </div>
    </div>
  
  );

  
};

export default App;
