const highscorelistE1 = document.getElementById('highscore-content')
const mmBtnE1 = document.getElementById('mm-btn')
const hsClearBtn = document.getElementById('clear-hs-btn')

mmBtnE1.addEventListener("click",loadHomePage)
hsClearBtn.addEventListener("click",hsClear)

function populateHighscore() {
    var storedHighscores = localStorage.getItem("scores");
    storedHighscores = JSON.parse(storedHighscores);

    console.log(storedHighscores)
  if (!storedHighscores) {
    return false;
  }
  for (var i = 0; i < storedHighscores.length; i++) {
    displayhighscore(storedHighscores[i]);

  }
}

function displayhighscore(storedHighscores) {
    var highscoreItemE1 = document.createElement("div");
    highscoreItemE1.innerHTML = storedHighscores.initials + " - " + storedHighscores.score
    highscorelistE1.appendChild(highscoreItemE1)


}

function loadHomePage() {
    window.location = 'index.html'
}

function hsClear() {
    localStorage.clear()
    location.reload()
}
populateHighscore()