let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let msg_container = document.querySelector(".msg_container");

let turn0 = true;
const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box is clicked");
    if (turn0) {
      box.innerText = "0";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const checkWinner = () => {
  let isWinner = false;
  for (pattern of winningPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log(`winner ${pos1val}`);
        showWinner(pos1val);
        disabledBox();
        isWinner = true;
        return;
      }
    }
  }

  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false;
    }
  });

  if (isDraw && !isWinner) {
    showTie();
  }
};

const showTie = () => {
  msg.innerText = "It's a tie! Start a new game";
  msg_container.classList.remove("hide");
  resetBtn.disabled = true;
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations!! The Winner is ${winner}`;
  msg_container.classList.remove("hide");
  resetBtn.disabled = true;
};
const disabledBox = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
const enabledBox = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const resetGame = () => {
  turn0 = true;
  enabledBox();
  msg_container.classList.add("hide");
  resetBtn.disabled = false;
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
