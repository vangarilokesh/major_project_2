import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Screens/Login";
import Navbar from "./components/NavBar";
import SignUp from "./Screens/Signup";
import Home from "./Screens/Home";
// import QRCodeGenerator from "./components/QRCodeGenerator";
import AddStudent from "./Screens/AddStudent";
import { Verify } from "./components/Verify";
import Scan from "./Screens/Scan";
function App() {
  return (
    <>
      <Router>
        <Navbar title={"Pass Generator"} />
        <Routes>
          <Route exact path="/" element={<Login />} ></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          {/* <Route exact path="/generatePass/:rollno" element={<QRCodeGenerator userLoggedIn={userLoggedIn}/>}></Route> */}
          <Route exact path="/addStudent" element={<AddStudent />}></Route>
          <Route exact path="/scan" element={<Scan></Scan>}></Route>
          <Route exact path="/verify" element={<Verify />}></Route>
          <Route exact path="/scan" element={<Scan />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;