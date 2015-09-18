PlayersList = new Mongo.Collection('players');
currentLevel = 0;



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    return Meteor.methods({

      removeAllPosts: function() {

        return Level1.remove({});

      }

    });
  });
}
