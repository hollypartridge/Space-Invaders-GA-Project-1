# Space Invaders | GA Project 1

![Space Invaders](/assets/space-invaders.png)

## Table of Contents
* [Overview](#overview "Goto overview")
* [Deployed Version](#play-deployed-version "Goto play-deployed-version")
* [Brief](#brief "Goto brief")
* [Technologies Used](#technologies-used "Goto technologies-used")
* [About The Game](#about-the-game "Goto about-the-game")
* [Process](#process "Goto process")
* [Bugs](#bugs "Goto bugs")
* [Challenges](#challenges "Goto challenges")
* [Wins](#wins "Goto wins")
* [Future Improvements](#future-improvements "Goto future-improvements")
* [Key Learning](#key-learning "Goto key-learning")

## Overview
* A 2D, single-player game based on the classic arcade game Space Invaders. 
* This was my first project for the GA Software Engineering Immersive course.
* Individual Project | Timeframe: 1 week.

## Play Deployed Version
My game can be played [**here.**](https://hollypartridge.github.io/sei-project-01/ "here.")

## Brief

* Render a game in the browser
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use Javascript for DOM manipulation
* Use semantic markup for HTML and CSS (adhere to best practices)
* Deploy your game online

### Requirements

* The player should be able to clear at least one wave of aliens
* The player's score should be displayed at the end of the game

## Technologies used

* HTML5
* CSS3
* JavaScript (ES6)
* Git
* GitHub

## About the Game
Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret. The player can only move left or right. The aliens also move from left to right, and also down each time the reach the side of the screen. The aliens also periodically drop bombs towards the player. Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

## Process

### Planning
I began my project by creating a checklist of the different functionalities my game should have, ranging from vital for MVP to personal stretch goals. My plan was to have an MVP done by day 5 to leave two days for styling, bug fixes and stretch goals.

### The Build
#### Creating the grid
I began building my game by creating a 20x20 grid, using a for loop, and rendering this to the DOM.

```js
const grid = document.querySelector('.grid')
const cells = []

const width = 20
const gridCellCount =  width * width

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    grid.appendChild(cell)
  }
}

createGrid()
```

#### Player
To create the player movement I used a switch statement, using the `keydown` event listener and e.code. The different e.code’s determined the direction of movement, either increasing or decreasing the playerPosition, while adding and removing the player class on every keydown. I also created a variable `x` to measure the x axis and used conditionals to stop the player going over the grid boundaries. The `addPlayer()` was added to `handleStart()`, which began the game after being triggered by a `click` event on the start button.

```js
function addPlayer() {
  cells[playerPosition].classList.add('player')
}

function removePlayer() {
  cells[playerPosition].classList.remove('player')
}

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
        audioPlayer.src = './assets/shoot.wav'
        audioPlayer.play()
      } else {
        return
      }
      break
  }
  addPlayer()
}

document.addEventListener('keydown', handleKeyDown)
```
#### Player Beam
The player beam was created to move with the player and its movement being triggered by the 'Space' e.code, adding a `handlePlayerBeam` function to my switch statement. I added a variable `playerHasShot` to stop the player from being able to fire when another beam was on the board, as well as a sound effect each time the player fires. In `handlePlayerBeam()`, I used setInterval to set the speed of the beam and conditionals to deal with movement of the beam, the grid boundaries and any collisions with aliens. 

```js
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
      clearInterval(timerId)
      cells[playerBeamPosition].classList.remove('alien')
      killAlien()
      playerHasShot = false
      playerBeamPosition = playerPosition - width
      return
    } else {
      removePlayerBeam()
      playerBeamPosition -= width
      addPlayerBeam()
      return
    }
  },100)
}
```

#### Aliens
The aliens were created using an array of objects with the keys `currentIndex` and `isAlive`. They were added to the board using a forEach method. I used a conditional to only add the class of `alien` to the cell of their `currentIndex` if the alien was still alive. The alien movement was created by increasing and decreasing the value of their `currentIndex`. I used conditionals and `x` and `y` variables to determine the direction of their movement, create grid boundaries and invoke the `gameOver` function (if the aliens reached the player). I determined the speed of their movement by creating a `setInterval` function and also added a sound effect to the alien movement.

```js
function setTimer() {
  timerId = window.setInterval(() => {
    removeAliens()
    moveAliens()
    addAliens()
    return
  },2000)
}
```

#### Alien Beam
The movement of the alien beam was similar to how the player beam worked, however the alien beam would need to be fired from a random alien in the array and be automated. To do this I filtered through the aliens that were alive, used `Math.random` to determine the beam’s start position and used a `setInterval()` to allow the beams to be automated and control their frequency.

```js
function generateAlienBeamPosition() {
  const alienBeam = aliens.filter(alien => {
    return alien.isAlive === true
  })

  let alienBeamPosition = alienBeam[Math.floor(Math.random() * alienBeam.length)].currentIndex

  const timerId = window.setInterval(() => {
    if (cells[alienBeamPosition].classList.contains('player')) {
      loseLife()
      cells[alienBeamPosition].classList.remove('alienBeam')
      clearInterval(timerId)
      return
    } else if (alienBeamPosition >= gridCellCount - width) {
      cells[alienBeamPosition].classList.remove('alienBeam')
      clearInterval(timerId)
      return
    } else {
      cells[alienBeamPosition].classList.remove('alienBeam')
      alienBeamPosition += width
      cells[alienBeamPosition].classList.add('alienBeam')
      return
    }
  }, 200)
}
```

#### Collisions
To work when out when collisions occurred, I implemented some logic to check whether an element was in the same position as another element. I did this within my `generateAlienBeamPosition` and `handlePlayerBeam` functions. Both of these functions contain other functions: `loselife` and `killAlien`, which then determine the result of these collisions.

In `generateAlienBeamPosition()`:

```js
 if (cells[alienBeamPosition].classList.contains('player')) {
      loseLife()
      cells[alienBeamPosition].classList.remove('alienBeam')
      clearInterval(timerId)
      return
```

In `handlePlayerBeam()`:

```js
 } else if (cells[playerBeamPosition].classList.contains('alien')) {
      clearInterval(timerId)
      cells[playerBeamPosition].classList.remove('alien')
      killAlien()
      playerHasShot = false
      playerBeamPosition = playerPosition - width
      return
```

#### Score + Lives
As seen in the functions above, changes in the player's score and lives are triggered by a collision between either the alien beam and the player, or the alien and the player beam. To deal with the collision between the alien and player beam I created a `killAlien` function that changed the boolean value of the alien that was hit so that it would be removed from the board. Each time an alien was hit I increased the score by 100 points and displayed this by rendering the change to the DOM. I also added a sound effect for each time an alien was shot.

```js
function killAlien() {
  const alienBeam = aliens.filter(alien => {
    return alien.isAlive === true
  })
  audioPlayer.src = './assets/invaderkilled.wav'
  audioPlayer.play()
  if (alienBeam.length === 0) {
    gameOver()
  } else {
    removePlayerBeam()
    const alienIndex = aliens.find(alien => {
      return alien.currentIndex === playerBeamPosition
    })
    alienIndex.isAlive = false
    score = score + 100
    scoreDisplay.textContent = score
    return
  }
}
```

To deal with collision between the player and alien beam I created a `loseLife` function that removed a player's life each time a player was shot and displayed this by rendering the change to the DOM. I also added a sound effect for each time an player was shot and an animation that made the player's sprite and lives display shake.

```js
function loseLife() {
  lives = lives - 1
  audioPlayer.src = './assets/explosion.wav'
  audioPlayer.play()
  if (lives === 0) {
    gameOver()
  } else {
    livesDisplay.textContent = lives
    cells[playerPosition].classList.add('shake')
    livesFull.classList.add('shake')
  }
}
```

#### Game over 
The `gameOver` function was invoked when either: the player won (all the aliens were killed) or the player lost (the player had no lives left or the aliens had reached the player's position).

##### All the aliens were killed | `gameOver()` called in `killAlien()`

```js
const alienBeam = aliens.filter(alien => {
    return alien.isAlive === true
  })
  if (alienBeam.length === 0) {
    gameOver()
  }
```

##### The player had no lives left | `gameOver()` called in `loseLife()`

```js
if (lives === 0) {
    gameOver()
  }
```

##### The aliens reached the player's position | `gameOver()` called in `moveAlien()`

```js
if (finalAlien.currentIndex >= gridCellCount - width) {
    gameOver()
}
```

Once invoked, my `gameOver` function changed the HTML (including the final score) and style of the grid.

## Bugs

**Game Over | Alien and Player Collision:** After playing the game I have found that the `gameOver` function is called when the last alien in the array collides with the player regardless of whether the alien is alive or not. This should not be the case, as the game should only end when an alive alien collides with the player. 

## Challenges

**Player Beam | Player Firing Continuously:** When I first created the functionality of my player’s beam it would continuously fire on each hit of the space bar, regardless of whether there was another player beam on the board. This would cause the beam to speed up and leave the space bar unresponsive. To fix this I created a Boolean variable `playerHasShot`, which changed to true each time the space bar was hit and changed back to false when either: the beam collided with an alien or it hit the grid boundaries. I then created a conditional that only allowed the player’s beam functionality to be triggered if the Boolean value of `playerHasShot` was false.

## Wins 

* I am really proud of this project as it was my first time creating a game (or any kind of dev project). 
* The movement of the aliens, as this was the part of the project I was most nervous about.
* The animation that causes the lives display and player to shake when hit.
* Allowed me cement and further evolve my knowledge of JavaScript.
* Increased my confidence in developing on my own.

## Future Improvements

* Debug the alien and player collision.
* Add different levels that increase in difficulty.
* Create a reset function that resets the variables rather than refreshing the window.
* Make game responsive on mobile and tablet.

## Key Learning

**JavaScript Fundamentals:** Creating the game was a great way to cement and expand my knowledge of JS, specifically around array methods.

**Planning:** Creating the game highlighted how important it was to me to plan before hand what functionalities I wanted to included in my game. Creating smaller deadlines for each of these functionalities helped with my time management. 
