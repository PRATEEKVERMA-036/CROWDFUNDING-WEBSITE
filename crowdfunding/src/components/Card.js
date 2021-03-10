import React,{useEffect,useState} from "react";
import { useLocation,useHistory} from 'react-router-dom';
import axios from "axios";

function Card() {
// const {title,content,amount} = props;
// useEffect(()=>{
//     console.log(title,content,amount)
// },[title,content,amount])

const history = useHistory();
const location = useLocation();

const [donorInfo,setDonorInfo]=useState({});


useEffect(()=>{

  //identification data of clicked campaign
  let info={
    title:location.state.title,
    content:location.state.content
  }

  axios
  .post("http://localhost:4000/donorinfo", info)
  .then((res) => {setDonorInfo(res.data)})
  .catch((error) => console.log(error));

},[]);

// console.log("donorinfo:",donorInfo.donor);
// if(donorInfo && donorInfo.donor)
// console.log("donorinfo:",donorInfo.donor[2].donatedmoney);
// donorInfo.donor.forEach(element => {
//   console.log(element.donatedmoney);
// });

function message(){
  alert("This campaigns is closed because either it is complete or due to some emergency");
  console.log("CLOSED");
}


//for scroll page to top 
useEffect(() => {
  window.scrollTo(0, 0)
}, [])


  return (
    <div className="Card-page">
      {/* PROGRESS BAR */}

      <h2 style={{margin:"1% 0% -1% 40%"}}><b>DONATION PROGRESS BAR</b></h2>
      <section className="progress-bar">
        <div class="progress" style={{ height: "70px" }}>
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: ((donorInfo)?(donorInfo.donation)/(donorInfo.amount)*100:0)+"%" }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
          <h5>
          {/*percentage of progress in bar*/}         
          {(donorInfo && (donorInfo.donation>0))?((donorInfo.donation)/(donorInfo.amount)*100).toFixed(2)+"%"+" [ Rs."+donorInfo.donation+" ]":"0%"}
          {/* {(donorInfo)?Number(Number(donorInfo.donation)/Number(donorInfo.amount))*100:0}%   */}
          </h5>
          </div>
        </div>
      </section>

      {/* NEEDY PERSON INFORMATION CONTAINER */}
      <section>
        <div id="cards" className="twocolor-card card-content">
          <img
            className="card-img"
            src={require("../images/about-img.jpg").default}
            alt="logo"
          />

          <div>
            <div className="card-info">
              <h1>
                <b>{location.state.title}</b>
              </h1>
              
              <h4>
              {location.state.content}
              </h4>
            </div>

            <div className="card-amount-button">
              <div className="card-amount">
                <h2><b>REQUIRED AMOUNT:Rs.{location.state.amount}</b></h2>
              </div>

              <br />
              
              {/* <div className="card-amount">
                <h2><b></b></h2>
              </div> */}


              <button type="button" class="btn btn-success btn-lg"
              onClick={() => {
                   
                   history.push({
                   pathname: '/',
                   state: {  // location state
                   },
                   }); 
                   }}
              >
                BACK
              </button>
              
              
              {console.log("buttonstatus",donorInfo.buttonStatus)}
              
              <button type="button" class="btn btn-success btn-lg"
               
              //  {(donorInfo && (donorInfo.amount===donorInfo.donation))?disabled={true}:disabled={false}}
              disabled={((donorInfo && (donorInfo.donation>=donorInfo.amount)) || donorInfo.buttonStatus)?true:false}
               onClick={() => {
                   
                   history.push({
                   pathname: '/paymentform',
                   state: {  // location state
                     title:location.state.title,
                    content:location.state.content
                   },
                   }); 
                   }}
              >
                DONATE NOW
              </button>
            </div>
          </div>

          {((donorInfo && (donorInfo.donation>=donorInfo.amount)) || donorInfo.buttonStatus)?console.log(alert("This campaign is either fulfilled or stopped due to some reasons")):console.log()}


        </div>
      </section>

      {/* {donorInfo.donor.map((info) =>(
        <h1>{info.id}</h1>
        
      )) } */}


      {/* PROUD DONORS LIST */}
      <section className="card-donorlist">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" colspan="2">
                PROUD DONORS TRANSACTION ID
              </th>
              <th scope="col">AMOUNT(Rs.)</th>
              <th scope="col">TRANSACTION STATUS</th>
            </tr>
          </thead>

         {console.log("donor info",donorInfo)}
        {(donorInfo && donorInfo.donor )?
        (

          donorInfo.donor.map((info,index)=>(
          <tbody>
            <tr>
              <th scope="row">{index+1}</th>
              <td colspan="2">{info.id}</td>
              {/* <td colspan="2">{(info.id).slice(0,((info.id).length-4))+"xxxx"}</td> */}
              <td>{info.donatedmoney}</td>
              <td>{info.status}</td>
            </tr>
            {/* <tr>
              <th scope="row">2</th>
              <td colspan="3">Shyam Singh</td>
              <td>2000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="3">Arnav Rathore</td>
              <td>3000</td>
            </tr> */}
          </tbody>
          ))

        ):<></>}


        </table>
      </section>
    </div>
  );
}

export default Card;
// import React from "react";

// function Card() {
//   return (
//     <div>
//       {/* PROGRESS BAR */}

//       <h3 style={{margin:"1% 0% 0% 40%"}}><b>DONATION PROGRESS BAR</b></h3>
//       <section className="progress-bar">
//         <div class="progress" style={{ height: "70px" }}>
//           <div
//             class="progress-bar"
//             role="progressbar"
//             style={{ width: "55%" }}
//             aria-valuenow="25"
//             aria-valuemin="0"
//             aria-valuemax="100"
//           >
//             55%
//           </div>
//         </div>
//       </section>

//       {/* NEEDY PERSON INFORMATION CONTAINER */}
//       <section>
//         <div id="cards" className="twocolor-card card-content">
//           <img
//             className="card-img"
//             src={require("../images/about-img.jpg").default}
//             alt="logo"
//           />

//           <div>
//             <div className="card-info">
//               <h1>
//                 <b>HELP DAULAT RAM</b>
//               </h1>
//               LoreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//               do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad aliquip ex ea commodo consequat. Duis aute irure dolor in
//             </div>

//             <div className="card-content ">
//               <div className="card-amount">
//                 <b>REQUIRED AMOUNT</b>
//                 <br />
//                 <b>Rs.15000</b>
//               </div>

//               <button type="button" class="btn btn-success btn-lg">
//                 BACK
//               </button>

//               <button type="button" class="btn btn-success btn-lg">
//                 DONATE NOW
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* PROUD DONORS LIST */}
//       <section className="card-donorlist">
//         <table class="table table-hover table-dark">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col" colspan="3">
//                 PROUD DONORS
//               </th>
//               <th scope="col">Amount(Rs.)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td colspan="3">Ram verma</td>
//               <td>1000</td>
//             </tr>
//             <tr>
//               <th scope="row">2</th>
//               <td colspan="3">Shyam Singh</td>
//               <td>2000</td>
//             </tr>
//             <tr>
//               <th scope="row">3</th>
//               <td colspan="3">Arnav Rathore</td>
//               <td>3000</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }

// export default Card;
