Template.hello.events({
  //start level 3
  'click h2.start3': function () {
    currentLevel = 3;

    //hide the genres
    $('#genre1').hide();
    $('#genre2').hide();

    // function getStartArtistId () {
    //   //randomize start artist
    //   startArtistId = Math.floor((Math.random() * 7000) + 1);
    //   return startArtistId;
    // };
    //
    // function getTargetArtistId () {
    //   //randomize target artist
    //   targetArtistId = Math.floor((Math.random() * 7000) + 1);
    //   return targetArtistId;
    // };

    function getRandomOffset() {
      offset = Math.floor((Math.random() * 99999) + 1);
    };


    //get two random artists
    function getArtists() {
      HTTP.get('https://api.spotify.com/v1/search?query=year%3A0000-2015&offset=' + offset + '&limit=2&type=artist&market=US',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          console.log(result.data.artists.items);
          if (result.data.artists.items[0].images.length == 0 || result.data.artists.items[1].images.length == 0)  {
            console.log('no images, running again');
            getRandomOffset();
            getArtists();
          }
          var startArtistName = result.data.artists.items[0].name;
          var targetArtistName =  result.data.artists.items[1].name;
          //append names to html
          $('#currentArtist span').empty().append(startArtistName);
          $('#targetArtist span').empty().append(targetArtistName);

          var startArtistImageUrl = result.data.artists.items[0].images[0].url;
          var targetArtistImageUrl = result.data.artists.items[1].images[0].url;

          //append images to html
          $('#currentArtistImage').removeAttr('src').attr('src', startArtistImageUrl);
          $('#targetArtistImage').removeAttr('src').attr('src', targetArtistImageUrl);
        }
      }
    )};

    // //get request for start artist
    // function getStartArtistName () {
    //   HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtistId + '&format=json',
    //   {},
    //   function (error, result) {
    //     if (result.statusCode === 200) {
    //       //continue if the artist id exists
    //       if (result.data.response.artist) {
    //         //clear current artist then update
    //         startArtistName = result.data.response.artist.name;
    //         $('#currentArtist span').empty().append(startArtistName);
    //         //get new artist if id does not exist
    //       }else{
    //         startArtistId = Math.floor((Math.random() * 5000) + 1);
    //         getStartArtistName();
    //       }
    //     }
    //   });
    //   console.log('start artist name ' + startArtistName);
    // };

    //get request for similar artists
    function getSimilarArtists () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtistId + '&format=json&results=12&start=0',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            if (result.data.response.artists) {
              $('ul.artists').empty();
              for (var i = 0; i < result.data.response.artists.length; i++) {
                //append artists to unordered list
                $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>');
              };
            }
          }
        }
      );
    };

    // //get request for target artist
    // function getTargetArtistName () {
    //   HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + targetArtistId + '&format=json',
    //   {},
    //   function (error, result) {
    //     if (result.statusCode === 200) {
    //       //continue if the artist id exists
    //       if (result.data.response.artist) {
    //         //clear current artist then update
    //         targetArtistName = result.data.response.artist.name;
    //         $('#targetArtist span').empty().append(targetArtistName)
    //       }else{
    //         targetArtistId = Math.floor((Math.random() * 7000) + 1);
    //         getTargetArtistName();
    //       }
    //     }
    //   });
    // };

    //http.get top track for start artist
    // function getArtistTracks(artistName) {
    //   HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=track&market=us&limit=1',
    //   {},
    //   function (error, result) {
    //     if (result.statusCode === 200) {
    //       var trackUrl = result.data.tracks.items[0].preview_url;
    //       var audio = $('#currentTrack');
    //       $('#currentTrack source').attr('src', trackUrl)
    //       audio[0].pause();
    //       audio[0].load();
    //       audio[0].oncanplaythrough = audio[0].play();
    //     }
    //   })
    // };

    //http.get image for input artist
    function getArtistImages(artistName) {
      HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          if (result.data.artists.items[0]) {
            var artistImageUrl = result.data.artists.items[0].images[0].url;
            if (artistName == startArtistName) {
              //set the startArtistImage url on the html
              $('#currentArtistImage').removeAttr('src').attr('src', artistImageUrl);
            }else if (artistName == targetArtistName) {
              //set the targetArtistImage url on the html
              $('#targetArtistImage').removeAttr('src').attr('src', artistImageUrl);
            }
          }
        }
      });
    };
    getRandomOffset();
    getArtists();
    // getStartArtistId();
    // getTargetArtistId();
    // getStartArtistName();
    // getSimilarArtists();
    // getTargetArtistName();
    // getArtistTracks(startArtistName);
    // getArtistImages(startArtistName);
    // getArtistImages(targetArtistName);
  }
});
