import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from "./Board.module.css";

function Board(props) {
 
  const [showDropdown, setShowDropdown] = useState(true);
  const { id, title, date, labels } = props.board;
  return (
    <div className={styles.board} >
      <div className={styles.board_header}
     
      >
        <p className={styles.board_header_title}>
          {props.board?.title}
          <span> {props.board?.cards?.length || 0} </span>{" "}
        </p>
        <div
          className={styles.board_header_title_more}
          // onClick={() => setShowDropdown(true)}
          
          // draggable
          // onDragEnd={() => props.dragEnded(props.boardId, id)}
          // onDragEnter={() => props.dragEntered(props.boardId, id)}
        >     
       
              <RemoveCircleIcon style={{color:'blue', margin:'5px'}} onClick={() => props.removeBoard()}/>{" "}
           
              
          {/* <RemoveCircleIcon style={{ margin: "10px" }} />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
            
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}> Delete Board </p>{" "}
            </Dropdown>
          )} 
        {" "} */}
        </div>{" "}
      </div>{" "}
      <div className={styles.board_cards} custom-scroll
        // draggable
        // onDragEnd={() => props.dragEnded(props.boardId, id)}
        // onDragEnter={() => props.dragEntered(props.boardId, id)}
        
      >
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardTitle={props.board.title}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          
          />
        ))}
        <div

        
        >
          <Editable
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass={styles.board_add_card}
            editClass={styles.board_add_card_edit}
            onSubmit={(value) => props.addCard(props.board?.id, value)}
          />{" "}
        </div>
        {" "}
      </div>
    </div>
  );
}

export default Board;
