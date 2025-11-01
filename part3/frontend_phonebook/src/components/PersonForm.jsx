const PersonForm = ({ setMessage, createPerson, updatePerson, persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName.trim(),
            number: newNumber.trim()
        }

        const personExists = persons.find(person => person.name === newName.trim())

        if (personExists) {
            if (personExists.number === newPerson.number) {
                setMessage({
                    message: `No update: ${newPerson.number} is already ${personExists.name}'s current number.`,
                    messageType: "error"
                })
                setInterval(() => {
                    setMessage(null)
                }, 5000)
            } else {
                if (window.confirm(`${personExists.name} is already added to the phonebook, replace the old number with a new one?`)) {
                    updatePerson(personExists.id, newPerson)
                        .then(editedPerson => {
                            setPersons(persons.map(person => person.name === editedPerson.name ? editedPerson : person))
                            setNewName('')
                            setNewNumber('')
                            setMessage({
                                message: `Changed ${editedPerson.name}'s number to ${editedPerson.number}`,
                                messageType: "success"
                            })
                            setInterval(() => {
                                setMessage(null)
                            }, 5000)
                        })
                        .catch(() => {
                            setMessage({
                                message: `Information of ${personExists.name} has already been removed from server`,
                                messageType: "error"
                            })
                            setInterval(() => {
                                setMessage(null)
                            }, 5000)
                            setNewName('')
                            setNewNumber('')
                        })

                    return
                }
            }

            return
        }

        createPerson(newPerson)
            .then(addedPerson => {
                setPersons(persons.concat(addedPerson))
                setNewName('')
                setNewNumber('')
                setMessage({
                    message: `Added ${addedPerson.name}`,
                    messageType: "success"
                })
                setInterval(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                console.log(error)
                setMessage({
                    message: error.response.data.error,
                    messageType: "error"
                })
                setInterval(() => {
                    setMessage(null)
                }, 5000)
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