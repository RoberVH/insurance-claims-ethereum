import React from 'react';
import {Button} from 'react-bootstrap';


const  PrescriptionControls = (props) =>  {

return (
   <>
     <span >
        <Button variant='primary' style={{borderRadius:'15px'}}
                onClick={props.sendPrescription}>Send
        </Button>
        <Button variant='secondary' style={{marginLeft:'10px', borderRadius:'15px'}} 
                onClick={props.resetPrescription}>Reset
        </Button>
        <label style={{marginLeft:'15px', 
                fontSize:'1.5em', 
                padding: '0 8px 0 8px', 
                background:'yellow'}}> Total:{' '}{props.total}
        </label>
    </span>
   </>
  
  )
}    
export default PrescriptionControls;
