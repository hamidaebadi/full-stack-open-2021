import React,{useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [findField, setFinedField] = useState('')
  const [allCountries, setAllCountries] = useState([])

  //fetch data with useEffect
  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  const regex = new RegExp(findField, 'i')
  const filtered = findField.length === 0 ? allCountries : allCountries.filter(c => c.name.match(regex))
  //event handlers
  const findFieldChange = (event) =>{
    setFinedField(event.target.value)
  }

  const fillFilter = (event) =>{
    setFinedField(event.target.value)
  }
  if(filtered.length === 0){
    return(<div></div>)
  }else if(filtered.length > 10){
    return (
      <div>
        <form>
          find countries <input value={findField} onChange={findFieldChange}/>
        </form>
          too many countries, specify a filter
      </div> 
     )
  }else if(filtered.length <10 && filtered.length > 1){
    //show names
    return(
      <>
       <form>
          find countries <input value={findField} onChange={findFieldChange}/>
        </form>
      <ul>
    {filtered.map(c => 
    <li key={c.alpha2Code}>
      {c.name}
      <button onClick={fillFilter} value={c.name}>show</button>
      </li>)
    }
      </ul> 
      </>
    )
    
  }else if(filtered.length === 1){
    return(
      <>
        <form>
          find countries <input value={findField} onChange={findFieldChange}/>
        </form>
      <h2>{filtered[0].name}</h2>
      <p>Capital: {filtered[0].capital}</p>
      <p>Population: {filtered[0].population}</p>
      <h4>Languages</h4>
      <ul>
       {filtered[0].languages.map(l=><li key={l['iso639_1']}>{l.name}</li>)}
      </ul>
      <img src={filtered[0].flag} width='200' alt=""/>
      </>
    )
  }
  
}

export default App;
