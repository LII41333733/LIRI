//import modules and packages
const request = require("request")
const Spotify = require("node-spotify-api")
const moment = require("moment")

//turn on dotenv to load up environment variables from .env file
require("dotenv").config

const spotifyKeys = require("./keys.js")

//turn on new spotify app
// const spotify = new Spotify(spotifyKeys.spotify)

const command = process.argv.slice(2);

if (command[0] === 'movie-this') {

 const title = command[1] ? command[1] : "Mr.Nobody"

 request(`http://www.omdbapi.com/?t=${title}&apikey=a0b9b6ea`, function (error, response, body) {
  // console.log(JSON.parse(body))
  // console.log(JSON.parse(body))

  console.log(`-------------------------------------------`)
  console.log(`Movie title: ${JSON.parse(body).Title}`)
  console.log(`Year Released: ${JSON.parse(body).Year}`)
  console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`)
  console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`)
  console.log(`Country: ${JSON.parse(body).Country}`)
  console.log(`Language: ${JSON.parse(body).Language}`)
  console.log(`Plot: ${JSON.parse(body).Plot}`)
  console.log(`Actors ${JSON.parse(body).Actors}`)
  console.log(`-------------------------------------------`)
 });

}
