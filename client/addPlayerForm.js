Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    PlayersList.insert({
        name: playerNameVar,
        score: 0
    });
  }
});
