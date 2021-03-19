import React from 'react';

const DeckBuilder = ({deck}) => {
  const deckList = deck.map((card, i) => {
    return (
      <li key={i}>
        {card.name}
        <br/>
        {`manacost: ${card.manaCost}`}
      </li>
    )
  })

  return (
    <div>
      <h4>
        Your Deck
      </h4>
      <ul>
        {deckList}
      </ul>
    </div>
  );
};

export default DeckBuilder;