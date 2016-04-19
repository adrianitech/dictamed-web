Meteor.publish("posts", function (limit) {
  return Posts.find({}, {
    sort: {
      validated: 1,
      createdAt: -1
    },
    limit: parseInt(limit)
  });
});
