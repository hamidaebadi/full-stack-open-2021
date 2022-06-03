const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const MONGODB_URI = 'mongodb+srv://fullstack:admin1234@cluster0.pwhrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
console.log("Connecting to database")
mongoose.connect(MONGODB_URI)
.then(()=>{
  console.log("Connected to MongoDB")
})
.catch((error)=> {
  console.log('error connection to MongoDB: ', error.message)
})

const typeDefs = gql`
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]!
      allAuthors: [Author]!
      me: User
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
`

const resolvers = {
  Query: {
      bookCount: async () => Book.collection.count(), //done
      authorCount: () => Author.collection.count(), //done
      allBooks: async (root, args) => {
          if (args.genre){
              return Book.find({genre: args.genre})
          }
          
          return Book.find({})
      }, // done
      allAuthors: async () => Author.find({}), // done

      me: (root, args, context) => {
        return context.currentUser
      }
  },
  
  Author: {
      bookCount: async (root) => {
        const num = await Book.find()
        .populate('author')
        
        const filtered = num.filter(b => b.author.name == root.name)
        return filtered.length
      } // done
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("Access Forbidden. Not Authenticated!")
      }
      const foundedAuth =  await Author.findOne({name: args.author})
      if(!foundedAuth){
        const newAuth = new Author({name: args.author, born: null})
        try{
          await newAuth.save()
          const newBook = new Book({author: newAuth.id, title: args.title, published: args.published, genres: args.genres})
          await newBook.save()
          return newBook
        }catch(error){
          throw new UserInputError(error.message, {invalidArgs: args})
        }  
      }
      const newBook = new Book({author: foundedAuth.id, title: args.title, published: args.published, genres: args.genres})
      try{
        await newBook.save()
        return newBook
      }catch(error){
        throw new UserInputError(error.message, {invalidArgs: args})
      }
    }, // done

    editAuthor: async(root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("Access Forbidden. Not Authenticated!")
      }
      const auth = await Author.findOne({name: args.name})
      auth.name = args.name
      auth.born = args.setBornTo

      try{
        await auth.save()
        return auth
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }, // done

    createUser: async(root, args) => {
      const user = new User({username: args.username, favoriteGenre: [args.favoriteGenre]})
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {invalidArgs: args})
      })
    },


    login: async(root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== "secret"){
        throw new UserInputError(error.message, {invalidArgs: args})
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})