	/**
 * PayClaims
 * 	1 Validate proper signatures
 *		The contract validates the claim from the valid pharmacy account comes with  a signed message from a valid insured patient
 *  	2 Validate claim data
 * 	3 Make payment
 */

pragma solidity ^0.5.17;

contract PayClaims {

    event LogClaimPaid(uint claimId, bytes32[] medIds, address patient);

    address public pharmacy;
    address public insurer;	// insurer is the owner of the contract
    address public patient;
    mapping (address => bool) public listofInsuredPatients;
    uint public claimNonce;

    // constructor. The Insurer should instantiate the contract, it's the owner

    constructor(address _pharmacy)  public  {
    insurer = msg.sender;
	pharmacy = _pharmacy;
    }

    function() external  payable {}

    modifier onlyInsurer() {
        if (msg.sender == insurer) _;
    }

    //  Patients Insurer-mantainance utility
    function  updatePatient(address _patient, bool _validity) public onlyInsurer {
	listofInsuredPatients[_patient] = _validity;
}

    function validateClaim(uint claimId, bytes32[] memory medIds, bytes32 PatientR, bytes32 PatientS, uint8 PatientV) public  {
        bytes32 message = keccak256(abi.encodePacked(claimId,  medIds, claimNonce));
	    address patientSig = recover(message, PatientR, PatientS, PatientV);
        require(listofInsuredPatients[patientSig]);  // is the patient Address on insured patient list and is valid?
        
	// validate coverage meds  and make payment	to.call.value(amount); 

        claimNonce++;
        emit LogClaimPaid(claimId, medIds, patient );
    }


    // Constant functions
    function recover(bytes32 message, bytes32 r, bytes32 s, uint8 v)
        public pure returns (address)
    {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encode(prefix, message));
        return ecrecover(prefixedHash, v, r, s);
    }

// To make approval, all multoisigners account must sign this:  keccak256(addressOfTheWallet, recipientAddress, value, nonce)
//    For that they can invoke this function
//
    function hashClaimPermission(uint ClaimId, bytes32[] memory medIds)  public view returns (bytes32)  {
        return keccak256(abi.encode(ClaimId, medIds, claimNonce));
    }
}

