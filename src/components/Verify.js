import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Verify.css";
// import Card from "../components/Card";
import Pass from "./Pass";

export const Verify = () => {
  const history = useNavigate();
  const [rollno, setRollno] = useState("");
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);

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

  const handleVerification = async (e) => {
    e.preventDefault();
    // for (let index = 0; index < passes.length; index++) {
    //   const element = passes[index];
    //   if (element.rollno === rollno) {
    //     alert("Valid Pass");
    //     return;
    //   }
    // }
    // alert("No passes Generated!!");
    // return;
    try {
      await axios
        .post("http://127.0.0.1:8000/verifyPass", {
          rollno,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "valid") {
            alert("Valid");
          } else if (res.data === "invalid") {
            alert("Invalid");
          }
        })
        .catch((e) => {
          alert("error");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  async function getAllPasses(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://127.0.0.1:8000/getPasses", {
          userid: user.userid,
        })
        .then((res) => {
          if (res.data !== null) {
            setPasses(res.data);
            console.log(res.data);
            if (res.data.length === 0) {
              alert("No Passes generated!!!!");
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

  return (
    <div className="container my-5 mx-15 ">
      <div className="container my-5 mx-20" id="verify">
        <form>
          <div className="form-group my-1">
            <p>Enter Student rollno to check manually</p>
            <label htmlFor="rollno">Roll Number</label>
            <input
              type="text"
              className="form-control my-3 "
              id="rollno"
              aria-describedby="rollno"
              placeholder="Enter Roll Number"
              onChange={(e) => {
                setRollno(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary mx-3" onClick={handleVerification}>
            Submit
          </button>
        </form>
      </div>
      {passes.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <button className="btn btn-success" onClick={getAllPasses}>
            Click to view passes
          </button>
        </div>
      )}
      <div className="container mx-3">
        <div className="row my-1">
          {passes.length !== 0 &&
            passes.map((item) => (
              <div className="col-md-4 my-2">
                <Pass rollno={item.rollno} reason={item.reason} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
