import React from 'react';
import CardItem from './carditem';
import '../styles/cardslist.css';

const CardsList = ({cardList, noMoreCards, getNextPage, addCardToDeck, selectedClass, searchTerm}) => {
  const displayCardList = cardList.length !== 0 ? cardList.cards.map(card => {
    return (
      <CardItem key={card.id} card={card} addCardToDeck={addCardToDeck}/>
    )
  }) : null;

  const filteredCardsInSet = displayCardList ? displayCardList.filter(card => {
    const cardClass = card.props.card.classId;
    const cardName = card.props.card.name.toLowerCase();
    if(selectedClass !== 0) {
      return cardClass === selectedClass && cardName.includes(searchTerm.toLowerCase());
    }
    return cardName.includes(searchTerm.toLowerCase());
  }) : null;

  return (
    <div>
      <div className="card-list-container">
        {filteredCardsInSet}
      </div>
      {
      cardList.length !== 0 ?
      <button 
        className="getMoreCardsButton"
        disabled={noMoreCards} 
        onClick={getNextPage}>
        get more cards!
      </button> : null
      }
    </div>
  );
};

export default CardsList;