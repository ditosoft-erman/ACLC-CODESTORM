import React from "react";
import "./navBar.css";

function navBar() {
  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="left-nav ">
            <div className="logo">logo</div>
            <div className="logo-name">E-Commerce</div>
          </div>
          <div className="right-nav">
            <div className="links">
              <div className="Home">Home</div>
              <div className="Shop">Shop</div>
              <div className="Appointment">Appointment</div>
              <div className="Contacts">Contacts</div>
            </div>
            <div>
              <div className="prof-pic">prof pic</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default navBar;
