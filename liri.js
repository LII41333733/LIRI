require("dotenv").config();

const request = require("request")
const moment = require("moment")
const fs = require("fs")
const Spotify = require("node-spotify-api")
const spotifyKeys = require("./keys.js")
const spotify = new Spotify(spotifyKeys.spotify)

let command = process.argv.slice(2)[0];
let input;

writeToLog(`\n============================================================================================ \nCOMMAND: ${process.argv.slice(2).join(" ")} -- ${moment().format("LLLL")}`)

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
  request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, (err, response, data) => {
    if (err) { throw err }
    JSON.parse(data).forEach(event => {
      let logData = `------------------------------------------- \nVenue Name: ${event.venue.name} \nLocation: ${event.venue.city}, ${event.venue.region} \nDate of Event: ${moment(event.datetime).format("L")}`
      console.log(logData);
      writeToLog(logData);
    })
  })
}

function getMovie(input) {
  const title = input ? input : "Mr.Nobody"
  request(`http://www.omdbapi.com/?t=${title}&apikey=a0b9b6ea`, (err, response, data) => {
    if (err) { throw err }
    const e = JSON.parse(data);
    const rottenRating = e.Ratings[1] ? `Rotten Tomatoes Rating: ${e.Ratings[1].Value}` : `Rotten Tomatoes Rating: N/A`
    let logData = `------------------------------------------- \nMovie title: ${e.Title} \nYear Released: ${e.Year} \nIMDB Rating: ${e.Ratings[0].Value} \n${rottenRating} \nCountry: ${e.Country} \nLanguage: ${e.Language} \nPlot: ${e.Plot}\nActors ${e.Actors}`
    console.log(logData);
    writeToLog(logData)
  })
}

function getSong(input) {
  const song = input ? input : "The Sign Ace of Base"
  spotify.search({ type: 'track', query: song }, (err, data) => {
    if (err) { throw err }
    data.tracks.items.forEach((e, i) => {
      let logData =`------------------------------------------- \nName: ${e.name} \nArtist(s): ${(e.artists.reduce((a, c) => { a.push(c.name); return a }, [])).join(", ")} \nAlbum: ${e.album.name} \nURL: ${e.external_urls.spotify}`
      console.log(logData);
      writeToLog(logData)
    })
  })
}

function writeToLog(logData) {
  fs.appendFile('log.txt', `\n${logData}`, (err) => {
    if (err) { throw err; }
    // console.log(`Log updated!`)
  });
}