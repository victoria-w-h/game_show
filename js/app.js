// A word-guessing game.
// Players will click letters from an onscreen keyboard to try to guess a random phrase.
// The player’s goal is to guess all the letters in the phrase.
// A player can keep choosing letters until they make five incorrect guesses.
// Letters guessed correctly will appear in the phrase.
// Letters guessed incorrectly will be counted at the bottom of the screen.

// get elements from HTML

const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let heart = document.querySelectorAll(".tries img");
let missed = 0;
const startBtn = document.querySelector(".btn__reset");

startBtn.addEventListener("click", function () {
	document.getElementById("overlay").style.display = "none";
});

let phrases = [
	"a friendly dog",
	"an angry cat",
	"a fast tortoise",
	"a sneaky fox",
	"a confident lion",
];

function getRandomPhraseAsArray(arr) {
	// get random number between 0 and the length of the array provided in the argument this will be the index of the random phrase.
	const randomNumber = Math.floor(Math.random() * arr.length);
	// get value of random phrase by arr[randomNumber]
	const randomPhrase = arr[randomNumber];
	// split phrase into a new array of characters
	let newPhraseArr = randomPhrase.split("");
	// this function return the new character array
	return newPhraseArr;
}
const randomPhrase = getRandomPhraseAsArray(phrases);

const phraseUl = document.querySelector("#phrase ul");

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		let listItem = document.createElement("li");
		listItem.innerHTML = arr[i];
		phraseUl.appendChild(listItem);
		if (listItem.textContent != " ") {
			listItem.classList.add("letter");
		}
	}
}
addPhraseToDisplay(randomPhrase);
// console.log(phraseUl);

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
		// missed++;
		return null;
	}
}

keyboard.addEventListener("click", function (event) {
	// Check if the clicked element is a button and is not disabled
	if (event.target.tagName === "BUTTON" && !event.target.disabled) {
		event.target.classList.add("chosen");
		event.target.disabled = true;
		let letterFound = checkLetter(event.target.innerHTML);

		if (letterFound === null) {
			missed++;
			console.log(missed);

			console.log(heart[missed].src);
		}
	}
});
