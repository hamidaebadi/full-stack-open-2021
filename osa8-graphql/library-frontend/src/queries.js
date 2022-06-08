import {gql} from '@apollo/client'
export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]){
  addBook(title: $title
    author: $author,
    published: $published,
    genres: $genres){
      title
    }
}
`

export const All_AUTHORS = gql `
query allAuthors{
  allAuthors{
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks{
  allBooks{
    title
    author{
      name
    }
    published
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation updateAuthorBornYear($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo){
    name
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const ALL_BOOKS_BY_GENRE = gql`
query allBooksByGenre($genre: String!){
  allBooksByGenre(genre: $genre){
    title
    author{
      name
    }
    published
  }
}
`

export const USER_FAVORITE_BOOKS = gql`
query userFavoriteBooks{
  userFavoriteBooks{
    title
    author{
      name
    }
    published
  }
}
`


export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
  }
}

`
