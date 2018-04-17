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
// PIERRE FEUILLE CISEAUX
