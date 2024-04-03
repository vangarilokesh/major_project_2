import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function QRCodeGenerator() {
  const { rollno } = useParams();
  const [qrData, setQRData] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const generateQRCode = (e) => {
    e.preventDefault();
    setQRData(rollno);
  };

  const [oneDayPermission, setOneDayPermission] = useState(false);
  const handleOneDayPermission = () => {
    setOneDayPermission(!oneDayPermission);
    console.log(oneDayPermission);
  };

  return (
    <div className="container my-3">
      <h1 style={{ fontFamily: "fantasy" }}>Generate QR Code</h1>
      <form>
        <div className="mb-3 form-check my-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="parentsConfirmation"
          />
          <label className="form-check-label" htmlFor="parentsConfirmation">
            Parents permission
          </label>
        </div>
        <select
          className="form-select my-3"
          aria-label="Default select example"
        >
          <option disabled={true}>Select the reason</option>
          <option value="1">Health Issue</option>
          <option value="2">Function</option>
          <option value="3">Government related work</option>
          <option value="3">Religious Rituals</option>
          <option value="3">Lunch</option>
        </select>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="oneDayPermission"
            onChange={handleOneDayPermission}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check if its more than one day permission
          </label>
        </div>
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
              />
            </div>
          </>
        )}
        <button className="btn btn-primary" onClick={generateQRCode}>
          Generate QR Code
        </button>
      </form>
      {qrData && (
        <div className="mt-3">
          <h2>QR Code:</h2>
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  );
}
