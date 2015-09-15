if (Meteor.isClient) {


  Template.hello.helpers({
  });

  Template.hello.events({
    'click h2.start3': function () {
      //  when h2 is clicked

      //randomize start artist
      (function getStartArtist () {
        startArtist = Math.floor((Math.random() * 5000) + 1);
        console.log('start artist id: ' + startArtist);
        return startArtist;
      })();

      (function getTargetArtist () {
        //randomize target artist
        targetArtist = Math.floor((Math.random() * 5000) + 1);
        console.log('target artist id: ' + targetArtist);
      })();


      //get request for start artist
      (function getStartArtistName () {
        HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //continue if the artist id exists
            if (result.data.response.artist) {
              //clear current artist then update
              $('h2.currentArtist span').empty().append(result.data.response.artist.name);
              //get new artist if id does not exist
            }else{
              startArtist = Math.floor((Math.random() * 5000) + 1);
              console.log('new start artist id: ' + startArtist)
              getStartArtistName();
            }
          }
        });
        //get request for similar artists
        (function getSimilarArtists () {
          HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json&results=12&start=0',
            {},
            function (error, result) {
              if (result.statusCode === 200) {
                if (result.data.response.artists) {
                  //clear the list
                  $('ul.artists').empty();
                  for (var i = 0; i < result.data.response.artists.length; i++) {
                    //append artists to unordered list
                    $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
                  }
                }
              }
            }
          );
        })();

      })();

      //get request for target artist
      (function getTargetArtistName () {
        HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + targetArtist + '&format=json',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //continue if the artist id exists
            if (result.data.response.artist) {
              //clear current artist then update
              $('h2.targetArtist span').append(result.data.response.artist.name)
            }else{
              targetArtist = Math.floor((Math.random() * 5000) + 1);
              console.log('new target artist id: ' + targetArtist)
              getTargetArtistName();
            }
          }
        });
      })();
      $('h2.start').hide()
    },
    //start level 1
    'click h2.start1': function () {
      var genreName;
      //generate random number
      function getGenreNumber () {
        numGenre = Math.floor((Math.random() * 500) + 1); //total genres: 1381
        console.log('genre index number: ' + numGenre);
        return numGenre
      };
      //http.get genre with number genre/list
      function getGenreName (callback) {
        HTTP.get('http://developer.echonest.com/api/v4/genre/list?api_key=X2VQTSJP3SIFYYMVT&format=json&results=500',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            callback(result.data.response.genres[numGenre].name);
          }
        });
      };
      //http.get 15 artists of genre genre/artists
      function getGenreArtists () {
        getGenreName(function (name) {
          genreName = name;
          genreArtists = [];
          HTTP.get('http://developer.echonest.com/api/v4/genre/artists?api_key=X2VQTSJP3SIFYYMVT&format=json&results=15&name=' + genreName,
          {},
          function (error, result) {
            if (result.statusCode === 200) {
              console.log('genre is: ' + genreName);
              //push artists to array
              for (var i = 0; i < result.data.response.artists.length; i++) {
                genreArtists.push(result.data.response.artists[i].name)
              }
              console.log(genreArtists);
              //select random artist from genreArtists array
              var startArtist = genreArtists[Math.floor(Math.random()*genreArtists.length)];
              var targetArtist = genreArtists[Math.floor(Math.random()*genreArtists.length)];
              $('h2.currentArtist span').empty().append(startArtist);
              $('h2.targetArtist span').append(targetArtist);
              //invoke getSimilarArtists
              (function getSimilarArtists () {
                HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&name=' + startArtist + '&format=json&results=12&start=0',
                  {},
                  function (error, result) {
                    if (result.statusCode === 200) {
                      if (result.data.response.artists) {
                        //clear the list
                        $('ul.artists').empty();
                        for (var i = 0; i < result.data.response.artists.length; i++) {
                          //append artists to unordered list
                          $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
                        }
                      }
                    }
                  }
                );
              })();
            }else {
              console.log("something broke");
            }
          });
        });
      };
      getGenreNumber()
      getGenreArtists()
      //$('h2.start').hide()
    },

    'click h2.start2': function () {
      //generate random number
      //http.get genre with number genre/list
      //http.get 15 artists of genre genre/artist
      //append artists to array
      //generate random number between 0 and 15
      //select startartist with number
      //invoke getSimilarArtists
      //populate ul

      //THEN for the similar genre

      //http.get similar genres with same number genre/similar
      //http.get 15 artists of genre genre/artist
      //append artists to array
      //generate random number between 0 and 15
      //select targetartist with number

      $('h2.start').hide()
    },
    'click li': function (event) {
      event.preventDefault();
      ///get the text of the clicked artist
      nextArtist = $(event.target).text();

      HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&name=' + nextArtist + '&format=json&results=12&start=0',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            $('ul.artists').empty();
            //clear the list each click
            for (var i = 0; i < result.data.response.artists.length; i++) {
              //append 8 artists to the unordered list
              $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
            }
          }
        }
      );
      $('h2.currentArtist span').empty().append(nextArtist);
      var currentArtist = $('h2.currentArtist span').html();
      var targetArtist = $('h2.targetArtist span').html();
      if (currentArtist == targetArtist) {
        alert("ZOMG YOU WIN!!!")
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
