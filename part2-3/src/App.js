import { useState, useEffect }from 'react'
import axios from 'axios'

//component//
const ListCountrie = (props) => {
  const countrie = props.countrie.filter( cou =>
    cou.name.common.toLowerCase().search(props.search.toLowerCase()) === 0
  )
  console.log("oui", countrie)
  if (countrie.length === 1) {
    return (
      <div>
        <h1>{countrie[0].name.common}</h1>
          <div>
            <p>Capital {countrie[0].capital}</p>
            <p>population {countrie[0].population}</p>
          </div>
        <h2>Language</h2>
          <ul>
            {Object.values(countrie[0].languages).map((la, i) =>
              <li key={i}>{la}</li>
            )}
          </ul>
          <img src={countrie[0].flags.png} alt="la"/>
      </div>
    )
  } else if (countrie.length <= 10) {
    return (
      <ul>
        {countrie.map((al, i) =>
          <li key={i}>{al.name.common}</li>
        )}
      </ul>
    )
  }else{
    return (
      <p>preciser votre recherche</p>
    )
  }
}

const Filter = (props) => {
  return (  
    <form>
      <div>
        search: <input value={props.newSearch} onChange={props.HandleSearchChange}/>
      </div>
    </form>
  )
}
//end component

const App = () => {
  const [countrie, setCountrie] = useState([])
  const [newSearch, setNewSearch] = useState('')

  //handle function //
  const HandleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  //data fetch
  useEffect( () => {
    console.log('effect')
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      console.log('promise fullfilled', response.data)
      setCountrie(response.data)
    })
  }, [])

  return (
    <div>
      <h2>search</h2>
        <Filter HandleSearchChange={HandleSearchChange} newSearch={newSearch}/>
      <h2>countrie</h2>
        <ListCountrie countrie={countrie} search={newSearch}/>
    </div>
  )
}

export default App