import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import EditIcon from "@mui/icons-material/Edit";
import Editable from "../Editabled/Editable";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import UpdateName from "./Updatename/UpdateName";
function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const { id, title, date, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <>
          <CardInfo
            onClose={() => setShowModal(false)}
            card={props.card}
            boardId={props.boardId}
            updateCard={props.updateCard}
            boardTitle={props.boardTitle}
          />
        </>
      )}
      {showModalUpdate && (
        <UpdateName
          onClose={() => setShowModalUpdate(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
          boardTitle={props.boardTitle}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <EditIcon
              style={{ color: "blue" }}
              onClick={() => setShowModalUpdate(true)}
            />
            {/* <EditIcon style={{color:'blue'}}  onClick={updateTitlee}/> */}
            <DeleteForeverIcon
              style={{ color: "red" }}
              onClick={() => props.removeCard(props.boardId, id)}
            />
          </div>
        </div>
        <div className="card_title">{title}</div>

        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
        
        </div>
      </div>
    </>
  );
}

export default Card;