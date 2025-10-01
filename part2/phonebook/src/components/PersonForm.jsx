const PersonForm = ({ createPerson, persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
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