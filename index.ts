import { heirs, Heirs } from './heir'
import {
  printResults
} from './result'
import { calculateFard } from './fard'
import { calculateTasib } from './tasib'
import { calculateSpecialCases } from './specialCases'


const caseOne: Heirs = { ...heirs, daughter: 1, son: 2 }
const fardResult = calculateFard(caseOne)
const tasibResult = calculateTasib(caseOne, fardResult)
const results = calculateSpecialCases(fardResult, tasibResult)

printResults(results)