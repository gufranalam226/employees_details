import React , {useState, useEffect } from 'react'
import "./profile.css"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/esm/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faMobile, faPerson, faLocationPin, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'
import {singleUserGetfn} from '../../services/Apis'
import Spiner from '../../components/Spinner/Spinner.jsx'
import { BASE_URL } from '../../services/helper.js'




function Profile() {

  const  [userProfile, setUserProfile]  = useState({});
  const [showspin, setshowspin] = useState(true);

  const {id} = useParams();

  const userprofileGet = async () =>{
    const response = await singleUserGetfn(id);
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("Error")
    }
  }

  useEffect(()=>{
    
    userprofileGet();
      setTimeout(()=>{
        setshowspin(false)
      }, 1200)
    
  },[id])

  return (
    <>
    {
      showspin?<Spiner/> :

      <div className="container">
      <Card className='card-profile col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userProfile.profile}`} alt='image' />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>{userProfile.fname + " " + userProfile.lname}</h3>
              <h5><FontAwesomeIcon icon={faAt} className='email'/> :- {userProfile.email}</h5>
              <h5><FontAwesomeIcon icon={faMobile} /> :- {userProfile.mobile} </h5>
              <h5><FontAwesomeIcon icon={faPerson} /> :- {userProfile.gender}</h5>
              <h5>Status :- {userProfile.status} </h5>
              <h5><FontAwesomeIcon icon={faCalendarDays} className='calendar' /> Date Created :- {new Date(userProfile.createdAt).toLocaleString()} </h5>
              <h5><FontAwesomeIcon icon={faCalendarDays} className='calendar'/> Date Updated :- {new Date(userProfile.updatedAt).toLocaleString()} </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
}
    </>
  )
}

export default Profile
