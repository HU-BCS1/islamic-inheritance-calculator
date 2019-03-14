import Fraction from 'fraction.js';
import { Heir } from './heir'

export type Result = { name: Heir, count: number, share: 'asaba' | Fraction }
export type QuotaResult = { name: Heir, count: number, share: Fraction }
export type AsabaResult = { name: Heir, count: number, share: 'asaba' }

export function isQuotaResult(result: Result): result is QuotaResult {
    return result.share !== 'asaba'
}

export const findFromResult = (results: Result[], heir: Heir) => {
  return results.find(r => r.name === heir)
}

export const updateResults = (
  results: Result[],
  updateResults: Result[]
) => {
  return results.map(r => {
    const updated = findFromResult(updateResults, r.name)
    return updated || r
  })
}

export function printResults(results: Result[]) {
  function resultFractionToString(r: Result) {
    return isQuotaResult(r) ? { ...r, share: r.share.toFraction() } : r
  }
  console.log(results.map(resultFractionToString))
}