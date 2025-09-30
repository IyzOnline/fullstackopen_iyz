import { useState, useEffect } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
       axios
        .get('http://localhost:3001/persons')
        .then(response => setPersons(response.data))
    }, [])

    return(
        <div>
            <h2>Phonebook</h2>

            <Filter filterName={filterName} setFilterName={setFilterName}/>

            <h2>add a new</h2>

            <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

            <h2>Numbers</h2>

            <Persons persons={persons} filterName={filterName}/>
        </div>
    )
}

export default App