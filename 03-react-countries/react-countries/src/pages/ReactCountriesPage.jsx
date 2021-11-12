import { useState } from "react";
import Countries from "../components/Countries";
import Country from "../components/Country";
import Header from "../components/Header";
import Main from '../components/Main'
import TextInput from '../components/TextInput'
import { allCountries } from '../data/countries'

export default function ReactCountriesPages() {
  const [countryFilter, setCountryFilter] = useState('')
  const [visitedCountries, setVisitedCountries] = useState([])

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCountry(countryId){
    let newVisistedCountries = [...visitedCountries]

    const isCountryVisited = newVisistedCountries.indexOf(countryId) !== -1

    if(isCountryVisited){
      newVisistedCountries = newVisistedCountries.filter(visitedCountryId => visitedCountryId !== countryId)
    }else{
      newVisistedCountries.push(countryId)
    }
    setVisitedCountries(newVisistedCountries)
  }

  const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase()

  const filtredCountries = countryFilterLowercase.length >= 3 ?
   allCountries.filter(({nameLowerCase}) => nameLowerCase.includes(countryFilterLowercase)) : allCountries
   let qtdePais = filtredCountries.length
   let qtdeVisitados = visitedCountries.length
  return (
    <div>
      <Header>React Countries</Header>

      <Main>
        <TextInput
          id='inputCountryFilter' 
          labelDescription="Informe o nome do pais. (Pelo menos 3 carcteres)"
          inputValue={countryFilter}
          onInputChange={handleCountryFilterChange}
          autoFocus
          />
        {/* <Countries visitedCountries={visitedCountries} onCountryClick={toggleVisitedCountry}>{filtredCountries}</Countries> */}
        
        <Countries>
        
        <h2 className='text-center font-semibold'>{qtdePais > 1 ? qtdePais +' países' : qtdePais +' país'}</h2>
        <h3 className='text-center font-semibold text-sm'>{qtdeVisitados > 1 ? qtdeVisitados +' países vistados' : qtdeVisitados + ' país visitado'}</h3>
        {filtredCountries.map(country => {
                const isVisited = visitedCountries.indexOf(country.id) !== -1
               return <Country isVisited ={isVisited} onCountryClick={toggleVisitedCountry} key={country.id}>{country}</Country>
            })}
        </Countries>
      </Main>
    </div>
  )
}
