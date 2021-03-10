import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { notes } from "./Admin";
// import data from "../data";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Campaigns(props) {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin")
      .then((res) => {
        // setTimeout(() => {
        setData(res.data);

        // },1000)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="Carousel">


      <section>

      <h1 className="campaigns-heading" style={{ margin: "1% 0% .5% 4%" }}>
        <b>ONGOING CAMPAIGNS</b>
      </h1>

      <Link to="/AllCampaigns" className="link">
          <button type="button" class="btn btn-success btn-lg">
            MORE CAMPAIGNS
          </button>
      </Link>

      </section>

      <div id="campaigns" style={{ backgroundColor: "grey" }}>
        <div id="testimonial-carousal" class="carousel slide" data-ride="false">
          <div class="carousel-inner">
            {/* since carousel should have altleast one slide having class:active,that why i made this otherwise each slide would have class:active which will create blunder */}
            <div class="carousel-item active">
              <h1 className="campaign-firstslide">
                <b>BE A PROUD DONOR</b>
              </h1>
            </div>

            {/* here we are inserting data from data.js into each carousel slide */}
            {data.map((info, index) => (
              <div class="carousel-item">
                <div
                  id="campaigns"
                  className="twocolor-campaign campaign-content"
                >
                  <img
                    className="campaign-img"
                    src={require("../images/about-img.jpg").default}
                    alt="logo"
                  />

                  <div>
                    <div className="campaign-info">
                      <h3>
                        <b>{info.title}</b>
                      </h3>

                      <p>{(info.content).slice(0,150)}</p>
                    </div>

                    <div className="campaign-amount-button ">
                      <div className="campaign-amount">
                        <b>REQUIRED AMOUNT:Rs.{info.amount}</b>
                      </div>

                      <button
                        type="button"
                        class="btn btn-success btn-lg"
                        onClick={() => {
                          history.push({
                            pathname: "/card",
                            state: {
                              // location state
                              title: info.title,
                              content: info.content,
                              amount: info.amount,
                            },
                          });
                        }}
                      >
                        DONATE NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            class="carousel-control-prev"
            href={"#testimonial-carousal"}
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </a>

          <a
            class="carousel-control-next"
            href={"#testimonial-carousal"}
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;

// import React from "react";

// function Campaigns(props) {
//   return (
//       <div style={{backgroundColor:"grey"}}>

//       <h1 className="campaigns-heading"><b>ONGOING CAMPAIGNS</b></h1>

// <div id="testimonial-carousal" class="carousel slide" data-ride="false">
//   <div class="carousel-inner">

//     <div class="carousel-item active"  >

//     <div id="campaigns" className="twocolor campaign-content">

//        <img
//           className="campaign-img"
//           src={require("../images/about-img.jpg").default}
//           alt="logo"
//         />

//         <div>
//           <div className="campaign-info">
//             <b>HELP DAULAT RAM</b>
//             <br />
//             LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//             aliquip ex ea commodo consequat. Duis aute irure dolor in

//           </div>

//           <div className="campaign-content ">
//             <div className="campaign-amount">
//               <b>REQUIRED AMOUNT</b>
//               <br />
//               <b>Rs.15000</b>
//             </div>

//             <button type="button" class="btn btn-success btn-lg">DONATE NOW</button>
//           </div>
//         </div>
//   </div>

//     </div>

//     <div class="carousel-item"  >

//     <div id="campaigns" className="twocolor campaign-content">

//        <img
//           className="campaign-img"
//           src={require("../images/about-img.jpg").default}
//           alt="logo"
//         />

//         <div>
//           <div className="campaign-info">
//             <b>HELP DAULAT RAM</b>
//             <br />
//             LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//             aliquip ex ea commodo consequat. Duis aute irure dolor in

//           </div>

//           <div className="campaign-content ">
//             <div className="campaign-amount">
//               <b>REQUIRED AMOUNT</b>
//               <br />
//               <b>Rs.15000</b>
//             </div>

//             <button type="button" class="btn btn-success btn-lg">DONATE NOW</button>
//           </div>
//         </div>
//   </div>

//     </div>

//     <div class="carousel-item"  >

//     <div id="campaigns" className="twocolor campaign-content">

//        <img
//           className="campaign-img"
//           src={require("../images/about-img.jpg").default}
//           alt="logo"
//         />

//         <div>
//           <div className="campaign-info">
//             <b>HELP DAULAT RAM</b>
//             <br />
//             LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//             aliquip ex ea commodo consequat. Duis aute irure dolor in

//           </div>

//           <div className="campaign-content ">
//             <div className="campaign-amount">
//               <b>REQUIRED AMOUNT</b>
//               <br />
//               <b>Rs.15000</b>
//             </div>

//             <button type="button" class="btn btn-success btn-lg">DONATE NOW</button>
//           </div>
//         </div>
//   </div>

//     </div>

//   </div>

//   <a class="carousel-control-prev" href={"#testimonial-carousal"} role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon"></span>

//   </a>

//   <a class="carousel-control-next" href={"#testimonial-carousal"} role="button" data-slide="next">
//     <span class="carousel-control-next-icon"></span>

//   </a>

// </div>

//       </div>

//         );
//       }

//       export default Campaigns;

// <div id="campaigns" className="twocolor campaign-content">

//      <img
//         className="campaign-img"
//         src={require("../images/about-img.jpg").default}
//         alt="logo"
//       />

//       <div>
//         <div className="campaign-info">
//           <b>HELP DAULAT RAM</b>
//           <br />
//           LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           aliquip ex ea commodo consequat. Duis aute irure dolor in

//         </div>

//         <div className="campaign-content ">
//           <div className="campaign-amount">
//             <b>REQUIRED AMOUNT</b>
//             <br />
//             <b>Rs.15000</b>
//           </div>

//           <button type="button" class="btn btn-success btn-lg">DONATE NOW</button>
//         </div>
//       </div>
// </div>
