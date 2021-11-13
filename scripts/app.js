// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startBtn = document.querySelector('#start')

// Variables
const width = 10
const gridCellCount =  width * width

let playerPosition = 94

// The Grid
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
function removePlayer() {
  cells[playerPosition].classList.remove('player')
}


function addPlayer() {
  cells[playerPosition].classList.add('player')
}

function handlePlayerKeyLeftAndRight(e) {
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
  }
  addPlayer()
}

function handleStart() {
  addPlayer()
}


// Events

startBtn.addEventListener('click', handleStart)
document.addEventListener('keyup', handlePlayerKeyLeftAndRight)