// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startBtn = document.querySelector('#start')
const aliens = []

// Variables
const width = 10
const gridCellCount =  width * width

let playerPosition = 94
let playerBeamPosition = playerPosition - 10

// The Grid
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    cells.push(cell)
    grid.appendChild(cell)
    
    if (i < 50 && i > 9) {
      aliens.push(cell)
    }
  }
}

createGrid()

// Functions

function createAliens() {
  aliens.forEach(alien => {
    return alien.classList.add('alien')
  })
}

function removePlayerAndBeam() {
  cells[playerBeamPosition].classList.remove('playerBeam')
  cells[playerPosition].classList.remove('player')
}

function addPlayerAndBeam() {
  cells[playerBeamPosition].classList.add('playerBeam')
  cells[playerPosition].classList.add('player')
}

function handleKeyUp(e) {
  const x = playerPosition % width
  removePlayerAndBeam()
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
      playerBeamPosition -= 80
      break
  }
  addPlayerAndBeam()
}

function handleStart() {
  createAliens()
  addPlayerAndBeam()
}


// Events

startBtn.addEventListener('click', handleStart)
document.addEventListener('keyup', handleKeyUp)