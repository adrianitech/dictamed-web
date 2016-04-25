var api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

api.addCollection(Transcripts, {
  excludedEndpoints: ['delete', 'put']
});

var Busboy = require('busboy');

Router.onBeforeAction(function (req, res, next) {
    var files = []; // Store files in an array and then pass them to request.
    var image = {}; // crate an image object

    if (req.method === "POST") {
        var busboy = new Busboy({ headers: req.headers });
        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
            image.mimeType = mimetype;
            image.encoding = encoding;
            image.filename = filename;

            // buffer the read chunks
            var buffers = [];

            file.on('data', function(data) {
                buffers.push(data);
            });
            file.on('end', function() {
                // concat the chunks
                image.data = Buffer.concat(buffers);
                // push the image object to the file array
                files.push(image);
            });
        });

        busboy.on("field", function(fieldname, value) {
            req.body[fieldname] = value;
        });

        busboy.on("finish", function () {
            // Pass the file array together with the request
            req.files = files;
            next();
        });
        // Pass request to busboy
        req.pipe(busboy);
    }
    else{
        this.next();
    }
});
Router.route('/api/upload/:id',function() {
  var file = this.request.files[0];
  var tId = this.params.id;

  var FSFile = new FS.File();
  FSFile.attachData(file.data, {type: file.mimeType}, function(err) {
      FSFile.name(file.filename);
      Audio.insert(FSFile, function (err, fileObj) {
        Transcripts.update({_id: tId}, {
          $set: {
            audio: '/cfs/files/audio/' + fileObj._id + '/audio.wav'
          }
        })
      });
  });
}, {where: 'server'});
