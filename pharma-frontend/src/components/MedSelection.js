import React from 'react';
import {Form,Col, Button} from 'react-bootstrap';
import medCatalog from '../data/medsCatalog.json'
import format2Dec from '../utils/formatDecimal'


function MedSelection(props) {
 
const onChangeQuantity = (event) => {
    event.preventDefault();
    let quant = event.target.value
    if (quant < 0) return;
    quant = +parseFloat(quant).toFixed(0)
    if ( props.medication.price) {
      let price = parseFloat((props.medication.price * quant).toFixed(2))
      props.setValues({...props.medication, subtotal: price, qtty: quant })
    } else {
      props.setValues({...props.medication, qtty: quant})
    }
  }
  
  
  const onChangeSelector =  (event) => {
    event.preventDefault();
    let medObject= JSON.parse(event.target.value)
    if (props.medication.qtty) {
      let priceSubTot = parseFloat((props.medication.qtty * medObject.price).toFixed(2))
      props.setValues({...props.medication, 
                          idmed: medObject.idmed,  
                          name: medObject.name, 
                          price: parseFloat(medObject.price).toFixed(2),
                          subtotal: priceSubTot})
    } else {
      props.setValues({...props.medication, 
                          idmed: medObject.idmed,
                          name: medObject.name,
                          price: medObject.price})
    }
  }
 
  let medOptions=[];
  medOptions = medCatalog.map((value, idx) =>
     <  option key={idx + 1} 
        value = {JSON.stringify({idmed: value.Clave,
                 price: parseFloat(value.Precio).toFixed(2), 
                 name: value.Medicamento})}>{value.Medicamento}
      </option>);
  let initialOption = <option key = {0} hidden disable="true" defaultValue > Select Medicine</option>
  medOptions = [initialOption, ...medOptions]

  return (
     <Form.Group controlId="formMedPrescriptionSelector" className="justify-content-center" style ={{margin:'2%', border: '1px solid blue', borderRadius: '15px'}}>
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
