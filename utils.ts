import Fraction from 'fraction.js'
import sumBy from 'lodash.sumby'
import { Heir, Heirs } from './heir'
import { Result } from './result'

export const count = (heirs: Heirs, heir: Heir) => heirs[heir]
export const exists = (heirs: Heirs, heir: Heir) => heirs[heir] > 0

export const hasChild = (heirs: Heirs) => {
  const children: Heir[] = ['son', 'daughter', 'paternal_grand_son', 'paternal_grand_daughter']
  return children.some(child => exists(heirs, child))
}

export const hasGroupOfSiblings = (heirs: Heirs) => {
  const siblings: Heir[] = [
    'full_brother', 'full_sister', 'paternal_sister', 'paternal_brother',
    'maternal_sibling'
  ]

  let count = 0
  siblings.forEach(sibling => count += heirs[sibling])
  return count > 1
}

export const hasPaternalMaleAncestor = (heirs: Heirs) => {
  const ancestors: Heir[] = ['father', 'paternal_grand_father']
  return ancestors.some(ancestor => exists(heirs, ancestor))
}

export const distribute = (
  heirs: { name: Heir, type: 'tasib'|'fard'|'special_case', count: number, proportion?: number }[],
  amount: Fraction
) => {
  const total = sumBy(heirs, h => (h.proportion || 1) * h.count)
  return heirs.map(h => {
    const result: Result = {
      name: h.name,
      count: h.count,
      type: h.type,
      share: amount.mul((h.proportion || 1) * h.count, total)
    }
    return result
  })
}

export const isZero = (v: Fraction) => v.equals(new Fraction(0))
