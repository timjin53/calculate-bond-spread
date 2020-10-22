const args = process.argv.slice(2);
const inputPath = args[0];
const outputPath = args[1];
const fs = require('fs');
const calculateBondSpread = require('./calculate-bond-spread');

const main = () => {
    console.log('Started calculation.');
    let inputData;

    try {
        inputData = JSON.parse(fs.readFileSync(inputPath)).data;
        if (!Array.isArray(inputData) || inputData.length === 0) {
            throw('Data invalid or empty');
        }
    } catch (error) {
        console.log('Error parsing input data', error);
        return;
    }

    const result = { data: calculateBondSpread(inputData)};
    console.log('Calculation complete, writing data to output file.');
    try {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 4));
    } catch (error) {
        console.log('Error writing output', error)
    }
    console.log('Writing data to output file complete.');
}

main();
