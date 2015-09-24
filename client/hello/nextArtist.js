Template.hello.events({

  'click li': function (event) {
    event.preventDefault();

    var currentArtist = $('#currentArtist span').html();
    var targetArtist = $('#targetArtist span').html();

    ///get the text of the clicked artist
    nextArtist = $(event.target).text();

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
