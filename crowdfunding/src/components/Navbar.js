import React from "react";
import {Redirect} from "react-router-dom";
import "../AppStyle.css";
import {Link} from "react-scroll"
import { useHistory } from "react-router-dom";


function Navbar() {
  const history = useHistory();

  return (
    <div className="navbar-content">
    
      <img
        src={require("../images/logo.png").default}
        alt="logo"
        width="107px"
        height="112px"
        onClick={() => {
                        history.push({
                        pathname: '/',
                        state: {  // location state
                              },
                      }); 
                      }}
      />

      <div className="logo-text">
        <h2>ROTARACT CLUB</h2>
        <h3>ABV-IIITM</h3>
      </div>

      
        {/* <Link to="home" className="link" spy={true} smooth={true} activeClass="active" duration={1000}>Home</Link> */}
        {/* <Link to="about" className="link" spy={true} smooth={true} activeClass="active" duration={1000}>About</Link> */}
        <Link  className="link"  onClick={() => {
                                                          history.push({
                                                          pathname: '/AllCampaigns',
                                                          state: {  // location state
                                                                },
                                                         }); 
                                                         }}>CAMPAIGNS</Link>
        {/* <Link to="contact" className="link" spy={true} smooth={true} activeClass="active" duration={1000}>Contact</Link> */}
        <Link to="login" className="link" onClick={() => {
                                                          history.push({
                                                          pathname: '/login',
                                                          state: {  // location state
                                                                },
                                                         }); 
                                                         }}>LOGIN</Link>



        {/* <RedirectLink to="/cards" className="link">Cards</RedirectLink> */}
      
        
    </div>
  );
}

export default Navbar;
