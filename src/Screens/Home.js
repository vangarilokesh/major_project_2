import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Form, useNavigate } from "react-router-dom";

export default function Home() {
  const history = useNavigate();
  const [allStudents, setAllStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [rollno, setRollno] = useState("");
  const [studentSearch, setstudentSearch] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      alert("Login first!!");
      history("/");
    }
  }, []);

  async function getAllStudents(e) {
    try {
      await axios
        .post("http://127.0.0.1:8000/getClass", {
          userid: user.userid,
        })
        .then((res) => {
          if (res.data !== null) {
            setAllStudents(res.data);
            if (res.data.length === 0) {
              alert("No stundents are added yet!!!!");
            }
            // console.log(res.data);
          } else {
            alert("failed to load");
          }
        })
        .catch((e) => {
          alert("error");
        });
    } catch (e) {
      console.log(e);
    }
  }

  function getStudent(e) {
    e.preventDefault();
    for (let index = 0; index < allStudents.length; index++) {
      const element = allStudents[index];
      if (rollno === element.rollno) {
        setstudentSearch(element);
        break;
      }
    }
  }

  return (
    <div className="container my-3">
      <h1 style={{ fontFamily: "fantasy" }}>Home</h1>
      {allStudents.length === 0 && <h4>Click here to get students list</h4>}
      {allStudents.length !== 0 && (
        <>
          <div className="container my-5">
            <form className="d-flex">
              {/* <label htmlFor="search" className="me-2">
                Search
              </label> */}
              <input
                type="text"
                className="form-control me-3"
                id="search"
                placeholder="Search By Roll Number"
                style={{ maxWidth: "25%", height: "40px" }}
                value={rollno}
                onChange={(e) => {
                  setRollno(e.target.value);
                  console.log(rollno);
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={getStudent}
                style={{ height: "40px" }}>
                Get Student
              </button>
            </form>
            <div className="container mx-3 my-4">
              {studentSearch !== null &&
                rollno !== "" &&
                rollno === studentSearch.rollno && (
                  <>
                    <div className="col-md-4 my-3">
                      <Card
                        name={studentSearch.name}
                        rollno={studentSearch.rollno}
                      />
                    </div>
                  </>
                )}
            </div>
          </div>
        </>
      )}
      {allStudents.length !== 0 && (
        <h4>Select student for pass generation: </h4>
      )}
      {allStudents.length === 0 && (
        <button className="btn btn-success" onClick={getAllStudents}>
          Click
        </button>
      )}
      <div className="container mx-3">
        <div className="row my-3">
          {allStudents.length !== 0 &&
            allStudents.map((student, index) => (
              <div className="col-md-4 my-3" key={index}>
                <Card name={student.name} rollno={student.rollno} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
