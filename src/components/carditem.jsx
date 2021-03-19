import React from 'react';
import '../styles/carditem.css';

const CardItem = ({card, addCardToDeck}) => {
  return (
    <div className="card-container">
      <h4>{card.name}</h4>
      <img
        alt="card artwork"
        className="card-img"
        src={card.image}
      >
      </img>
      <button onClick={() => addCardToDeck(card)}> add to Deck </button>
    </div>
  );
};

export default CardItem;