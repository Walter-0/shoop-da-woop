Template.winnerboard.helpers({
  'player': function () {
    return PlayersList.find({}, {sort: {level3: -1, level2: -1, level1: -1, name:1} })
  },
  'selectedClass': function () {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer')
    if (playerId == selectedPlayer) {
      return 'selected'
    }
  }
});

Template.winnerboard.events({
  'click .player': function () {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    // var selectedPlayer = Session.get('selectedPlayer');
  },
    'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.remove(selectedPlayer);
  }
})
