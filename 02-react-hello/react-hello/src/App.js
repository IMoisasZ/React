import { useEffect, useState } from 'react'
import DateInput from './components/DateInput';
import Header from "./components/Header";
import Main from './components/Main'
import TextInput from './components/TextInput';
import getAgeFrom from './helpers/dateHelpers'
import { getNewId } from './services/idServices';
import Timer from './components/Timer';
import CheckBoxInput from './components/CheckBoxInput';
import OnlineOffline from './components/OnlineOffline';

export default function App() {
  console.log('Teste no console do navegador');

  const [name, setName] = useState('Moisas')
  const [birthDate, setBirthDate] = useState('1982-09-10')
  const [showTimer, setShowTimer] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // alterar o titulo da página toda vez que o name for alterado
  useEffect(()=> {
    document.title = name
  }, [name])
  //ultimo parametro é referente a execução ser apenas quando o name for alterado. [] vazio = executa uma unica vez; sem nada executa toda vez que a página for atualizada; [name] = executa somente quando o name for aleterado

  function toggleOnline(){
    setIsOnline(true)
  }

  function toggleOffline(){
    setIsOnline(false)
  }

  useEffect(() => {
    window.addEventListener('online', toggleOnline)
    window.addEventListener('offline', toggleOffline)
    return () => {
      window.removeEventListener('online', toggleOnline)
      window.removeEventListener('offline', toggleOffline)
    }
  }, [])

  function handleNameChange(newName){
    setName(newName)
  }

  function handleBirthDateChange(newBirthDate){
    setBirthDate(newBirthDate)
  }

  function togleShowTimer(){
    setShowTimer(currentShowTimer => !currentShowTimer)
  }

  return (
    <>
      <Header className="bg-gray-10 mx-auto p-4 mt-1">React-Hello2</Header>
      <Main>
          <OnlineOffline isOnline={isOnline} />
          {showTimer && (
            <div className= 'text-right'>
              <Timer />
            </div> 
          )}
        <CheckBoxInput labelDescription='Mostrar cronometro' onCheckBoxChange={togleShowTimer} />
        <TextInput id={getNewId()} labelDescription='Digite o seu nome: ' inputValue={name} onInputChange={handleNameChange} autoFocus/>
        <DateInput id={getNewId()} labelDescription='Digite a sua data de nascimento: ' inputValue={birthDate} onInputChange={handleBirthDateChange} autoFocus/>
        <p>O seu nome é {name} com {name.length} caracteres e você possui {getAgeFrom(birthDate)} anos.</p>
      </Main>
    </>
  );
}
