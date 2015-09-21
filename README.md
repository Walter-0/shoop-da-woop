# The Spoti Game
## The Next Great Time-Waster

## [Play Now](http://the_spotify_game.meteor.com/)

![The Game](/screenshots/screenshot.png?raw=true)


## What Is It?
The Spoti Game is an explorational game designed to test your music knowledge and discover new music. Users must click their way to a target artist by using the related artists as stepping stones.

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
- [MeteorJS](https://www.meteor.com/): a relatively new, complete open source platform
for building web and mobile apps in pure JavaScript.
- [MongoDB](https://www.mongodb.org/): a free, open-source NoSQL database which is fully integrated into Meteor.
- [The Echo Nest API](http://developer.echonest.com/): offers an incredible array of music data and services for developers to build amazing apps and experiences. 


## Installation
- To create a new Meteor application, run `meteor create <app_name>`.
- `cd <app_name>` into the <app_name> directory.
- Type `meteor` to start the local server.
- In your browser, enter the url `localhost:3000`.


## User Stories
- As a user, I should be able to log in and save my scores, so that I can return to the same progress.
- As a user, I should be able to choose a level of difficulty, so I can feel comfortable with my current music knowledge.
- As a user, I should be able to click on related artists in order to reach the target artist.
- As a user, I should be able to have a similar experience on devices of all sizes, so that I can play the game on all my devices.


## Unsolved Problems
- No Images: Finding a reliable source of artist images was difficult, and because of that, there are currently no images displayed in the app.
- No Mobile Design: This app needs to be redesigned in order to allow for an enjoyable experience on mobile devices.
- API Calls Too Slow: The HTTP requests for artist and genre data take several seconds and reduce the fluidity of the experience. Rate limits of the HTTP requests currently prevent the app from being used by multiple users simultaneously.
