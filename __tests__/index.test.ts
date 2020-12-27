import { calculate } from '../src/index'
import { Result, findFromResult, printResults } from '../src/result'
import { Heir } from '../src/heir';
import Fraction from 'fraction.js';

function checkResult(
  results: Result[],
  heir: Heir | { name: Heir, type?: 'fard'|'tasib'|'special_case' },
  share: Fraction
) {
  const result = (() => {
    if(typeof heir === 'string') { return findFromResult(results, heir) }

    if(heir.type) return findFromResult(results, heir.name, heir.type)
    return findFromResult(results, heir.name)
  })()

  if(!result) {
    throw Error(`${(typeof heir === 'string') ? heir: heir.name} couldn't be found in result`)
  }
  expect(result.share).toEqual(share)
}

const f = (num: number, den: number = 1) => new Fraction(num, den)

describe('Some edge cases', () => {
  test('single spouse', () => {
    calculate({ wife: 1 })
    calculate({ husband: 1 })
  })
})

// following test cases were taken from http://inheritance.ilmsummit.org/projects/inheritance/testcasespage.aspx

test('1 wife, 1 son', () => {
  const result = calculate({ wife: 1, son: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(7,8))
})

test('husband, mother, 1 maternal_brother, 1 full_uncle', () => {
  const result = calculate({
    husband: 1,
    mother: 1,
    maternal_sibling: 1,
    full_paternal_uncle: 1
  })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'maternal_sibling', f(1,6))
  checkResult(result, 'full_paternal_uncle', f(0))
})

test('1 daughter, 2 full_sisters', () => {
  const result = calculate({ daughter: 1, full_sister: 2 })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'full_sister', f(1,2))
})

test('2 daughters, 1 paternal_sister', () => {
  const result = calculate({ daughter: 2, paternal_sister: 1 })
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'paternal_sister', f(1,3))
})

test('1 daughter, 1 paternal_grand_daughter, 2 full_sister', () => {
  const result = calculate({
    daughter: 1,
    paternal_grand_daughter: 1,
    full_sister: 2
  })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'paternal_grand_daughter', f(1,6))
  checkResult(result, 'full_sister', f(1,3))
})

test('father, 1 full_brother', () => {
  const result = calculate({ father: 1, full_brother: 1 })
  checkResult(result, 'father', f(1))
})

test('1 wife, 1 son, mother', () => {
  const result = calculate({ wife: 1, son: 1, mother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,24))
  checkResult(result, 'mother', f(1,6))
})

test('husband, 2 full_sister', () => {
  const result = calculate({ husband: 1, full_sister: 2 })
  checkResult(result, 'husband', f(3,7))
  checkResult(result, 'full_sister', f(4,7))
})

test('husband, father, mother', () => {
  const result = calculate({ husband: 1, father: 1, mother: 1 })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'father', f(1,3))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, father, mother', () => {
  const result = calculate({ wife: 1, father: 1, mother: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'father', f(1,2))
  checkResult(result, 'mother', f(1,4))
})

test('husband, mother, 2 full_brother, 2 meternal_sibling', () => {
  const result = calculate({
    husband: 1,
    mother: 1,
    full_brother: 2,
    maternal_sibling: 2
  })

  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(1,6))
  checkResult(result, 'maternal_sibling', f(1,6))
})

test('2 daughter', () => {
  const result = calculate({ daughter: 2 })
  checkResult(result, 'daughter', f(1,1))
})

test('mother, 1 full_sister', () => {
  const result = calculate({ mother: 1, full_sister: 1 })
  checkResult(result, 'mother', f(2,5))
  checkResult(result, 'full_sister', f(3,5))
})

test('1 paternal_grand_mother, 1 full_sister, 1 maternal_sibling', () => {
  const result = calculate({
    paternal_grand_mother: 1,
    full_sister: 1,
    maternal_sibling: 1
  })

  checkResult(result, 'paternal_grand_mother', f(1,5))
  checkResult(result, 'full_sister', f(3,5))
  checkResult(result, 'maternal_sibling', f(1,5))
})

test('1 daughter, 2 grand_daughter', () => {
  const result = calculate({
    daughter: 1,
    paternal_grand_daughter: 2
  })

  checkResult(result, 'paternal_grand_daughter', f(1,4))
  checkResult(result, 'daughter', f(3,4))
})

test('mother, 3 maternal_sibling', () => {
  const result = calculate({
    mother: 1,
    maternal_sibling: 3
  })

  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'maternal_sibling', f(2,3))
})

