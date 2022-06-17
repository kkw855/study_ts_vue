import { getLastDayInMonth, getStartDayInMonth } from './lib'

test('getLastDayInMonth', () => {
  expect(getLastDayInMonth(2020, 2)).toEqual(29)
  expect(getLastDayInMonth(2022, 2)).toEqual(28)
  expect(getLastDayInMonth(2022, 6)).toEqual(30)
  expect(getLastDayInMonth(2022, 12)).toEqual(31)
})

test('getStartDayInMonth', () => {
  expect(getStartDayInMonth(2020, 2)).toEqual(6) // 토요일
  expect(getStartDayInMonth(2022, 2)).toEqual(2) // 화요일
  expect(getStartDayInMonth(2022, 6)).toEqual(3) // 수요일
  expect(getStartDayInMonth(2022, 12)).toEqual(4) // 목요일
})
