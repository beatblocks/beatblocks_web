const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'BeatBlocks.sol');
const src = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(src, 1).contracts;

fs.ensureDirSync(buildPath);

for (const contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(':', '')}.json`),
    output[contract]
  );
}
