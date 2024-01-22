// Get elements from document

const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let heart = document.querySelectorAll(".tries img");
let overlay = document.getElementById("overlay");
const phraseUl = document.querySelector("#phrase ul");
const startBtn = document.querySelector(".btn__reset");

// PHRASES = An array of 5 strings has been created for the phrases only including letters and spaces

let phrases = [
	"a friendly dog",
	"an angry cat",
	"a fast tortoise",
	"a sneaky fox",
	"a confident lion",
];

//To start game
startBtn.addEventListener("click", function () {
	overlay.style.display = "none";
});

// to get a random phrase as an array
function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * arr.length);
	const randomPhrase = arr[randomNumber];
	let newPhraseArr = randomPhrase.split("");
	return newPhraseArr;
}
function startGame() {
	const randomPhrase = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(randomPhrase);
}
// addphrasetodisplay

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		let listItem = document.createElement("li");
		listItem.innerHTML = arr[i];
		phraseUl.appendChild(listItem);
		if (listItem.textContent === " ") {
			listItem.classList.add("space");
		} else {
			listItem.classList.add("letter");
		}
	}
}

// check button clicked by user

function checkLetter(btnClicked) {
	let letterArr = document.querySelectorAll(".letter");
	matchedLetterCount = 0;
	letterArr.forEach((letter) => {
		let current = letter.innerHTML.toLowerCase();
		if (current === btnClicked) {
			letter.classList.add("show");
			matchedLetterCount += 1;
			// console.log(current);
		}
	});
	if (matchedLetterCount === 0) {
		return null;
	}
}
let missed = 0;

keyboard.addEventListener("click", function (event) {
	// Check if the clicked element is a button and is not disabled
	if (event.target.tagName === "BUTTON" && !event.target.disabled) {
		event.target.classList.add("chosen");
		event.target.disabled = true;

		const buttonLetter = event.target.innerHTML;
		const letterFound = checkLetter(buttonLetter);

		if (letterFound === null) {
			missed++;
			heart[missed - 1].src = "images/lostHeart.png";
		}
	}
	checkWin();
});

function checkWin() {
	const total = document.querySelectorAll(".letter");
	const shown = document.querySelectorAll(".show");
	// if (missed >= 5) {
	// 	console.log("game over");
	// 	overlay.className = "lose";
	// }
}

function checkWin() {
	const total = document.querySelectorAll(".letter");
	const shown = document.querySelectorAll(".show");
	const title = document.querySelector(".title");
	if (shown.length === total.length) {
		overlay.className = "win";
		overlay.style.display = "flex";
		startBtn.textContent = "Play again!";
		title.textContent = "You win!";
	} else if (missed >= 5) {
		overlay.className = "lose";
		overlay.style.display = "flex";
		startBtn.textContent = "Try Again";
		title.textContent = "You lose!";
	}
}
//start game
startBtn.addEventListener("click", () => {
	if (startBtn.textContent === "Start Game") {
		startGame();
		overlay.style.display = "none";
	} else {
		resetGame();
		startGame();
		overlay.style.display = "none";
	}
});
//reset game
function resetGame() {
	missed = 0;
	while (phraseUl.firstChild) {
		phraseUl.removeChild(phraseUl.firstChild);
	}
	for (let i = 0; i < heart.length; i += 1) {
		heart[i].src = "images/liveHeart.png";
	}
	const keyboardButtons = document.querySelectorAll("#qwerty button");
	for (let i = 0; i < keyboardButtons.length; i += 1) {
		keyboardButtons[i].classList.remove("chosen");
		keyboardButtons[i].classList.remove("wrong");
		keyboardButtons[i].removeAttribute("disabled");
	}
}
