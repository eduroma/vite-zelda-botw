import { sumCalc } from '../../services/sumCalc'

describe('sumCalc', () => {
  it('sums the twor provided params', () => {
    expect(sumCalc(1, 1)).toBe(2)
  })
})
