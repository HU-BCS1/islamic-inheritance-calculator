# islamic-inheritance-calculator <a href="https://www.npmjs.com/package/@hu-bcs1/islamic-inheritance-calculator"><img alt="npm (scoped)" src="https://img.shields.io/npm/v/@hu-bcs1/islamic-inheritance-calculator.svg?style=flat-square"></a>

NB: This a work in progress. if you spot an error in calculations, then please file an issue

## install
```
$ npm i @hu-bcs1/islamic-inheritance-calculator
```

## usage
```typescript
import { defaultHeirs, calculate } from 'islamic-inheritance-calculator'

function printResults(results) {
  const fractionToString = r => ({ ...r, share: r.share.toFraction() })
  console.log(results.map(fractionToString))
}

const result = calculate({ wife: 3, son: 1, daughter: 1 })
printResuls(result)
//=> [
//     { name: 'wife',     count: 3, type: 'fard',  share: '1/8'  },
//     { name: 'son',      count: 1, type: 'tasib', share: '7/12' },
//     { name: 'daughter', count: 1, type: 'tasib', share: '7/24' }
//   ]
```

## TODO
- [ ] ميراث الجد مع الإخوة
- [x] ميراث الأخ الشقيق مع الإخوة لأم
- [x] مسألة الرد
- [x] مسألة العول
- [ ] add option to configure special cases
- [ ] add more test cases from http://inheritance.ilmsummit.org/projects/inheritance/testcasespage.aspx
