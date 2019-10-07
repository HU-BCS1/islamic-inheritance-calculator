import { half, quarter, eighth, sixth, third, nothing, twoThird } from './quota'
import { FardHeir } from './heir'
import {
  count,
  exists,
  hasChild,
  hasGroupOfSiblings,
  hasPaternalMaleAncestor
} from './utils'

const Husband: FardHeir = {
  name: 'husband',
  share: function(heirs) {
    if (hasChild(heirs)) { return quarter }
    else { return half }
  }
}

const Wife: FardHeir = {
  name: 'wife',
  share: function(heirs) {
    if (hasChild(heirs)) { return eighth }
    else { return half }
  }
}

const Daughter: FardHeir = {
  name: 'daughter',
  share: function(heirs) {
    if (exists(heirs, 'son')) { return nothing } // joint ta'seeb

    if (count(heirs, this.name) === 1) { return half }
    else { return twoThird }
  }
}

const PaternalGrandDaughter: FardHeir = {
  name: 'paternal_grand_daughter',
  share: function(heirs) {
    if (exists(heirs, 'son')) { return nothing }
    if (exists(heirs, 'paternal_grand_son')) { return nothing } // joint ta'seeb

    if (count(heirs, 'daughter') > 1) {
      return nothing
    }
    else if (count(heirs, 'daughter') === 1) {
      return sixth
    }
    else {
      if (count(heirs, this.name) === 1) { return half }
      else { return twoThird }
    }
  }
}

const Father: FardHeir = {
  name: 'father',
  share: function(heirs) {
    if (hasChild(heirs)) { return sixth }

    return nothing // ta'seeb
  }
}

const Mother: FardHeir = {
  name: 'mother',
  share: function(heirs) {
    if (hasChild(heirs)) { return sixth }
    if (hasGroupOfSiblings(heirs)) { return sixth }

    return third
  }
}

const PaternalGrandFather: FardHeir = {
  name: 'paternal_grand_father',
  share: function(heirs) {
    if (exists(heirs, 'father')) { return nothing }
    if (hasChild(heirs)) { return sixth }
    return nothing // ta'seeb
  }
}

const PaternalGrandMother: FardHeir = {
  name: 'paternal_grand_mother',
  share: function(heirs) {
    if (exists(heirs, 'father')) { return nothing }
    if (exists(heirs, 'mother')) { return nothing }

    return sixth // NOTE: sixth is shared with maternal_grand_mother
  }
}

const MaternalGrandMother: FardHeir = {
  name: 'maternal_grand_mother',
  share: function(heirs) {
    if (exists(heirs, 'mother')) { return nothing }

    return sixth // NOTE: sixth is shared with paternal_grand_mother
  }
}

const FullSister: FardHeir = {
  name: 'full_sister',
  share: function(heirs) {
    if (hasChild(heirs)) { return nothing }
    if (hasPaternalMaleAncestor(heirs)) { return nothing }
    if (exists(heirs, 'full_brother')) { return nothing } // joint ta'seeb

    if (count(heirs, this.name) === 1) { return half }
    else { return twoThird }
  }
}

const PaternalSister: FardHeir = {
  name: 'paternal_sister',
  share: function(heirs) {
    if (hasChild(heirs)) { return nothing }
    if (hasPaternalMaleAncestor(heirs)) { return nothing }
    if (exists(heirs, 'full_brother')) { return nothing }
    if (exists(heirs, 'paternal_brother')) { return nothing } // joint ta'seeb
    if (count(heirs, 'full_sister') > 1) {return nothing }

    if (count(heirs, 'full_sister') === 1) {
      if (count(heirs, this.name) === 1) { return sixth }
      else { return nothing }
    }
    else {
      if (count(heirs, this.name) === 1) { return half }
      else { return twoThird }
    }
  }
}

const MaternalSibling: FardHeir = {
  name: 'maternal_sibling',
  share: function(heirs) {
    if (hasChild(heirs)) { return nothing }
    if (hasPaternalMaleAncestor(heirs)) { return nothing }

    if (count(heirs, this.name) === 1) { return sixth }
    else { return third }
  }
}

const fhs = [
  Daughter,
  Father,
  FullSister,
  Husband,
  MaternalGrandMother,
  MaternalSibling,
  Mother,
  PaternalGrandDaughter,
  PaternalGrandFather,
  PaternalGrandMother,
  PaternalSister,
  Wife
]

export default fhs