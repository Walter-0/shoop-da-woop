# The Spotify Game
### (No longer maintained as of 10/4/15)
## The Next Great Time-Waster

## [Play Now](http://google.com/)

![The Game](/screenshots/screenshot.png?raw=true)


## What Is It?
The Spotify Game is an explorational game designed to test your music knowledge and discover new music. Users must click their way to a target artist by using the related artists as stepping stones.

## Example path between Taylor Swift and Deadmau5
- Taylor Swift
- Miley Cyrus
- Justin Beiber
- Jason Derulo
- Flo Rida
- David Guetta
- Swedish House Mafia
- Deadmau5

## Technologies Used
- [MeteorJS](http://www.meteor.com/): a relatively new, full-stack, open source platform for building web and mobile apps in pure JavaScript.
- [MongoDB](http://www.mongodb.org/): a free, open-source NoSQL database which is fully integrated into Meteor.
- [The Echo Nest API](http://developer.echonest.com/): offers an incredible array of music data and services for developers to build amazing apps and experiences.
- [The Spotify API](http://developer.spotify.com/web-api/): Web API endpoints that return metadata in JSON format about artists, albums, and tracks directly from the Spotify catalogue.


## Installation
- Download and install [meteor](https://www.meteor.com/).
- To create a new Meteor application, run `meteor create <app_name>` in a terminal window.
- `cd <app_name>` into the <app_name> directory.
- Type `meteor` to start the local server.
- In your browser, enter the url `localhost:3000`.


## Unsolved Problems
- No Mobile Design: This app needs to be redesigned in order to allow for an enjoyable experience on mobile devices.
- API Calls Too Slow: The HTTP requests for artist and genre data take several seconds and reduce the fluidity of the experience. Rate limits of the HTTP requests currently prevent the app from being used by multiple users simultaneously.
- HTML/Unicode Formatting : Artists with an '&' cannot be queried to get related artist list, but they can get the artist track and image. The Spotify API can handle '&', but the EchoNest API cannot.
  - The symbols '$', '@', '-' are working.

## API Issues
- Not only are some artists missing images and songs, some artists are linked to incorrect songs.
  - Ex: The artist Earth, a drone metal group, linked to Earth, Wind, and Fire's song September.
- Some artists are duplicated in their list of related artists because of punctuation differences.
  - Ampersands: Earth, Wind, and Fire vs Earth, Wind, & Fire
  - Apostrophes: Lil' Jon vs Lil Jon
  - Accent marks: Daphné vs Daphne
  - Spaces: J.Rabbit vs J. Rabbit
  - Multiple names: Alva Noto, alva.noto, and Noto
  - Missing 'A': Day at the Fair vs A Day At The Fair
- Some artists are linked to songs that are not theirs, but share the same or similar name.
  - The band The Ghost Inside, linked to a song titled The Ghost Inside, by Broken Bells.
  - The band Blitz linked to a song titled Ballroom Blitz, by Sweet .
  - The band Six Feet Under linked to a song titled Six Feet Under The Stars by All Time Low.
