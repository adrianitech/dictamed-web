Template.edit.events({
  'click .validate': function(event) {
    event.preventDefault();

    let id = this._id;
    let text = $('textarea').val()

    Transcripts.update({_id: id}, {
      $set: {
        translation: text,
        validated: true
      }
    });
  }
});

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

Template.edit.rendered = function() {
  let textarea = document.getElementById('text');
  let text = $('#text').val();

  var words = text.split(' ');

  for (var i = 0; i < words.length; i++) {
    if (words[i].length <= 3) {
      if (i + 1 < words.length) {
        words[i] = words[i] + ' ' + words[i + 1];
        words.splice(i + 1, 1);
      }
    }
  }

  console.log(words);

  audiojs.events.ready(function() {
    let as = audiojs.createAll();
    as[0].element.ontimeupdate = function() {

      if (as[0].paused) { return }

      let time = as[0].element.currentTime;
      let duration = as[0].element.duration;
      let progress = parseInt((words.length - 1) * time / duration);

      var start = 0;
      for (var i = 0; i < progress; i++) {
        start = start + words[i].length + 1;
      }

      let end = start + words[progress].length;

      setSelectionRange(textarea, start, end);
    };
  });
};
