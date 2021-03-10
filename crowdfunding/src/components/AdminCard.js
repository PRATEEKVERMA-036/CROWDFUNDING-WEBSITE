import React,{useState} from "react";
import BlockIcon from '@material-ui/icons/Block';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

function AdminCard(props) {

  
    function handleDelete() {
        // props.onDelete(props.id);
        
        // console.log("title");
        // console.log(props.title);

        // setDeletenote(() => {
        //   return {
        //     title:props.title,
        //     content:props.content,
        //     amount:props.amount
        //   };
        // })
        

       let delnote={
          title:props.title,
          content:props.content,
          amount:props.amount
        }

        // console.log("deleted note");
        // console.log(delnote);

        props.onDelete(delnote);
      }

      // console.log("deleted note outside");
      //   console.log(deletenote);

      function handleUpdate() {
        let updatenote={
          title:props.title,
          content:props.content,
          amount:props.amount
        }
        props.onUpdate(updatenote);
      }
      
      
      function handleBlock() {
        let blocknote={
          title:props.title,
          content:props.content,
          amount:props.amount
        }
        props.onBlock(blocknote);
      }

  
    return (
    <div>
      <div id="Admincampaigns" className="AdminTwocolor-campaign campaign-content">
       
        <img
          className="campaign-img"
          src={require("../images/about-img.jpg").default}
          alt="logo"
        />

        <div>
          <div className="campaign-info">
          <h3>
            <b>{props.title}</b>
          </h3>

          <p>
            {props.content}
          </p>

          </div>

          <div className="AdminCampaign-content">
            
            <div className="AdminCampaign-amount">
              <b>REQUIRED AMOUNT:Rs.{props.amount}</b>
            </div>
              

            <button
              type="submit"
              class="btn btn-success btn-sm"
              
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </button>

            <button
              type="submit"
              class="btn btn-success btn-sm"
              
              onClick={handleUpdate}
            >
              <UpdateIcon/>
            </button>

            <button
              type="submit"
              class="btn btn-success btn-sm"
              
              onClick={handleBlock}
            >
              <BlockIcon/>
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
