var api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

api.addCollection(Posts, {
  excludedEndpoints: ['delete', 'put']
});
