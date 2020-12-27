import Fraction from 'fraction.js'
import { sum, zip, flow } from 'lodash'
import { Heir } from './heir'
import {
  Result,
  findFromResult,
  sumResults,
  updateResults, printResults
} from './result'
import { sixth, quarter, third, half, nothing } from './quota'
import { distribute } from './utils'


export function calculateSpecialCases(
  fardResult: Result[],
  asabaResult: Result[]
): Result[] {
  const results = [...fardResult, ...asabaResult]
  return flow([umariyyahCase, mushtarakaCase, awlCase, raddCase])(results)
}

function awlCase(result: Result[]): Result[] {
  const whole = new Fraction(1)
  const remaining = whole.sub(sumResults(result))
  const sum = sumResults(result)
  if (remaining.compare(0) < 0) {
    return result.map(r => ({
      ...r,
      share: r.share.div(sum)
    }))
  }

  return result
}

function raddCase(result: Result[]): Result[] {
  const whole = new Fraction(1)
  const remaining = whole.sub(sumResults(result))

  if (remaining.compare(0) > 0) {
    const ratios = toRatio(
      result.map(r => {
        if ((r.name === 'wife' || r.name === 'husband') && result.length > 1) {
          return new Fraction(0)
        }
        return r.share
      })
    )

    return zip(result, ratios).map(([r, ratio]) => {
      if (!r || !ratio) {
        throw Error('result and ratios should be equal in lenght')
      }

      return { ...r, share: r.share.add(remaining.mul(ratio)) }
    })
  }

  return result
}

function mushtarakaCase(result: Result[]): Result[] {
  const fullBrother = findFromResult(result, 'full_brother')
  const maternalSibling = findFromResult(result, 'maternal_sibling')

  if (fullBrother && maternalSibling) {
    if (fullBrother.share.compare(nothing) === 0) {
      return updateResults(
        result,
        distribute([fullBrother, maternalSibling], maternalSibling.share)
      )
    }
  }

  return result
}

function umariyyahCase(result: Result[]): Result[] {
  const father = findFromResult(result, 'father')
  const mother = findFromResult(result, 'mother')
  const wife = findFromResult(result, 'wife')
  const husband = findFromResult(result, 'husband')

  const isUmariyyah = result.every(r => {
    const umariyyahParticipants: Heir[] = ['father', 'mother', 'husband', 'wife']
    return umariyyahParticipants.includes(r.name)
  })

  if (!isUmariyyah) return result

  const type = 'special_case'
  if (father && mother && wife) {
    return [
      { ...wife, share: quarter },
      { ...father, type, share: half },
      { ...mother, type, share: quarter }
    ]
  }

  if (father && mother && husband) {
    return [
      { ...husband, share: half },
      { ...father, type, share: third },
      { ...mother, type, share: sixth }
    ]
  }

  return result
}

const toRatio = (fractions: Fraction[]) => {
  const oldBase = fractions.reduce(
    (accumulator, current) => accumulator.gcd(current),
    new Fraction(1)
  ).d
  const ratios = fractions.map(f => (oldBase / f.d) * f.n)
  const newBase = sum(ratios)
  return ratios.map(r => new Fraction(r, newBase))
}