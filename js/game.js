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

let gap = 140

// Flappy Bird Position!

let birdX = 10
let birdY = 250

// Gravity!

let gravity = 1.2

// Moving bird up!

cvs.addEventListener('click', moveBirdUp)

function moveBirdUp() {
	birdY-=30
}

// Pipes!

const pipes = []

pipes[0] = {
	x: cvs.width,
	y: 0
}

// Score!

let score = 0
 
// Draw game!

function draw() {
	ctx.drawImage(bg, 0, 0)
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
	cvs.style.display = 'block'

	draw()
}
