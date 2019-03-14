import { Heir, Heirs } from './heir'
import Fraction from 'fraction.js';
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
  heirs: { name: Heir, count: number, proportion?: number }[],
  amount: Fraction
) => {
  const total = heirs.length
  return heirs.map(h => {
    const result: Result = {
      name: h.name,
      count: h.count,
      share: amount.mul(h.proportion || 1, total)
    }
    return result
  })
}

export const isZero = (v: Fraction) => v.equals(new Fraction(0))
