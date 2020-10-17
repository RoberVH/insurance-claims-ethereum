// SPDX-License-Identifier: MIT
/* payclaims.js
*				Test contract PayClaims
*/

const PayClaims = artifacts.require('PayClaims')

contract('Test Deployment', async accounts => {
	let payments;
	beforeEach ( async () => {
		payments  = await PayClaims.new(accounts[1]);  // deployment is made from account[0] and pharmacy is assigned account[1];
	});
			it('The contract was deployed and insurer was assigned (is the owner)', async () => {
				let insurerAddress = await payments.insurer();
				assert.equal(insurerAddress, accounts[0]); 
			});
			it ('Pharmacy is correctly registered', async () => {
				let pharmacy = await payments.pharmacy();
				assert.equal(pharmacy, accounts[1] );
			});	
			it ('Insurer (owner) registers a patient', async () => {
				let patient = accounts[3];
				payments.updatePatient(patient, true);
				let patientValid = await payments.listofInsuredPatients.call(patient);
				assert(patientValid, 'Patient should be valid!');
			});
			it ('Insurer (owner) invalidates a registered patient', async () => {
				let patient = accounts[3];
				payments.updatePatient(patient, true);  // make sure it existed previously
				payments.updatePatient(patient, false);
				patientValid = await payments.listofInsuredPatients.call(patient);
				assert(!patientValid, 'Patient shouldn\'t be valid!');		
			});
			it ('Only Insurer can register a patient', async () => {
				let patient = accounts[3];
				payments.updatePatient(patient, true, {from: accounts[1]});  // pharmacy tries to register patient
				patientValid = await payments.listofInsuredPatients.call(patient);
				assert(!patientValid, 'Patient shouldn\'t be valid!');		
			});			

});

