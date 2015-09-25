Template.hello.events({

  'click h2.start':function () {
    $('.interface').removeClass('hideinterface')
    $('.flashWin').hide();

  },

  //start level 1

  'click h2.start1': function () {

    currentLevel = 1;
    $('.genre1').show();
    $('.genre2').show();

    var genreName;
    //generate random number
    function getGenreNumber () {
      numGenre = Math.floor((Math.random() * 1381) + 1); //total genres: 1381
      return numGenre
    };
    //http.get genre with number genre/list
    function getGenreName (callback) {
      HTTP.get('http://developer.echonest.com/api/v4/genre/list?api_key=X2VQTSJP3SIFYYMVT&format=json&results=1381',
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
            //push artists to array
            for (var i = 0; i < result.data.response.artists.length; i++) {
              genreArtists.push(result.data.response.artists[i].name)
            }
            //select random artist from genreArtists array
            var startArtist = genreArtists[Math.floor(Math.random()*genreArtists.length)];
            var targetArtist = genreArtists[Math.floor(Math.random()*genreArtists.length)];
            if (startArtist == targetArtist) {
              console.log('the artists were randomized again');
              getGenreArtists();
            }
            $('#currentArtist span').empty().append(startArtist);
            $('#targetArtist span').empty().append(targetArtist);
            $('#genre1 span').empty().append(genreName);
            $('#genre2 span').empty().append(genreName);

            //http.get top track for current artist only
            function getArtistTracks() {
              HTTP.get('https://api.spotify.com/v1/search?q=weezer&type=track&market=us&limit=1',
              {},
              function (error, result) {
                if (result.statusCode === 200) {
                  var trackUrl = result.data.tracks.items[0].preview_url;
                  console.log(trackUrl);
                  $('#currentTrack source').attr('src', trackUrl)
                }
              })
            }
            getArtistTracks();
            //http.get image for each artist
            function getArtistImages(artistName) {
              HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
              {},
              function (error, result) {
                if (result.statusCode === 200) {
                  var artistImageUrl = result.data.artists.items[0].images[0].url
                  if (artistImageUrl) {
                    if (artistName == startArtist) {
                      //set the startArtistImage url on the html
                      $('#currentArtistImage').attr('src', artistImageUrl);
                    }else if (artistName == targetArtist) {
                      //set the targetArtistImage url on the html
                      $('#targetArtistImage').attr('src', artistImageUrl);
                    }
                  }else {
                    console.log('getting images failed');
                  }
                }
              });
            }
            getArtistImages(startArtist);
            getArtistImages(targetArtist);

            //invoke getSimilarArtists
            (function getSimilarArtists () {
              HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&name=' + startArtist +'&format=json&results=12&start=0',
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
  },
});
