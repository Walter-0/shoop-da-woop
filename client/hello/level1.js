Template.hello.events({
  //start level 1
  'click h2.start1': function () {
    if (true) {

    }
    currentLevel = 1;
    $('.genre1').show();
    $('.genre2').hide();

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
            $('.currentArtist span').empty().append(startArtist);
            $('.targetArtist span').empty().append(targetArtist);
            $('h2.genre1 span').empty().append(genreName);
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
  },
});
