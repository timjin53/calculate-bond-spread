const multipleValidBond = {
    data: [{
        "id": "g1",
        "type": "government",
        "tenor": "9.4 years",
        "yield": "3.70%",
        "amount_outstanding": 2500000
    },
    {
        "id": "c1",
        "type": "corporate",
        "tenor": "9.4 years",
        "yield": "3.80%",
        "amount_outstanding": 1100000
    },
    {
        "id": "c2",
        "type": "corporate",
        "tenor": "13.5 years",
        "yield": "3.80%",
        "amount_outstanding": 1100000
    },
    {
        "id": "c3",
        "type": "corporate",
        "tenor": "1 years",
        "yield": "11.01%",
        "amount_outstanding": 1100000
    },
    {
        "id": "g2",
        "type": "government",
        "tenor": "12.5 years",
        "yield": "4.80%",
        "amount_outstanding": 1750000
    },
    {
        "id": "g3",
        "type": "government",
        "tenor": "9.4 years",
        "yield": "20%",
        "amount_outstanding": 3500000
    }],
    expected: [{
        corporate_bond_id:"c1",
        government_bond_id:"g3",
        spread_to_benchmark:"1620 bps"
    },
    {
        corporate_bond_id:"c2",
        government_bond_id:"g2",
        spread_to_benchmark:"100 bps"
    },
    {
        corporate_bond_id:"c3",
        government_bond_id:"g3",
        spread_to_benchmark:"899 bps"
    }]
}

module.exports = multipleValidBond;