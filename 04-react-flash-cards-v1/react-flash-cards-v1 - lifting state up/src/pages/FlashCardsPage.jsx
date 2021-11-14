import Button from '../components/Button'
import { useState } from 'react'
import FlashCard from "../components/FlashCard";
import Header from "../components/Header";
import Main from '../components/Main'
import FlashCards from "../components/FlashCards";
import RadioButton from '../components/RadioButton';
import { allFlashCards } from "../data/allFlashCards";
import { helperShuffleArray } from '../helpers/arraysHelpers'

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState(allFlashCards)
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true)
  function handleButtonClick(){
    const shuffledCards = helperShuffleArray(allCards)
    setAllCards(shuffledCards)
  }

  function handleRadioShowTitleClick(){
    const updateCards = [...allCards].map(card => ({...card, showTitle: true}))
    setAllCards(updateCards)
    setRadioButtonShowTitle(true)
  }

  function handleRadioShowDescriptionClick(){
    const updateCards = [...allCards].map(card => ({...card, showTitle: false}))
    setAllCards(updateCards)
    setRadioButtonShowTitle(false)
  }
  
  function handleToggleFlashCard(cardId){
    const updateCards = [...allCards]
    const cardIndex = updateCards.findIndex(card => card.id === cardId)
    updateCards[cardIndex].showTitle = !updateCards[cardIndex].showTitle
    setAllCards(updateCards)
  }

  return (
      <>
          <Header>React-Flash-Cards</Header>
          <Main>
            <div className='text-center'>
              <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button> 
            </div>

            <div className='flex flex-row items-center justify-center space-x-4 m-4'>
              <RadioButton id='radioButtonShowTitle' name='showInfo' buttonChecked={radioButtonShowTitle} onButtonClick={handleRadioShowTitleClick}>Mostrar titutlo</RadioButton>
              <RadioButton id='radioButtonShowDescription' name='showInfo' buttonChecked={!radioButtonShowTitle} onButtonClick={handleRadioShowDescriptionClick}>Mostrar descrição</RadioButton>
            </div>


            <FlashCards>
             {allCards.map(({id, title, description, showTitle}) => {
               return (
                 <FlashCard key={id} id={id} title={title} description={description} showFlashCardTitle={showTitle} onToggleFlashCard={handleToggleFlashCard}/>
                 )
                 })}
            </FlashCards>
          </Main>
      </>
  );
}
