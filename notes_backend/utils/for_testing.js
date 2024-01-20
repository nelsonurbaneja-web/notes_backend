const palindrome = (string) => {
  if (typeof string === 'undefined') return
  return string.split('').reverse().join('')
}

const average = (array) => {
  let sum = 0
  if (typeof array === 'undefined') return
  if(array.length === 0) return 0
  array.forEach(elem => {
    sum += elem
  })

  return sum / array.length
}

module.exports = {
  palindrome,
  average
}