if (Meteor.isClient) {


  Template.hello.helpers({
  });

  Template.hello.events({
    'click h2.start': function () {
      //  when h2 is clicked

      //randomize start artist
      (function getStartArtist () {
        startArtist = Math.floor((Math.random() * 500) + 1);
        console.log('start artist id: ' + startArtist);
        return startArtist;
      })();

      (function getTargetArtist () {
        //randomize target artist
        targetArtist = Math.floor((Math.random() * 500) + 1);
        console.log('target artist id: ' + targetArtist);
      })();


      //get request for start artist
      (function getStartArtistName () {
        HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //continue if the artist id exists
            if (result.data.response.artist) {
              //clear current artist then update
              $('h2.currentArtist').empty().append('Current: ' + result.data.response.artist.name);
              //get new artist if id does not exist
            }else{
              startArtist = Math.floor((Math.random() * 500) + 1);
              console.log('new start artist id: ' + startArtist);
              getStartArtistName();
              //startArtist = Math.floor((Math.random() * 500) + 1);
            }
          }
        });
      })();

      //get request for target artist
      (function getTargetArtistName () {
        HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + targetArtist + '&format=json',
        {},
        function (error, result) {
          if (result.statusCode === 200) {
            //continue if the artist id exists
            if (result.data.response.artist) {
              //clear current artist then update
              $('h2.targetArtist').append('Target: ' + result.data.response.artist.name)
            }else{
              targetArtist = Math.floor((Math.random() * 500) + 1);
              console.log('new target artist id: ' + targetArtist);
              getTargetArtistName();
            }
          }
        });
      })();

      //get request for similar artists
      (function getSimilarArtists () {
        HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json&results=12&start=0',
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
      $('h2.start').hide()
    },
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
              //append 8 artists to the unordered list
              $('ul.artists').append('<li>' + result.data.response.artists[i].name + '</li>')
            }
          }
        }
      );
      $('h2.currentArtist').empty().append(nextArtist);
      var currentArtist = $('h2.currentArtist').html();
      console.log('current artist is: ' + currentArtist);
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
