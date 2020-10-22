const nullYield = {
    data: [{
        "id": "g1",
        "type": "government",
        "tenor": "9.4 years",
        "yield": "3.70%",
        "amount_outstanding": 2500000
    },
    {
        "id": "c2",
        "type": "corporate",
        "tenor": "13.5 years",
        "yield": null,
        "amount_outstanding": 1100000
    },
    {
        "id": "g2",
        "type": "government",
        "tenor": "12.0 years",
        "yield": "4.80%",
        "amount_outstanding": 1750000
    }],
    expected: []
}

module.exports = nullYield;