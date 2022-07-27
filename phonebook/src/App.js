import {useState} from 'react'

const ListPerson = (props) => {
  const person = props.person.filter(person => person.name.search(props.search) === 0)
    return (
    <ul>
        {person.map((al, i) =>
            <li key={i}>{al.name}: {al.num}</li>
        )}
    </ul>
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
const App = () => {
  const [person, setPerson] = useState([
    {
      name: 'toto le toto',
      num: '23215',
      show: true
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

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

  const AddPerson = (event) => {
    event.preventDefault()
    console.log(newName, newNum)
    const personObj = {
      name: newName,
      num: newNum,
      show: true
    }
    if (person.find(checkName)) {
      alert(`${newName} already add to phonebook`)
      return
    }
    setPerson(person.concat(personObj))
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>search</h2>
        <Filter HandleSearchChange={HandleSearchChange} newSearch={newSearch}/>
      <h2>Add new</h2>
        <FormPerson  Addperson={AddPerson} name={newName} num={newNum} HandleNameChange={HandleNameChange} HandleNumChange={HandleNumChange}/>
      <h2>numbers</h2>
        <ListPerson person={person} search={newSearch}/>
    </div>
  )
}

export default App