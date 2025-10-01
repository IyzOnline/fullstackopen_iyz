const PersonForm = ({ createPerson, updatePerson, persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        const personExists = persons.find(person => person.name === newName)

        if (personExists) {
            if (window.confirm(`${personExists.name} is already added to the phonebook, replace the old number with a new one?`)) {
                updatePerson(personExists.id, newPerson)
                    .then(editedPerson => {
                        setPersons(persons.map(person => person.name === editedPerson.name ? editedPerson : person))
                        setNewName('')
                        setNewNumber('')
                    })
                return
            }
            
            return
        }

        createPerson(newPerson)
            .then(addedPerson => {
                setPersons(persons.concat(addedPerson))
                setNewName('')
                setNewNumber('')
            })
    }
    
    return (
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
    )
}

export default PersonForm