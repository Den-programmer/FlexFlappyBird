"use strict"

const gameMenu = document.querySelector(".menu-app")
const btnStart = document.querySelectorAll(".menu-app__btnStart")

const skinsMenu = document.querySelector(".skins-menu")
const btnSkins = document.querySelector(".menu-app__btnSkins")

btnStart.forEach(item => {
	item.addEventListener('click', startGame)
})
btnSkins.addEventListener('click', goToSkins)

const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

// Canvas size!

cvs.width = 288
cvs.height = 512

// Load images!

const pipesImages = [
	{
		pipeUp: "images/pipeUp.png",
		pipeBottom: "images/pipeBottom.png"
	},
	{
		pipeUp: "images/pipeUpRoman.png",
		pipeBottom: "images/pipeBottomRoman.png"
	}
]

const birds = [
	"images/birds/flappy_bird.png",
	"images/birds/flappy_bird2.png",
	"images/birds/flappy_bird3.png",
	"images/birds/flappy_bird4.png",
	"images/birds/estarossa.png",
	"images/birds/DarthMaul.png",
	"images/birds/lightningMCQUEEN95BirdFlappy.png",
	"images/birds/HarryPotter2.png",
]

let chosenPipesIndex = 0

let chosen_bird = 0

window.onbeforeunload = function(e) {
	if(localStorage) {
		localStorage["chosen_bird_index"] = chosen_bird
	}
}

window.onload = function() {
	if(localStorage) {
		let savedBird = localStorage["chosen_bird_index"]
		if(savedBird !== null) chosen_bird = localStorage["chosen_bird_index"]
	}
}

const birdSkins = birds.map((str, index) => {
	const image = document.createElement(`img`)
	image.classList.add("skin_img") 
	image.src = str 
	image.id = index
	image.addEventListener('click', (e) => {
		chosen_bird = Number(e.target.getAttribute("id"))
		renderBirdSkins(chosen_bird)
	})
	return image
})

const bird = new Image()
const bg = new Image()
const bgNewYorkCity1 = new Image()
const romanEmpire_bg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

function uploadImages () {
	bird.src = birds[chosen_bird]
	bg.src = "images/Backgrounds/bg.png",
	romanEmpire_bg.src = "images/Backgrounds/RomeEmpire.jpg"
	bgNewYorkCity1.src = "images/Backgrounds/NewYork3.jpg"
	pipeUp.src = pipesImages[chosenPipesIndex].pipeUp
	pipeBottom.src = pipesImages[chosenPipesIndex].pipeBottom
}

function renderBirdSkins(bird) {
	birdSkins.forEach(item => {
		Number(item.getAttribute("id")) === bird ? item.classList.add('skin_img_active') : item.classList.remove('skin_img_active') 
		skinsMenu.append(item)
	})
}

// Gap!

let gap = 140

// Flappy Bird Position!

let birdX = 10
let birdY = 250

// Gravity!

let gravity = 0.5

// Moving bird up!

cvs.addEventListener('click', moveBirdUp)

function moveBirdUp() {
	birdY-=60
}

// Pipes!

const pipes = []

pipes[0] = {
	x: cvs.width,
	y: 0
}

// Score!

let score = 0

// Load Audio!

const song1 = new Audio
const song2 = new Audio
const song3 = new Audio

song1.src = "audio/firstSong.mp3"
song2.src = "audio/secondSong.mp3"
song3.src = "audio/MISSIO_Roman Empire.mp3"
 
// Draw game!

function draw() {
	if(score >= 3 && score < 30) {
		song1.pause()
		song2.play()
		chosenPipesIndex = 0
		ctx.drawImage(bgNewYorkCity1, 0, 0)
	} else if (score >= 30) {
		song2.pause()
		song3.play()
		chosenPipesIndex++
		ctx.drawImage(romanEmpire_bg, 0, 0)	
	} else {
		song1.play()
		ctx.drawImage(bg, 0, 0)	
	}
	for(let i = 0; i < pipes.length; i++) {
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y)
		ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap)

		pipes[i].x--

		if(pipes[i].x === 100) {
			pipes.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		} // Add pipes!

		if(birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeUp.width && (birdY <= pipes[i].y + pipeUp.height ||
			birdY + bird.height >= pipes[i].y + pipeUp.height + gap)) {
			location.reload()
		} // Restart game!

		if(pipes[i].x === 10) score++ 	
	}

	ctx.drawImage(bird, birdX, birdY)

	birdY+=gravity

	ctx.fillStyle = '#b27a01'
	ctx.font = '20px Open Sans'
	ctx.fillText("Score: " + score, 100, cvs.height - 30)

	requestAnimationFrame(draw)
}

// Start game!

function startGame() {
	gameMenu.style.display = 'none'
	skinsMenu.style.display = 'none'
	cvs.style.display = 'block'

	uploadImages()
	draw()
}

function goToSkins() {
	gameMenu.style.display = 'none'
	cvs.style.display = 'none'
	skinsMenu.style.display = 'block'
	renderBirdSkins(chosen_bird)

}