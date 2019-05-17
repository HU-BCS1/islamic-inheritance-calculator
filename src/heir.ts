import Fraction from 'fraction.js'

type Spouse = 'husband' | 'wife'

type Descendant = 'son' | 'daughter' | 'paternal_grand_son' | 'paternal_grand_daughter'

type Ancestor =
  'father' | 'mother' | 'paternal_grand_father' |
  'paternal_grand_mother' | 'maternal_grand_mother'

type Sibling =
  'full_brother' | 'full_sister' |
  'paternal_sister' | 'paternal_brother' |
  'maternal_sibling'

type Other =
  'full_nephew' | 'paternal_nephew' |
  'full_nephew_s_son' | 'paternal_nephew_s_son' |
  'full_paternal_uncle' | 'paternal_paternal_uncle' |
  'full_cousin' | 'paternal_cousin' |
  'full_cousin_s_son' | 'paternal_cousin_s_son' |
  'full_cousin_s_grandson' | 'paternal_cousin_s_grandson'

export type Heir = Spouse | Descendant | Ancestor | Sibling | Other

// map of heirs to their count
export type Heirs = { [heir in Heir]: number }

export interface FardHeir {
  name: Heir
  share: (heirs: Heirs) => Fraction
}

export interface AsabaHeir {
  name: Heir
  tasibRank: number
}

export const heirs: Heirs = {
  'husband': 0,
  'wife': 0,
  'son': 0,
  'daughter': 0,
  'paternal_grand_son': 0,
  'paternal_grand_daughter': 0,
  'father': 0,
  'mother': 0,
  'paternal_grand_father': 0,
  'paternal_grand_mother': 0,
  'maternal_grand_mother': 0,
  'full_brother': 0,
  'full_sister': 0,
  'paternal_sister': 0,
  'paternal_brother': 0,
  'maternal_sibling': 0,
  'full_nephew': 0,
  'paternal_nephew': 0,
  'full_nephew_s_son': 0,
  'paternal_nephew_s_son': 0,
  'full_paternal_uncle': 0,
  'paternal_paternal_uncle': 0,
  'full_cousin': 0,
  'paternal_cousin': 0,
  'full_cousin_s_son': 0,
  'paternal_cousin_s_son': 0,
  'full_cousin_s_grandson': 0,
  'paternal_cousin_s_grandson': 0
}