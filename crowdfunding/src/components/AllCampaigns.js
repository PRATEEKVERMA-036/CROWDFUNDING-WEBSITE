import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AllCampaigns() {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin")
      .then((res) => {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //cards data
  console.log(data);

  return (
    <div>
      <h1 className="AllCampaigns-Title">
        <b>CAMPAIGNS</b>
      </h1>

      <section className="AllCampaigns-Card">
        {data.map((info, index) => (
          <div
            id="campaigns"
            className="twocolor-campaign AllCampaigns-content"
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

                <p>{info.content}</p>
              </div>

              <div className="AllCampaigns-amount-button ">
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
        ))}
      </section>
    </div>
  );
}

export default AllCampaigns;
