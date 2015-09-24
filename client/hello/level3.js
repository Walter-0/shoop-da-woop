Template.hello.events({
  //start level 3
  'click h2.start3': function () {
    currentLevel = 3;
    var startArtist;

    //hide the genres
    $('.genre1').hide();
    $('.genre2').hide();
    //randomize start artist
    function getStartArtist () {
      startArtist = Math.floor((Math.random() * 7000) + 1);
      return startArtist;
    };

    function getTargetArtist () {
      //randomize target artist
      targetArtist = Math.floor((Math.random() * 7000) + 1);
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
            $('#currentArtist span').empty().append(result.data.response.artist.name);
            //get new artist if id does not exist
          }else{
            startArtist = Math.floor((Math.random() * 5000) + 1);
            getStartArtistName();
          }
        }
      });
    };

    //get request for start artist image
    //Image URLs are unreliable. Will continue to search for solutions
    // function getStartArtistImage () {
    //   HTTP.get('http://developer.echonest.com/api/v4/artist/images?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json&results=1',
    //   {},
    //   function (error, result) {
    //     if (result.statusCode === 200) {
    //       if(result.data.response.images){ //check if artist has an image file
    //         var currentImageUrl = result.data.response.images[0].url;
    //         //check if image URL is good
    //           function checkImage(src) {
    //             var img = new Image();
    //             img.onload = function() {
    //               // code to set the src on success
    //               $('#currentImage').attr('src', src)
    //             };
    //             img.onerror = function() {
    //               // doesn't exist or error loading
    //               $('#currentImage').attr('alt', 'No Image')
    //
    //             };
    //             img.src = src; // fires off loading of image
    //           }
    //           checkImage(currentImageUrl);
    //       }else{
    //         getStartArtistImage();
    //       }
    //     }
    //   })
    // };


    //get request for similar artists
    function getSimilarArtists () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/similar?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + startArtist + '&format=json&results=12&start=0',
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

    //get request for target artist
    function getTargetArtistName () {
      HTTP.get('http://developer.echonest.com/api/v4/artist/profile?api_key=X2VQTSJP3SIFYYMVT&id=7digital-US:artist:' + targetArtist + '&format=json',
      {},
      function (error, result) {
        if (result.statusCode === 200) {
          //continue if the artist id exists
          if (result.data.response.artist) {
            //clear current artist then update
            $('.targetArtist span').empty().append(result.data.response.artist.name)
          }else{
            targetArtist = Math.floor((Math.random() * 7000) + 1);
            getTargetArtistName();
          }
        }
      });
    };
    getStartArtist();
    getTargetArtist();
    getStartArtistName();
    getSimilarArtists();
    getTargetArtistName();
  }
});
