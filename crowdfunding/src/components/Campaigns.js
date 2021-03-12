import React,{useEffect,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import { notes } from "./Admin";
// import data from "../data";
import axios from "axios";


// import React, { Component } from "react";

// export default class Campaigns extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount=()=> {
//     axios
//       .get("http://localhost:4000/admin")
//       .then((res) => {
//         this.setState({ data: res.data });
//         console.log("response",res);
//       })
//       .catch((err) => console.log(err));
//   }

  
//   render() {
//   const {data}=this.state;
//     return (
//       <div>
//         <div className="Carousel">
//           <section>
//             <h1
//               className="campaigns-heading"
//               style={{ margin: "1% 0% .5% 4%" }}
//             >
//               <b>ONGOING CAMPAIGNS</b>
//             </h1>

//             <Link to="/AllCampaigns" className="link">
//               <button type="button" class="btn btn-success btn-lg">
//                 MORE CAMPAIGNS
//               </button>
//             </Link>
//           </section>

//           <div id="campaigns" style={{ backgroundColor: "grey" }}>
//             <div
//               id="testimonial-carousal"
//               class="carousel slide"
//               data-ride="false"
//             >
//               <div class="carousel-inner">
//                 {/* since carousel should have altleast one slide having class:active,that why i made this otherwise each slide would have class:active which will create blunder */}
//                 <div class="carousel-item active">
//                   <h1 className="campaign-firstslide">
//                     <b>BE A PROUD DONOR</b>
//                   </h1>
//                 </div>

//                 {/* here we are inserting data from data.js into each carousel slide */}
//                 {data.map((info) => (
//                   <div class="carousel-item">
//                     <div
//                       id="campaigns"
//                       className="twocolor-campaign campaign-content"
//                     >
//                       <img
//                         className="campaign-img"
//                         src={require("../images/about-img.jpg").default}
//                         alt="logo"
//                       />

//                       <div>
//                         <div className="campaign-info">
//                           <h3>
//                             <b>{info.title}</b>
//                           </h3>

//                           <p>{info.content.slice(0, 150)}</p>
//                         </div>

//                         <div className="campaign-amount-button ">
//                           <div className="campaign-amount">
//                             <b>REQUIRED AMOUNT:Rs.{info.amount}</b>
//                           </div>

//                           <button
//                             type="button"
//                             class="btn btn-success btn-lg"
//                             onClick={() => {
//                               this.props.history.push({
//                                 pathname: "/card",
//                                 state: {
//                                   // location state
//                                   title: info.title,
//                                   content: info.content,
//                                   amount: info.amount,
//                                 },
//                               });
//                             }}
//                           >
//                             DONATE NOW
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <a
//                 class="carousel-control-prev"
//                 href={"#testimonial-carousal"}
//                 role="button"
//                 data-slide="prev"
//               >
//                 <span class="carousel-control-prev-icon"></span>
//               </a>

//               <a
//                 class="carousel-control-next"
//                 href={"#testimonial-carousal"}
//                 role="button"
//                 data-slide="next"
//               >
//                 <span class="carousel-control-next-icon"></span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }












function Campaigns(props) {
  

  const [data, setData] = useState([]);
  const history = useHistory();

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
        {data.map((info)=> (

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

                    <p>{info.content.slice(0, 150)}</p>
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
