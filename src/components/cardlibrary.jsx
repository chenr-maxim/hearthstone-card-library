import React, {useState, useEffect, useReducer} from 'react';
import { getCardSetsMetaData, getCardsInSet, getNextPageOfCards, getHearthstoneClasses } from '../config/blizzardapi';
import CardItem from './carditem';
import DeckBuilder from './deck';
import ClassesFilter from './classes';
import Cardsets from './cardsets';
import CardsList from './cardslist';
import '../styles/cardsets.css';

const axios = require('axios');

const cardLibraryState = {
  cardSets: [],
  cardList: [],
  deck: [],
  classes: [],
  selectedClass: 0,
  search: '',
  currentCardSet: '',
  noMoreCards: false
}

const cardReducer = (state, action) => {
  switch(action.type) {
    case "setCardSets": 
    case "setClasses": 
    case "setNoMoreCards": 
      console.log(action);
      return {
        ...state,
        noMoreCards: action.flag
      }
    case "resetSelectedClass":
      return {
        ...state,
        selectedClass: 0
      }
    case "setSelectedClass":
      return {
        ...state,
        selectedClass: action.classId
      }
    case "setCurrentCardSet":
      return {
        ...state,
        currentCardSet: action.card_set
      }
    case "setSearchTerm":
      return {
        ...state,
        search: action.payload
      }
    default: {
      return state;
    }
  }
}


const CardLibrary = () => {
  const [cardSets, setCardSets] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [deck, setDeck] = useState([]);
  const [classes, setClasses] = useState([]);

  const [state, dispatch] = useReducer(cardReducer, cardLibraryState);

  useEffect(() => {
    const getSetData = async () => {
      const cardSetsData = await getCardSetsMetaData();
      const classData = await getHearthstoneClasses();
      setCardSets(cardSetsData);
      setClasses(classData);
    }
    getSetData();
  }, []);

  const addCardToDeck = async (cardToAdd) => {
    if(deck.length < 30) {
      let count = 1;
      for(const card of deck) {
        if(count > 1) {
          alert('cant add more than 2 cards');
          return;
        }
        if(cardToAdd.id === card.id) {
          if(cardToAdd.rarityId === 5) {
            alert('cant add more than 1 legendary');
            return;
          }
          console.log(count);
          count++;
        }
      }
      await setDeck(prevState => [...prevState, cardToAdd]);
    } else {
      alert('maximum deck size is 30');
    }
  }

  const getNextPage = async () => {
    const nextPage = await getNextPageOfCards(state.currentCardSet, cardList.page + 1);
    if(nextPage.page === nextPage.pageCount) {
      dispatch({type: 'setNoMoreCards', flag: true});
    }
    const updatedCardsInSet = {
      ...nextPage,
      cards: [...cardList.cards, ...nextPage.cards]
    }
    await setCardList(updatedCardsInSet);
  }

  const handleSelectChange = async (e) => {
    dispatch({type: 'setCurrentCardSet', card_set: e.target.value})
    dispatch({type: 'setNoMoreCards', flag: false});
    dispatch({type: 'setSearchTerm', payload: ''});
    const cardsInSet = await getCardsInSet(e.target.value);
    await setCardList(cardsInSet);
  }

  const handleInputChange = (e) => {
    dispatch({type: 'setSearchTerm', payload: e.target.value})
  }

  const filterChange = (e) => {
    const classId = parseInt(e.target.value);
    dispatch({type: 'setSelectedClass', classId});
  }

  const clearClassFilter = () => {
    dispatch({type: 'resetSelectedClass'});
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search cards"
        onChange={handleInputChange}
        value={state.search}
      >
      </input>
      <Cardsets cardSets={cardSets} handleSelectChange={handleSelectChange} />
      <ClassesFilter classes={classes} filterChange={filterChange} clearClassFilter={clearClassFilter} />
      <CardsList 
        cardList={cardList} 
        noMoreCards={state.noMoreCards} 
        getNextPage={getNextPage} 
        addCardToDeck={addCardToDeck} 
        selectedClass={state.selectedClass} 
        searchTerm={state.search}
        />
      <div className="deck-container">
        <DeckBuilder deck={deck}/>
      </div>
    </div>
  );
};


export default CardLibrary;