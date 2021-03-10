import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link, Redirect,Route } from "react-router-dom";

function Contact(){
    
    return(
<div id="contact" className="footer">

<div className="footer-contact-quote">
    
    <div className="footer-query">
        <h2><b>FOR ANY QUERIES:</b></h2>
        <h5><b><CallIcon/>: 1423569874 , 5874698224</b></h5>
        <h5><b><EmailIcon/>: rotaractclub@iiitm.ac.in</b></h5>
        <h5><FacebookIcon/><b>:<a href={"https://www.facebook.com/rotaractor/"}> Rotaract-Facebook</a></b></h5>
        <h5><LinkedInIcon/><b>:<a href={"https://www.linkedin.com/company/rotary-international/"}> Rotaract-LinkedIn</a></b></h5>
        
    </div>

     <div  className="footer-quote">   
    <h1><b>"THEY  NEED  YOU 🤝"</b></h1>
    <h4><b>"DEVELOPED BY:<a href={"https://www.linkedin.com/in/prateek-verma-1763a6169/"}> PRATEEK VERMA"</a></b></h4>
    </div>

</div>

 
<h4 style={{textAlign:'center'}}><b>Copyright © 2021 ROTARACT CLUB,IIIT GWALIOR</b></h4>
    

</div>
   );
}

export default Contact;