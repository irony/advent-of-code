const fs = require('fs')
let seats = String(fs.readFileSync(__dirname + '/input.txt')).split('\n')
const occupied = '#'
const free = 'L'
const floor = '.'

const countLine = (line, char) => Array.from(line).reduce((lineCount, seat) => lineCount += seat === char ? 1 : 0, 0)
const countAll = (char) => seats.reduce((totalCount, line) => totalCount + countLine(line, char), 0)
const find = (x, y, angle, distance) => ({
  x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
  y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y)
})
const findAll = (x, y, angle, maxDistance) => range(maxDistance + 1)
    .slice(1) // skip 0
    .map(distance => find(x, y, angle, distance))
    .filter(({x, y}) => valid(x, y))

const range = (length, steps = 1) => Array.from({length}).map((_, i) => i * steps)
const valid = (x, y) => x>=0 && y>=0 && y<seats.length && x<seats[y].length
const is = (x, y, check) => (seats[y][x] === check) ? 1 : 0

const countOccupiedAdjecent = (x, y, maxDistance = 1) => range(8, 45)
    .map(angle => {
      const first = findAll(x,y, angle, maxDistance)
      .find(({x, y}) => is(x, y, occupied) || is(x, y, free))
      return first ? is(first.x, first.y, occupied) : 0
    })
    .reduce((total, count) => total + count, 0)


let same
while(!same) {
  const newState = seats.map((line, y) => Array.from(line).map((seat, x) => {
    if (seat === floor) return floor
    const occupiedAdjecent = countOccupiedAdjecent(x, y, 100)
    if (seat === free && occupiedAdjecent === 0) return occupied
    if (seat === occupied && occupiedAdjecent >= 5) return free
    return seat
  }).join(''))
  same = JSON.stringify(newState) === JSON.stringify(seats)
  seats = newState
  console.log(newState.join('\n'))
  console.log('')

}
console.log('Occupied seats', countAll('#'))