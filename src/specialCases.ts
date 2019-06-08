import Fraction from 'fraction.js'
import { sum, zip } from 'lodash'
import { Heir } from './heir'
import {
  Result,
  findFromResult,
  sumResults
} from './result'
import { sixth, quarter, third, half } from './quota'


export function calculateSpecialCases(fardResult: Result[], asabaResult: Result[]) : Result[] {
  const results = [...fardResult, ...asabaResult]
  return raddCase(awlCase(umariyyahCase(results)))
}

function awlCase(result: Result[]) : Result[] {
  const whole = new Fraction(1)
  const remaining = whole.sub(sumResults(result))
  const sum = sumResults(result)
  if(remaining.compare(0) < 0) {
    return result.map(r => ({
      ...r,
      share: r.share.div(sum)
    }))
  }

  return result
}

function raddCase(result: Result[]) : Result[] {
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

function mushtarakaCase(result: Result[]) {}

function umariyyahCase(results: Result[]) : Result[] {
  const father = findFromResult(results, 'father')
  const mother = findFromResult(results, 'mother')
  const wife = findFromResult(results, 'wife')
  const husband = findFromResult(results, 'husband')

  const isUmariyyah = results.every(r => {
    const umariyyahParticipants: Heir[] = ['father', 'mother', 'husband', 'wife']
    return umariyyahParticipants.includes(r.name)
  })

  if (!isUmariyyah) return results

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

  return results
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