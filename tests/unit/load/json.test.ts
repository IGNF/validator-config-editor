import { describe, expect, it } from 'vitest'
import { parseJson } from '@core/load/json'

describe('parseJson', () => {
  it('lit un JSON valide', () => {
    expect(parseJson('{"a": [1, -2.5e3, true, false, null, "x\\u00e9\\n"], "b": {}}')).toEqual({
      ok: true,
      value: { a: [1, -2500, true, false, null, 'xé\n'], b: {} },
    })
  })

  it.each([
    ['{\n  "a": 1,\n  "b" 2\n}', 3, 7, 'caractère « 2 » inattendu (attendu : « : »)'],
    ['{\n  "id": ,\n}', 2, 9, 'caractère « , » inattendu (attendu : une valeur)'],
    ['{\n  "a": [1,', 2, 11, 'fin de fichier inattendue (attendu : une valeur)'],
    ['{"a": 1,}', 1, 9, 'caractère « } » inattendu (attendu : « " »)'],
    ['[1 2]', 1, 4, 'caractère « 2 » inattendu (attendu : « , » ou « ] »)'],
    ['{"a": 1 "b": 2}', 1, 9, 'caractère « " » inattendu (attendu : « , » ou « } »)'],
    ['{} {}', 1, 4, 'caractère « { » inattendu (attendu : fin de fichier)'],
    ['"abc', 1, 5, 'fin de fichier inattendue (attendu : « " »)'],
    ['"a\\x"', 1, 4, 'caractère « x » inattendu (attendu : un échappement valide)'],
    ['"\\u12"', 1, 3, 'caractère « u » inattendu (attendu : un échappement \\uXXXX)'],
    ['tru', 1, 1, 'caractère « t » inattendu (attendu : une valeur)'],
    ['-', 1, 1, 'caractère « - » inattendu (attendu : une valeur)'],
    ['"a\tb"', 1, 3, 'caractère « \t » inattendu (attendu : un caractère imprimable ou « " »)'],
    ['', 1, 1, 'fin de fichier inattendue (attendu : une valeur)'],
  ])('localise l\'erreur de %j', (text, line, column, detail) => {
    expect(parseJson(text)).toEqual({ ok: false, line, column, detail })
  })
})
