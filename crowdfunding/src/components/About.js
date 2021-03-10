import React from "react";

function About() {
  return (
    <div id="about" className="about-content">
      
      <div className="about-text">
        <h1>Why us?</h1>
        <br/>
        LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>

      <div>
        <img className="about-img" src={require("../images/about-img.jpg").default} alt="logo"/>
      </div>


    </div>
  );
}

export default About;