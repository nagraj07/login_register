import React, { useState } from "react";

const Loginpage = () => {
    const [login, setLogin] = useState({ username: "", password:"" });

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(login);
        fetch(`http://localhost:4000/registration?username=${login.username}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
    
            if (data[0].password === login.password){
              alert("login data stored successfully");
              console.log(data);
            } else{
              console.log("wrong credentials Error");
            }
          })
          .catch((err) => {
            alert("Error: Failed to login");
            console.log(err);
          });
      };

      const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
      };

      return (
        <>
    
          <h1>LOGIN FORM</h1>
          <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="UserName" value={login.username} onChange={handleLoginChange}/>
            <input type="password" name="password" placeholder="Password" value={login.password} onChange={handleLoginChange}/>
            <button type="submit">Login</button>
          </form>
        </>
      );
    };
    
    export default Loginpage;