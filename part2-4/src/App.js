import { useState, useEffect }from 'react'
import personService from './services/person'
import axios from 'axios'

//component//
const ListPerson = ({persons, removePerson, search}) => {
  const person = persons.filter(person => person.name.search(search) === 0)
    return (
    <ul>
        {person.map((al, i) =>
            <Person key={i} person={al} removePerson={() => removePerson(al.id)}/>
        )}
    </ul>
  )
}

const Person = ({person, removePerson}) => {
  return (  
    <p>{person.name}: {person.number}  <button onClick={removePerson}>remove</button></p>
  )
}

const FormPerson = (props) => {
  return (
    <form onSubmit={props.Addperson}>
      <div>
        name: <input value={props.Name} onChange={props.HandleNameChange}/>
      </div>
      <div>
        num: <input value={props.Num} onChange={props.HandleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
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
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  //handle function //
  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const HandleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  function checkName (name) {
    const a = Object.getOwnPropertyNames(name.name)
    const b = Object.getOwnPropertyNames(newName)

    if (a.length !== b.length) return false
    const hasSameKey = a.every(value => !!b.find(v => v === value))
    if (!hasSameKey) return false
    for (const key of a)
    {
      console.log(name.name[key], newName[key])
      if (name.name[key] !== newName[key]) {
        return false
      }
    }
    return true
  }

  const replaceNum = id => {
    const per = person.find(n => n.id === id)
    const personObj = {...per, number: newNum}

    personService.update(id, personObj)
    .then( () => {
      setPerson(person.map( pers => pers.id !== id))
    })
  }

  const AddPerson = (event, replaceNum) => {
    event.preventDefault()

    const per = person.find(checkName)
    if (per) {
      if (window.confirm(`remplacer le numeros de ${per.name}`)) {
        const personObj = {...per, number: newNum}

        personService.update(per.id, personObj)
        .then( returnPers => {
        setPerson(person.map( pers => pers.id !== per.id ? pers : returnPers))
        })
      }
      return
    }
    const personObj = {
      name: newName,
      number: newNum,
    }
    personService.create(personObj)
    .then(returnperson => {
      setPerson(person.concat(returnperson))
    })
  }

  const removePerson = (id) => {
    personService.remove(id)
    .then( () => {
      setPerson(person.filter( pers => pers.id !== id))
    })
  }

  //data fetch
  useEffect( () => {
    personService.getAll().then(initperson => {
      setPerson(initperson)
    })
  }, [])

  return (
    <div>
      <h2>search</h2>
        <Filter HandleSearchChange={HandleSearchChange} newSearch={newSearch}/>
      <h2>Add new</h2>
        <FormPerson  Addperson={AddPerson} name={newName} num={newNum} HandleNameChange={HandleNameChange} HandleNumChange={HandleNumChange} replaceNum={replaceNum}/>
      <h2>numbers</h2>
        <ListPerson persons={person} search={newSearch} removePerson={removePerson}/>
    </div>
  )
}

export default App