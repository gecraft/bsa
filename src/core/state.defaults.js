import appPackage from '../../package.json';

const _resourceLinks = ['bsa/ru/rlob/master', 'bsa/ru/rsob/master', 'bsa/ru/rob/master'];
//const _resourceLinks = ['unfoldingWord/en/ult/master', 'bsa/ru/rlob/master', 'unfoldingWord/en/ust/master'];

const _absoluteLayout = [
  { w: 4, h: 5, x: 0, y: 0, i: '1' },
  { w: 4, h: 5, x: 4, y: 0, i: '2' },
  { w: 4, h: 5, x: 8, y: 0, i: '3' },
  { w: 6, h: 3, x: 0, y: 6, i: '4' },
  { w: 6, h: 3, x: 6, y: 6, i: '5' },
];

export default {
  resourceLinks: _resourceLinks,
  absoluteLayout: _absoluteLayout
};
