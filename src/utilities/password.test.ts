import { flow } from 'fp-ts/function'
import * as Password from './password'
import * as E from 'fp-ts/Either'
import crypto from 'crypto'

test('fp-ts part4', () => {
  const pipeline = flow(
    Password.of,
    Password.validate({ minLength: 8, capitalLetterRequired: true }),
    E.chainW(
      Password.hash((value) =>
        E.right(crypto.createHash('md5').update(value).digest('hex'))
      )
    )
  )

  expect(pipeline('pw123')).toStrictEqual(
    E.left(Password.MinLengthValidationError.of(8))
  )

  expect(pipeline('Password123')).toStrictEqual(
    E.right({
      _tag: 'Password',
      value: '42f749ade7f9e195bf475f37a44cafcb',
      isHashed: true,
      isValidated: true,
    })
  )
})
