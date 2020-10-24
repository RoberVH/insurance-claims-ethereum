import React, {useState} from 'react';
//import { Button} from 'react-bootstrap';
import './App.css';
import MedSelection from './components/MedSelection';
import MedEntry from './components/MedEntry';
import PrescriptionControls from './components/PrescriptionControls';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

const noMed={ name:'Select Medicine', price: 0, subtotal:  0, qtty: 0}  //null medicine object to simplify UI design
const [selectedMedication, setSelMed] =  useState(noMed);   // current medicine being edited
const [medEntryLines, setMedEntry] =  useState([])          // List of medicines in the prescription
const [total, setTotal] =  useState(0)                      // Total sum of medication in prescription list


const savePrescription =  (event) => {
  event.preventDefault();
 }

 const addMed = () => {
  setMedEntry([...medEntryLines,selectedMedication]) 
  setSelMed(noMed)
  setTotal(total + selectedMedication.subtotal)
 }

const newMedList = (medList,idx) => {
  let newML = medEntryLines
  newML.splice(idx,1)
  return newML
}

const removeMedLine = (indx) => {
  setTotal(total - medEntryLines[indx].subtotal)
  setMedEntry(medEntryLines.filter((med,count) => count!== indx))
}

const resetPrescription = () => {
  // back to square zero
  setMedEntry([])   
  setTotal(0)
}

const sendPrescription = () => {

}

   return (
    <div className="App">
      <h1>Pharmaland</h1>
       <div style= {{margin:'5px'}}>
        <div >
          <MedSelection 
            medication = {selectedMedication} 
            setValues = {setSelMed}
            addMed = {addMed}
          />
        </div>
         { medEntryLines.length!==0 &&
           <>
          <div style= {{ textAlign:'right', margin:'5%'}}>
                <PrescriptionControls 
                total={total}
                resetPrescription = {resetPrescription}
                sendPrescription = {sendPrescription}
                />
           </div> 
           <table>
             <thead>
              <tr style={{background:'lightblue'}}>
                <th style={{width:'8%'}}>Qty</th>
                <th style={{width:'60%'}}>Medicine</th>
                <th style={{width:'12%'}}>Price</th>
                <th style={{width:'14'}}>Subtotal</th>
                <th style={{width:'6%'}}>Remove</th>
              </tr>
              </thead>
            <tbody>
              {
                medEntryLines.map((medicine,idx) => 
                  <MedEntry key={idx}
                    idx={idx}
                    medicine = {medicine}
                    removeItem={removeMedLine}
                  />
              )}
              </tbody>
            </table>
            </>
         }
        </div>
    </div>
  );
}

export default App
