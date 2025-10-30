const Persons = ({ setMessage, deletePerson, persons, setPersons, filterName }) => {
    const deleteHandler = person => {
        if (window.confirm(`Do you wish to delete "${person.name}" from your contacts?`)) {
            deletePerson(person.id)
                .then(() => {
                    const updatedPersons = persons.filter(currentPerson => currentPerson.id !== person.id)
                    setPersons(updatedPersons)
                    setMessage({
                        message: `Removed ${person.name}`,
                        messageType: "success"
                    })
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
    }

    return (
        <>
            {persons.map(person => {
                if (person.name.toLowerCase().includes(filterName.toLowerCase())) {
                    return <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button></p>
                }
            })}
        </>
    )
}

export default Persons