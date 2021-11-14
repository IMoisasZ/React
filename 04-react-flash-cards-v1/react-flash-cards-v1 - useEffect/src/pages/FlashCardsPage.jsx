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
  const [showTitle, setShowTitle] = useState(true)
  function handleButtonClick(){
    const shuffledCards = helperShuffleArray(allCards)
    setAllCards(shuffledCards)
  }

  function handleRadioShowTitleClick(){
    setShowTitle(true)
  }

  function handleRadioShowDescriptionClick(){
    setShowTitle(false)
  }
  return (
      <>
          <Header>React-Flash-Cards</Header>
          <Main>
            <div className='text-center'>
              <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button> 
            </div>

            <div className='flex flex-row items-center justify-center space-x-4 m-4'>
              <RadioButton id='radioButtonShowTitle' name='showInfo' buttonChecked={showTitle} onButtonClick={handleRadioShowTitleClick}>Mostrar titutlo</RadioButton>
              <RadioButton id='radioButtonShowDescription' name='showInfo' buttonChecked={!showTitle} onButtonClick={handleRadioShowDescriptionClick}>Mostrar descrição</RadioButton>
            </div>


            <FlashCards>
             {allCards.map(({id, title, description}) => {
               return (
                 <FlashCard key={id} title={title} description={description} showFlashCardTitle={showTitle}/>
                 )
                 })}
            </FlashCards>
          </Main>
      </>
  );
}
