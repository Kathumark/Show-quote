var randomQuote = "As a man thinks in his heart, so he is.";
var randomAuthor = "Psalms";

$('#tweetbutton').click(function() {
  var message = (randomQuote + " (Author: " + randomAuthor + ")" );
  tweet(message);
})

function tweet(data) {
//call the tweet handler with complete quote + author
    window.open('https://twitter.com/intent/tweet?hashtags= freecodecamp&text=' + encodeURIComponent(data));
}

$('#quoteJSON').click(function() {
  // Sends a request to the server and registers the callback function to fire
  // when the data has been fetched, assigning the data to variables (next function)
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
    .done(update)
    .fail(handleErr);
});

$('#quoteAJAX').click(function() {
  $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
    })
    .done(update)
    .fail(handleErr);
});

function update(data) {
  randomQuote = data.quoteText;
  randomAuthor = data.quoteAuthor;
  //stringify adds . at start of string, remove it
  $('#quote').html(randomQuote);
  $('#author').html(randomAuthor);
  //console.log("quote is " + randomQuote);
}

function handleErr(jq, texterror, number) {
  console.log("An error occurred, with number " + number + " and text " + texterror);
}

window.twttr = (function(d, s, id) {

  var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "http://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));