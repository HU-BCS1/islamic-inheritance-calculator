# islamic-inheritance-calculator
NB: This a work in progress. if you see an error in calculation please file  an issue

## install
```
npm install --save https://github.com/HU-BCS1/islamic-inheritance-calculator.git
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
[ ] ميراث الجد مع الإخوة

[ ] ميراث الأخ الشقيق مع الإخوة لأم

[ ] add option to configure special cases

[ ] add more test cases from http://inheritance.ilmsummit.org/projects/inheritance/testcasespage.aspx