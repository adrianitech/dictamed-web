Meteor.publish("posts", function (limit) {
  Counts.publish(this, 'count', Posts.find({}), {noReady: true});
  return Posts.find({}, {
    sort: {
      validated: 1,
      createdAt: -1
    },
    limit: parseInt(limit)
  });
});

Meteor.publish("validPosts", function () {
  return Posts.find({validated: true});
});
