import React from "react";
import "./Login.css"
const Login = () => {
    return(
    <div>
        <form>
            <img src="C:\Users\NAGARAJ\Downloads\unnamed.jpg" alt="image" />
            <br/>
            <input type="text" placeholder="Username" name="User_Name"/>
            <br/>
            <input type="text" placeholder="Email" name="Email"/>
            <br/>
            <input type="text" placeholder="Password" name="Password"/>
            <br/>
        </form>
    </div>
    );
}
export default Login