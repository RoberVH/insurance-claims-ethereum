import React from 'react';
import {Form,Col, Button} from 'react-bootstrap';
import medCatalog from '../data/medsCatalog.json'



function MedSelection(props) {
 //
let medOptions=[];
medOptions = medCatalog.map((value, idx) => <option key={idx + 1} value = {JSON.stringify({price: value.Precio, name: value.Medicamento})}>{value.Medicamento}</option>);
let initialOption = <option key = {0} hidden disable="true" defaultValue > Select Medicine</option>
medOptions = [initialOption, ...medOptions]
const onChangeQuantity = (event) => {
    event.preventDefault();
    let quant = parseInt(event.target.value)
    if (quant < 0) return;
    if ( props.medication.price) {
      let precio = props.medication.price * quant
      props.setValues({...props.medication, subtotal: precio, qtty: quant })
    } else {
      props.setValues({...props.medication, qtty: quant})
    }
  }
  
  
  const onChangeSelector =  (event) => {
    event.preventDefault();
    let medObject= JSON.parse(event.target.value)
    if (props.medication.qtty) {
      let precio = props.medication.qtty * medObject.price
      props.setValues({...props.medication, name: medObject.name, price: medObject.price, subtotal: precio})
    } else {
      props.setValues({...props.medication, name: medObject.name, price: medObject.price})
    }
    
  }
 
return (
     <Form.Group controlId="formMedPrescriptionSelector" className="justify-content-center" style ={{margin:'5%', border: '1px solid blue', borderRadius: '15px'}}>
     <Form.Row style ={{padding: '15px', display: 'flex'}} >
     <Col  md={1} lg={1}>
         <Form.Control name = 'quant' type= 'number' placeholder="Qty" onChange={onChangeQuantity} value= {props.medication.qtty || 0} />
     </Col>
     <Col md={6} lg={6}>
          <Form.Control
            as="select"
            custom onChange={onChangeSelector}>
           {medOptions}
           value={JSON.stringify(props.medication)}
         </Form.Control>
     </Col>
     <Col  md={2} lg={2}>
         <Form.Control disabled name='price' type='number'  placeholder="Price" value = {props.medication.price || 0} />
     </Col>    
     <Col  md={2} lg={2}>
         <Form.Control disabled placeholder="SubTotal" type='number' value= {props.medication.subtotal || 0}  />
     </Col>          
     <Col  md={1} lg={1}>
          <Button disabled={!props.medication.subtotal}  style={{borderRadius:'50px'}} onClick = {props.addMed} >+</Button>
     </Col>          
     </Form.Row>
     </Form.Group>
)}
export default MedSelection;