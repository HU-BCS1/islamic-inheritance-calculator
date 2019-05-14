import Fraction from 'fraction.js'
import { Heir } from './heir'

export type Result = { name: Heir, count: number, type: 'tasib'|'fard'|'special_case', share: Fraction }

export const isFard = (result: Result) => result.type === 'fard' 
export const isTasib = (result: Result) => result.type === 'tasib' 

export const findFromResult = (
  results: Result[],
  heir: Heir,
  type?: 'tasib'|'fard'|'special_case'
) => {
  if(type) return results.find(r => r.name === heir && r.type === type)
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
  const fractionToString = (r: Result) => ({
    ...r,
    share: r.share.toFraction()
  })

  console.log(results.map(fractionToString))
}

export const sumResults = (results: Result[]) => {
  let sum = new Fraction(0)
  results.forEach(r => sum = sum.add(r.share))
  return sum
}