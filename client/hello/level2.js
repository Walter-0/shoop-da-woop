//generate random number
//use number to select starting genre
//use number to get name of starting genre
//use name of starting genre to get 15 artists in starting genre
//select random starting artist from array
  //use starting artist name to get similar artists for user selection
//use name of starting genre to get similar genres
//select random target genre from similar genres
//use name of target genre to get artists in that genres
//select random target artist from array

Template.hello.events({
  //start level 2
  'click h2.start2': function () {
    currentLevel = 2;
    var genre1Name   = $('#genre1 span').html();
    var genre2Name   = $('#genre2 span').html();
    var startArtist  = $('#currentArtist span').html();
    var targetArtist = $('#targetArtist span').html();
    $('#genre1').show();
    $('#genre2').show();

    //generate random number between 1 and 1381
    function getGenre1Number () {
      numGenre1 = Math.floor((Math.random() * 1381) + 1); //total genres: 1381
      return numGenre1
    };

    //http.get starting genre
    function getGenre1Name (callback) {
      HTTP.get('http://developer.echonest.com/api/v4/genre/list?api_key=X2VQTSJP3SIFYYMVT&format=json&results=1381',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          callback(result.data.response.genres[numGenre1].name);
        }
      });
    };

    //http.get 15 artists of genre1
    function getGenre1Artists () {
      getGenre1Name(function (name) {
        genre1Name = name;
        genre1Artists = [];
        HTTP.get('http://developer.echonest.com/api/v4/genre/artists?api_key=X2VQTSJP3SIFYYMVT&format=json&results=15&name=' + genre1Name,
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //push artists to array
            for (var i = 0; i < result.data.response.artists.length; i++) {
              genre1Artists.push(result.data.response.artists[i].name)
            }
            //select random artist from genre1Artists array
            startArtist = genre1Artists[Math.floor(Math.random()*genre1Artists.length)];
            $('#currentArtist span').empty().append(startArtist);
            $('#genre1 span').empty().append(genre1Name);
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
                        //append similar artists to unordered list
                        $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
                      }
                    }else{
                      console.log('getting similar artists failed');
                    }
                  }
                }
              );
            })();
          }else {
            console.log('getting artists failed');
          }

          //http.get top track for start artist
          function getArtistTracks(artistName) {
            HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=track&market=us&limit=1',
            {},
            function (error, result) {
              if (result.statusCode === 200) {
                var trackUrl = result.data.tracks.items[0].preview_url;
                var audio = $('#currentTrack');
                $('#currentTrack source').attr('src', trackUrl)
                audio[0].pause();
                audio[0].load(); //suspends and restores all audio elements
                audio[0].oncanplaythrough = audio[0].play();
              }else{
                console.log('getting tracks failed');
              }
            });
          };
          getArtistTracks(startArtist);

          //http.get image for input artist
          function getArtistImages(artistName) {
            HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
            {},
            function (error, result) {
              if (result.statusCode === 200) {
                if (result.data.artists.items[0].images.length == 0)  {
                  console.log('no images, running again');
                  getGenre1Number();
                  getGenre1Artists();
                }
                var artistImageUrl = result.data.artists.items[0].images[0].url;
                  if (artistName == startArtist) {
                    //set the startArtistImage url on the html
                    $('#currentArtistImage').attr('src', artistImageUrl);
                  }
              }else {
                console.log('getting images failed');
              }
            })
          };
          getArtistImages(startArtist);
        });
      });
    };

    //THEN for the target genre

    //http.get similar genres to starting genre
    function getGenre2Name (callback) {
      getGenre1Name(function (name) {
        genre1Name = name;
        similarGenres = [];
        genre2Artists = [];
        HTTP.get('http://developer.echonest.com/api/v4/genre/similar?api_key=X2VQTSJP3SIFYYMVT&name='+ genre1Name,
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //iterate through all similar genres
            for (var i = 0; i < result.data.response.genres.length; i++) {
              //push similar genres to array
              similarGenres.push(result.data.response.genres[i].name)
            }
            //select random genre from similarGenres
            genre2Name = similarGenres[Math.floor(Math.random()*similarGenres.length)];

            HTTP.get('http://developer.echonest.com/api/v4/genre/artists?api_key=X2VQTSJP3SIFYYMVT&format=json&results=15&name=' + genre2Name,
            {},
            function (error, result) {
              if (result.statusCode === 200) {
                //push artists to array
                for (var i = 0; i < result.data.response.artists.length; i++) {
                  genre2Artists.push(result.data.response.artists[i].name)
                }
                //select random artist from genre2Artists array
                targetArtist = genre2Artists[Math.floor(Math.random()*genre2Artists.length)];
                //append targetArtist to html
                $('#targetArtist span').empty().append(targetArtist);
                $('#genre2 span').empty().append(genre2Name);
              }else{
                console.log('getting similar genres failed');
              }
              //http.get image for input artist
              function getArtistImages(artistName) {
                HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
                {},
                function (error, result) {
                  if (result.statusCode === 200) {
                    var artistImageUrl = result.data.artists.items[0].images[0].url
                    if (artistImageUrl) {
                      if (artistName == targetArtist) {
                        //set the targetArtistImage url on the html
                        $('#targetArtistImage').empty().attr('src', artistImageUrl);
                      }
                    }else {
                      console.log('getting images failed');
                    }
                  }
                });
              };
              getArtistImages(targetArtist);
            });
          };
        });
      })
    };



    getGenre1Number();
    getGenre1Artists();
    getGenre2Name();
  },

});
