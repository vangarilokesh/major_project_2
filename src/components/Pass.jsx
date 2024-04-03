// import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./Pass.css";
import "react-datepicker/dist/react-datepicker.css";

export default function Pass(props) {
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/deletePass", {
        rollno: props.rollno,
      });

      if (response.status === 200) {
        console.log("Deletion successful.");
        window.location.reload();
      } else {
        console.error("Unexpected status code:", response.status);
        alert("Error occurred!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred!!");
    }
  }
  return (
    <div className="col-md-8 mb-5">
      {localStorage.getItem("user") !== null && (
        <div id="outPassCard" className="card">
          <div className="card-body">
            <h5 className="card-title">Roll Number: {props.rollno}</h5>
            <p className="card-text">Reason: {props.reason} </p>
            <button className="btn my-1 mx-3" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
