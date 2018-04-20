// HORLOGE NUMERIQUE
var d, h, m, s, animate;

function init() {
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  clock();
};

function clock() {
  s++;
  if (s == 60) {
    s = 0;
    m++;
    if (m == 60) {
      m = 0;
      h++;
      if (h == 24) {
        h = 0;
      }
    }
  }
  $("sec", s);
  $("min", m);
  $("hr", h);
  animate = setTimeout(clock, 1000);
};

function $(id, val) {
  if (val < 10) {
    val = "0" + val;
  }
  document.getElementById(id).innerHTML = val;
};

window.onload = init;
// TO-DO LIST
function removeItem(item) {
  item.target.parentElement.removeChild(item.target);
}
var button = document.getElementById("enter"),
  ul = document.querySelector("ul"),
  input = document.getElementById("user-input"),
  inputLength = function() {
    return input.value.length
  },
  createListElement = function() {
    li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    li.onclick = removeItem;
  }
button.addEventListener("click", function() {
  if (inputLength() > 0) {
    createListElement()
  }
})
input.addEventListener("keypress", function(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    var li = document.createElement("li");
    createListElement()
  }
})

// SLIDER
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
}
// PIERRE FEUILLE CISEAUX
var score = 0;
var playerChoice;

var readable = {
  "0": "Pierre",
  "1": "Feuille",
  "2": "Ciseaux"
};
/* console.log("cpuChoice", cpuChoice);*/
var cpuChoice = {
  init: function() {
    this.store = Math.floor(Math.random() * 3);
    this.text = readable[this.store];
  },
  store: "",
  text: ""
};

var order = [0, 1, 2, 0];

var chooseWinner = function(player, cpu) {
  if (order[player] === order[cpu]) {
    return "Match nul !";
  }
  if (order[player] === order[cpu + 1]) {
    score++;
    return "Gagné !";
  } else {
    score--;
    return "Perdu !";
  }
}

var paragraph = document.querySelector("p");
var assignClick = function(tag, pos) {
  tag.addEventListener("click", function() {
    playerChoice = pos;
    cpuChoice.init();
    paragraph.innerText = "L'ordinateur a choisi " + cpuChoice.text;
    paragraph.innerText += "\n" + chooseWinner(playerChoice, cpuChoice.store);
    paragraph.innerText += "\n" + "Score : " + score;
  });
}
var images = {
  tags: document.getElementsByClassName("pfc"),
  init: function() {
    for(var step = 0; step < this.tags.length; step++) {
      assignClick(this.tags[step], step);
    }
  }
};
images.init();
/*
cpuChoice.init();
console.log("cpuchoice:", cpuChoice.store, cpuChoice.text);
*/


// GIPHY API

var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=hJToyBK6KEAlxrrBVe7oU7NX2l0wIaz0";
var query = "&q=+";
var input;
var url;

function setup() {
  noCanvas();
  var button = select("#submit");
  button.mousePressed(createUrl);
//  var url = api + apiKey + query;
//  loadJSON(url, gotData);
}

function createUrl() {
  input = select("#search").value();
  url = api + query + input + apiKey;
  removeElements();
  loadJSON(url, gotData, 'jsonp');
  console.log(url);
}
function gotData(giphy) {
  for (var i = 0; i < 7; i++)
  var img = createImg(giphy.data[i].images.fixed_height.url);
  img.parent("gifs");
}
