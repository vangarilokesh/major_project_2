import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddStudent.css";
import { useNavigate, Link } from "react-router-dom";

export default function AddStudent(props) {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [userid, setUserid] = useState(null);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [section, setSection] = useState("A");
  const [classYear, setClassYear] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setUserid(foundUser.userid);
    } else {
      alert("Login first!!");
      history("/");
    }
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    console.log("Adding student");
    try {
      await axios
        .post("http://127.0.0.1:8000/addStudent", {
          userid,
          name,
          rollno,
          classYear,
          phoneNumber,
          branch,
          section,
        })
        // need to change
        .then((res) => {
          console.log(res);
          if (res.data === "Can't add other class student") {
            alert("Can't add other class student");
          } else if (res.data === "already exist") {
            alert("Student already exist in class!");
            history("/home");
          } else if (res.data === "added") {
            alert("Added Student!!");
            history("/home");
          } else if (res.data === "not exist with error") {
            alert("Error while adding!!!!!");
          }
        });
    } catch (error) {
      alert("Error occurred!!");
      console.log(error);
    }
  }

  return (
    <div className="container my-5">
      <div className="container mx-3 my-2">
        {user != null && (
          <p>
            Teacher Deatils {user.branch} --- {user.classYear} --- {user.section}
          </p>
        )}
      </div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rollno">Roll Number</label>
              <input
                type="text"
                className="form-control"
                id="rollno"
                placeholder="Enter Roll Number"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="classYear">Class Year</label>
              <input
                type="text"
                className="form-control"
                id="classYear"
                placeholder="Class Year"
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label htmlFor="branch">Select Branch</label>
              <select
                className="form-control"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                defaultValue="CSE">
                <option disabled>Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSM">CSM</option>
                <option value="CSD">CSD</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="section">Select Section</label>
              <select
                className="form-control"
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                defaultValue="A">
                <option disabled value="Lokesh">
                  Select Section
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Student
        </button>
      </div>
    </div>
  );
}
