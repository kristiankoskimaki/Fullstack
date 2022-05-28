import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countriesInAPI, filterCountry }) => {
  let countriesMatchingCriteria = 0
  let countryToDisplay = {}
  const displayCountries = countriesInAPI.map( (country, index) => {
    if (filterCountry && country.name.common.toLowerCase().search(filterCountry.toLowerCase()) >= 0) {
      countriesMatchingCriteria++
      countryToDisplay = country
      return <div key={index}>{country.name.common}</div>
    }
  })

  if (countriesMatchingCriteria > 10)
    return <>too many matches, specify another filter</>
  if (countriesMatchingCriteria > 1 && countriesMatchingCriteria <= 10)
    return <>{displayCountries}</>
  if (countriesMatchingCriteria === 1)
    return <><Country showThisCountry={countryToDisplay}/></>
  return <></>
}

const Country = ( props ) => {
  return (
    <div>
      <h2>{props.showThisCountry.name.common}</h2>
      <p/>region: {props.showThisCountry.region}
      <br/>capital: {props.showThisCountry.capital}
      <br/>population: {props.showThisCountry.population}
      <h3>languages</h3>
      <LanguagesBulletpoints languages={props.showThisCountry.languages}/>
      <img src={props.showThisCountry.flags[0]} height="100" border="1px"/>
    </div>
  )
}

const LanguagesBulletpoints = ( props ) => {
  //Object.entries(objectname) creates an array of properties that can be iterated over
  const allLanguagesSpoken = Object.entries(props.languages).map( lang => {
    return <li key={lang[0]}>{lang[1]}</li>
  })
  return <div><ul>{allLanguagesSpoken}</ul></div>
}

const Filter = ({ filter, handler }) => {
  return (
    <form>
      <div>
        find countries: <input value={filter} onChange={handler}/>
      </div>
    </form>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filterCountry={filter} handler={handleFilterChange}/>
      <Countries countriesInAPI={countries} filterCountry={filter}/>
    </div>
  )
}

export default App;
