const fs = require('fs')
const input = fs.readFileSync('./input.txt')
const lines = input.toString().split('\n')

const { from } = require('rxjs')
const { map, tap, windowCount, mergeAll, reduce } = require('rxjs/operators')

const countIncrease = () => (stream) => stream.pipe(
  reduce(
    ({ last, acc }, b) => ({ 
      last: b, 
      acc: acc + (last && (b > last) ? 1 : 0) 
    }),
    { last: 0, acc: 0 }
  )
)

const sum = () => (stream) => stream.pipe(
  reduce((a, b) => a + b)
)


const numbers = from(lines).pipe(
  map(str => parseInt(str, 10)),
)

numbers.pipe(
  countIncrease()
).subscribe(result => console.log(1, result))

numbers.pipe(
  windowCount(3, 1),
  map(win => win.pipe(sum())), 
  mergeAll(),
  tap(s => console.log(s)),
  countIncrease()
).subscribe(result => console.log('2', result))