import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const pcPaddle = new Paddle(document.getElementById("pc-paddle"))
const playerScoreElem = document.getElementById("player-score")
const pcScoreElem = document.getElementById("pc-score")

let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), pcPaddle.rect()])
    pcPaddle.update(delta, ball.x, ball.y, ball.direction)

    if (isGoal()) handleLose()
  }
  lastTime = time
  window.requestAnimationFrame(update)
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth){
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent)+1
  } else {
    pcScoreElem.textContent = parseInt(pcScoreElem.textContent)+1
  }
  ball.kickoff()
  pcPaddle.reset()
}

function isGoal() {
  const rect = ball.rect()
  return (rect.right >= window.innerWidth || rect.left <= 0)
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = e.y / window.innerHeight * 100
})

window.requestAnimationFrame(update)