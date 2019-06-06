import Fraction from 'fraction.js'
import { Heir } from './heir'
import {
  Result,
  findFromResult,
  printResults,
  sumResults
} from './result'
import { sixth, quarter, third, half } from './quota'


export function calculateSpecialCases(fardResult: Result[], asabaResult: Result[]) : Result[] {
  const results = [...fardResult, ...asabaResult]
  return awlCase(umariyyahCase(results))
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

  if(!isUmariyyah) return results

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