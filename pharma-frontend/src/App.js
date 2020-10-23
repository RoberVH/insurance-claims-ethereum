import React, {useState} from 'react';
//import { Button} from 'react-bootstrap';
import './App.css';
import MedSelection from './components/MedSelection';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

const [selectedMedication, setSelMed] =  useState({ name:'', price: 0, subtotal:  0, qtty: 0}); 

const savePrescription =  (event) => {
  event.preventDefault();
 }

   return (
    <div className="App">
      <h1>Pharmaland</h1>
       <div className="justify-content-center" style ={{margin:'5%', border: '1px solid blue', borderRadius: '15px'}}>
        <div style ={{padding: '10px', display: 'flex'}}>
          <MedSelection 
            medication = {selectedMedication} 
            setValues = {setSelMed}
          />
        </div>
      </div>
        <form onSubmit= {savePrescription}>
          {/* <input id = 'quantity' type='number' onChange={changeMed}></input>
          <input id = 'medicine' type='Text' onChange={changeQty}></input>
          <input id = 'price' type='number' onChange={changeQty}></input>
          <input id = 'subtotal' type='number' onChange={changeQty}></input>
         <button type="submit">Send</button> */}
         <input  name = 'quanty' type='number'></input>
          <input name = 'medicine' type='Text' ></input>
          <input name = 'price' type='number' ></input>
          <input name = 'subtotal' type='number' ></input>
         <button type="submit">Send</button>         
        </form> 
    </div>
  );
}

export default App