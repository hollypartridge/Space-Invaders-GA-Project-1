// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score-display')


// Variables
const width = 20
const gridCellCount =  width * width
const aliens = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137]

let playerPosition = gridCellCount - (width / 2)
let playerBeamPosition = playerPosition - width
let timerId = null
let playerHasShot = false
let score = 0
let alienIndex = 0 

// The Grid And Aliens
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)
  }
}


createGrid()

// Functions

function handleStart() {
  addAliens()
  addPlayer()
}

function addAliens() {
  aliens.forEach(alien => {
    return cells[alien].classList.add('alien')
  })
}

function addPlayer() {
  cells[playerPosition].classList.add('player')
}

function removePlayer() {
  cells[playerPosition].classList.remove('player')
}

function addPlayerBeam() {
  cells[playerBeamPosition].classList.add('playerBeam')
}

function removePlayerBeam() {
  cells[playerBeamPosition].classList.remove('playerBeam')
}

function handleKeyDown(e) {
  const x = playerPosition % width
  removePlayer()
  switch (e.code) {
    case 'ArrowRight':
      if (x < width - 1) {
        playerPosition++
      }
      break
    case 'ArrowLeft':
      if (x > 0) {
        playerPosition--
      }
      break
    case 'Space':
      if (playerHasShot === false) {
        playerHasShot = true
        handlePlayerBeam()
      } else {
        return
      }
      break
  }
  addPlayer()
}

function handlePlayerBeam() {
  playerBeamPosition = playerPosition - width
  timerId = window.setInterval(() => {
    if (playerBeamPosition <= width) {
      removePlayerBeam()
      playerHasShot = false
      clearInterval(timerId)
      playerBeamPosition = playerPosition - width
      return
    } else if (cells[playerBeamPosition].classList.contains('alien')) {
      playerHasShot = false
      killAlien()
    }
    removePlayerBeam()
    playerBeamPosition -= width
    addPlayerBeam()
    return
  },150)
}

function killAlien() {
  // if (aliens.length <= 0) {
  //   gameOver()
  // } else {

  clearInterval(timerId)

  alienIndex = aliens.indexOf(playerBeamPosition)
  const removingAliens = aliens.splice(alienIndex, 1)
  cells[removingAliens].classList.remove('alien')

  score = score + 100
  scoreDisplay.textContent = score
  return

  // }
}

// function handleAlienBeam() {

// }

// function gameOver() {

// }

// Events

startBtn.addEventListener('click', handleStart)
document.addEventListener('keydown', handleKeyDown)