import React, { useState }  from "react";
import {useLocation,useHistory } from "react-router-dom";
import axios from "axios";

function UpdateCampaign() {
    const location = useLocation();
    const history = useHistory();


    const [newdata, setNewdata] = useState({
        title: "",
        content: "",
        // amount:""
      });
    

    

     function handleChange(event) {
        const { name, value } = event.target;
    
        setNewdata(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }
    
    function submitNote(event) {
          event.preventDefault();
        // props.onAdd(note);
      
        let notedata={
            olddata:location.state.olddata,
            newdata:newdata
          }


    axios
      .post("http://localhost:4000/updatecampaign", notedata)
      .then((res) => {})
      .catch((error) => console.log(error));


        setNewdata({
          title: "",
          content: "",
        //   amount:""
        })
        
       
        history.push({
            pathname: "/admin",
            state: {
              // location state
            },
          });


           // for automatic refreshing page
      window.location.reload();

    }
    

    return (
    <div className="UpdateCampaign">



<h2>ENTER UPDATED DATA</h2>
<form>
        <input
          name="title"
          onChange={handleChange}
          value={newdata.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={newdata.content}
          placeholder="Take a note..."
          rows="3"
        />

        {/* <input
          name="amount"
          onChange={handleChange}
          value={note.amount}
          placeholder="Amount"
        /> */}

        <button  onClick={submitNote}>Add</button>
      </form>


    </div>
)}

export default UpdateCampaign;