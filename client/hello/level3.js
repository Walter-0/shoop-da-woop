Template.hello.events({
  //start level 3
  'click h2.start3': function () {
    currentLevel = 3;

    //hide the genres
    $('#genre1').hide();
    $('#genre2').hide();

    function getRandomOffset() {
      offset = Math.floor((Math.random() * 99999) + 1);
    };


    //get two random artists and images
    function getArtists() {
      HTTP.get('https://api.spotify.com/v1/search?query=year%3A0000-2015&offset=' + offset + '&limit=2&type=artist&market=US',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          if (result.data.artists.items[0].images.length == 0 || result.data.artists.items[1].images.length == 0)  {
            console.log('no images, running again');
            getRandomOffset();
            getArtists();
          }
          startArtistId = result.data.artists.items[0].id;
          startArtistName = result.data.artists.items[0].name;
          targetArtistName =  result.data.artists.items[1].name;
          //append names to html
          $('#currentArtist span').empty().append(startArtistName);
          $('#targetArtist span').empty().append(targetArtistName);

          var startArtistImageUrl = result.data.artists.items[0].images[0].url;
          var targetArtistImageUrl = result.data.artists.items[1].images[0].url;

          //append images to html
          $('#currentArtistImage').removeAttr('src').attr('src', startArtistImageUrl);
          $('#targetArtistImage').removeAttr('src').attr('src', targetArtistImageUrl);
        }
        getSimilarArtists(startArtistId);
        getArtistTracks(startArtistName);
      }
    )};

    function getSimilarArtists (id) {
      HTTP.get('https://api.spotify.com/v1/artists/' + id + '/related-artists',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            if (result.data.artists) {
              $('ul.artists').empty();
              for (var i = 0; i < result.data.artists.length; i++) {
                //append artists to unordered list
                $('ul.artists').append('<li>' + result.data.artists[i].name + '</li>');
              };
            }else{
              console.log('getting similar artists failed');
            }
          }
        }
      );
    };

    //http.get top track for start artist
    function getArtistTracks(artistName) {
      HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=track&market=us&limit=1',
      {},
      function (error, result) {
        if (result.statusCode === 200) {

          //append song title to html
          var songTitle = result.data.tracks.items[0].name;
          $('#songTitle').html(songTitle);
          //append song url to html and play audio
          var trackUrl = result.data.tracks.items[0].preview_url;
          var audio = $('#currentTrack');
          $('#currentTrack source').attr('src', trackUrl)
          audio[0].pause();
          audio[0].load();
          audio[0].oncanplaythrough = audio[0].play();
        }
      })
    };

    getRandomOffset();
    getArtists();
  }
});
