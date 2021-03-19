import React, {useEffect, useState} from 'react';
import CardLibrary from './cardlibrary';

const Splash = () => {
  // const [cardList, setCards] = useState([]);
  // const [cardSets, setCardSets] = useState([]);

  // useEffect(() => {
  //   const theMightyToken = async () => {
  //     const allHearthstoneCards = await getAllHearthstoneCards();
  //     setCards(allHearthstoneCards.cards);
  //   }
  //   theMightyToken();
    
  // }, [])


  return (
    <div>
      <h2> Learn about Hearthstone Cards! </h2>
      <h3> {`There are more than 3000+ cards in Hearthstone!`}</h3>
      <CardLibrary />
    </div>
  );
};

export default Splash;