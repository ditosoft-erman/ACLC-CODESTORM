import React from "react";
import NavBar from "../../components/navBar/navBar";
import "./landingPage.css";
import {
  rectangle1,
  rectangle2,
  rectangle3,
  rectangle4,
} from "../../assets/img/img";

function landingPage() {
  return (
    <>
      <main>
        <div>
          <NavBar />
        </div>
        <div className="main-container">
          <div className="left-section">
            <div className="top-l-sec">
              <img src={rectangle1} alt="rectangle1" />
            </div>
            <div className="farmer-prof">
              <img src="" alt="farmer prof" />
            </div>
            <div className="farm-num">
              
            </div>
            <div className="mid-l-sec">mid</div>
            <div className="bot-l-sec">
              <div className="rectangle2">
                <img src={rectangle2} alt="" />
              </div>
              <div className="rectangle3">
                <img src={rectangle3} alt="" />
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="right-img">right</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default landingPage;
