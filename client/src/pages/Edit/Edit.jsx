import React, { useState, useEffect, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"
import { editFunc, singleUserGetfn } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/helper';
import { upddateData } from '../../components/context/ContextProvider';


function Edit() {
  const  [userProfile, setUserProfile]  = useState({});
  const [inputData, setInputData] = useState({
    fname: '',
    lname : '',
    email: '',
    mobile: '',
    gender: '',
  })
  const [status, setStatus] = useState('Active');
  const [userImage, setUserImage] = useState('')
  const [image, setImage] = useState('');
  const [previewImae, setPreviewImage] = useState('');
  const {update, setUpdate} = useContext(upddateData);

  const navigate = useNavigate();



// status options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  // setInput value function
  const setInputValue =(e) =>{
    const {name, value} = e.target;
    setInputData({...inputData, [name]:value});
  } 

  // status set
  const setStatusValue = (e)=>{
    setStatus(e.value);
  }

  //set profile
  const setProfile = (e) =>{
    setImage(e.target.files[0]);
  }


  const {id} = useParams();

  const userprofileGet = async () =>{
    const response = await singleUserGetfn(id);
    if(response.status === 200){
      setInputData(response.data)
      setStatus(response.data.status)
      setUserImage(response.data.profile)
    }else{
      console.log("Error")
    }
  }

  


//  submit user form
  const submitUserData = async(e)=>{
    e.preventDefault();
    const {fname, lname, email, mobile, gender} = inputData;
    if(fname== '' || lname == '' || email == '' || mobile == '' || mobile.length>10 || gender == '' || status == '') {
      toast.error('All fields are required');
    }
   
    else if(!email.includes('@')){
      toast.error('Enter a valid email');
    }
    else{
      const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("user_profile", image || userImage);

    const config = {
      "Content-Type" : "multipart/form-data"
    }
    const response = await editFunc(id, data, config);
    if(response.status === 200){
      setUpdate(response.date);
      navigate("/")
    }
    }
  }

  useEffect(()=>{
    userprofileGet();

  }, [id])
  useEffect(()=>{
    if(image){
      setUserImage("")
      setPreviewImage(URL.createObjectURL(image));
    }
  },[image])
  return (
    <>
      <div className="container">
        <h2 className='text-center ml-1 mt-2'>Edit your profile</h2>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center pb-2">
            <img src={previewImae? previewImae: `${BASE_URL}/uploads/${userImage}`} alt="image" />  
          </div> 
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='fname' onChange={setInputValue} value={inputData.fname} placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname'  onChange={setInputValue} value={inputData.lname} placeholder="Enter last name" />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" name='email'  onChange={setInputValue} value={inputData.email} placeholder="Enter email" />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="number" name='mobile'  onChange={setInputValue} value={inputData.mobile} placeholder="Enter mobile no." />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check type="radio"  onChange={setInputValue} checked={inputData.gender == "Male" ? true:false} name='gender' label="Male" value={'Male'}/>
                <Form.Check type="radio"  onChange={setInputValue} checked={inputData.gender == "Female" ? true:false} name='gender' label="Female" value={'Female'}/>
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select status</Form.Label>
                <Select options={options}   onChange={setStatusValue}/>
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>Profile</Form.Label>
                <Form.Control type="file" name='user_profile'  onChange={setProfile} placeholder="Profile Image" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Are you agree to register yourself?" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
            
          </Form>

        </Card>
        <ToastContainer position="top-center"/>
      </div> 
    </>
  )
}

export default Edit
