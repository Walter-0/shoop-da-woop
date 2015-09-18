# The Spotify Game
The Next Great Time-Waster

http://the_spotify_game.meteor.com/

![The Game](/screenshots/screenshot.png?raw=true)

## Technologies Used
- MeteorJS, a relatively new full-stack javascript framework.
- MongoDB, which is fully integrated into Meteor.
- The Echo Nest API, for artist and genre data.


## Installation
- To create a new Meteor application, run `meteor create <app_name>`.
- `cd <app_name>` into the <app_name> directory.
- Type `meteor` to start the local server.
- In your browser, enter the url `localhost:3000`.


## User Stories


## Unsolved Problems
- No Images: Finding a reliable source of artist images was difficult, and because of that, there are currently no images displayed in the app.
- No Mobile Design: This app needs to be redesigned in order to allow for an enjoyable experience on mobile devices.
- API Calls Too Slow: The HTTP requests for artist and genre data take several seconds and reduce the fluidity of the experience. Rate limits of the HTTP requests currently prevent the app from being used by multiple users simultaneously.
