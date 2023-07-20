const hre = require('hardhat')
const { getNamedAccounts } = hre
const fs = require('fs');

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
  
module.exports = async function() {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer, tokenOwner} = await getNamedAccounts();

    let subfolders = get_subfolders("./contracts/evaluators");

    for(k in subfolders){
        let deployed_libs = {}
/*        let libs = losslessJSON.parse(fs.readFileSync("./contracts/evalutors/"+subfolders[k]+"/linked_libs_list.json", 'utf8'));
        for (let lib of libs){
            await deploy(lib, {
                from: deployer,
                log: true,
            });
            deployedLib[lib] = (await hre.deployments.get(lib)).address
        }*/
        d = await deploy(subfolders[k]+'_evaluator', {
            from: deployer,
            libraries : deployed_libs,
            log : true,
        });
    }

    await deploy('binary_summator_evaluator', {
        from: deployer,
        log : true,
    });
}

module.exports.tags = ['expressionsTaskFixture']