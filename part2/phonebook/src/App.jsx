import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: 
                    <input 
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                    />
                </div>
                <div>
                    number:
                    <input 
                        value={newNumber}
                        onChange={(event) => setNewNumber(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}       
        </div>
    )
}

export default App