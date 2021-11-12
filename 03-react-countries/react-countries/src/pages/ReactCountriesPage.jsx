import { useState } from "react";
import Countries from "../components/Countries";
import Header from "../components/Header";
import Main from '../components/Main'
import TextInput from '../components/TextInput'
import { allCountries } from '../data/countries'

export default function ReactCountriesPages() {
  const [countryFilter, setCountryFilter] = useState('Brazil')

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase()

  const filtredCountries = countryFilterLowercase.length >= 3 ?
   allCountries.filter(({nameLowerCase}) => nameLowerCase.includes(countryFilterLowercase)) : allCountries

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
        <Countries>{filtredCountries}</Countries>
      </Main>

      
    </div>
  )
}
