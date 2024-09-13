import React, { useState, useEffect, useContext } from 'react'
import {useNavigate} from "react-router-dom"
import "./register.css"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Select from 'react-select';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spiner from '../../components/Spinner/Spinner.jsx'
import {registerUser} from '../../services/Apis.js'
import { addData } from '../../components/context/ContextProvider.jsx';



function Register() {
  const [inputData, setInputData] = useState({
    fname: '',
    lname : '',
    email: '',
    mobile: '',
    gender: '',
  })
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState('');
  const [previewImae, setPreviewImage] = useState('');
  const [showspin, setshowspin] = useState(true);

  const navigate = useNavigate();

  const {useradd, setUseradd} = useContext(addData)


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
//  submit user form
  const submitUserData = async(e)=>{
    e.preventDefault();
    const {fname, lname, email, mobile, gender} = inputData;
    if(fname== '') {
      toast.error('First name is required');
    }
    else if(lname == ''){
      toast.error('Last name is required');
    }
    else if(email == ''){
      toast.error('Email is required');
    }
    else if(!email.includes('@')){
      toast.error('Enter a valid email');
    }
    else if(mobile == ''){
      toast.error('Mobile number is required');
    }
    else if(mobile.length>10){
      toast.error('Enter a valid mobile number');
    }
    else if(gender == ''){
      toast.error('Gender is requird');
    }
    else if(status == ''){
      toast.error('Status is requird');
    }
    else if(image == ''){
      toast.error('Profile image is requird');
    }else{
      toast.success("Registratin successful");
    }

    const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("user_profile", image);

    const config = {
      "Content-Type" : "multipart/form-data"
    }

    const response = await registerUser(data, config);

    if(response.status == 200){
      setInputData({
        ...inputData,
        fname: '',
        lname : '',
        email: '',
        mobile: '',
        gender: '',

      })
      setStatus("");
      setImage("");
      setUseradd(response.data)
      navigate('/')
    }else{
      toast.error("Error!")
    }
  }

  useEffect(()=>{
    if(image){
      setPreviewImage(URL.createObjectURL(image));
    }
    
      setTimeout(()=>{
        setshowspin(false)
      }, 1200)
    
  },[image])

  return (
    <>
    {
      showspin?<Spiner/> : 
    
      <div className="container">
        <h2 className='text-center ml-1'>Register your details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center pb-2">
            <img src={previewImae? previewImae: "vite.svg"} alt="image" />  
          </div> 
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='fname' onChange={setInputValue} placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname'  onChange={setInputValue} placeholder="Enter last name" />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" name='email'  onChange={setInputValue} placeholder="Enter email" />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="number" name='mobile'  onChange={setInputValue} placeholder="Enter mobile no." />
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check type="radio"  onChange={setInputValue}  name='gender' label="Male" value={'Male'}/>
                <Form.Check type="radio"  onChange={setInputValue} name='gender' label="Female" value={'Female'}/>
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select status</Form.Label>
                <Select options={options}  onChange={setStatusValue}/>
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>Profile</Form.Label>
                <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder="Profile Image" />
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

    }
    </>
  )
}
export default Register
