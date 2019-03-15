import { heirs, Heirs, Heir } from './heir'
import {
  Result,
  findFromResult,
  printResults,
  sumResults
} from './result'
import { isZero } from './utils'
import { sixth, quarter, third, half } from './quota'
import { calculateFard } from './fard'
import { calculateTasib } from './tasib'
import Fraction from 'fraction.js';


function calculateSpecialCases(quotaResult: Result[], asabaResult: Result[]) : Result[] {
  // If an heir is given the prescribed share, he/she drops from Ta’seeb
  // father is an exception to this rule 
  asabaResult = asabaResult.filter(asb => {
    return asb.name === 'father' ||
      !quotaResult.find(qt => qt.name === asb.name && !isZero(qt.share))
  })

  const results = [...quotaResult, ...asabaResult]
  return umariyyahCase(results)
}

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

const caseOne: Heirs = { ...heirs, father: 1, mother: 1, husband: 1 }
const fardResult = calculateFard(caseOne)
const whole = new Fraction(1)
const remaining = whole.sub(sumResults(fardResult))
const tasibResult = calculateTasib(caseOne, remaining)
const results = calculateSpecialCases(fardResult, tasibResult)

printResults(results)