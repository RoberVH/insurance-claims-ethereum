import React from 'react';
import {Form, Button} from 'react-bootstrap';




function MedEntry(props) {

const removeMedLine = () => {
    props.removeItem(props.idx)
}

return (
  
    <tr>
        <td >{props.medicine.qtty}</td>
        <td >{props.medicine.name}</td>
        <td >{props.medicine.price}</td>    
        <td >{props.medicine.subtotal}</td>  
        <td ><Button variant="outline-dark" onClick = {removeMedLine}>-</Button></td>                  
   </tr>
  
  )
}    
export default MedEntry;
