import React, { useState } from "react";
import axios from "axios";

const App = () => {

    const [Login,setLogin] = useState({username : "" , password : ""});
    const [Register,setRegister] = useState({name : "", lastname : "", username : "" , password : ""});
    
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:4000/user', Login);
          console.log('Login successful:', response.data);
        } catch (error) {
          console.error('Login error:', error);
        }
      };
    
      const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:4000/registration', Register);
          console.log('Registration successful:', response.data);
        } catch (error) {
          console.error('Registration error:', error);
        }
      };
    
      const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...Login, [name]: value });
      };
    
      const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...Register, [name]: value });
      };

    return(
        <>
            <h1>LOGIN FORM</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" name="username" placeholder="Username" onChange={handleLoginChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleLoginChange}/>
                    <button type="submit">Submit</button>
                </form>

            <h1>REGISTER FORM</h1>
                <form onSubmit={handleRegister}>
                    <input type="text" name="name" placeholder="FirstName" onChange={handleRegisterChange}/>
                    <input type="text" name="lastname" placeholder="LastName" onChange={handleRegisterChange}/>
                    <input type="text" name="username" placeholder="UserName" onChange={handleRegisterChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleRegisterChange}/>
                    <button type="submit">Submit</button>
                </form>
        </>
    );
}
export default App;