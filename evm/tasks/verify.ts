import {task} from "hardhat/config";
import fs from "fs";
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
    let result = {}
    result.input = [];

    let named_params = losslessJSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    for( let i in named_params.input ){
        result.input.push(BigInt(named_params.input[i]));
    }
    if( "hash" in named_params ){
        result.hash = BigInt(named_params.hash);
    }
    if( "output" in named_params ){
        result.output = BigInt(named_params.output);
    }
    return result;
}

task("verify-all")
    .setAction(async (hre) => {
        let subfolders = get_subfolders("./contracts/evaluators");

        for(let k in subfolders){
            let test = subfolders[k];
            let data_set = get_files("./data/"+test);
            console.log(test);

            await deployments.fixture(['expressionsTaskFixture']);
            let testerContract = await ethers.getContract('ExpressionTester');
            let evaluatorContract = await ethers.getContract(test + '_evaluator');
            await evaluatorContract.initialize();
            for( let j in data_set){
                let file = data_set[j];
                let input = loadInput("./data/"+test+"/"+file);
                process.stdout.write("\t" + file + " gas_usage = " );
                if( "hash" in input ){
                    let result = await testerContract.execute_and_check(input.input, input.hash, evaluatorContract.address);
                    if( result ){
                        process.stdout.write("\t\t passed\n");
                    } else {
                        process.stdout.write("\t\t failed\n");
                    }
                } else {
                    let result = await testerContract.execute(input.input, evaluatorContract.address);
                    if("output" in input){
                        if(result == input.output){
                            process.stdout.write("\t\t passed\n");
                        } else {
                            process.stdout.write("\t\t failed\n");
                        }
                    } else {
                        process.stdout.write("\t\t executed without checking\n");
                    }
                }
            }
        }
});

task("verify-one")
    .addParam("test")
    .setAction(async (test, hre) => {
        test = test.test;
        let data_set = get_files("./data/"+test);

        //const {deployments, getNamedAccounts} = hre;
        //const {deploy} = deployments;

        await deployments.fixture(['expressionsTaskFixture']);
        let testerContract = await ethers.getContract('ExpressionTester');
        let evaluatorContract = await ethers.getContract(test + '_evaluator');
        await evaluatorContract.initialize();
        for( let j in data_set){
            let file = data_set[j];
            let input = loadInput("./data/"+test+"/"+file);
            process.stdout.write("\t" + file + " gas_usage = " );
            if( "hash" in input ){
                let result = await testerContract.execute_and_check(input.input, input.hash, evaluatorContract.address);
                if( result ){
                    process.stdout.write("\t\t passed\n");
                } else {
                    process.stdout.write("\t\t failed\n");
                }
            } else {
                let result = await testerContract.execute(input.input, evaluatorContract.address);
                process.stdout.write("\t\t executed without checking\n");
            }
        }
    });