import Fraction from "fraction.js";

// export interface Quota {
//   name: string
//   fraction: string
//   value: number
// }

// export const half: Quota = { name: 'Half', fraction: '1/2', value: 1 / 2 }
// export const quarter: Quota = { name: 'Quarter', fraction: '1/4', value: 1 / 4 }
// export const eighth: Quota = { name: 'Eighth', fraction: '1/8', value: 1 / 8 }
// export const third: Quota = { name: 'Third', fraction: '1/3', value: 1 / 3 }
// export const twoThird: Quota = { name: 'TwoThird', fraction: '2/3', value: 2 / 3 }
// export const sixth: Quota = { name: 'Sixth', fraction: '1/6', value: 2 / 3 }
// export const nothing: Quota = { name: 'Nothing', fraction: '0', value: 0 }

export const half = new Fraction(1,2)
export const quarter = new Fraction(1,4)
export const eighth = new Fraction(1,8)
export const third = new Fraction(1,3)
export const twoThird = new Fraction(2,3)
export const sixth = new Fraction(1,6)
export const nothing = new Fraction(0)