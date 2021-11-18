import { useState, useEffect } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Button from '../components/Button';
import Error from '../components/Error';
import FlashCard from '../components/FlashCard';
import FlashCardForm from '../components/FlashCardForm';
import FlashCardItem from '../components/FlashCardItem';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import { apiDeleteFlashCard, apiGetAllFlashCards } from '../services/apiServices';
import { getNewId } from '../services/idService';

export default function FlashCardsPage() {
  // Back end
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para estudo
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoadig] = useState(true)

  const [error, setError] = useState('')
  
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  const [createMode, setCreateMode] =useState(true)

  const [selectedTab, setSelectedTab] = useState(0)

  const [selectedFlashCard, setSelectedFlashCard] = useState(null)

  useEffect(() => {
    // Promise
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards)

    // setTimeout (() => {
    //   setLoadig(false)
    // }, 500)
    // })

    // async await
    
    // IIFE
    // (async function getAllCards(){
    //   const backEndAllCards = await apiGetAllFlashCards()
    //   setAllCards(backEndAllCards)
    // setTimeout (() => {
    //   setLoadig(false)
    // }, 500)
    // })()
  
    async function getAllCards(){
      try {
        const backEndAllCards = await apiGetAllFlashCards()
        setAllCards(backEndAllCards)
  
        setTimeout (() => {
          setLoadig(false)
        }, 500)
      } catch (error) {
        setError(error.message)
      }
    }
    getAllCards()
  },[])

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);

    setStudyCards(shuffledCards);
  }

  useEffect (() => {
    setStudyCards(allCards.map(card => ({...card, showTitle: true})))
  }, [allCards])

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: false}));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}));

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  async function handleDeleteFlashCard(cardId){
    try {
      // BackEnd
      await apiDeleteFlashCard(cardId)
      // ForntEnd
      setAllCards(allCards.filter(card => card.id !== cardId))
      setError('')
      
    } catch (error) {
      setError(error.message)
    }
  }

  function handleEditFlashCard(card){
    setCreateMode(false)
    setSelectedTab(1)
    setSelectedFlashCard(card)
  }

  function handleTabSelect (tabIndex){
    setSelectedTab(tabIndex)
  }

  function handleNewFlashCard (){
    setCreateMode(true)
    setSelectedFlashCard(null)
  }

  function handlePersist(title, description){
    if(createMode){
      setAllCards([...allCards, {id: getNewId(), title, description}])
    }else{
      setAllCards(allCards.map(card => {
        if(card.id === selectedFlashCard.id){
          return ( { ...card, title, description })
        }
        return card
      }))
      setSelectedFlashCard(null)
      setCreateMode(true)
    }
  }
  let mainJsx =  (
    <div className='flex items-center justify-center my-4'>
      <Loading />
    </div>
  )

  if(error){
    mainJsx = <Error>{error}</Error>
  }

  if(!loading && !error){
    mainJsx = 
    <>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Listagem</Tab>
          <Tab>Cadastro</Tab>
          <Tab>Estudo</Tab>
        </TabList>

        <TabPanel>
         {allCards.map(flashCard => {
           return <FlashCardItem key={flashCard.id} onDelete={handleDeleteFlashCard} onEdit={handleEditFlashCard}>{flashCard}</FlashCardItem>
         })}
        </TabPanel>
        <TabPanel>
          <div>
            <Button className='my-4' onButtonClick={handleNewFlashCard}>Novo Flash Card</Button>
          </div>
          <FlashCardForm createMode={createMode} onPersist={handlePersist}>{selectedFlashCard}</FlashCardForm>
        </TabPanel>
        <TabPanel>
        <div className="text-center mb-4">
        <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4 m-4">
        <RadioButton
          id="radioButtonShowTitle"
          name="showInfo"
          buttonChecked={radioButtonShowTitle}
          onButtonClick={handleRadioShowTitleClick}>
          Mostrar título
        </RadioButton>

        <RadioButton
          id="radioButtonShowDescription"
          name="showInfo"
          buttonChecked={!radioButtonShowTitle}
          onButtonClick={handleRadioShowDescriptionClick}>
          Mostrar descrição
        </RadioButton>
      </div>

      <FlashCards>
        {studyCards.map(({ id, title, description, showTitle }) => {
          return (
            <FlashCard
              key={id}
              id={id}
              title={title}
              description={description}
              showFlashCardTitle={showTitle}
              onToggleFlashCard={handleToggleFlashCard}/>
          )})}
      </FlashCards>
        </TabPanel>
      </Tabs>
    </>
  }
  return (
    <>
      <Header>React-Flash-Cards-V2</Header>
     
      <Main>{mainJsx}</Main>
    </>
  )
}