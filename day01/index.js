const input = require('./input.json')

const twoSums = input
  .reduce((arr, a) => ([...arr, ...input.map(b => ({sum: a + b, product: a * b, a, b}))]), [])
  .filter(nr => nr.sum === 2020)

console.log(twoSums)

const threeSums = input.reduce((arr, a) => (
  [...arr, 
    ...input.reduce((arr, b) => (
      [...arr,
        ...input.map(c => ({sum: a + b + c, product: a * b * c, a, b})).filter(nr => nr.sum === 2020)
      ]
    ), [])
  ]), [])

console.log(threeSums)