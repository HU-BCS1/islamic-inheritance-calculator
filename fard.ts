import fhs from './fardHeirs'
import { Heirs } from './heir'
import {
  Result,
  QuotaResult,
  isQuotaResult,
  findFromResult,
  updateResults,
} from './result'
import { exists, count, distribute, isZero } from './utils'
import { sixth } from './quota'
import flow from 'lodash.flow'


export function calculateFard(heirs: Heirs) : QuotaResult[] {
  const fardHiers = fhs.filter(fh => exists(heirs, fh.name))

  const results = fardHiers
    .map(fh => {
      const result: QuotaResult = {
        name: fh.name,
        count: count(heirs, fh.name),
        share: fh.share(heirs)
      }
      return result
    })

  return flow([shareSixthBetweenGrandmothers])(results)
}

function shareSixthBetweenGrandmothers(results: Result[]) : Result[] {
  const mGrandMother = findFromResult(results, 'maternal_grand_mother')
  const pGrandMother = findFromResult(results, 'paternal_grand_mother')
  if(
    mGrandMother &&
    pGrandMother &&
    isQuotaResult(mGrandMother) &&
    isQuotaResult(pGrandMother) &&
    !isZero(mGrandMother.share) &&
    !isZero(pGrandMother.share)
  ) {
    return updateResults(
      results,
      distribute([mGrandMother, pGrandMother], sixth)
    )
  }

  return results
}