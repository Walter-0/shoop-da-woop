Template.hello.events({

  'click li': function (event) {
    event.preventDefault();

    var currentArtist = $('#currentArtist span').html();
    var targetArtist = $('#targetArtist span').html();
    ///get the text of the clicked artist
    var nextArtist = $(event.target).text();


    HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&name=' + nextArtist + '&format=json&results=12&start=0',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          $('ul.artists').empty();
          //clear the list each click
          for (var i = 0; i < result.data.response.artists.length; i++) {
            //append 12 artists to the unordered list
            $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
          }
        }
      }
    );
    //replace current artist with next artist clicked
    $('#currentArtist span').empty().append(nextArtist);

    //http.get top track for new current artist
    function getArtistTracks(artistName) {
      HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=track&market=us&limit=1',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          var trackUrl = result.data.tracks.items[0].preview_url;
          var audio = $('#currentTrack');
          $('#currentTrack source').attr('src', trackUrl)
          audio[0].pause();
          audio[0].load();
          audio[0].oncanplaythrough = audio[0].play();
        }
      })
    }
    getArtistTracks(nextArtist);

    //http.get image for next artist
    function getArtistImages(artistName) {
      HTTP.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          var artistImageUrl = result.data.artists.items[0].images[0].url
          if (artistImageUrl) {
            //set the currentArtistImage url on the html
            $('#currentArtistImage').attr('src', artistImageUrl);
          }else {
            console.log('getting images failed');
          }
        }
      });
    };
    getArtistImages(nextArtist);
    //win condition
    if (nextArtist == targetArtist) {
      $('.flashWin').show();
      if (currentLevel == 1) { //level 1
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {level1: 1} });
      }else if (currentLevel == 2) { //level 2
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {level2: 1} });
      }else if (currentLevel == 3) { //level 3
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {level3: 1} });
      }
    }
  }

});
