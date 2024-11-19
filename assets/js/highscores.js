// global
const main = document.getElementById("main-content");

const highScoresSection = document.getElementById("high-scores-section");

// getScores from local storage
const readFromLocalStorage = () => {
  // get from LS by key and parse
  const parsedData = JSON.parse(localStorage.getItem("highscores"));
  return parsedData;
};

// If no scores, return message
const displayScores = () => {
  const highScores = readFromLocalStorage();
  if (!highScores || highScores.length === 0) {
    highScoresSection.remove();

    const message = document.createElement("h2");
    message.setAttribute("class", "content");
    message.textContent = "There are no scores to display.";

    main.append(message);
  } else {
    // render table rows and add scores
    const tableHeader = document.getElementById("all-scores");

    highScores.forEach((highScore) => {
      const tableRow = document.createElement("tr");

      const tableName = document.createElement("td");
      tableName.textContent = highScore.userName;

      const tableScore = document.createElement("td");
      tableScore.textContent = highScore.score;

      tableHeader.append(tableRow);

      tableRow.append(tableName, tableScore);
    });
  }
};

// clear button click event listener
document.getElementById("clear-scores-button").addEventListener("click", () => {
  localStorage.clear();
  displayScores();
});

// document on load event listener
window.addEventListener("load", displayScores);
