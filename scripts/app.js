// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startBtn = document.querySelector('#start')
const aliens = []

// Variables
const width = 20
const gridCellCount =  width * width

let playerPosition = gridCellCount - (width / 2)
let playerBeamPosition = playerPosition - width
let timerId = null

// The Grid And Aliens
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)

    if (i >= 42 && i < 58 || i >= 62 && i < 78 || i >= 82 && i < 98 || i >= 102 && i < 118 || i >= 122 && i < 138) {
      aliens.push(cell)
    }
  }
}

createGrid()

// Functions

function handleStart() {
  addAliens()
  addPlayerBeam()
  addPlayer()
}

function addAliens() {
  aliens.forEach(alien => {
    return alien.classList.add('alien')
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
  removePlayerBeam()
  removePlayer()
  switch (e.code) {
    case 'ArrowRight':
      if (x < width - 1) {
        playerPosition++
        playerBeamPosition++
      }
      break
    case 'ArrowLeft':
      if (x > 0) {
        playerPosition--
        playerBeamPosition--
      }
      break
    case 'Space':
      handlePlayerBeam()
      break
  }
  addPlayerBeam()
  addPlayer()
}

function handlePlayerBeam() {
  timerId = window.setInterval(() => {
    if (playerBeamPosition <= width) {
      clearInterval(timerId)
      removePlayerBeam()
      playerBeamPosition = playerPosition - width
      addPlayerBeam()
      return
    } else if (cells[playerBeamPosition].classList.contains('alien')) {
      console.log('aliens')
    }
    removePlayerBeam()
    playerBeamPosition -= width
    addPlayerBeam()
  },150)
}

// Events

startBtn.addEventListener('click', handleStart)
document.addEventListener('keydown', handleKeyDown)