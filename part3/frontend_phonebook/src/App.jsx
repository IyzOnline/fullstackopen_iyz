import { useState, useEffect } from "react"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from "./components/Notification"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [messageObj, setMessageObj] = useState(null)

    useEffect(() => {
       personService
        .getPersons()
        .then(response => setPersons(response))
    }, [])

    return(
        <div>
            <h2>Phonebook</h2>

            <Notification messageObj={messageObj}/>

            <Filter filterName={filterName} setFilterName={setFilterName}/>

            <h2>add a new</h2>

            <PersonForm setMessage={setMessageObj} createPerson={personService.createPerson} updatePerson={personService.updatePerson} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

            <h2>Numbers</h2>

            <Persons deletePerson={personService.deletePerson} persons={persons} setPersons={setPersons} filterName={filterName}/>
        </div>
    )
}

export default App