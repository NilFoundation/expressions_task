const hre = require('hardhat')
const { getNamedAccounts } = hre

module.exports = async function() {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer, tokenOwner} = await getNamedAccounts();

    await deploy('ExpressionTester', {
        from: deployer,
        log : true,
    });
}

module.exports.tags = ['expressionsTaskFixture']