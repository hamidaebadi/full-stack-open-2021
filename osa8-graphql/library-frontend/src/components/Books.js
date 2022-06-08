import { useLazyQuery} from '@apollo/client'
import {ALL_BOOKS_BY_GENRE} from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [getBooksByGenre, {loading, data}] = useLazyQuery(ALL_BOOKS_BY_GENRE)

  const handleByGenre = (event) => {
    event.preventDefault()
    getBooksByGenre({variables: {genre}})
  }

  if (!props.show) {
    return null
  }

  if(loading){
    return <div>loading...</div>
  }

  if(data){
    const filteredBooks = data.allBooksByGenre
    return (
      <div>
        <h2>books</h2>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <form onSubmit={handleByGenre}>
          <button type="submit" onClick={()=>setGenre("pattern")}>Pattern</button>
          <button type="submit" onClick={()=>setGenre("crime")}>Crime</button>
          <button type="submit" onClick={()=>setGenre("programming")}>Programming</button>
          <button type="submit" onClick={()=>setGenre("all")}>All genres</button>
        </form>
      </div>
    )
  }

  const books = props.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleByGenre}>
        <button type="submit" onClick={()=>setGenre("pattern")}>Pattern</button>
        <button type="submit" onClick={()=>setGenre("crime")}>Crime</button>
        <button type="submit" onClick={()=>setGenre("programming")}>Programming</button>
        <button type="submit" onClick={()=>setGenre("all")}>All genres</button>
      </form>
    </div>
  )
}

export default Books
