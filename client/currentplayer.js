Template.currentplayer.helpers({
  'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)
  }
});
