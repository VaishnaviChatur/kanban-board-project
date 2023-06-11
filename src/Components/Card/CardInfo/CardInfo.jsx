import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
// import EditIcon from '@mui/icons-material/Edit';
import Modal from "../../Modal/Modal";
// import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";
import ClearIcon from '@mui/icons-material/Clear';

import "./CardInfo.css";

function CardInfo(props) {
 

// const [isTitle, setTitle] = useState()

  const [values, setValues] = useState({
    ...props.card,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  

  // const addTask = (value) => {
  //   const task = {
  //     id: Date.now() + Math.random() * 2,
  //     completed: false,
  //     text: value,
  //   };
  //   setValues({
  //     ...values,
  //     tasks: [...values.tasks, task],
  //   });
  // };

  // const removeTask = (id) => {
  //   const tasks = [...values.tasks];

  //   const tempTasks = tasks.filter((item) => item.id !== id);
  //   setValues({
  //     ...values,
  //     tasks: tempTasks,
  //   });
  // };

  // const updateTask = (id, value) => {
  //   const tasks = [...values.tasks];

  //   const index = tasks.findIndex((item) => item.id === id);
  //   if (index < 0) return;

  //   tasks[index].completed = value;

  //   setValues({
  //     ...values,
  //     tasks,
  //   });
  // };

  // const calculatePercent = () => {
  //   if (!values.tasks?.length) return 0;
  //   const completed = values.tasks?.filter((item) => item.completed)?.length;
  //   return (completed / values.tasks?.length) * 100;
  // };

  const updateDate = (date) => {
    if (!date) return;

    setValues({...values,date,});
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

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">

            <p><List /> Description</p>
          </div>
          <Editable
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
    
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
        
            <p><Calendar /> Date</p>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

   

      </div> 
  </Modal>
  );
}

export default CardInfo;