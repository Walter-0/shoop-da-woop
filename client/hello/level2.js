Template.hello.events({
  //start level 2
  'click h2.start2': function () {
    currentLevel = 2;
    var genre1Name;
    var genre2Name;
    $('.genre1').show();
    $('.genre2').show();

    //generate random number
    function getGenre1Number () {
      numGenre1 = Math.floor((Math.random() * 1381) + 1); //total genres: 1381
      return numGenre1
    };

    //http.get genre1 with number genre/list
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
            var startArtist = genre1Artists[Math.floor(Math.random()*genre1Artists.length)];
            $('.currentArtist span').empty().append(startArtist);
            $('h2.genre1 span').empty().append(genre1Name);
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
                    }
                  }
                }
              );
            })();
          }else {
            console.log("oh no!");
          }
        });
      });
    };
    //THEN for the similar genre

    //http.get similar genres to genre1
    function getGenre2Name (callback) {
      getGenre1Name(function (name) {
        genre1Name = name;
        similarGenres = [];
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
            callback(genre2Name);
          }else{
            console.log("it didn't work");
          }
        });
      });
    };

    //http.get 15 artists of genre2
    function getGenre2Artists () {
      getGenre2Name(function (name) {
        genre2Name = name;
        genre2Artists = [];
          HTTP.get('http://developer.echonest.com/api/v4/genre/artists?api_key=X2VQTSJP3SIFYYMVT&format=json&results=15&name=' + genre2Name,
          {},
          function (error, result) {
            if (result.statusCode === 200) {
              //push artists to array
              for (var i = 0; i < result.data.response.artists.length; i++) {
                genre2Artists.push(result.data.response.artists[i].name)
              }
              //select random artist from genre2Artists array
              var targetArtist = genre2Artists[Math.floor(Math.random()*genre2Artists.length)];
              //append targetArtist to html
              $('.targetArtist span').empty().append(targetArtist);
              $('h2.genre2 span').empty().append(genre2Name);
            }else {
              console.log("something broke");
            }
          });
      })
    };
    getGenre1Number()
    getGenre1Artists()
    getGenre2Name()
    getGenre2Artists()
  },

});