test('1 wife, 2 full_sister', () => {
  const result = calculate({ wife: 1, full_sister: 2 })
  checkResult(result , 'wife', f(1,4))
  checkResult(result , 'full_sister', f(3,4))
})

test('1 wife, 1 daughter, mother', () => {
  const result = calculate({ wife: 1, daughter: 1, mother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(21,32))
  checkResult(result, 'mother', f(7,32))
})

test('1 wife, mother, 1 maternal_sibling', () => {
  const result = calculate({ wife: 1, mother: 1, maternal_sibling: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'mother', f(1,2))
  checkResult(result, 'maternal_sibling', f(1/4))
})

test('2 wife, 1 paternal_grand_mother, 1 maternal_grand_mother, 2 maternal_sibling', () => {
  const result = calculate({
    wife: 2,
    paternal_grand_mother: 1,
    maternal_grand_mother: 1,
    maternal_sibling: 2
  })

  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'paternal_grand_mother', f(1,8))
  checkResult(result, 'maternal_grand_mother', f(1,8))
  checkResult(result, 'maternal_sibling', f(1,2))
})

test('1 wife, 1 daughter, mother, 1 full_brother', () => {
  const result = calculate({ wife: 1, daughter: 1, mother: 1, full_brother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(5,24))
})

test('1 son, mother, 1 paternal_grand_mother, 1 full_uncle', () => {
  const result = calculate({
    son: 1,
    mother: 1,
    paternal_grand_mother: 1,
    full_paternal_uncle: 1
  })

  checkResult(result, 'son', f(5,6))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, mother, 1 full_uncle', () => {
  const result = calculate({ wife: 1, mother: 1, full_paternal_uncle: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'full_paternal_uncle', f(5,12))
})

test('1 wife, 1 son, mother, 1 full_uncle', () => {
  const result = calculate({ wife: 1, son: 1, mother: 1, full_paternal_uncle: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,24))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, 1 daughter, mother, 1 full_uncle', () => {
  const result = calculate({
    wife: 1,
    daughter: 1,
    mother: 1,
    full_paternal_uncle: 1
  })

  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_paternal_uncle', f(5,24))
})

test('1 wife, 2 son, mother, full_uncle', () => {
  const result = calculate({ wife: 1, son: 2, mother: 1, full_paternal_uncle: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,24))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, 1 son, 1 daughter, 1 mother, 1 full_uncle', () => {
  const result = calculate({
    wife: 1,
    son: 1,
    daughter: 1,
    mother: 1,
    full_paternal_uncle: 1
  })

  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,36))
  checkResult(result, 'daughter', f(17,72))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, 2 daughter, mother, full_uncle', () => {
  const result = calculate({
    wife: 1,
    daughter: 2,
    mother: 1,
    full_paternal_uncle: 1
  })

  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_paternal_uncle', f(1,24))
})

test('empty input', () => {
  const result = calculate({})
  expect(result.length).toEqual(0)
})

test('husband, 1 son', () => {
  const result = calculate({ husband: 1, son: 1 })
  checkResult(result, 'husband', f(1,4))
  checkResult(result, 'son', f(3,4))
})

test('husband, 1 son, 1 daughter', () => {
  const result = calculate({ husband: 1, son: 1, daughter: 1 })
  checkResult(result, 'husband', f(1,4))
  checkResult(result, 'son', f(1,2))
  checkResult(result, 'daughter', f(1,4))
})

test('husband, 1 full_brother, 1 full_sister', () => {
  const result = calculate({ husband: 1, full_brother: 1, full_sister: 1 })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'full_brother', f(1,3))
  checkResult(result, 'full_sister', f(1,6))
})

test('2 daughter, father, mother', () => {
  const result = calculate({ daughter: 2, father: 1, mother: 1 })
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'father', f(1,6))
  checkResult(result, 'mother', f(1,6))
})

test('2 daughter, 2 maternal_sibling', () => {
  const result = calculate({ daughter: 2, maternal_sibling: 2})
  checkResult(result, 'daughter', f(1))
})

test('3 son', () => {
  const result = calculate({ son: 3 })
  checkResult(result, 'son', f(1))
})

test('1 son, 2 daughter', () => {
  const result = calculate({ son: 1, daughter: 2 })
  checkResult(result, 'son', f(1,2))
  checkResult(result, 'daughter', f(1,2))
})

test('2 full_brother, 1 full_sister', () => {
  const result = calculate({ full_brother: 2, full_sister: 1 })
  checkResult(result, 'full_brother', f(4,5))
  checkResult(result, 'full_sister', f(1,5))
})

