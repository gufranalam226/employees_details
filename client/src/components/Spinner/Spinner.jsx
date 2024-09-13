import React from 'react'
import Spinner from 'react-bootstrap/Spinner';


function Spiner() {
  return (
    <>
      <div className="d-flex justify-content-center align-align-item-center mt-5" style={{width: '100%', height:"50%"}}>
        
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
          Loading...
        
      </div>
      
    </>
  )
}

export default Spiner
