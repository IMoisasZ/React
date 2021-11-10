import { useState } from 'react'
import DateInput from './components/DateInput';
import Header from "./components/Header";
import Main from './components/Main'
import TextInput from './components/TextInput';
import getAgeFrom from './helpers/dateHelpers'

export default function App() {
  console.log('Teste no console do navegador');

  const [name, setName] = useState('Moisas')
  const [birthDate, setBirthDate] = useState('1982-09-10')

  function handleNameChange(newName){
    setName(newName)
  }

  function handleBirthDateChange(newBirthDate){
    setBirthDate(newBirthDate)
  }

  return (
    <>
      <Header className="bg-gray-10 mx-auto p-4">React-Hello2</Header>
      <Main>
        <TextInput labelDescription='Digite o seu nome: ' inputValue={name} onInputChange={handleNameChange}/>
        <DateInput labelDescription='Digite a sua data de nascimento: ' inputValue={birthDate} onInputChange={handleBirthDateChange}/>
        <p>O seu nome é {name} com {name.length} caracteres e você possui {getAgeFrom(birthDate)} anos.</p>
      </Main>
    </>
  );
}
