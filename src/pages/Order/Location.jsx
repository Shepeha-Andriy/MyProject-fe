import React from 'react'
import { Country, State, City } from 'country-state-city'

export default function Location() {
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');

  const countries = Country.getAllCountries()
  const states = State.getStatesOfCountry(country)
  const cities = City.getCitiesOfState(country, state)

  return (
    <div>
      <select style={{width: '250px', height: '30px'}} onChange={(e) => setCountry(e.target.value)}>
        {
          countries.map((country, i) => {
            return <option key={i} value={country.isoCode} onClick={(e) => setCountry(country.isoCode)}>{ country.name }</option>
          })
        }
      </select>

      <select style={{width: '250px', height: '30px'}} onChange={(e) => setState(e.target.value)}>
        {
          states.map((country, i) => {
            return <option key={i} value={country.isoCode}>{ country.name }</option>
          })
        }
      </select>

      <select style={{width: '250px', height: '30px'}} onChange={(e) => setCity(e.target.value)}>
        {
          cities.map((country, i) => {
            return <option key={i} value={country.isoCode}>{ country.name }</option>
          })
        }
      </select>
    </div>
  )
}
