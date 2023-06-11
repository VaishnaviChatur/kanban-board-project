import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar'
import Board from "../Board/Board"

import styles from "./Home.module.css";
import Editable from "../Editabled/Editable";
import a from '../images/a.jpg';
import b from '../images/b.jpg';
import c from '../images/c.jpg';
import d from '../images/d.jpg';
import e from '../images/e.jpg';

export default function Home() {
    
const [changebg, setChangebg] = useState(0);
 
const backgroundImages = [a, b, c, d, e];

const changeTheme = () => {
  if (backgroundImages.length - 1 > changebg) {
    setChangebg(changebg + 1);
  } else {
    setChangebg(0);
  }
};


const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };


//////////////////////////////////
  const removeBoard = (id) => {
 
    const index = boards.findIndex((item) => item.id === id);
  if (index < 0) return;

  const tempBoards = [...boards];
  tempBoards.splice(index, 1);
  setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);
  const deleteAllCards = () => {
    setBoards([]);
  };
  return (
    <div className={styles.app}> 
  
   
    <Navbar deleteAllCards={deleteAllCards} changeTheme={changeTheme}/>
   
  <div className={styles.app_boards_container}   style={{ backgroundImage: `url(${backgroundImages[changebg]})` }}>
    <div id='ol'className={styles.app_boards}>
      {boards.map((item) => (
        <Board
          key={item.id}
          board={item}
          addCard={addCardHandler}
          removeBoard={() => removeBoard(item.id)}
          removeCard={removeCard}
          dragEnded={dragEnded}
          dragEntered={dragEntered}
          updateCard={updateCard}
        
        />
      ))}
      <div className={styles.app_boards_last}
      // draggable
      // onDragEnd={() => dragEnded()}
      //  onDragEnter={() => dragEntered()}
      >
       
        <Editable
          displayClass={styles.app_boards_add_board}
          editClass={styles.app_boards_add_board_edit}
          placeholder="Enter Board Name"
          text="Add Board"
          buttonText="Add Board"
          
          onSubmit={addboardHandler}
       
        />
      </div>
    </div>
  </div>
</div>
  )
}