import React from "react";
import About from "./About";
import Campaigns from "./Campaigns";
import Contact from "./Contact";
import { Link } from "react-scroll";
import "../AppStyle.css";

function Home() {
  return (
    <div id="home">
      <div className="home-content">
        ROTARACT IIITM
        <br></br>
        You Bestow,We Deliver
        <br></br>
        <Link
          to="campaigns"
          className="link"
          spy={true}
          smooth={true}
          activeClass="active"
          duration={1000}
        >
          <button type="button" class="btn btn-success btn-lg">
            DONATE NOW
          </button>
        </Link>
      </div>

      <About />

      <Campaigns />

      <Contact />
    </div>
  );
}

export default Home;
