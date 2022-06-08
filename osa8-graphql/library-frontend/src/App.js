import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Settings from './components/Settings'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import {useQuery, useApolloClient, useSubscription} from '@apollo/client'
import {All_AUTHORS, ALL_BOOKS, USER_FAVORITE_BOOKS, BOOK_ADDED} from './queries'


const App = () => {
  const [token, setToken] = useState(null)
  const result = useQuery(All_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const userFaveBooks = useQuery(USER_FAVORITE_BOOKS)

  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert("Book added")
    }
  })

  if(!token){
    if(result.loading || booksResult.loading){
      return <div>Loading ...</div>
    }
    return(
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('loginform')}>Login</button>
      </div>
      <Authors show={page === 'authors'} authors={result.data.allAuthors}/>
      <Books show={page === 'books'} allBooks={booksResult.data.allBooks}/>
      <LoginForm show={page === 'loginform'} setToken={setToken}/>
    </div>
    )
  }else{

    if(result.loading || booksResult.loading){
      return <div>Loading ...</div>
    }
    
    const logout = () =>{
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={()=>setPage('recommended')}>Recommended</button>
          <button onClick={() => setPage('settings')}>Settings</button>
          <button onClick={logout}>logout</button>
        </div>

        <Authors show={page === 'authors'} authors={result.data.allAuthors}/>
  
        <Books show={page === 'books'} allBooks={booksResult.data.allBooks}/>
  
        <NewBook show={page === 'add'} />

        <Recommended show={page === 'recommended'} faveBooks={userFaveBooks.data.userFavoriteBooks}/>
  
        <Settings show={page === 'settings'}/>
      </div>
    )
  }
 
}

export default App
