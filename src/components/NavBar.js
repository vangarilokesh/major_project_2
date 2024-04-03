// import React, { useState } from "react";
import { React, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function Navbar(props) {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  // let name = null;

  function load() {
    console.log("line 13");
    const loggedInUser = localStorage.getItem("user");
    console.log("line 15", loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // setUser(foundUser);
      console.log(foundUser);
      // if (localStorage.getItem("user") !== null) {
      //   name = localStorage.getItem("user").userid;
      // }
    } else {
      alert("Login first!!");
      navigate("/");
    }
    return true;
  }

  async function logout() {
    localStorage.clear();
    // setUser(null);
    navigate("/");
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-custom`}>
        <div className="container-fluid">
          <div className="navbar-brand mx-3">
            <Link
              className="nav-link active"
              aria-current="page"
              to={true ? "/home" : "/"}>
              {props.title}
            </Link>
          </div>
          {localStorage.getItem("user") != null && load() && (
            <div className="collapse navbar-collapse mx-3" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home" />
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addStudent" />

                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/addStudent">
                    Add Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/verify" />
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/verify">
                    Verify
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav">
                {/* {localStorage.getItem("user") !== null && (
                  <li>
                    `${user.classYear}/${user.branch}/${user.section}`
                  </li>
                )} */}
                {/* <li className="nav-item">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}>
                    Logout
                  </button>
                </li> */}
                {localStorage.getItem("user") !== null && (
                  <li className="nav-item">
                    <button className="btn btn-danger mx-2" onClick={logout}>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string,
};
