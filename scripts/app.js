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

// The Grid
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)
    
    if (i >= (gridCellCount / 10) && i < (width * 5)) {
      aliens.push(cell)
    }
  }
}

createGrid()

// Functions
function addAliens() {
  aliens.forEach(alien => {
    return alien.classList.add('alien')
  })
}

function removePlayerBeam() {
  cells[playerBeamPosition].classList.remove('playerBeam')
}

function addPlayerBeam() {
  cells[playerBeamPosition].classList.add('playerBeam')
}

function removePlayer() {
  cells[playerPosition].classList.remove('player')
}

function addPlayer() {
  cells[playerPosition].classList.add('player')
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
  }
  addPlayerBeam()
  addPlayer()
}

function handleStart() {
  addAliens()
  addPlayerBeam()
  addPlayer()
}

// Events

startBtn.addEventListener('click', handleStart)
document.addEventListener('keydown', handleKeyDown)