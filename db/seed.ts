import mongoose from 'mongoose'
import Movies from '../models/movies'
import Actors from '../models/actors'
import Users from '../models/users' //

// ! Invent an admin user
const adminUser = {
  "username": "alex",
  "email": "alex@alex.com",
  "password": "alex1234$A"
}

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
  console.log('Connected to the database! 🔥')

  // ! erase all movies from collection
  await Actors.deleteMany()
  await Users.deleteMany()
  await Movies.deleteMany()
  console.log('Remove existing data.')

  // ! add my seed user into the database
  const user = await Users.create(adminUser)

  // Create an actor
  const actorData = {name: 'Bruce Willis', user: user, image: "http://www.gstatic.com/tv/thumb/persons/673/673_v9_ba.jpg", movies: []}

  const actor = await Actors.create(actorData);
  const actorId = actor._id;

  // ! add my newly-added-into-database user into movieData array
  const movieData = { name: 'Diehard', actors: [actorId], user, year: 1988, image: "https://m.media-amazon.com/images/M/MV5BZDViZDAzMjAtY2E1YS00OThkLWE2YTMtYzBmYWRjMWY0MDhkXkEyXkFqcGdeQXRzdGFzaWVr._V1_QL75_UY281_CR19,0,500,281_.jpg" }  
  
    
  const movie = await Movies.create(movieData)
  
  // once we have created the movie, we need to update the actor with the movie
  await Actors.findByIdAndUpdate(actorId, {movies: [movie._id]}, {new: true})

  console.log('Here are the movies:')
  console.log(movie)

  console.log('Disconnecting 🤖..')
  await mongoose.disconnect()
}

seed()
