Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notfound'
});

Router.route('/', {
  name: 'home',
  action: function() {
    this.render('home');
  },
  waitOn: function () {
    return Meteor.subscribe('posts');
  },
  data: function () {
    return Posts.find({}, {
      sort: {
        validated: 1,
        createdAt: -1,
      }
    });
  }
});

Router.route('/edit/:id', {
  name: 'edit',
  action: function() {
    this.render('edit');
  },
  waitOn: function () {
    return Meteor.subscribe('posts');
  },
  data: function () {
    return Posts.findOne({
      _id: this.params.id
    });
  }
});
