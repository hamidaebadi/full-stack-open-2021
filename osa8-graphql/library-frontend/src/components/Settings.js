import Select from 'react-select'
import {useQuery, useMutation} from '@apollo/client'
import {All_AUTHORS, UPDATE_AUTHOR} from '../queries'
import { useState } from 'react'

const Settings = (props) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [year, setYear] = useState('')
    const authorResult = useQuery(All_AUTHORS)
    const [updateAuthorBornYear] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{query: All_AUTHORS}]
    })

    const authors = authorResult.data.allAuthors
    const options = []
    authors.map(a => options.push({value: a.name, label: a.name}))

    if(!props.show){
        return null
    }

    const updateAuthor = async(event) => {
        event.preventDefault()
        const bornInted = parseInt(year)
        updateAuthorBornYear({ variables: {name: selectedOption.value, setBornTo: bornInted}})
        setYear('')
    }

    return(
        <>
        <h3>Set Birthyear</h3>
        <form onSubmit={updateAuthor}>
            <Select value={selectedOption} options={options} onChange={setSelectedOption}/>
            <div>
                <strong>Set Born to: </strong>
                <input type="text" value={year} onChange={({ target }) => setYear(target.value)}/>
            </div>
            
            <button type="submit">Update Author</button>
        </form>
        
        </>
    )
}

export default Settings