const Persons = ({ deletePerson, persons, setPersons, filterName }) => {
    const deleteHandler = person => {
        if (window.confirm(`Do you wish to delete "${person.name}" from your contacts?`)) {
            deletePerson(person.id)
                .then(() => {
                    const updatedPersons = persons.filter(currentPerson => currentPerson.id !== person.id)
                    setPersons(updatedPersons)
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