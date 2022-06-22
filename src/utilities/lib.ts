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

/**
 * 해당 년, 월이 몇 일까지 있는가?
 * return 28 ~ 31
 * @param year Full year number(ex 2022)
 * @param month 1 ~ 12
 */
export function getLastDayInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * 해당 년, 월에 1일이 무슨 요일인가?
 * return Sun day(0) ~ Sat day(6)
 * @param year Full year number(ex 2022)
 * @param month 1 ~ 12
 */
export function getStartDayInMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(f: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: never, ...args: never[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => f.apply(this, args), ms)
  }
}
