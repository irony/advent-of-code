const fs = require('fs')

const input = fs.readFileSync('./input.txt')
const sample =[
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
] 
const lines = input.toString().split('\n')
const commands = lines.map(instruction => {
  const [dir, steps] = instruction.split(' ')
  return {dir, steps:+steps}
})

const step1 = commands.reduce((me, {dir, steps}) => {
  console.log(me)
  switch (dir) {
    case 'forward': return {...me, horizontal: me.horizontal + steps}
    case 'backward': return {...me, horizontal: me.horizontal - steps}
    case 'down': return {...me, depth: me.depth + steps}
    case 'up': return {...me, depth: me.depth - steps}
  }
}, {
  horizontal: 0,
  depth: 0
})

console.log('step1', step1, step1.horizontal * step1.depth)

const step2 = commands.reduce((me, {dir, steps}) => {
  console.log(me)
  switch (dir) {
    case 'forward': return {...me, horizontal: me.horizontal + steps, depth: me.depth + me.aim * steps}
    case 'backward': return {...me, horizontal: me.horizontal - steps, depth: me.depth + me.aim * steps}
    case 'down': return {...me, aim: me.aim + steps}
    case 'up': return {...me, aim: me.aim - steps}
  }
}, {
  horizontal: 0,
  depth: 0,
  aim: 0
})

console.log('step2', step2, step2.horizontal * step2.depth)
