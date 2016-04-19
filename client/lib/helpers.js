Template.registerHelper('formatDate', function(date) {
  return moment(date).format('lll');
});
