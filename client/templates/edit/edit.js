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

function getWords(text) {
  var words = text.split(' ');

  for (var i = 0; i < words.length; i++) {
    if (words[i].length <= 3) {
      if (i + 1 < words.length) {
        words[i] = words[i] + ' ' + words[i + 1];
        words.splice(i + 1, 1);
      }
    }
  }

  return words;
}

Template.edit.rendered = function() {
  let textarea = document.getElementById('text');
  let translation = textarea.value;

  let words = getWords(translation);

  audiojs.events.ready(function() {
    let as = audiojs.createAll();
    as[0].element.ontimeupdate = function() {
      let i = as[0].element.currentTime;
      let n = as[0].element.duration;
      let x = parseInt((words.length - 1) * i / n);

      var start = 0;
      for (var j = 0; j < x; j++) {
        start = start + words[j].length + 1;
      }

      let end = start + words[x].length;

      setSelectionRange(textarea, start, end);
    };
  });
};
