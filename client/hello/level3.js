Template.hello.events({
  'click h2.start3': function () {
    var startArtist = null;
    //  when h2 is clicked

    //hide the genres
    $('.genre1').hide();
    $('.genre2').hide();
    //randomize start artist
    function getStartArtist () {
      startArtist = Math.floor((Math.random() * 5000) + 1);
      return startArtist;
    };

    function getTargetArtist () {
      //randomize target artist
      targetArtist = Math.floor((Math.random() * 5000) + 1);
    };


    //get request for start artist
    function getStartArtistName () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          //continue if the artist id exists
          if (result.data.response.artist) {
            //clear current artist then update
            $('.currentArtist span').empty().append(result.data.response.artist.name);
            //get new artist if id does not exist
          }else{
            startArtist = Math.floor((Math.random() * 5000) + 1);
            getStartArtistName();
          }
        }
      });
    };

    //get request for start artist image
    function getStartArtistImage () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/images?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json&results=1',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          if(result.data.response.images){
            var currentImageUrl = result.data.response.images[0].url;
            $('#currentImage').attr('src', currentImageUrl)
          }else{
            getStartArtistImage();
          }
        }
      })
    };

    //get request for similar artists
    function getSimilarArtists () {
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
    };

    //get request for target artist
    function getTargetArtistName () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + targetArtist + '&format=json',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          //continue if the artist id exists
          if (result.data.response.artist) {
            //clear current artist then update
            $('.currentArtist span').empty().append(result.data.response.artist.name)
          }else{
            targetArtist = Math.floor((Math.random() * 5000) + 1);
            getTargetArtistName();
          }
        }
      });
    };
    getStartArtist();
    getStartArtistName();
    getStartArtistImage();

  }
});
