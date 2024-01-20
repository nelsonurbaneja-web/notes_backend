const { average } = require('../utils/for_testing')


describe.skip('average', () => {
  test('Un valor el mismo valor es la media', () => {
    expect(average([1])).toBe(1)
  })
  test('of many is calculate correctly', () => {
    expect(average([1,2,3,4,5,6])).toBe(3.5)
  })
  test('of empty is equal zero', () => {
    expect(average([])).toBe(0)
  })
  test('of undefined is undefined', () => {
    expect(average()).toBeUndefined()
  })
})