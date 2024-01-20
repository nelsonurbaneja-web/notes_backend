const { palindrome } = require('../utils/for_testing')

test.skip('should return olleh  ', () => {
  const result = palindrome('hello')
  expect(result).toBe('olleh')
})

test.skip('palindrome of empty string', () => {
  expect(palindrome('')).toBe('')
})

test.skip('palindrome of undefined', () => {
  expect(palindrome()).toBeUndefined()
})