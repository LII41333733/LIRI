// ? Why can't I use 'if' statement to justify second rating existence
// ? How to limit 25 responses to 5 (if objects and not arrays)

require("dotenv").config();

const request = require("request")
const moment = require("moment")
const fs = require("fs")
const Spotify = require("node-spotify-api")
const spotifyKeys = require("./keys.js")
const spotify = new Spotify(spotifyKeys.spotify)

let command = process.argv.slice(2)[0];
let input;

console.log(moment().format())


if (command === 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", (error, data) => { 
    if (error) {
    }
    command = data.split(",")[0];
    input = data.split(",")[1];

    runProgram(command, input)
  })
}

runProgram();


function runProgram(command = process.argv.slice(2)[0], input = process.argv.slice(3).join(" ")) {
  
  switch(command) {
    case 'movie-this':
      getMovie();
      break;

    case 'spotify-this-song':
      getSong();
      break;

    case 'concert-this':
      getConcert();
      break;
  }
  
  function getConcert() {

    const artist = input ? input : "Pat Metheny"
    

    request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, (error, response, body) => {
      // console.log(JSON.parse(body))
      console.log(JSON.parse(body).forEach(event => {
        // console.log(event)

        console.log(`-------------------------------------------`)
        console.log(`Venue Name: ${event.venue.name}`)
        console.log(`Location: ${event.venue.city}, ${event.venue.region}`)
        console.log(`Date of Event: ${event.datetime}`)
        console.log(`-------------------------------------------`)

      }))
    });
  }


  function getMovie() {
  
    const title = input ? input : "Mr.Nobody"
    
    request(`http://www.omdbapi.com/?t=${title}&apikey=a0b9b6ea`, (error, response, body)  => {
      console.log(JSON.parse(body))
      
      console.log(`-------------------------------------------`)
      console.log(`Movie title: ${JSON.parse(body).Title}`)
      console.log(`Year Released: ${JSON.parse(body).Year}`)
      console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`)
      // var parsedBody = null;
      // if(body){
      //   parsedBody = JSON.parse(body)
      // }
      // if (parsedBody && parsedBody.Ratings && parsedBody.Ratings[1]) {
      //   console.log(JSON.parse(body))
      //   console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`)
      // }


      console.log(`Country: ${JSON.parse(body).Country}`)
      console.log(`Language: ${JSON.parse(body).Language}`)
      console.log(`Plot: ${JSON.parse(body).Plot}`)
      console.log(`Actors ${JSON.parse(body).Actors}`)
      console.log(`-------------------------------------------`)
    });

  }
    
  function getSong() {
  
    const song = input ? input : "The Sign Ace of Base"

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      const name = `Name: ${JSON.stringify(data["tracks"]["items"][0]["name"], null, 2)}`
      const artists = `Artist(s): ${JSON.stringify(data["tracks"]["items"][0]["artists"][0]["name"], null, 2)}`
      const album = `Album: ${JSON.stringify(data["tracks"]["items"][0]["album"]["name"], null, 2)}`
      const urlLink = `Preview Link: ${JSON.stringify(data["tracks"]["items"][0]["external_urls"]["spotify"], null, 2)}`
      
      console.log(`-------------------------------------------`)
      console.log(name)
      console.log(artists)
      console.log(album)
      console.log(urlLink)
      console.log(`-------------------------------------------`)
  
    });
  }
  

}