test('father, mother, 2 full_sister', () => {
  const result = calculate({ father: 1, mother: 1, full_sister: 2 })
  checkResult(result, 'father', f(5,6))
  checkResult(result, 'mother', f(1,6))
})

test('husband, 1 full_sister', () => {
  const result = calculate({ husband: 1, full_sister: 1 })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'full_sister', f(1,2))
})

test('husband, 1 daughter, father', () => {
  const result = calculate({ husband: 1, daughter: 1, father: 1 })
  checkResult(result, 'husband', f(1,4))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, { name: 'father', type: 'fard' }, f(1,6))
  checkResult(result, { name: 'father', type: 'tasib' }, f(1,12))
})

test('husband, 1 grand_daughter, 1 full_cousin', () => {
  const result = calculate({
    husband: 1,
    paternal_grand_daughter: 1,
    full_cousin: 1
  })
  checkResult(result, 'husband', f(1,4))
  checkResult(result, 'paternal_grand_daughter', f(1,2))
  checkResult(result, 'full_cousin', f(1,4))
})

test('mother, 2 full_brother', () => {
  const result = calculate({ mother: 1, full_brother: 2 })
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(5,6))
})

test('mother, 1 paternal_brother, 1 maternal_sibling', () => {
  const result = calculate({
    mother: 1,
    paternal_brother: 1,
    maternal_sibling: 1
  })
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'paternal_brother', f(2,3))
  checkResult(result, 'maternal_sibling', f(1,6))
})

test('2 wife, mother, 1 full_nephew', () => {
  const result = calculate({ wife: 2, mother: 1, full_nephew: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'full_nephew', f(5,12))
})

test('1 wife, 2 daughter, 1 paternal_cousin', () => {
  const result = calculate({ wife: 1, daughter: 2, paternal_cousin: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'paternal_cousin', f(5,24))
})

test('1 daughter, 1 grandson', () => {
  const result = calculate({ daughter: 1, paternal_grand_son: 1 })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'paternal_grand_son', f(1,2))
})

test('1 daughter, 1 paternal_cousin', () => {
  const result = calculate({ daughter: 1, paternal_cousin: 1 })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'paternal_cousin', f(1,2))
})

test('1 husband, 1 paternal_grand_mother, 1 maternal_brother, 1 full_uncle', () => {
  const result = calculate({
    husband: 1,
    paternal_grand_mother: 1,
    maternal_sibling: 1,
    full_paternal_uncle: 1
  })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'paternal_grand_mother', f(1,6))
  checkResult(result, 'maternal_sibling', f(1,6))
  checkResult(result, 'full_paternal_uncle', f(1,6))
})

test('1 wife, father', () => {
  const result = calculate({ wife: 1, father: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'father', f(3,4))
})

test('1 wife, 1 son, father', () => {
  const result = calculate({ wife: 1, son: 1, father: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,24))
  checkResult(result, 'father', f(1,6))
})

test('1 wife, 1 daughter, 1 full_brother', () => {
  const result = calculate({ wife: 1, daughter: 1, full_brother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'full_brother', f(3,8))
})

test('mother, 1 full_brother, 1 maternal_brother', () => {
  const result = calculate({ mother: 1, full_brother: 1, maternal_sibling: 1 })
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(2,3))
  checkResult(result, 'maternal_sibling', f(1,6))
})

test('1 daughter, 1 mother, 1 paternal_brother', () => {
  const result = calculate({ daughter: 1, mother: 1, paternal_brother: 1 })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'paternal_brother', f(1,3))
})

test('1 wife, 1 daughter, 1 father', () => {
  const result = calculate({ wife: 1, daughter: 1, father: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, { name: 'father', type: 'fard' }, f(1,6))
  checkResult(result, { name: 'father', type: 'tasib' }, f(5,24))
})

test('husband, mother, 1 full_brother', () => {
  const result = calculate({ husband: 1, mother: 1, full_brother: 1 })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'full_brother', f(1,6))
})

test('1 wife, 1 son, father, mother', () => {
  const result = calculate({ wife: 1, son: 1, father: 1, mother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(13,24))
  checkResult(result, 'father', f(1,6))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, 1 daughter, father, mother, 1 full_brother', () => {
  const result = calculate({ wife: 1, daughter: 1, father: 1, mother: 1, full_brother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, { name: 'father', type: 'fard' }, f(1,6))
  checkResult(result, { name: 'father', type: 'tasib' }, f(1,24))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, 1 daughter, 1 grand_daughter, 1 mother, 1 full_brother', () => {
  const result = calculate({
    wife: 1,
    daughter: 1,
    paternal_grand_daughter: 1,
    mother: 1,
    full_brother: 1
  })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'paternal_grand_daughter', f(1,6))
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(1,24))
})

