import ahs from './asabaHeirs'
import { Heirs } from './heir'
import { unknown } from './quota'
import { Result } from './result'
import { exists, count, distribute } from './utils'
import Fraction from 'fraction.js'
import flow from 'lodash.flow'


export function calculateTasib(heirs: Heirs, remaining: Fraction) : Result[] {
  // filter asaba and sort them by their tasibRank
  const asabas = ahs
    .filter(ah => exists(heirs, ah.name))
    .sort((a, b) => a.tasibRank - b.tasibRank)

  const qualifiedAsabas = asabas
    .filter(ah => asabas[0].tasibRank === ah.tasibRank)

  const results = qualifiedAsabas
    .map(ah => {
      const result: Result = {
        name: ah.name,
        count: count(heirs, ah.name),
        type: 'tasib',
        share: unknown
      }
      return result
  })

  return distribute(results, remaining)
}