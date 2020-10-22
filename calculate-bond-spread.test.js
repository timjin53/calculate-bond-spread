const calculateBondSpread = require('./calculate-bond-spread');
const nullYield = require('./test-data/null-yield');
const basicOneValidBond = require('./test-data/null-yield');
const tenorTie = require('./test-data/tenor-tie');
const multipleValidBond = require('./test-data/multiple-valid-bond');
const malformTenor = require('./test-data/malform-tenor')

describe('calculateBondSpread', () => {
    test('should ignore bond without yield field', () => {
        expect(calculateBondSpread(nullYield.data)).toEqual(nullYield.expected);
    });

    test('should find benckmark bond and generate correct result', () => {
        expect(calculateBondSpread(basicOneValidBond.data)).toEqual(basicOneValidBond.expected);
    });

    test('should find benckmark bond with greater amount_outstanding when tenor ties and generate correct result', () => {
        expect(calculateBondSpread(tenorTie.data)).toEqual(tenorTie.expected);
    });

    test('should find benckmark for every valid bond and generate correct result', () => {
        expect(calculateBondSpread(multipleValidBond.data)).toEqual(multipleValidBond.expected);
    });

    test('should skip malformed tenor and log', () => {
        expect(calculateBondSpread(malformTenor.data)).toEqual(malformTenor.expected);
    });
});