test('1 wife, 3 daughter, 1 paternal_grand_mother, 1 full_brother', () => {
  const result = calculate({
    wife: 1,
    daughter: 3,
    paternal_grand_mother: 1,
    full_brother: 1
  })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'paternal_grand_mother', f(1,6))
  checkResult(result, 'full_brother', f(1,24))
})

test('1 wife, 3 Daughter, 1 full_brother', () => {
  const result = calculate({ wife: 1, daughter: 3, full_brother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'full_brother', f(5,24))
})

test('3 daughter, 1 paternal_uncle', () => {
  const result = calculate({ daughter: 3, full_paternal_uncle: 1 })
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'full_paternal_uncle', f(1,3))
})

test('2 wife, 3 full_sister, 3 paternal_brother', () => {
  const result = calculate({ wife: 2, full_sister: 3, paternal_brother: 3 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'full_sister', f(2,3))
  checkResult(result, 'paternal_brother', f(1,12))
})

test('2 wife, 3 paternal_grand_mother, 3 maternal_brother, 2 full_uncle', () => {
  const result = calculate({
    wife: 2,
    paternal_grand_mother: 3,
    maternal_sibling: 3,
    full_paternal_uncle: 2
  })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'paternal_grand_mother', f(1,6))
  checkResult(result, 'maternal_sibling', f(1,3))
  checkResult(result, 'full_paternal_uncle', f(1,4))
})

test('1 son, 1 daughter', () => {
  const result = calculate({ son: 1, daughter: 1 })
  checkResult(result, 'son', f(2,3))
  checkResult(result, 'daughter', f(1,3))
})

test('1 full_brother, 1 full_sister', () => {
  const result = calculate({ full_brother: 1, full_sister: 1 })
  checkResult(result, 'full_brother', f(2,3))
  checkResult(result, 'full_sister', f(1,3))
})

test('1 son, 2 daughter, 1 father', () => {
  const result = calculate({ son: 1, daughter: 2, father: 1 })
  checkResult(result, 'son', f(5,12))
  checkResult(result, 'daughter', f(5,12))
  checkResult(result, 'father', f(1,6))
})

test('1 wife, 1 paternal_brother, 1 paternal_sister', () => {
  const result = calculate({ wife: 1, paternal_brother: 1, paternal_sister: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'paternal_brother', f(1,2))
  checkResult(result, 'paternal_sister', f(1,4))
})

test('mother, 1 full_brother, 2 full_sister', () => {
  const result = calculate({ mother: 1, full_brother: 1, full_sister: 2 })
  checkResult(result, 'mother', f(1,6))
  checkResult(result, 'full_brother', f(5,12))
  checkResult(result, 'full_sister', f(5,12))
})

test('2 daughter, 1 grand_son, 1 grand_daughter', () => {
  const result = calculate({ daughter: 2, paternal_grand_son: 1, paternal_grand_daughter: 1 })
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'paternal_grand_son', f(2,9))
  checkResult(result, 'paternal_grand_daughter', f(1,9))
})

test('husband, 1 grand_son, 2 grand_daughter', () => {
  const result = calculate({ husband: 1, paternal_grand_son: 1, paternal_grand_daughter: 2 })
  checkResult(result, 'husband', f(1,4))
  checkResult(result, 'paternal_grand_son', f(3,8))
  checkResult(result, 'paternal_grand_daughter', f(3,8))
})

test('1 full_uncle', () => {
  const result = calculate({ full_paternal_uncle: 1 })
  checkResult(result, 'full_paternal_uncle', f(1,1))
})

test('1 paternal_cousin', () => {
  const result = calculate({ paternal_cousin: 1 })
  checkResult(result, 'paternal_cousin', f(1,1))
})

test('3 son, 1 daughter', () => {
  const result = calculate({ son: 3, daughter: 1 })
  checkResult(result, 'son', f(6,7))
  checkResult(result, 'daughter', f(1,7))
})

test('1 wife, 3 son, 1 daughter', () => {
  const result = calculate({ wife: 1, son: 3, daughter: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(3,4))
  checkResult(result, 'daughter', f(1,8))
})

test('1 wife, 1 son, 1 daughter', () => {
  const result = calculate({ wife: 1, son: 1, daughter: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(7,12))
  checkResult(result, 'daughter', f(7,24))
})
