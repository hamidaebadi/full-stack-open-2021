const {gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks: [Book]!
      allBooksByGenre(genre: String!): [Book]
      allAuthors: [Author]!
      me: User
      userFavoriteBooks: [Book]
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]
      id: ID!
  }

  type Author {
      name: String!
      born: Int
      id: ID!
      bookCount: Int!
  }

  type User{
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Mutation {
    addBook(title: String!,
      author: String!,
      published: Int!,
      genres: [String!],
      ): Book!

    editAuthor(name: String!,
      setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription{
    bookAdded: Book!
  }
`
module.exports = typeDefs