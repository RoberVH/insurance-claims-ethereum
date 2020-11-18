import React from 'react';
import {Button} from 'react-bootstrap';

/**
 *   MedEntry - Display table with prescription medicines in props.medEntryLines
 *              allows removing an item invoking props props.removedMed
 */
const  MedEntry= (props) => {

  const removeMedLine = (e) => {
    props.removeMed(e.currentTarget.id)
  }

  return (
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
        { props.medEntryLines.map((medicine,idx) => //  list is render every change so idx is safe to use as key is valid beween renders, items are never reordered
            <React.Fragment key={medicine.idmed}>			
             <tr>
              <td >{medicine.qtty}</td>
              <td >{medicine.name}</td>
              <td >{medicine.price}</td>    
              <td >{medicine.subtotal}</td>  
              <td ><Button id= {medicine.idmed} variant="outline-dark" onClick = {event=> removeMedLine(event)}>-</Button></td>                  
             </tr>   
            </React.Fragment>
        )}
      </tbody>
      </table>
  )
}    
export default MedEntry;
