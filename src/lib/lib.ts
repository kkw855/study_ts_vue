import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'

export function saveLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value)
}

export function loadLocalStorage<A>(key: string): any {
  return flow(
    () => localStorage.getItem(key),
    O.fromNullable,
    O.chainEitherK((v) =>
      E.tryCatch(
        () => JSON.parse(v),
        (e) => e
      )
    ),
    O.getOrElse(() => [])
  )
}

export function getLastDayInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

// 0 부터 Sun day
export function getStartDayInMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}
