// import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";
// import QRCode from "qrcode.react";
// import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Card(props) {
  // const history = useNavigate();
  // const [qrData, setQRData] = useState("");
  const [parentPermission, setParentPermission] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [reason, setReason] = useState("");

  // const generatePass = (e) => {
  //   e.preventDefault();
  //   setQRData(props.rollno);
  // };

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/delete", {
        rollno: props.rollno,
      });

      // Check if deletion was successful
      if (response.status === 200) {
        // Deletion successful, perform any necessary actions here
        console.log("Deletion successful.");
        window.location.reload();
      } else {
        // Handle unexpected status code
        console.error("Unexpected status code:", response.status);
        alert("Error occurred!!");
      }
    } catch (error) {
      // Handle network error or other unexpected errors
      console.error("Error:", error);
      alert("Error occurred!!");
    }
  }

  async function generatePass(e) {
    e.preventDefault();
    let currentTime = new Date();
    if (parentPermission.length === 0 || reason.length === 0) {
      alert("Fill form properly, check parent's permision and reason!");
      return;
    }
    if (
      (startDate === null && endDate !== null) ||
      (startDate !== null && endDate === null) ||
      startDate > endDate
    ) {
      alert("Check dates");
      return;
    }
    if (startDate == null && endDate == null) {
      setStartDate(currentTime);
      setEndDate(currentTime);
    }
    console.log("Adding student");
    try {
      await axios
        .post("http://127.0.0.1:8000/generatePass", {
          rollno: props.rollno,
          reason: reason,
          startDate,
          endDate,
        })
        .then((res) => {
          if (res.data === "added") {
            alert("Pass Generated successfully!!!");
            setClicked(false);
          } else if (res.data === "already exists") {
            alert("Already exists");
            setClicked(false);
          } else if (res.data === "error") {
            alert("error in generating the permission");
          }
        });
    } catch (error) {
      alert("Error occurred!!");
      console.log(error);
    }
  }

  const handleSelect = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  useEffect(() => {
    setOneDayPermission(false);
  }, [clicked]);

  const [oneDayPermission, setOneDayPermission] = useState(false);
  const handleOneDayPermission = () => {
    setOneDayPermission(!oneDayPermission);
    console.log(oneDayPermission);
  };

  return (
    // <div className="col-md-8 mb-4">
    //   {localStorage.getItem("user") !== null && (
    //     <div className="card">
    //       <div className="card-body">
    //         <h5 className="card-title">{props.name}</h5>
    //         <p className="card-text">Roll Number: {props.rollno}</p>
    //         <button
    //           className="btn btn-primary my-3 mx-3"
    //           onClick={handleSelect}
    //         >
    //           Select
    //         </button>

    //         {clicked && (
    //           <div className="container my-3">
    //             <h1 style={{ fontFamily: "fantasy" }}>
    //               Generate Pass for Student
    //             </h1>
    //             <form>
    //               <div className="mb-3 form-check my-3">
    //                 <input
    //                   type="checkbox"
    //                   className="form-check-input"
    //                   id="parentsConfirmation"
    //                   onChange={(e)=>{e.preventDefault();setParentPermission("Done");}}
    //                 />
    //                 <label
    //                   className="form-check-label"
    //                   id="reason"
    //                   htmlFor="parentsConfirmation"
    //                 >
    //                   Parents permission
    //                 </label>
    //               </div>
    //               <select
    //                 className="form-select my-3"
    //                 onChange={(e)=>{setReason(e.target.value);}}
    //                 value={reason}
    //                 id="reason"
    //               >
    //                 <option value="">Select the reason</option>
    //                 <option value="Health Issue">Health Issue</option>
    //                 <option value="Function">Function</option>
    //                 <option value="Government realated work">Government related work</option>
    //                 <option value="Religious Rituals">Religious Rituals</option>
    //                 <option value="Lunch">Lunch</option>
    //               </select>
    //               <div className="mb-3 form-check">
    //                 <input
    //                   type="checkbox"
    //                   className="form-check-input"
    //                   id="oneDayPermission"
    //                   onChange={handleOneDayPermission}
    //                 />
    //                 <label
    //                   className="form-check-label"
    //                   htmlFor="oneDayPermission"
    //                 >
    //                   Check if it's more than one day permission
    //                 </label>
    //               </div>
    //               {oneDayPermission && (
    //                 <>
    //                   <div className="mb-3">
    //                     <label htmlFor="startDate" className="form-label">
    //                       Start Date
    //                     </label>
    //                     <DatePicker
    //                       selected={startDate}
    //                       onChange={(date) => setStartDate(date)}
    //                       dateFormat="dd/MM/yyyy"
    //                       isClearable
    //                       className="form-control"
    //                     />
    //                   </div>
    //                   <div className="mb-3">
    //                     <label htmlFor="endDate" className="form-label">
    //                       End Date
    //                     </label>
    //                     <DatePicker
    //                       selected={endDate}
    //                       onChange={(date) => setEndDate(date)}
    //                       dateFormat="dd/MM/yyyy"
    //                       isClearable
    //                       className="form-control"
    //                     />
    //                   </div>
    //                 </>
    //               )}
    //               <button className="btn btn-primary" onClick={generatePass}>
    //                 Generate Pass
    //               </button>
    //             </form>
    //             {/* {qrData && (
    //               <div className="mt-3">
    //                 <h2>QR Code:</h2>
    //                 <QRCode value={qrData} />
    //               </div>
    //             )} */}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="col-md-8 mb-5">
      {/* Check if user is logged in */}
      {localStorage.getItem("user") !== null && (
        <div className="card">
          <div className="card-body">
            {/* Display student information */}
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">Roll Number: {props.rollno}</p>
            {/* Button to trigger form display */}
            <button
              className="btn btn-primary my-1 mx-3"
              onClick={handleSelect}>
              Select
            </button>
            <button
              className="btn btn-warning my-1 mx-3"
              onClick={handleDelete}>
              Delete
            </button>

            {/* Display form when button is clicked */}
            {clicked && (
              <div className="container my-2">
                <p className="heading" style={{ fontFamily: "fantasy" }}>
                  Generate Pass for Student
                </p>
                {/* Form for generating pass */}
                <form>
                  <div className="mb-3 form-check my-1">
                    {/* Checkbox for parent confirmation */}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="parentsConfirmation"
                      onChange={(e) => {
                        e.preventDefault();
                        setParentPermission("Done");
                      }}
                    />
                    <label
                      className="form-check-label"
                      id="reason"
                      htmlFor="parentsConfirmation">
                      Parents permission
                    </label>
                  </div>
                  {/* Dropdown for selecting reason */}
                  <select
                    className="form-select my-3"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    value={reason}
                    id="reason">
                    <option value="">Select the reason</option>
                    <option value="Health Issue">Health Issue</option>
                    <option value="Function">Function</option>
                    <option value="Government realated work">
                      Government related work
                    </option>
                    <option value="Religious Rituals">Religious Rituals</option>
                    <option value="Lunch">Lunch</option>
                  </select>
                  <div className="mb-3 form-check">
                    {/* Checkbox for one day permission */}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="oneDayPermission"
                      onChange={handleOneDayPermission}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="oneDayPermission">
                      Check if it's more than one day permission
                    </label>
                  </div>
                  {/* Date inputs for start and end date */}
                  {oneDayPermission && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">
                          Start Date
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                          isClearable
                          className="form-control"
                          id="startDate"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">
                          End Date
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          dateFormat="dd/MM/yyyy"
                          isClearable
                          className="form-control"
                          id="endDate"
                        />
                      </div>
                    </>
                  )}
                  {/* Button for generating pass */}
                  <button
                    className="btn btn-primary"
                    id="generatePassButton"
                    onClick={generatePass}>
                    Generate Pass
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
