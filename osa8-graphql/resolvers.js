const {UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.count(), //done
        authorCount: () => Author.collection.count(), //done
        allBooks: async () => Book.find().populate('author'), // done
        allBooksByGenre: async(root, args) => {
          if(args.genre === "all"){
            return await Book.find().populate('author')
          }
          return await Book.find({genres: {$in: [args.genre]}}).populate('author')
        }, // done
        allAuthors: async () => Author.find({}), // done
        me: (root, args, context) => context.currentUser, // done
        userFavoriteBooks: async (root, args, context) => {
          if(!context.currentUser){
            throw new AuthenticationError("User not Founded")
          }
          const faveBooks = await Book.find({genres: "programming"}).populate('author')
          return faveBooks
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
            pubsub.publish("BOOK_ADDED", {bookAdded: newBook})
            return newBook
          }catch(error){
            throw new UserInputError(error.message, {invalidArgs: args})
          }  
        }
        const newBook = new Book({author: foundedAuth.id, title: args.title, published: args.published, genres: args.genres})
        try{
          await newBook.save()
          pubsub.publish("BOOK_ADDED", {bookAdded: newBook})
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
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
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
    },

    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }
  }

module.exports = resolvers