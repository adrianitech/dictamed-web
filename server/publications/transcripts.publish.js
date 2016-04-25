Meteor.publish('transcripts', function() {
  return Transcripts.find();
});
