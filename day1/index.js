const input = require('./input.json')

const sums = input.reduce((arr, a) => ([...arr, ...input.map(b => ({sum: a + b, product: a * b, a, b}))]), [])
const result = sums.filter(nr => nr.sum === 2020)

console.log(sums, result)