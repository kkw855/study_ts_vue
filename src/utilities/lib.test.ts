import { getLastDayInMonth, getStartDayInMonth } from './lib'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import axios from 'axios'

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

test('fp-ts part2', () => {
  interface Foo {
    bar?: Fizz
  }
  interface Fizz {
    buzz: string
  }
  const foo = { bar: undefined } as Foo | undefined
  const foo2 = { bar: { buzz: 'hello' } } as Foo | undefined

  expect(
    pipe(
      foo,
      O.fromNullable,
      O.map(({ bar }) => bar),
      O.chain(
        flow(
          O.fromNullable,
          O.map(({ buzz }) => buzz)
        )
      )
    )
  ).toStrictEqual(O.none)

  expect(
    pipe(
      foo2,
      O.fromNullable,
      O.map(({ bar }) => bar),
      O.chain(
        flow(
          O.fromNullable,
          O.map(({ buzz }) => buzz)
        )
      )
    )
  ).toStrictEqual(O.some('hello'))
})

test('fp-ts part3', () => {
  const task = async () =>
    pipe(
      TE.tryCatch(
    () => axios.get('https://httpstat.us/200'),
      (reason) => new Error(`${reason}`)
    ),
      TE.map((resp) => resp.data)
  )
})
