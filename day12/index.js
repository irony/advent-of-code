const fs = require('fs')
const { parse } = require('path')
const Ship = require('./ship')
const input = String(fs.readFileSync(__dirname + '/input.txt')).split('\n')

const initialLocation = new Ship({x: 0, y: 0, angle: 0})
const parseInstruction = (instruction) => {
  const direction = instruction[0]
  const value = +instruction.substr(1)
  return {direction, value}
}

const move = (ship, {direction, value}) => {
  switch(direction) {
    case 'N': return ship.north(value)
    case 'S': return ship.south(value)
    case 'E': return ship.east(value)
    case 'W': return ship.west(value)
    case 'L': return ship.turn(value)
    case 'R': return ship.turn(-value)
    case 'F': return ship.move(value)
  }
}
const location = input
  .map(parseInstruction)
  .reduce((currentLocation, instruction) => console.log(currentLocation, instruction) || move(currentLocation, instruction), initialLocation)

console.log(location, {manhattan: Math.abs(location.x) + Math.abs(location.y)})