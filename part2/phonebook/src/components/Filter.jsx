const Filter = ({ filterName, setFilterName}) => {
    return (
        <div>
            filter shown with
            <input 
                value={filterName}
                onChange={(event) => setFilterName(event.target.value)}
            />
        </div>
    )
}

export default Filter