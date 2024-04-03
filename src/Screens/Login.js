import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {
  const history = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const nav = () => {
    history("/signup");
  };
  const scan = () => {
    history("/scan");
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/login", {
          userid,
          password,
        })
        .then((res) => {
          if (res.data === "not exist") {
            alert("User has not registered");
          } else if (res.data === "not exist with error") {
            alert("Error occured while login");
          } else if (res.data != null) {
            const userData = {
              userid: res.data.userid,
              classYear: res.data.classYear,
              section: res.data.section,
              branch: res.data.branch
            };
            localStorage.setItem("user", JSON.stringify(userData));
            history("/home");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container my-5" id="login">
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="userid">User Id</label>
          <input
            type="text"
            className="form-control"
            id="userid"
            aria-describedby="userid"
            placeholder="Enter User Id"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
        <button className="btn btn-warning mx-2" onClick={nav}>
          SignUp
        </button>
        <button className="btn btn-primary my-3 mx-2" onClick={scan}>
          Scan ID card
        </button>
      </form>
    </div>
  );
}
