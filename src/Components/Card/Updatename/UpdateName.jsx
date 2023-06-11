import React, { useEffect, useState } from "react";


import Modal from "../../Modal/Modal";

import Editable from "../../Editabled/Editable";
import ClearIcon from '@mui/icons-material/Clear';

// import "./CardInfo.css";

function CardInfo(props) {
 



  const [values, setValues] = useState({
    ...props.card,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };


  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);
  // console.log(props.board?.title)
  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
        <ClearIcon style={{marginLeft:'450px',color:'red'}}   onClick={() => (props.onClose ? props.onClose() : "")}/>
          <div className="cardinfo_box_title">
          
            <p> In the list <span style={{textDecoration:'underline', fontSize:'1rem'}}>{props.boardTitle}</span></p>
      
          </div>
      
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          
          />
        
          {/* <Type  onSubmit={updateTitle}/> */}
        </div>

       
      

   
      </div> 
  </Modal>
  );
}

export default CardInfo;