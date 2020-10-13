const PayClaims = artifacts.require("PayClaims");


module.exports = function(deployer, network, accounts) {
let pharmacyAddress=accounts[0];
let insurerAddress=accounts[1]
deployer.deploy(PayClaims, pharmacyAddress);
};
