import React, { useState, useEffect } from "react";
import Loginpage from "./Loginpage";
import "./register.css";

const App = () => {
  const [register, setRegister] = useState({ firstname: "", lastname: "", username: "", password: "" });
  const [registerdata, setRegisterdata] = useState([]);
  const [showloginpage, setShowloginpage] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/registration")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setRegisterdata(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const url = updateId ? `http://localhost:4000/registration/${updateId}` : "http://localhost:4000/registration";
    const method = updateId ? "PUT" : "POST";

    console.log("Submitting:", { method, url, body: register });

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((res) => res.json())
      .then((data) => {
        if (updateId) {
          alert("Data updated successfully");
          console.log("Updated data:", data);
          setRegisterdata(registerdata.map(item => item.id === updateId ? data : item));
          setUpdateId(null);
        } else {
          alert("Register data stored successfully");
          setRegisterdata([...registerdata, data]);
        }
        setRegister({ firstname: "", lastname: "", username: "", password: "" });
      })
      .catch((err) => {
        alert("Error: Failed to store register data");
        console.log(err);
      });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleLoginclick = () => {
    setShowloginpage(true);
  };

  const handleUpdate = (data) => {
    console.log("Updating:", data);
    setRegister({ 
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
    });
    setUpdateId(data.id);
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:4000/registration/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Data removed successfully");
        setRegisterdata(registerdata.filter((item) => item.id !== id));
      })
      .catch((err) => {
        alert("Error: Failed to remove data");
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1>REGISTER FORM</h1>
        <form onSubmit={handleRegister}>
          <pre>Welcome to the page</pre>
          <input type="text" name="firstname" placeholder="FirstName" value={register.firstname} onChange={handleRegisterChange} />
          <input type="text" name="lastname" placeholder="LastName" value={register.lastname} onChange={handleRegisterChange} />
          <input type="text" name="username" placeholder="UserName" value={register.username} onChange={handleRegisterChange} />
          <input type="password" name="password" placeholder="Password" value={register.password} onChange={handleRegisterChange} />
          <button type="submit">{updateId ? "Update" : "Register"}</button>
        </form>
        <button onClick={handleLoginclick} className="Loginbutton">Login</button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>UserName</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(registerdata) && registerdata.map((data) => (
              <tr key={data.id}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.username}</td>
                <td>{data.password}</td>
                <td>
                  <button onClick={() => handleUpdate(data)}>Update</button>
                  <button onClick={() => handleRemove(data.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showloginpage && <Loginpage />}
    </>
  );
};

export default App;











//NEW CODE FOR CONTACT US FORM
// import React from 'react';
// import ContactUs from './ContactUs';
// import "./Contact.css"

// function App() {
//   return (
//     <div className="App">
//       <ContactUs />
//     </div>
//   );
// }

// export default App;
