import { heirs, Heirs } from './heir'
import {
  Result,
  QuotaResult,
  AsabaResult,
  findFromResult,
  updateResults,
  printResults
} from './result'
import { isZero } from './utils'
import { sixth, quarter } from './quota'
import { calculateFard } from './fard'
import { calculateTasib } from './taseeb'
import flow from 'lodash.flow'


function calculateSpecialCases(quotaResult: QuotaResult[], asabaResult: AsabaResult[]) : Result[] {
  // If an heir is given the prescribed share, he/she drops from Ta’seeb
  // father is an exception to this rule 
  asabaResult = asabaResult.filter(asb => {
    return asb.name === 'father' ||
      !quotaResult.find(qt => qt.name === asb.name && !isZero(qt.share))
  })

  const results = [...quotaResult, ...asabaResult]
  return flow([UmariyyahCase])(results)
}

function UmariyyahCase(results: Result[]) : Result[] {
  const father = findFromResult(results, 'father')
  const mother = findFromResult(results, 'mother')
  const wife = findFromResult(results, 'wife')
  const husband = findFromResult(results, 'husband')

  if (father && mother && wife) {
    return updateResults(results, [{ ...mother, share: quarter }])
  }

  if (father && mother && husband) {
    return updateResults(results, [{ ...mother, share: sixth }])
  }

  return results
}

const caseOne: Heirs = { ...heirs, father: 1, mother: 1, husband: 1 }
const results = calculateSpecialCases(
  calculateFard(caseOne),
  calculateTasib(caseOne),
)

printResults(results)