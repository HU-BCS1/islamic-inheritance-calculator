import ahs from './asabaHeirs'
import { Heirs } from './heir'
import {
  AsabaResult,
} from './result'
import { exists, count } from './utils'


export function calculateTasib(heirs: Heirs) : AsabaResult[] {
  // filter asaba and sort them by their tasibRank
  const asabas = ahs
    .filter(ah => exists(heirs, ah.name))
    .sort((a, b) => a.tasibRank - b.tasibRank)

  const qualifiedAsabas = asabas
    .filter(ah => asabas[0].tasibRank === ah.tasibRank)

  return qualifiedAsabas
    .map(ah => {
      const result: AsabaResult = {
        name: ah.name,
        count: count(heirs, ah.name),
        share: 'asaba'
      }
      return result
  })
}