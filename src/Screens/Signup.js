import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export default function Signup(props) {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [section, setSection] = useState("A");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [classYear, setClassYear] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  async function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm password must match!");
      return;
    }
    try {
      await axios
        .post("http://127.0.0.1:8000/signup", {
          name,
          userid,
          password,
          confirmPassword,
          branch,
          classYear,
          section,
          phoneNumber,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "added") {
            const userData = {
              userid: userid,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            history("/home");
          } else if (res.data === "already exist") {
            alert("Teacher already exist for class. Login please!");
            history("/");
          } else if (res.data === "not exist with error") {
            alert("try again!!!");
            history("/signup");
          }
        });
    } catch (error) {
      alert("Error occurred!!");
      console.log(error);
    }
  }
  const nav = () => {
    history("/");
  };
  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group my-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control name"
                id="name"
                aria-describedby="name"
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="userid">User Id</label>
              <input
                type="text"
                className="form-control"
                id="userid"
                aria-describedby="userid"
                placeholder="Enter User Id"
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="userPassword"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form>
            <div>
              <label htmlFor="branch">Select Branch</label>
              <select
                className="form-control my-3"
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                value={branch}>
                <option disabled>Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSM">CSM</option>
                <option value="CSD">CSD</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div>
              <label htmlFor="classYear">Select Class Year</label>
              <select
                className="form-control my-3"
                onChange={(e) => {
                  setClassYear(e.target.value);
                }}
                value={classYear}>
                <option disabled>Select Class Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label htmlFor="section">Select Section</label>
              <select
                className="form-control my-3"
                onChange={(e) => {
                  setSection(e.target.value);
                }}
                value={section}>
                <option>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>
            <div className="form-group my-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="phoneNumber"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleSignUp}>
                    Submit
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary" onClick={nav}>
                    Login Page
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
