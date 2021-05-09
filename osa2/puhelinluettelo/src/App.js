import React, { useState,useEffect } from 'react'
import phoneServices from './services/phoneServices'

const Filter = ({fileterField, onChangeHandler}) => {
  return(
    <>
    <form>
        Filter shown with: 
        <input value={fileterField} onChange={onChangeHandler}/>
      </form>
    </>
  )
}

const PersonForm = (props) => {
  const {
    onSubmitHandler,
    nameField,
    onChangeHandlerNameField,
    newPhoneField,
    onChangeHandlerPhoneField
  } = props
  return (
    <>
    <form onSubmit={onSubmitHandler}>
        <div>
          name: <input value={nameField} onChange={onChangeHandlerNameField}/>
        </div>
        <div>
          number: <input value={newPhoneField} onChange={onChangeHandlerPhoneField}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}


const Persons = ({showPhonebook, deleteHandler}) => {
  return(
    <>
    <ul>
        {showPhonebook.map(person =>
          <li key={person.name}>
            {person.name} : {person.number} 
            <button onClick={deleteHandler} value={person.name}>delete</button>
          </li>
        )}
      </ul>
    </>
  )
}

const Notification = ({msg}) => {
  const notic = {
    fontSize: 16,
    color: 'green',
    backgroundColor: 'rgb(222, 222, 222)',
    padding: 10
  }
  if(msg === null){
    return null
  }else{
    return(
      <>
      <div style={notic}>{msg}</div>
      </>
    )
  }
}

const ErroMessage = ({errorMsg}) => {
  const error = {
    padding: 10,
    backgroundColor: 'rbg(120, 120, 120',
    color: 'red',
    fontSize: 16
  }
  if (errorMsg === null) return null
  return(
    <>
    <div style={error}> {errorMsg}</div>
    </>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filteredShow, setFilteredShow] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //efect function
  useEffect(()=>{
    phoneServices.getAllContacts()
    .then(allContacts => setPersons(allContacts))
  }, [])
  
  //add a new contact 
  const handleForm = (event) =>{
    event.preventDefault()
    
    //check whether name is already included
    //if yes, then update info
    const existedNames = persons.map(p => p.name)
    if (existedNames.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatableContact = persons.find(p => p.name === newName)
        const changedData = {...updatableContact, number: newPhone}
        phoneServices.updateContact(updatableContact.id, changedData)
        .then(changed => {
          setPersons(persons.map(p => p.id !== updatableContact.id ? p : changed))
          setMessage(`${newName}'s phone number updated`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }

    }else{
       //create person obj
      const newPerson = {name: newName, number:newPhone}
      phoneServices.addNewContact(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setMessage(`${newName} added to the phone book`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }

    setNewName('')
    setNewPhone('')
   
  }

  //delete a contact 
  const deleteContact = (event) =>{
    const toDelete = persons.find(p => p.name === event.target.value)
    if(window.confirm(`Are you sure to delete ${toDelete.name}`)){
      phoneServices.removeContact(toDelete.id)
      .then(() => {
        setPersons(persons.filter(p=>p.id !== toDelete.id))
        setMessage(`${toDelete.name} deleted from phone book`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error =>{
        setErrorMessage(`Error: ${toDelete.name} has already been deleted from server`)
        setTimeout(()=>{
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleNameField = (event) => setNewName(event.target.value)
  const handlePhoneField = (event) => setNewPhone(event.target.value)
  const handleFilter = (event) => setFilteredShow(event.target.value)
  const showPhonebook = filteredShow ==='' ? persons : persons.filter(p => p.name.match(new RegExp(filteredShow, 'i')))
  return (
    <div>
      <h2>Phonebook</h2>
      <ErroMessage errorMsg={errorMessage} />
      <Notification msg={message} />
      <Filter fileterField={filteredShow} onChangeHandler={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm
      onSubmitHandler={handleForm}
      nameField = {newName}
      onChangeHandlerNameField={handleNameField}
      newPhoneField= {newPhone}
      onChangeHandlerPhoneField={handlePhoneField}/>
      <h2>Numbers</h2>
      <Persons showPhonebook={showPhonebook} deleteHandler={deleteContact}/>
    </div>
  )

}

export default App