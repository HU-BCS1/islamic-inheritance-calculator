import { heirs as defaultHeirs, Heirs } from './heir'
import {
  printResults
} from './result'
import { calculateFard } from './fard'
import { calculateTasib } from './tasib'
import { calculateSpecialCases } from './specialCases'


export const calculate = (heirs: Partial<Heirs>) => {
  const allHeirs: Heirs = { ...defaultHeirs, ...heirs }
  const fardResult = calculateFard(allHeirs)
  const tasibResult = calculateTasib(allHeirs, fardResult)
  const results = calculateSpecialCases(fardResult, tasibResult)
  return results
}

// const result = calculate({ son: 1, daughter: 1 })
// printResults(result)