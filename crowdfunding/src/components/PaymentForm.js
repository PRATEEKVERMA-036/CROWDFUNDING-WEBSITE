import React, { useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function PaymentForm() {

  const location = useLocation();


  // const [note, setNote] = useState({
  //   name: "",
  //   email: "",
  //   phone:"",
  //   amount:""
  // });

  // function handleChange(event) {
  //   const { name, value } = event.target;

  //   setNote(prevNote => {
  //     return {
  //       ...prevNote,
  //       [name]: value
  //     };
  //   });
  // }

  // function submitData(event) {
  //   event.preventDefault();
    
  //   note.title=location.state.title;
  //   note.content=location.state.content;

  //   axios
  //     .post("http://localhost:4000/paynow", note)
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
    
    
  //   setNote({
  //       name: "",
  //       email: "",
  //       phone:"",
  //       amount:""
  //   });
  // }

  return (
    <div>

      <h1 style={{ marginLeft: "39%"}}>DONATION FORM</h1>

      <form method="POST" action="http://localhost:4000/paynow">
        <input
          name="name"
          // onChange={handleChange}
          // value={note.name}
          placeholder="Name"
          type="text"
        />
        
        <input
          name="email"
          // onChange={handleChange}
          // value={note.email}
          placeholder="Email"
          type="text"
        />

        <input
          name="phone"
          // onChange={handleChange}
          // value={note.phone}
          placeholder="Phone"
          type="text"
        />

        <input
          name="amount"
          // onChange={handleChange}
          // value={note.amount}
          placeholder="Amount"
          type="text"
        />

        
        <input
          type="hidden"
          name="title"
          // onChange={handleChange}
          value={location.state.title}
          // placeholder="Amount"
          // type="text"
        />

        
        <input
          type="hidden"
          name="content"
          // onChange={handleChange}
          value={location.state.content}
          // placeholder="Amount"
          // type="text"
        />

        

        <button type="submit">Pay</button>
        {/* <button onClick={submitData}>Pay</button> */}
      </form>
    </div>
  );
}

export default PaymentForm;
