const hre = require('hardhat')
const { getNamedAccounts } = hre
const fs = require('fs');

const losslessJSON = require("lossless-json");

function get_subfolders(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    const result = [];
  
    for (const file of files) {
      if (file.isDirectory()) {
          result.push(file.name);
      } 
    }
    return result;
}

function get_files(dir) {
    if( !fs.existsSync(dir)  ) return [];

    const files = fs.readdirSync(dir, { withFileTypes: true });
    const result = [];
  
    for (const file of files) {
      if (!file.isDirectory()) {
          result.push(file.name);
      } 
    }
    return result;
}

function loadInput(jsonFile){
    result = {}
    result.input = [];

    named_params = losslessJSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    for( let i in named_params.input ){
        result.input.push(BigInt(named_params.input[i]));
    }
    result.hash = BigInt(named_params.hash);
    console.log(result);
    return result;
}

let subfolders = get_subfolders("./contracts/evaluators");

for(k in subfolders){
    let test = subfolders[k];
    let data_set = get_files("./data/"+test);
    describe('Expressions tests', function () {
        const {deployments, getNamedAccounts} = hre;
        const {deploy} = deployments;
        for( j in data_set){
            let file = data_set[j];
            let input = loadInput("./data/"+test+"/"+file);
            it(file, async function () {
                await deployments.fixture(['expressionsTaskFixture']);
                let testerContract = await ethers.getContract('ExpressionTester');
                let evaluatorContract = await ethers.getContract(test + '_evaluator');
                await testerContract.test_evaluator(input.input, input.hash, evaluatorContract.address);
            });
        }
    })
}
