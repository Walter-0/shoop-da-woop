if (Meteor.isClient) {


  Template.hello.helpers({
  });

  Template.hello.events({
    'click h2.start': function () {
      //  when h2 is clicked
      inputArtist = $('input.inputArtist').val();
      HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + inputArtist + '&format=json',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          $('h2.currentArtist').empty().append(result.data.response.artist.name);

        }
      });

      HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + inputArtist + '&format=json&results=8&start=0',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            $('ul.artists').empty();
            //clear the list each click
            for (var i = 0; i < result.data.response.artists.length; i++) {
              //append artists to unordered list
              $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
            }
          }
        }
      );
    },
    'click li': function (event) {
      event.preventDefault();
      ///get the text of the clicked artist
      nextArtist = $(event.target).text();

      HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + nextArtist + '&format=json&results=8&start=0',
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
      $('h2.currentArtist').empty().append(nextArtist);
      var currentArtist = $('h2.currentArtist').html();
      console.log('current artist is: ' + currentArtist);
      var targetArtist = Math.floor((Math.random() * 100) + 1);
      console.log('target artist is: ' + targetArtist);
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
