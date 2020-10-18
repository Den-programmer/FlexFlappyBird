const gameMenu = document.querySelector(".menu-app")
const btnStart = document.querySelector(".menu-app__btnStart")

btnStart.addEventListener('click', startGame)

const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

// Canvas size!

cvs.width = 288
cvs.height = 512

// Load images!

const bird = new Image()
const bg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

bird.src = "images/flappy_bird.png"
bg.src = "images/bg.png"
pipeUp.src = "images/pipeUp.png"
pipeBottom.src = "images/pipeBottom.png"

// Gap!

let gap = 90

// Flappy Bird Position!

let birdX = 10
let birdY = 250

// Gravity!

let gravity = 1

// Moving bird up!

cvs.addEventListener('click', moveBirdUp)

function moveBirdUp() {
	birdY-=30
}

// Draw game!

function draw() {
	ctx.drawImage(bg, 0, 0)

	ctx.drawImage(pipeUp, 200, 0)
	ctx.drawImage(pipeBottom, 200, 0 + pipeUp.height + gap)

	ctx.drawImage(bird, birdX, birdY)

	birdY+=gravity
	requestAnimationFrame(draw)
}

// Start game!

function startGame() {
	gameMenu.style.display = 'none'
	cvs.style.display = 'block'

	draw()
}
