const fs = require('fs')
let seats = String(fs.readFileSync(__dirname + '/input.txt')).split('\n')
const occupied = '#'
const free = 'L'
const floor = '.'

const countLine = (line, char) => Array.from(line).reduce((lineCount, seat) => lineCount += seat === char ? 1 : 0, 0)
const countAll = (char) => seats.reduce((totalCount, line) => totalCount + countLine(line, char), 0)
const countOccupiedAdjecent = (x, y) => 
  // top row
  isOccupied(x-1, y-1) +
  isOccupied(x,   y-1) + 
  isOccupied(x+1, y-1) +

  // middle row
  isOccupied(x - 1, y) + 
  isOccupied(x + 1, y) + 

  //bottom row
  isOccupied(x-1, y+1) + 
  isOccupied(x,   y+1) + 
  isOccupied(x+1, y+1)

const isOccupied = (x, y) => x>=0 && y>=0 && y<seats.length && x<seats[y].length && (seats[y][x] === occupied) ? 1 : 0

let same
while(!same) {
  const newState = seats.map((line, y) => Array.from(line).map((seat, x) => {
    if (seat === floor) return floor
    const occupiedAdjecent = countOccupiedAdjecent(x, y) 
    if (seat === free && occupiedAdjecent === 0) return occupied
    if (seat === occupied && occupiedAdjecent >= 4) return free
    return seat
  }).join(''))
  same = JSON.stringify(newState) === JSON.stringify(seats)
  seats = newState
  console.log(newState.join('\n'))
  console.log('')

}
console.log('Occupied seats', countAll('#'))