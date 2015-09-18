Template.hello.events({

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
            //append 12 artists to the unordered list
            $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
          }
        }
      }
    );
    $('.currentArtist span').empty().append(nextArtist);
    var currentArtist = $('.currentArtist span').html();
    var targetArtist = $('.currentArtist span').html();
    if (currentArtist == targetArtist) {
      alert("ZOMG YOU WON!!!")
    }
  }

});
