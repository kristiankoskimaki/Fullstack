import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handler }) => {
  return (
    <form>
      <div>
        filter: <InputboxWithHandler name={filter} handler={handler}/>
      </div>
    </form>
  )
}

const Inputform = ( { nameBox, nameHandler, numberBox, numberHandler, addEvent } ) => {
  return (
    <form onSubmit={addEvent}>
      <div>
        name: <InputboxWithHandler name={nameBox} handler={nameHandler}/>
        <br/>
        number: <InputboxWithHandler name={numberBox} handler={numberHandler}/>
      </div>
        <button type="submit">add</button>
    </form>
  )
}

const InputboxWithHandler = ( { name, handler } ) => {
  return (
    <><input value={name} onChange={handler}/></>
  )
}

const Persons = ({ personsInPhonebook, filter, deleteHandler }) => {
  const allPersons = personsInPhonebook.map( (personName, index) => {
    if (personName.name.toLowerCase().search(filter.toLowerCase()) >= 0) {
      return <div key={index}><Person person={personName} deleteHandler={deleteHandler}/></div>
    }
  })
  return (<>{allPersons}</>)
}

const Person = ({ person, deleteHandler }) => {
  return (
    <>
      {person.name} {person.number} &nbsp; 
      <button onClick={deleteHandler.bind(this, person.id, person.name)}>delete</button>
    </>
  )
}

const StatusNotification = ({ message }) => {
  if (message === null)
    return null
  return <div className="status"><p/>{message}</div>
}

const ErrorNotification = ({ message }) => {
  if (message === null)
    return null
  return <div className="error"><p/>{message}</div>
}

//function tests if a string exists in array
const isAlreadyAdded = (array, testString) => {
  let isADuplicate = false
  array.forEach(function(entryName) {
    if( entryName.name === testString) {
      isADuplicate = true
      return
    }
  })
  return isADuplicate
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])
  
    const statusNotify = (message) => {
      setStatusMessage( message )
      setTimeout(() => { setStatusMessage(null) }, 4000)
    }
    const errorNotify = (message) => {
      setErrorMessage( message )
      setTimeout(() => { setErrorMessage(null) }, 4000)
    }

    const addPerson = (event) => {
    event.preventDefault()
    if ( newName === '' )
      return

    if (isAlreadyAdded(persons, newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          statusNotify(`${newName} added to phonebook`)
        })
    } else updateEntry()
  }

  const updateEntry = () => {
    if( window.confirm(`${newName} is already in phonebook. Update phone number?`) === false )
      return

    let idToUpdate = -1           //find the id to update by searching array for person object with same name
    persons.filter(function(person) {
      if ( person.name === newName )
        idToUpdate = person.id
    });
    if ( idToUpdate === -1 )      //check that object is not missing the id somehow
      return

   const personObject = {
      name: newName,
      number: newNumber
    }
  
    personService
      .updateNumber(idToUpdate, personObject)   //update number on server
      .then(response => {
        const updatedPersons = persons.map( (personObject) => {   //copy persons array
          if( personObject.name === newName) {
            personObject.number = newNumber                       //edit desired object with updated phone number
            return personObject
          }
          else
            return personObject
        })

        setPersons(updatedPersons)              //update client side page
        statusNotify(`Changed ${newName}'s number to ${newNumber}`)
        setNewName('')
        setNewNumber('')
      })
    }

  const deleteEntry = (id, name) => {
    if ( window.confirm(`Delete ${name}?`) === false)
      return

      personService
        .deleteEntry(id)              //delete entry from server side
        .then(response => {
          var remainingEntries = persons.filter(function(value) { 
            return value.id != id;
          })
          setPersons(remainingEntries)    //update client side with deleted entry filtered out
          statusNotify(`Removed ${name} from phonebook`)
        })
        .catch(error => {
          errorNotify( `ERROR: Information of ${name} has already been removed from phonebook` )
        })

    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setPersons(persons)   //refresh phonebook every time something changes in filter input box
  }

  return (
    <div>
     <h2>Phonebook</h2>
     <Filter filter={filter} handler={handleFilterChange}/>
     <h3>Add new entry:</h3>
     <Inputform nameBox={newName} nameHandler={handleNameChange}
                numberBox={newNumber} numberHandler={handleNumberChange}
                addEvent={addPerson}/>
      <h3>Numbers</h3>
      <Persons personsInPhonebook={persons} filter={filter} deleteHandler={deleteEntry}/>
      <StatusNotification message={statusMessage} />
      <ErrorNotification message={errorMessage} />
    </div>
  )

}

export default App