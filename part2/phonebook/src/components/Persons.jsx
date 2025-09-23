const Persons = ({ persons, filterName }) => {
    return (
        <>
            {persons.map(person => {
                if (person.name.toLowerCase().includes(filterName.toLowerCase())) {
                    return <p key={person.id}>{person.name} {person.number}</p>
                }
            })}
        </>
    )
}

export default Persons