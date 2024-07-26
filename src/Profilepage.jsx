import React, { useState } from "react";

const Profilepage = () => {
    const[profile,setProfile] = useState({username:""})

    const handleSubmit = (e) =>{
        e.preventdefault();
        console.log(profile)

        fetch(`http://localhost:4000/registration?username=${profile.username}`)
        .then((res) => res.json)
        .then((data) =>{
            console.log(data);

            if(data.username === profile.username)
                alert("data feacthed succesfully")
            console.log(data)
        })
    };
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return(
        <>
            <input type="text" name="username" placeholder="Username" value={profile.username} onChange={handleProfileChange}>Username</input>
            <button onChange={handleSubmit}>Sumbmit</button>
        </>
    )
};
export default Profilepage;