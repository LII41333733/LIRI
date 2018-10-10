require("dotenv").config();

const request = require("request")
const moment = require("moment")
const fs = require("fs")
const Spotify = require("node-spotify-api")
const spotifyKeys = require("./keys.js")
const spotify = new Spotify(spotifyKeys.spotify)

let command = process.argv.slice(2)[0];
let input;

if (command === 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", (error, data) => {
    return error ? console.log(error) : (command = data.split(",")[0], input = data.split(",")[1], runProgram(command, input))
  })
} else { runProgram(); }

function runProgram(command = process.argv.slice(2)[0], input = process.argv.slice(3).join(" ")) {
  switch (command) {
    case 'movie-this':
      getMovie(input);
      break;
    case 'spotify-this-song':
      getSong(input);
      break;
    case 'concert-this':
      getConcert(input);
      break;
  }
}

function getConcert(input) {
  const artist = input ? input : "Pat Metheny"
  request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, (error, response, body) => {
    JSON.parse(body).forEach(event => {
      console.log(`-------------------------------------------`)
      console.log(`Venue Name: ${event.venue.name}`)
      console.log(`Location: ${event.venue.city}, ${event.venue.region}`)
      console.log(`Date of Event: ${moment(event.datetime).format("L")}`)
      console.log(`-------------------------------------------`)
    })
  });
}

function getMovie(input) {
  const title = input ? input : "Mr.Nobody"
  request(`http://www.omdbapi.com/?t=${title}&apikey=a0b9b6ea`, (error, response, body) => {
    console.log(`-------------------------------------------`)
    console.log(`Movie title: ${JSON.parse(body).Title}`)
    console.log(`Year Released: ${JSON.parse(body).Year}`)
    console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`)
    console.log(`Country: ${JSON.parse(body).Country}`)
    console.log(`Language: ${JSON.parse(body).Language}`)
    console.log(`Plot: ${JSON.parse(body).Plot}`)
    console.log(`Actors ${JSON.parse(body).Actors}`)
    console.log(`-------------------------------------------`)
  });
}

function getSong(input) {
  const song = input ? input : "The Sign Ace of Base"
  spotify.search({ type: 'track', query: song, limit: 1 }, (err, data) => {
    err ? console.log('Error occurred: ' + err) : (
      data.tracks.items.forEach((event, i) => {
        console.log(`-------------------------------------------`)
        console.log(`Name: ${data.tracks.items[0].name}`)
        console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`)
        console.log(`Album: ${data.tracks.items[0].album.name}`)
        console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`)
        console.log(`-------------------------------------------`)
      })
    )
  })
}