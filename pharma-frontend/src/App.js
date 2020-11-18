import React, {useEffect, useState} from 'react';
import { Nav, Alert} from 'react-bootstrap';
import './App.css';
import MedSelection from './components/MedSelection';
import MedEntry from './components/MedEntry';
import PrescriptionControls from './components/PrescriptionControls';
import {connectWeb3} from './utils/connect';
//import format2Dec from './utils/formatDecimal'
import 'bootstrap/dist/css/bootstrap.min.css';
import format2Dec from './utils/formatDecimal';

function App() {

  const noMed={ idmed:'00-000',
                name:'Select Medicine',                       //null medicine object to simplify UI design
                price: 0,
                subtotal:  0, 
                qtty: 0}              
  const [selectedMedication, setSelMed] =  useState(noMed);   // current medicine being edited
  const [medEntryLines, setMedEntry] =  useState([])          // List of medicines in the prescription
  const [total, setTotal] =  useState(0)                      // Total sum of medication in prescription list
  const [chainType, setchainType] = useState('truffle-dev')   // for development purposes, set what network to connect
  const [blockNumber, setBlockNumber] = useState(0)           // Dev data
  const [errorMsg, setErrMsg] = useState ('')



/**
 * sendPrescription - 1) encode list of medicines 
 *                    2) sign list and present  it to user (patient) for they to sign it too
 *                    3) send signed object to smart contract 
 *                    4) write prescription to cloud (IFPS)
 *        
  */
 const sendPrescription = (event) => {
    event.preventDefault();
    console.group('SendPrescription')
      connectWeb3(chainType, setBlockNumber, setErrMsg);
    console.group('SendPrescription')
 }

 /**
  * resetPrescripton - clear list of medications out
  */
 const resetPrescription = () => {
  setMedEntry([])   // go back to square zero
  setTotal(0)
}

 const addMed = () => {
  if (medEntryLines.find(medicine =>  medicine.idmed == selectedMedication.idmed)) {
     setErrMsg('Medicine already selected')
     return
  }
  setMedEntry([...medEntryLines,selectedMedication]) 
  let newTotal = total + selectedMedication.subtotal
  newTotal=parseFloat((newTotal).toFixed(2))
  setTotal(+newTotal)
  setSelMed(noMed) 
 } 


const removeMed = (idmed) => {
  let med2Remove = medEntryLines.find(medicine => medicine.idmed == idmed);
  let substractedTotal = parseFloat((total - med2Remove.subtotal).toFixed(2))
  setTotal(substractedTotal)
  setMedEntry(medEntryLines.filter((med) => med !== med2Remove))
}

/* Alert in this page will produce a warning, see https://github.com/react-bootstrap/react-bootstrap/issues/5075
   It's waiting  for somebody to fix, for the time being, setting transition to false is a workaround */
return (
  <div className="App">
    <nav className="navbar navbar-expand-lg text-light" style={{backgroundColor: '#0a9dc5'}}>
    <h1 className="navbar-brand" >Pharmaland</h1>
    <Nav className= 'mx-auto'>Block NUmber: {blockNumber}</Nav>
    </nav>
    <Alert  transition={false} variant={'danger'} onClose={() => setErrMsg('')} dismissible show={errorMsg.length > 0}>
    <Alert.Heading>Error</Alert.Heading>
    <p> {errorMsg} </p>
    </Alert>
    <div style= {{margin:'2px'}}>
        <div >
          <MedSelection 
            medication = {selectedMedication} 
            setValues = {setSelMed}
            addMed = {addMed}
          />
        </div>
        { medEntryLines.length!== 0 &&
          <>
            <div style= {{ textAlign:'right', margin:'2%'}}>
                <PrescriptionControls 
                  total = {total}
                  resetPrescription = {resetPrescription}
                  sendPrescription = {sendPrescription}
                />
            </div> 
            < MedEntry 
                medEntryLines={medEntryLines}
                removeMed={removeMed}/>
          </>
        }
    </div>
  </div>
);
}

export default App
