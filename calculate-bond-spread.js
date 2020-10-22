const BOND_TYPES = {
    CORP: 'corporate',
    GOV: 'government'
}

/**
 * Calculates spread of a corporate bond with its benchmark government bond
 * @param {Array.<{id: String, type: String, tenor: String, yield: String, amount_outstanding: Number}>} inputData
 * @returns {Array.<{corporate_bond_id: String, government_bond_id: String, spread_to_benchmark: String}>}
 */
const calculateBondSpread = (inputData) => {
    const corporateBonds = [];
    const governmentBonds = [];
    const result = [];

    // filter out bond without valid fields and generate candidate coporate bonds and goverment bonds
    for(const bond of inputData) {
        const { id, type, tenor, yield: bondYield, amount_outstanding } = bond;
        if (id && type && tenor && bondYield && amount_outstanding) {
            if (type === BOND_TYPES.CORP) corporateBonds.push(bond);
            if (type === BOND_TYPES.GOV) governmentBonds.push(bond);
        }
    }

    // for each coporate bonds find its benchmark bond and calculates spread
    for(const corpBond of corporateBonds) {
        const benchMarkGovBond = getBenchMarkGovBond(corpBond, governmentBonds);

        if (benchMarkGovBond) {
            const corpBondYield = parseFloat(corpBond.yield.slice(0, -1)); // remove % sign and parse to number
            const benchMarkGovBondYield = parseFloat(benchMarkGovBond.yield.slice(0, -1)); // remove % sign and parse to number
            const spread = Math.abs(((corpBondYield - benchMarkGovBondYield)*100).toFixed(0));

            result.push({
                corporate_bond_id: corpBond.id,
                government_bond_id: benchMarkGovBond.id,
                spread_to_benchmark: `${spread} bps`
            })
        }
    }

    return  result
}

/**
 * Find the bench mark government bond for the corporate bond
 * @param {{id: String, type: String, tenor: String, yield: String, amount_outstanding: Number}} corpBond
 * @param {Array.<{id: String, type: String, tenor: String, yield: String, amount_outstanding: Number}>} governmentBonds
 * @returns {{id: String, type: String, tenor: String, yield: String, amount_outstanding: Number}} benchMarkGovBond
 */

const getBenchMarkGovBond = (corpBond, governmentBonds) => {
    // parse numeric tenor value
    let corpBondTenor = parseFloat(corpBond.tenor.split(' ')[0]);
    let benchMarkGovBond = null;

    if(isNaN(corpBondTenor)) {
        console.log('Malformed data, skipped', corpBond);
        return benchMarkGovBond;
    }

    let minTenorDiff = Number.MAX_SAFE_INTEGER;

    // find the government bond with min tenor diff
    // use larger amount_outstanding to break tie
    for(const govBond of governmentBonds) {
        const govBondTenor = parseFloat(govBond.tenor.split(' ')[0]);
        if(isNaN(govBondTenor)) {
            console.log('Malformed data, skipped', govBond);
            continue;
        }
        const currenDiff = Math.abs(corpBondTenor - govBondTenor);

        if(currenDiff < minTenorDiff || currenDiff === minTenorDiff && benchMarkGovBond.amount_outstanding < govBond.amount_outstanding) {
            benchMarkGovBond = govBond;
            minTenorDiff = currenDiff;
        }
    }

    return benchMarkGovBond;
}

module.exports = calculateBondSpread;
