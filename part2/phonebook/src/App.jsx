import { useState, useEffect } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
       personService
        .getPersons()
        .then(response => setPersons(response))
    }, [])

    return(
        <div>
            <h2>Phonebook</h2>

            <Filter filterName={filterName} setFilterName={setFilterName}/>

            <h2>add a new</h2>

            <PersonForm createPerson={personService.createPerson} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

            <h2>Numbers</h2>

            <Persons persons={persons} filterName={filterName}/>
        </div>
    )
}

export default App