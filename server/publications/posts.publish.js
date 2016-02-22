Meteor.publish("posts", function (limit) {
  Counts.publish(this, 'count', Posts.find({}), {noReady: true});
  return Posts.find({}, {
    sort: {createdAt: -1},
    limit: parseInt(limit)
  });
});
