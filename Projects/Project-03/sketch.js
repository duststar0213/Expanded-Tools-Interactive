

// An array of lines from a text file
var lines;

// The Markov Generator object
var markovs = [];

// These are the "orders" this example will support
var current = 3;
var start = 2;
var end = 11;

// Counting if the API calls are finished
var count = 0;
var total = 0;
var text="";
// For "loading animation"
var angle = 0;
var vehicle;
var vehicles = [];
var points;
var pt;
var font;
var generateAdv;

function preload() {
  font = loadFont('line.ttf');
  //song = loadSound('Assets/Nervous.mp3');
}

function setup() {

  // Make a canvas for a loading animation



  // Let's make a whole bunch of markov generators
  // All with different orders so we can use them whenever!
  for (var i = start; i < end; i++) {
    markovs[i] = new MarkovGenerator(i, 1000);
  }

  // Newest relationship advice posts
  var url = 'https://www.reddit.com/r/relationship_advice.json';
  loadJSON(url, gotPost);

  // Once we've got the data, I want to get all the posts
  // To ask for comments on each post
  function gotPost(data) {
    var posts = data.data.children;

    // This is how many posts there are!
    total = posts.length;

    // Make the API calls, these will need to be delayed to not
    // lock up the page and/or overwhelm the API
    for (var i = 0; i < posts.length; i++) {
      var id = posts[i].data.id;
      var newurl = 'https://www.reddit.com/r/relationship_advice/comments/' + id + '.json';

      // Instead of immediately calling loadJSON,
      // loadJSON(newurl, gotComments);
      // a separate function is used that will trigger the API call with a delay
      delayIt(newurl, i);

    }
  }

function draw() {
  background(0);
  
  fill(255);
  //text(text,width/2.height/2);

}
  function delayIt(url, i) {
    // Set when to query the API (every 200 milliseconds)
    setTimeout(getComments, i*200);

    // Do the API call
    function getComments() {
      loadJSON(url, gotComments);
    }
  }

  // Now we've got comments
  function gotComments(data) {
    var advice = data[1].data.children;
    // Feed in the text to all of the APIs!
    for (var i = 0; i < advice.length; i++) {
      for (var n = start; n < end; n++) {
        markovs[n].feed(advice[i].data.body);
      }
    }

    count++;
    // Once this has happened "total" times
    // all the API calls are done!
    if (count === total) {
      // Show the interface
      var inter = select('#interface');
      inter.show();
      // Hide the loading animation
      var loading = select('#loading');
      noLoop();
      loading.hide();
    }
  }

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);

  // This slider changes the "order" of the markov chain
  var slider = select('#slider');
  slider.input(changeOrder);

  // Regenerate the markov chain with new order value
  function changeOrder() {
    order = slider.value();
    // Update DOM element to show user changed value
    var span = select('#order');
    span.html(order);
  }


}


function generate() {
  // Display the generated text
  var output = select('#advice');
  text = markovs[current].generate();
 //var string =  text.toString();
 output.html(text);


  
}


