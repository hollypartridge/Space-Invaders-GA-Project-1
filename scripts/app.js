// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score-display')


// Variables
const width = 20
const gridCellCount =  width * width
const aliens = [{ currentIndex: 42, isAlive: true }, 
  { currentIndex: 43, isAlive: true }, 
  { currentIndex: 44, isAlive: true },
  { currentIndex: 45, isAlive: true },
  { currentIndex: 46, isAlive: true },
  { currentIndex: 47, isAlive: true },
  { currentIndex: 48, isAlive: true },
  { currentIndex: 49, isAlive: true },
  { currentIndex: 50, isAlive: true },
  { currentIndex: 51, isAlive: true },
  { currentIndex: 52, isAlive: true },
  { currentIndex: 53, isAlive: true },
  { currentIndex: 54, isAlive: true },
  { currentIndex: 55, isAlive: true },
  { currentIndex: 56, isAlive: true },
  { currentIndex: 62, isAlive: true }, 
  { currentIndex: 63, isAlive: true }, 
  { currentIndex: 64, isAlive: true },
  { currentIndex: 65, isAlive: true },
  { currentIndex: 66, isAlive: true },
  { currentIndex: 67, isAlive: true },
  { currentIndex: 68, isAlive: true },
  { currentIndex: 69, isAlive: true },
  { currentIndex: 70, isAlive: true },
  { currentIndex: 71, isAlive: true },
  { currentIndex: 72, isAlive: true },
  { currentIndex: 73, isAlive: true },
  { currentIndex: 74, isAlive: true },
  { currentIndex: 75, isAlive: true },
  { currentIndex: 76, isAlive: true },
  { currentIndex: 82, isAlive: true }, 
  { currentIndex: 83, isAlive: true }, 
  { currentIndex: 84, isAlive: true },
  { currentIndex: 85, isAlive: true },
  { currentIndex: 86, isAlive: true },
  { currentIndex: 87, isAlive: true },
  { currentIndex: 88, isAlive: true },
  { currentIndex: 89, isAlive: true },
  { currentIndex: 90, isAlive: true },
  { currentIndex: 91, isAlive: true },
  { currentIndex: 92, isAlive: true },
  { currentIndex: 93, isAlive: true },
  { currentIndex: 94, isAlive: true },
  { currentIndex: 95, isAlive: true },
  { currentIndex: 96, isAlive: true },
  { currentIndex: 102, isAlive: true }, 
  { currentIndex: 103, isAlive: true }, 
  { currentIndex: 104, isAlive: true },
  { currentIndex: 105, isAlive: true },
  { currentIndex: 106, isAlive: true },
  { currentIndex: 107, isAlive: true },
  { currentIndex: 108, isAlive: true },
  { currentIndex: 109, isAlive: true },
  { currentIndex: 110, isAlive: true },
  { currentIndex: 111, isAlive: true },
  { currentIndex: 112, isAlive: true },
  { currentIndex: 113, isAlive: true },
  { currentIndex: 114, isAlive: true },
  { currentIndex: 115, isAlive: true },
  { currentIndex: 116, isAlive: true },
  { currentIndex: 122, isAlive: true }, 
  { currentIndex: 123, isAlive: true }, 
  { currentIndex: 124, isAlive: true },
  { currentIndex: 125, isAlive: true },
  { currentIndex: 126, isAlive: true },
  { currentIndex: 127, isAlive: true },
  { currentIndex: 128, isAlive: true },
  { currentIndex: 129, isAlive: true },
  { currentIndex: 130, isAlive: true },
  { currentIndex: 131, isAlive: true },
  { currentIndex: 132, isAlive: true },
  { currentIndex: 133, isAlive: true },
  { currentIndex: 134, isAlive: true },
  { currentIndex: 135, isAlive: true },
  { currentIndex: 136, isAlive: true }]

let playerPosition = gridCellCount - (width / 2)
let playerBeamPosition = playerPosition - width
let timerId = null
let playerHasShot = false
let score = 0
// let alienBeamStartPosition =  aliens[Math.floor(Math.random() * aliens.length)]

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
  setTimer()
  addPlayer()
}

function addAliens() {
  aliens.forEach(alien => {
    if (alien.isAlive === true) {
      return cells[alien.currentIndex].classList.add('alien')
    }
  })
}

function removeAliens() {
  aliens.forEach(alien => {
    return cells[alien.currentIndex].classList.remove('alien')
  })
}


function moveAliens() {
  const finalAlien = aliens[aliens.length - 1]
  const x = playerPosition % width
  console.log(x)
    
  if (x < width - 1) {
    aliens.map(alien => {
      alien.currentIndex = alien.currentIndex + 1
    })
  } else if (x > width - 1) {
    aliens.map(alien => {
      alien.currentIndex = alien.currentIndex + width
    })
  }
}

function setTimer() {
  timerId = window.setInterval(() => {
    removeAliens()
    moveAliens()
    addAliens()
    return
  },500)
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

// function addAlienBeam() {
//   cells[alienBeamStartPosition].classList.add('alienBeam')
// }

// function removeAlienBeam() {
//   cells[alienBeamStartPosition].classList.remove('alienBeam')
// }

function handleKeyDown(e) {
  const x = playerPosition % width
  switch (e.code) {
    case 'ArrowRight':
      if (x < width - 1) {
        removePlayer()
        playerPosition++
      }
      break
    case 'ArrowLeft':
      if (x > 0) {
        removePlayer()
        playerPosition--
      }
      break
    case 'Space':
      e.preventDefault()
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
  const timerId = window.setInterval(() => {
    if (playerBeamPosition <= width) {
      removePlayerBeam()
      playerHasShot = false
      clearInterval(timerId)
      playerBeamPosition = playerPosition - width
      return
    } else if (cells[playerBeamPosition].classList.contains('alien')) {
      killAlien()
      clearInterval(timerId)
      removePlayerBeam()
      playerHasShot = false
      playerBeamPosition = playerPosition - width
      return
    } else {
      removePlayerBeam()
      playerBeamPosition -= width
      addPlayerBeam()
      return
    }
  },150)
}

function killAlien() {
  // if (aliens.isAlive <= 0) {
  //   gameOver()
  // } else {

  const alienIndex = aliens.find(alien => {
    return alien.currentIndex === playerBeamPosition
  })

  alienIndex.isAlive = false

  score = score + 100
  scoreDisplay.textContent = score
  return

  // }
}

// function handleAlienBeam() {
//   timerId = window.setInterval(() => {
//     removeAlienBeam()
//     alienBeamStartPosition += width
//     addAlienBeam()
//     return
//   },150) 
// }

// function gameOver() {

// }

// Events 

startBtn.addEventListener('click', handleStart)
document.addEventListener('keydown', handleKeyDown)