import { useReducer, useState } from "react";
import "./Components/Style.css";

const App = () => {
  const initialState = {
    username: "",
    lastname: "",
    age: "",
    city: "",
    pincode: ""
  };

  const [Data, setData] = useState(initialState);
  const [users, dispatch] = useReducer(reducer, []);

  function reducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "REMOVE":
        return state.filter((user) => user.age !== action.payload);
      default:
        return state;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (
      Data.username.trim() !== "" &&
      Data.lastname.trim() !== "" &&
      Data.age.trim() !== "" &&
      Data.city.trim() !== "" &&
      Data.pincode.trim() !== ""
    ) {
      dispatch({ type: "ADD", payload: Data });
      setData(initialState);
    }
  };

  return (
    <>
      <div className="form">
        <h1>Login Form</h1>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="UserName"
          value={Data.username}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="lastname"
          placeholder="LastName"
          value={Data.lastname}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="age"
          placeholder="Age"
          value={Data.age}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="city"
          placeholder="City"
          value={Data.city}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={Data.pincode}
          onChange={handleChange}
        />
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {users.map((user, index) => (
        <div key={index}>
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>City</th>
                <th>Pincode</th>
              </tr>
              <tr>
                <td>{user.username}</td>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>{user.pincode}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="button"
            onClick={() => dispatch({ type: "REMOVE", payload: user.age })}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default App;
