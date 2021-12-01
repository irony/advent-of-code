const fs = require('fs')
const input = String(fs.readFileSync(__dirname + '/input.txt')).split('\n')
const passwords = input.map(line => {
  const [range, requiredChar, psw] = line.split(' ')
  const [min, max] = range.split('-')
  return {min: +min, max: +max, requiredChar: requiredChar[0], psw}
})

const validPasswords1 = passwords.map(({min, max, requiredChar, psw}) => {
    const charCount = (psw.match(new RegExp(requiredChar, 'g')) || []).length
    const valid = charCount >= min && charCount <= max
    return {valid, psw}
  }).filter(psw => psw.valid)

const validPasswords2 = passwords.map(({min, max, requiredChar, psw}) => {
  const first = psw[min-1] === requiredChar 
  const second = psw[max-1] === requiredChar
  const valid = first ? !second : second // first xor second
  return {valid, psw, requiredChar}
}).filter(psw => psw.valid)

console.log(validPasswords1.length, validPasswords2.length, input.length)