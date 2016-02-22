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
    return Meteor.subscribe('posts', 10);
  },
});
