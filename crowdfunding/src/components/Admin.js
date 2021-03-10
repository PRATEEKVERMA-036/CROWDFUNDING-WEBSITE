import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import AdminCard from "./AdminCard";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Admin(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [newadmin, setNewadmin] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    if (typeof location.state === "undefined") {
      // console.log("if.location.state:", location.state.loggedInStatus);
      // setIsLoggedIn(false);
      var a = 0;
    } else {
      setIsLoggedIn(location.state.loggedInStatus);
      console.log("usestate:", isLoggedIn);
      console.log("location.state:", location.state.loggedInStatus);
    }
  }, []);

  function addNote(newNote) {
    axios
      .post("http://localhost:4000/admin", newNote)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

      // for automatic refreshing page
      window.location.reload();
  }

  function deleteNote(data) {
    //Adding one more key ie action="delete" to get know in backend that this note is to be deleted
    data.action = "delete";
    console.log(data);

    axios
      .post("http://localhost:4000/admin", data)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

       // for automatic refreshing page
      window.location.reload();
  }


  function UpdateNote(info) {
    history.push({
      pathname: '/updatecampaign',
      state: {  // location state
              olddata:info
             },
    });
  }

  function BlockNote(data) {
    
    axios
    .post("http://localhost:4000/blockcampaign", data)
    .then((res) => {})
    .catch((error) => console.log(error));

  
  }


  //updated data array
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

    // },);
  }, []);

  //cards data
  console.log(data);

  // console.log("outside function usestate:",isLoggedIn);

  // console.log("location.state:",location.state.loggedInStatus);


  //for deleting token
  const handleLogout = () => {
    localStorage.clear();
    
    
    history.push({
      pathname: '/login',
      state: {  // location state
             },
    });

  };

  function handleChange(event) {
    const { name, value } = event.target;

    setNewadmin((prevCredential) => {
      return {
        ...prevCredential,
        [name]: value,
      };
    });
  }

  function createNewAdmin(event){
    event.preventDefault();

    axios
      .post("http://localhost:4000/newadmin", newadmin)
      .then((res) => {})
      .catch((error) => console.log(error));

      setNewadmin({
        email: "",
        password: "",
      });

    }



   



  return (
    <div>

      <button type="button" class="btn btn-danger btn-lg adminLogout" onClick={handleLogout}>LOGOUT</button>
 
      
      <h3 className="AdminAddCampaignTitle">ADD CAMPAIGN</h3>
      <h3 className="AdminAddAdminTitle">ADD ADMIN</h3>
      
      {/* for creating new camopaigns */}
      <div className="AdminAddCampaignForm Adminform">
      <CreateArea onAdd={addNote} />
      </div>

      {/* for creating new admin */}
      <div className="AdminAddNewAdminForm Adminform">

      <form>
        Email
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={newadmin.email}
        />
        Password
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={newadmin.password}
        />
        <button type="submit" onClick={createNewAdmin}>
          Add
        </button>
      </form>

      </div>

      {/* for printing all campaigns */}
      <section className="AdminCard">
      {data.map((noteItem, index) => {
        return (
          <AdminCard
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            amount={noteItem.amount}
            onDelete={deleteNote}
            onUpdate={UpdateNote}
            onBlock={BlockNote}
          />
        );
      })}
      </section>

      
    </div>
  );
}

export default Admin;
