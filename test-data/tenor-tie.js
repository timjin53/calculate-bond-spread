const tenorTie = {
    data: [{
        "id": "g1",
        "type": "government",
        "tenor": "12.0 years",
        "yield": "3.70%",
        "amount_outstanding": 2500000
    },
    {
        "id": "c2",
        "type": "corporate",
        "tenor": "13.5 years",
        "yield": "3.80%",
        "amount_outstanding": 1100000
    },
    {
        "id": "g2",
        "type": "government",
        "tenor": "12.0 years",
        "yield": "4.80%",
        "amount_outstanding": 1750000
    }],
    expected: [{
        corporate_bond_id:"c2",
        government_bond_id:"g1",
        spread_to_benchmark:"10 bps"
    }]
}

module.exports = tenorTie;