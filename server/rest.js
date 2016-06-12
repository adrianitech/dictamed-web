var bodyParser = require('body-parser');

Picker.middleware(bodyParser.urlencoded());
Picker.middleware(bodyParser.raw());

var postRoutes = Picker.filter(function(req, res) {
  return req.method == 'POST';
});

var getRoutes = Picker.filter(function(req, res) {
  return req.method == 'GET';
});

var deleteRoutes = Picker.filter(function(req, res) {
  return req.method == 'DELETE';
});

postRoutes.route('/api/transcripts/upload/:id', function(params, req, res, next) {
  var FSFile = new FS.File();
  console.log(req.body);
  console.log(req.headers);
  FSFile.attachData(req.body, {type: req.headers.type}, function(err) {
    Audio.insert(FSFile, function (err, file) {
      Transcripts.update({_id: params.id}, {
        $set: { audio: '/cfs/files/audio/' + file._id }
      });

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({success: true}));
    });
  });
});

postRoutes.route('/api/transcripts', function(params, req, res, next) {
  let id = Transcripts.insert(req.body);
  let result = Transcripts.findOne({_id: id});

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
});

getRoutes.route('/api/transcripts', function(params, req, res, next) {
  let result = Transcripts.find().fetch();

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
});

deleteRoutes.route('/api/transcripts/:id', function(params, req, res, next) {
  Transcripts.remove({_id: params.id});

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({success: true}));
});
