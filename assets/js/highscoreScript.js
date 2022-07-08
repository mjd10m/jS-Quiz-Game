const highscorelistE1 = document.getElementById('highscore-content')

function populateHighscore() {
    debugger;
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
    highscoreItemE1.innerHTML = storedHighscores[0] + " - " + storedHighscores[1]
    highscorelistE1.appendChild(highscoreItemE1)


}
populateHighscore()