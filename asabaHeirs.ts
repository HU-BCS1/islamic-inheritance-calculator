import { AsabaHeir } from './heir'

export const Son: AsabaHeir = { name: 'son', tasibRank: 1 }
export const Daughter: AsabaHeir = { name: 'daughter', tasibRank: 1 }

export const PaternalGrandSon: AsabaHeir = { name: 'paternal_grand_son', tasibRank: 2 }
export const PaternalGrandDaughter: AsabaHeir = { name: 'paternal_grand_daughter', tasibRank: 2 }

export const Father: AsabaHeir = { name: 'father', tasibRank: 3 }

export const PaternalGrandFather: AsabaHeir = { name: 'paternal_grand_father', tasibRank: 4 }

export const FullBrother: AsabaHeir = { name: 'full_brother', tasibRank: 5 }
export const FullSister: AsabaHeir = { name: 'full_sister', tasibRank: 5 }

export const PaternalBrother: AsabaHeir = { name: 'paternal_brother', tasibRank: 6 }
export const PaternalSister: AsabaHeir = { name: 'paternal_sister', tasibRank: 6 }

export const FullNephew: AsabaHeir = { name: 'full_nephew', tasibRank: 7 }
export const PaternalNephew: AsabaHeir = { name: 'paternal_nephew', tasibRank: 8 }

export const FullNephewSon: AsabaHeir = { name: `full_nephew_s_son`, tasibRank: 9 }
export const PaternalNephewSon: AsabaHeir = { name: `paternal_nephew_s_son`, tasibRank: 10 }

export const FullPaternalUncle: AsabaHeir = { name: 'full_paternal_uncle', tasibRank: 11 }
export const PaternalPaternalUncle: AsabaHeir = { name: 'paternal_paternal_uncle', tasibRank: 12 }

export const FullCousin: AsabaHeir = { name: 'full_cousin', tasibRank: 13 }
export const PaternalCousin: AsabaHeir = { name: 'paternal_cousin', tasibRank: 14 }

export const FullCousinSon: AsabaHeir = { name: `full_cousin_s_son`, tasibRank: 15 }
export const PaternalCousinSon: AsabaHeir = { name: `paternal_cousin_s_son`, tasibRank: 16 }

export const FullCousinGrandson: AsabaHeir = { name: `full_cousin_s_grandson`, tasibRank: 17 }
export const PaternalCousinGrandson: AsabaHeir = { name: `paternal_cousin_s_grandson`, tasibRank: 18 }

const ahs = [
    Daughter,
    Father,
    FullBrother,
    FullCousin,
    FullCousinGrandson,
    FullCousinSon,
    FullNephew,
    FullNephewSon,
    FullPaternalUncle,
    FullSister,
    PaternalBrother,
    PaternalCousin,
    PaternalCousinGrandson,
    PaternalCousinSon,
    PaternalGrandDaughter,
    PaternalGrandFather,
    PaternalGrandSon,
    PaternalNephew,
    PaternalNephewSon,
    PaternalPaternalUncle,
    PaternalSister,
    Son,
  ]

  export default ahs